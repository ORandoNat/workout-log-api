//Initialization
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const res = await fetch('/config');
        const config = await res.json();
        window.baseURL = config.baseUrl;
        loadWorkouts();
    }
    catch(error) {
        console.error('Error fetching config:', error);
        const errMessage = document.getElementById('error-message');
        errMessage.textContent = 'Failed to load configuration. Please refresh the page.';
        errMessage.style.display = 'block';
    }
    });

//Event Wiring
const logButton = document.querySelector('.logButton');
const notesButton = document.querySelector('.notesButton');
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
async function addWorkout() {
    const name = document.getElementById('name').value;
    const amount = document.getElementById('amount').value;
    const workType = document.getElementById('work-type').value;
    const notes = document.getElementById('notes').value;
    const errMessage = document.getElementById('error-message');
    const dateInput = document.getElementById('date').value;
    const timeInput = document.getElementById('time').value;
    const notesField = document.getElementById('notes');
    const notesBtn = document.querySelector('#notes-container button');
    let dateTime = Date.now();

    if (!name || !amount) {
        errMessage.textContent = 'Please enter all required fields (name, amount)';
        errMessage.style.display = 'block';
        return;
    }

    if (dateInput && timeInput) {
        dateTime = new Date(`${dateInput}T${timeInput}`);
    }

    try {
        await fetch(`${baseURL}/workouts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, amount: parseInt(amount), workType, notes, date: dateTime })
        });
    }
    catch(error){
        console.error('Error adding workout:', error);
        errMessage.textContent = 'Failed to add workout. Please try again.';
        errMessage.style.display = 'block';
        return;
    }
    errMessage.style.display = 'none';
    document.getElementById('name').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('work-type').selectedIndex = 0;
    document.getElementById('notes').value = '';
    document.getElementById('date').value = '';
    document.getElementById('time').value = '';
    document.getElementById('notes').style.display = 'none';
    notesBtn.textContent = 'Add Notes +';
    loadWorkouts();
}

async function toggleNotes() {
    const notesField = document.getElementById('notes');
    const notesBtn = document.querySelector('#notes-container button');
    let userConfirm = true;

    if (notesField.style.display === 'none') {
        notesField.style.display = 'block';
        notesBtn.textContent = 'Remove Notes -';
    } else {
        if (notesField.value) {
        userConfirm = confirm('Are you sure? Any notes you have entered will be lost.');
        }
        if (userConfirm) {
            notesField.style.display = 'none';
            notesBtn.textContent = 'Add Notes +';
            notesField.value = '';
        }
    }
}
async function loadWorkouts() {
    const list = document.getElementById('workout-list');

    try {
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
    }

async function deleteWorkout(id) {
    const errMessage = document.getElementById('error-message');

    try {
        await fetch(`${baseURL}/workouts/${id}`, {
        method: 'DELETE'
        });
    
    }
    catch(error) {
        console.error('Error deleting workout:', error);
        errMessage.textContent = 'Failed to delete workout. Please try again.';
        errMessage.style.display = 'block';
        return;
    }
    errMessage.style.display = 'none';
    loadWorkouts();
    }

async function editWorkout(id) {
    const errMessage = document.getElementById('error-message');
    
    try {
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
    editForm.style.display = 'block';

    saveEditBtn.onclick = async () => {
        const updatedName = editName.value;
        const updatedAmount = editAmount.value;
        const updatedWorkType = editWorkType.value;
        const updatedNotes = editNotes.value;
        const updatedDate = editDate.value;
        const updatedTime = editTime.value;
        let newDateTime = Date.now();

    
        if (!updatedName || !updatedAmount) {
        errMessage.textContent = 'Please enter all required fields (name, amount)';
        errMessage.style.display = 'block';
        return;
        }
        if (updatedDate && updatedTime) {
        newDateTime = new Date(`${updatedDate}T${updatedTime}`);
        }
        try {
        await fetch(`${baseURL}/workouts/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: updatedName, amount: parseInt(updatedAmount), workType: updatedWorkType, notes: updatedNotes, date: newDateTime})
        });
        }
        catch(error) {
        console.error('Error updating workout:', error);
        errMessage.textContent = 'Failed to update workout. Please try again.';
        errMessage.style.display = 'block';
        return;
        }
        errMessage.style.display = 'none';
        editForm.style.display = 'none';
        loadWorkouts();
    };
    cancelEditBtn.onclick = () => {
        editForm.style.display = 'none';
        errMessage.style.display = 'none';
    }
    }
    catch(error) {
        console.error('Error fetching workout:', error);
        errMessage.textContent = 'Failed to load workout details. Please try again.';
        errMessage.style.display = 'block';
        return;
    }
    }

function createWorkoutListItem(workout) {
    const li = document.createElement('li');
    const editBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');
        
    li.textContent = `${workout.name} — ${workout.amount} ${workout.workType}`;
        if (workout.notes) {
            li.textContent += ` — Notes: ${workout.notes}`;
        }
        if (workout.date) {
            const date = formatDisplayDate(workout.date);
            li.textContent += ` — Date: ${date}`;
        }
        
        editBtn.textContent = 'Edit';
        editBtn.setAttribute('data-id', workout._id);
        editBtn.classList.add('edit-btn');
        li.appendChild(editBtn);

        deleteBtn.textContent = 'Delete';
        deleteBtn.setAttribute('data-id', workout._id);
        deleteBtn.classList.add('delete-btn');
        li.appendChild(deleteBtn);

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