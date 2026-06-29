// =========================
// SECTION 1: Global Setup & Initialization
// =========================

const API_BASE = "https://workout-log-tfw8.onrender.com"
const logButton = document.getElementById('log-button');
const notesButton = document.getElementById('notes-button');
const loadButton = document.getElementById('load-button');
const workoutList = document.getElementById('workout-list');
const searchBar = document.getElementById('search-bar');
const clearSearch = document.getElementById('clear-search');
const editModal = document.getElementById('edit-modal');
const editForm = document.getElementById('edit-form');
const deleteModal = document.getElementById('delete-modal');
const cancelDeleteBtn = document.getElementById('cancel-delete-button');
const confirmDeleteBtn = document.getElementById('confirm-delete-button');

let currentDeleteId = null;

async function apiFetch(path, options = {}) {
    return fetch(`${API_BASE}${path}`, options);
}

(function () {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/login.html';
    }
})();

document.addEventListener('DOMContentLoaded', async () => {
    try {
        showLoading();
        const res = await apiFetch('/config');
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

    const user = JSON.parse(localStorage.getItem('user') || "null");
    if (user && user.email) {
        document.getElementById('welcome-message').textContent = `Welcome, ${user.displayName || user.email}!`;
}
});

const token = localStorage.getItem('token');
if (!token) {
    window.location.href = '/login.html';
}

document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login.html';
});

editForm.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                saveEditBtn.click();
            }
        });

editModal.addEventListener('click', (e) => {
            if (e.target === editModal) {
                editModal.classList.add('hidden');
                document.body.classList.remove('modal-open');
            }
        });

cancelDeleteBtn.addEventListener('click', () => {
    deleteModal.classList.add('hidden');
    document.body.classList.remove('modal-open');
    currentDeleteId = null;
});

confirmDeleteBtn.addEventListener('click', async () => {
    if (!currentDeleteId) return;

    const token = localStorage.getItem('token');

    try {
        const res = await apiFetch(`/api/workouts/${currentDeleteId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if(!res.ok) {
            console.error("Failed to delete workout");
            return;
        }

        showDeleteToast();
        await loadWorkouts();  //Refresh list
    } catch(error) {
        console.error("Error deleting workout:", error);
    }

    deleteModal.classList.add('hidden');
    document.body.classList.remove('modal-open');
    currentDeleteId = null;
})

deleteModal.addEventListener('click', (e) => {
    if (e.target === deleteModal) {
        deleteModal.classList.add('hidden');
        document.body.classList.remove('modal-open');
        currentDeleteId = null;
    }
});

// =========================
// SECTION 2: Helper Functions
// =========================

function showLoading() {
    document.getElementById('loading-indicator').classList.remove('hidden');
    document.getElementById('workout-list').classList.add('hidden');
}

function hideLoading() {
    document.getElementById('loading-indicator').classList.add('hidden');
    document.getElementById('workout-list').classList.remove('hidden');
}

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

function createWorkoutListItem(workout) {
    const li = document.createElement('li');
    li.classList.add('workout-item');

    const type = getWorkoutType(workout.name);

    const typeTag = document.createElement('span');
    typeTag.classList.add('workout-type-tag', type.toLowerCase());
    typeTag.textContent = type;
    

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
    li.appendChild(typeTag);

    return li;
    }

function getWorkoutType(name) {
    const lower = name.toLowerCase();

    if(lower.includes('push') || lower.includes('bench') || lower.includes('press') || lower.includes('pull') || lower.includes('squat') || lower.includes('deadlift')) {
        return 'Strength';
    }

    if(lower.includes('run') || lower.includes('cardio') || lower.includes('bike') || lower.includes('swim') || lower.includes('jump') || lower.includes('treadmill') || lower.includes('walk')) {
        return 'Cardio';
    }

    if(lower.includes('yoga') || lower.includes('stretch') || lower.includes('pilates') || lower.includes('mobility')) {
        return 'Mobility';
    }
    
    return 'Other';
}

function openDeleteModal(id) {
    currentDeleteId = id;

    deleteModal.classList.remove('hidden');
    document.body.classList.add('modal-open');
}

function showDeleteToast() {
    const toast = document.getElementById('delete-toast');
    toast.classList.remove('hidden');
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.classList.add('hidden'), 300);
    }, 1500);
}

// =========================
// SECTION 3: CRUD Operations
// =========================

async function loadWorkouts() {
    const list = workoutList;

    try {
        loadButton.disabled = true;
        loadButton.textContent = 'Loading...';
        loadButton.classList.add('loading-button');
        showLoading();
        const res = await apiFetch('/api/workouts', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        const workouts = await res.json();

        workouts.sort((a, b) => new Date(b.date) - new Date(a.date));

        const foundTerm = workouts.filter(workout => {
        const searchTerm = searchBar.value.toLowerCase();
        return workout.name.toLowerCase().includes(searchTerm);
        });

        const emptyState = document.getElementById('empty-state');

        if (foundTerm.length == 0) {
            list.innerHTML = '';                    // Clear stale items
            emptyState.classList.remove('hidden');
            return;                                 // Stop early - nothing to render
        } else {
            emptyState.classList.add('hidden');
        }

        list.innerHTML = '';

        foundTerm.forEach(workout => {
        const li = createWorkoutListItem(workout);
        li.classList.add('fade-in');
        list.appendChild(li);
        });
    }
    catch(error){
        console.error('Error loading workouts:', error);
        list.innerHTML = '<li>Failed to load workouts. Please try again.</li>';
        return;
    }
    finally {
        loadButton.textContent = 'Load Workouts';
        loadButton.classList.remove('loading-button');
        loadButton.disabled = false;
        hideLoading();
    }
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
        await apiFetch('/api/workouts', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
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

async function editWorkout(id) {
    try {
        showLoading();
        const res = await apiFetch(`/api/workouts/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        const workout = await res.json();
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

        editModal.classList.remove('hidden');
        document.body.classList.add('modal-open');

        editName.focus();

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
        await apiFetch(`/api/workouts/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
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
        editModal.classList.add('hidden');
        document.body.classList.remove('modal-open');
        loadWorkouts();
    };
    cancelEditBtn.onclick = () => {
        editModal.classList.add('hidden');
        document.body.classList.remove('modal-open');
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

async function deleteWorkout(id) {
    const deleteButton = document.querySelector(`button.delete-btn[data-id="${id}"]`);

    try {
        deleteButton.disabled = true;
        showLoading();
        await apiFetch(`/api/workouts/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
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

// =========================
// SECTION 4: UI Behavior
// =========================

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

// =========================
// SECTION 5: Event Listeners
// =========================

logButton.addEventListener('click', addWorkout);
notesButton.addEventListener('click', toggleNotes);
loadButton.addEventListener('click', loadWorkouts);
workoutList.addEventListener('click', (e) => {
    if (e.target.classList.contains('edit-btn')) {
        const id = e.target.getAttribute('data-id');
        editWorkout(id);
    } else if (e.target.classList.contains('delete-btn')) {
        const id = e.target.getAttribute('data-id');
        openDeleteModal(id);
    }
});
searchBar.addEventListener('input', loadWorkouts);
searchBar.addEventListener('input', () => {
    clearSearch.classList.toggle('hidden', searchBar.value === '');
})
clearSearch.addEventListener('click', () => {
    searchBar.value = '';
    clearSearch.classList.add('hidden');
    loadWorkouts();
});