// Select elements
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const pendingTasksList = document.getElementById('pending-tasks');
const completedTasksList = document.getElementById('completed-tasks');

// Store tasks in an array
let pendingTasks = [];
let completedTasks = [];

// Function to add task
function addTask(taskDescription) {
    const task = {
        description: taskDescription,
        createdAt: new Date().toLocaleString(),
        completed: false
    };

    pendingTasks.push(task);
    renderTasks();
}

// Function to toggle task completion
function toggleComplete(taskIndex) {
    const task = pendingTasks[taskIndex];
    task.completed = !task.completed;

    if (task.completed) {
        completedTasks.push(task);
        pendingTasks.splice(taskIndex, 1);
    } else {
        pendingTasks.push(task);
        completedTasks.splice(completedTasks.indexOf(task), 1);
    }

    renderTasks();
}

// Function to delete task
function deleteTask(taskIndex, isCompleted) {
    if (isCompleted) {
        completedTasks.splice(taskIndex, 1);
    } else {
        pendingTasks.splice(taskIndex, 1);
    }
    renderTasks();
}

// Function to edit task
function editTask(taskIndex, isCompleted) {
    const newDescription = prompt("Edit task:", isCompleted ? completedTasks[taskIndex].description : pendingTasks[taskIndex].description);
    if (newDescription) {
        if (isCompleted) {
            completedTasks[taskIndex].description = newDescription;
        } else {
            pendingTasks[taskIndex].description = newDescription;
        }
        renderTasks();
    }
}

// Function to render the tasks
function renderTasks() {
    // Clear lists
    pendingTasksList.innerHTML = '';
    completedTasksList.innerHTML = '';

    // Render Pending Tasks
    pendingTasks.forEach((task, index) => {
        const taskElement = document.createElement('li');
        taskElement.classList.add('task-item');

        taskElement.innerHTML = `
            <span>${task.description} <small>(Added on: ${task.createdAt})</small></span>
            <div>
                <button class="complete" onclick="toggleComplete(${index})">Complete</button>
                <button class="edit" onclick="editTask(${index}, false)">Edit</button>
                <button onclick="deleteTask(${index}, false)">Delete</button>
            </div>
        `;

        pendingTasksList.appendChild(taskElement);
    });

    // Render Completed Tasks
    completedTasks.forEach((task, index) => {
        const taskElement = document.createElement('li');
        taskElement.classList.add('task-item', 'complete');

        taskElement.innerHTML = `
            <span>${task.description} <small>(Completed on: ${task.createdAt})</small></span>
            <div>
                <button class="edit" onclick="editTask(${index}, true)">Edit</button>
                <button onclick="deleteTask(${index}, true)">Delete</button>
            </div>
        `;

        completedTasksList.appendChild(taskElement);
    });
}

// Event listener for adding task
addTaskBtn.addEventListener('click', () => {
    const taskDescription = taskInput.value.trim();
    if (taskDescription) {
        addTask(taskDescription);
        taskInput.value = '';
    }
});

// Initialize with empty lists
renderTasks();