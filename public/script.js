//Initialization
document.addEventListener('DOMContentLoaded', async () => {
    try {
        showLoading();
        const res = await fetch('/config');
        const config = await res.json();
        window.baseURL = config.baseUrl;
        loadWorkouts();
    }
    catch(error) {
        console.error('Error fetching config:', error);
        showMessage('error', 'Failed to load configuration. Please refresh the page.');
        return;
    }    
    finally {
        hideLoading();
    }
});

//Event Wiring
const logButton = document.getElementById('log-button');
const notesButton = document.getElementById('notes-button');
const loadButton = document.getElementById('load-button');
const workoutList = document.getElementById('workout-list');
const searchBar = document.getElementById('search-bar');

logButton.addEventListener('click', addWorkout);
notesButton.addEventListener('click', toggleNotes);
loadButton.addEventListener('click', loadWorkouts);
workoutList.addEventListener('click', (e) => {
    if (e.target.classList.contains('edit-btn')) {
        const id = e.target.getAttribute('data-id');
        editWorkout(id);
    } else if (e.target.classList.contains('delete-btn')) {
        const id = e.target.getAttribute('data-id');
        deleteWorkout(id);
    }
});
searchBar.addEventListener('input', loadWorkouts);


//Function definitions
function showMessage(type, text) {
    const messageElement = document.getElementById('error-message');
    messageElement.textContent = text;

    messageElement.classList.remove('hidden', 'error', 'success');
    messageElement.classList.add(type);
}

function hideMessage() {
    const messageElement = document.getElementById('error-message');
    messageElement.classList.add('hidden');
}

async function addWorkout() {
    const name = document.getElementById('name').value;
    const amount = document.getElementById('amount').value;
    const workType = document.getElementById('work-type').value;
    const notes = document.getElementById('notes').value;
    const dateInput = document.getElementById('date').value;
    const timeInput = document.getElementById('time').value;
    const notesBtn = document.getElementById('notes-button');
    let dateTime = Date.now();

    if (!name || !amount) {
        showMessage('error', 'Please enter all required fields (name, amount)');
        return;
    }

    if (dateInput && timeInput) {
        dateTime = new Date(`${dateInput}T${timeInput}`);
    }

    try {
        logButton.disabled = true;
        showLoading();
        await fetch(`${baseURL}/workouts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name, 
                amount: parseInt(amount), 
                workType, 
                notes, 
                date: dateTime 
            })
        });
    }
    catch(error){
        console.error('Error adding workout:', error);
        showMessage('error', 'Failed to add workout. Please try again.');
        return;
    }
    finally {
        logButton.disabled = false;
        hideLoading();
    }
    
    hideMessage();
    document.getElementById('name').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('work-type').selectedIndex = 0;
    document.getElementById('notes').value = '';
    document.getElementById('date').value = '';
    document.getElementById('time').value = '';
    document.getElementById('notes').classList.add('hidden');
    notesBtn.textContent = 'Add Notes +';
    loadWorkouts();
}

async function toggleNotes() {
    const notesField = document.getElementById('notes');
    const notesBtn = document.getElementById('notes-button');
    let userConfirm = true;

    if (notesField.classList.contains('hidden')) {
        notesField.classList.remove('hidden');
        notesBtn.textContent = 'Remove Notes -';
        return;
    } else {
        if (notesField.value) {
        userConfirm = confirm('Are you sure? Any notes you have entered will be lost.');
        }
        if (userConfirm) {
            notesField.classList.add('hidden');
            notesBtn.textContent = 'Add Notes +';
            notesField.value = '';
        }
    }
}
async function loadWorkouts() {
    const list = document.getElementById('workout-list');

    try {
        loadButton.disabled = true;
        showLoading();
        const res = await fetch(`${baseURL}/workouts`);
        const workouts = await res.json();

        workouts.sort((a, b) => new Date(b.date) - new Date(a.date));

        const foundTerm = workouts.filter(workout => {
        const searchTerm = document.getElementById('search-bar').value.toLowerCase();
        return workout.name.toLowerCase().includes(searchTerm);
        });

        list.innerHTML = '';

        foundTerm.forEach(workout => {
        const li = createWorkoutListItem(workout);
        list.appendChild(li);
        });
    }
    catch(error){
        console.error('Error loading workouts:', error);
        list.innerHTML = '<li>Failed to load workouts. Please try again.</li>';
        return;
    }
    finally {
        loadButton.disabled = false;
        hideLoading();
    }
    }

async function deleteWorkout(id) {
    const deleteButton = document.querySelector(`button.delete-btn[data-id="${id}"]`);

    try {
        deleteButton.disabled = true;
        showLoading();
        await fetch(`${baseURL}/workouts/${id}`, {
        method: 'DELETE'
        });
    }
    catch(error) {
        console.error('Error deleting workout:', error);
        showMessage('error', 'Failed to delete workout. Please try again.');
        return;
    }
    finally {
        deleteButton.disabled = false;
        hideLoading();
    }
    hideMessage();
    loadWorkouts();
    }

async function editWorkout(id) {
    try {
        showLoading();
        const res = await fetch(`${baseURL}/workouts/${id}`);
        const workout = await res.json();
        
        const editForm = document.getElementById('edit-form');
        const editName = document.getElementById('edit-name');
        const editAmount = document.getElementById('edit-amount');
        const editWorkType = document.getElementById('edit-work-type');
        const editNotes = document.getElementById('edit-notes');
        const editDate = document.getElementById('edit-date');
        const editTime = document.getElementById('edit-time');
        const saveEditBtn = document.getElementById('save-edit-button');
        const cancelEditBtn = document.getElementById('cancel-edit-button');

        editName.value = workout.name;
        editAmount.value = workout.amount;
        editWorkType.value = workout.workType;
        editNotes.value = workout.notes || '';

    if (workout.date) {
        const date = formatDateTime(new Date(workout.date));
        editDate.value = date.formattedDate;
        editTime.value = date.formattedTime;
    }

    editForm.classList.remove('hidden');

    saveEditBtn.onclick = async () => {
        const updatedName = editName.value;
        const updatedAmount = editAmount.value;
        const updatedWorkType = editWorkType.value;
        const updatedNotes = editNotes.value;
        const updatedDate = editDate.value;
        const updatedTime = editTime.value;
        let newDateTime = Date.now();

    
        if (!updatedName || !updatedAmount) {
        showMessage('error', 'Please enter all required fields (name, amount)');
        return;
        }
        if (updatedDate && updatedTime) {
        newDateTime = new Date(`${updatedDate}T${updatedTime}`);
        }
        try {
        saveEditBtn.disabled = true;
        showLoading();
        await fetch(`${baseURL}/workouts/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: updatedName, amount: parseInt(updatedAmount), workType: updatedWorkType, notes: updatedNotes, date: newDateTime})
        });
        }
        catch(error) {
        console.error('Error updating workout:', error);
        showMessage('error', 'Failed to update workout. Please try again.');
        return;
        }
        finally {
            saveEditBtn.disabled = false;
            hideLoading();
        }
        hideMessage();
        editForm.classList.add('hidden');
        loadWorkouts();
    };
    cancelEditBtn.onclick = () => {
        editForm.classList.add('hidden');
        hideMessage();
    }
    }
    catch(error) {
        console.error('Error fetching workout:', error);
        showMessage('error', 'Failed to load workout details. Please try again.');
        return;
    }
    finally {
        hideLoading();
    }
    }

function createWorkoutListItem(workout) {
    const li = document.createElement('li');
    const workoutCard = document.createElement('div');

    const workoutCardTop = document.createElement('div');
    const workoutName = document.createElement('h3');
    const workoutListBtns = document.createElement('div');
    const editBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');

    const workoutCardMiddle = document.createElement('div');
    const workoutAmount = document.createElement('p');
    const workoutType = document.createElement('p');
    const workoutDate = document.createElement('p');

    const workoutCardBottom = document.createElement('div');
    const workoutNotes = workout.notes ? document.createElement('p') : null;
    const notesChevron = document.createElement('span');
    
    notesChevron.classList.add('hidden');

    workoutName.textContent = workout.name;
    editBtn.textContent = 'Edit';
    editBtn.setAttribute('data-id', workout._id);
    editBtn.classList.add('edit-btn')
    deleteBtn.textContent = 'Delete';
    deleteBtn.setAttribute('data-id', workout._id);
    deleteBtn.classList.add('delete-btn');
    workoutCard.classList.add('workout-card');
    workoutCardTop.classList.add('workout-card-top');

    workoutAmount.textContent = `Amount: ${workout.amount}`;
    workoutAmount.classList.add('workout-amount');
    workoutType.textContent = `Type: ${workout.workType}`;
    workoutType.classList.add('workout-type');
    workoutDate.classList.add('workout-date');
    workoutCardMiddle.classList.add('workout-card-middle');

    workoutCardBottom.classList.add('workout-card-bottom');

    if (workout.date) {
        const date = formatDisplayDate(workout.date);
        workoutDate.textContent = `Date: ${date}`;
    } else {
        workoutDate.textContent = 'Date: N/A';
    }
    if (workoutNotes) {
        workoutNotes.classList.add('hidden');
        notesChevron.classList.remove('hidden');
        notesChevron.textContent = 'Show Notes ▼';
        workoutNotes.textContent = `Notes: ${workout.notes}`;
        workoutNotes.classList.add('workout-notes');
        notesChevron.classList.add('notes-chevron');
        workoutCardBottom.appendChild(notesChevron);
        workoutCardBottom.appendChild(workoutNotes);
        notesChevron.addEventListener('click', () => {
            if(workoutNotes.classList.toggle('hidden')) {
                notesChevron.textContent = 'Show Notes ▼';
            } else {
                notesChevron.textContent = 'Hide Notes ▲';
            }
        });
    }

    workoutListBtns.classList.add('workout-list-btns');
    workoutListBtns.appendChild(editBtn);
    workoutListBtns.appendChild(deleteBtn);

    workoutCardTop.appendChild(workoutName);
    workoutCardTop.appendChild(workoutListBtns);

    workoutCardMiddle.appendChild(workoutAmount);
    workoutCardMiddle.appendChild(workoutType);
    workoutCardMiddle.appendChild(workoutDate);


    workoutCard.appendChild(workoutCardTop);
    workoutCard.appendChild(workoutCardMiddle);
    workoutCard.appendChild(workoutCardBottom);
    

    li.appendChild(workoutCard);

    return li;
    }

function formatDateTime(dateTime) {
    const formattedDate = dateTime.toISOString().split('T')[0];
    const formattedTime = dateTime.toTimeString().split(' ')[0].slice(0, 5);
    return { formattedDate, formattedTime };
}

function formatDisplayDate(dateTime) {
    const options = {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return new Date(dateTime).toLocaleString(undefined, options);
}

function showLoading() {
    document.getElementById('loading-indicator').classList.remove('hidden');
}

function hideLoading() {
    document.getElementById('loading-indicator').classList.add('hidden');
}