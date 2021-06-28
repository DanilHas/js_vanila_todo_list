let tasksStore = [];

const searchField = document.createElement('input');
searchField.className = "todo-list__search-field";
searchField.placeholder = "Add Task";

const searchButton = document.createElement('button');
searchButton.className = "todo-list__button";
searchButton.textContent = "Add";

const searchForm = document.createElement('form');
searchForm.className = "todo-list__form";

const searchContainer = document.createElement('div');
searchContainer.className = "todo-list__top-container";

const tasksContainer = document.createElement('div');
tasksContainer.className = "todo-list__footer-container";

const mainContainer = document.createElement('main');
mainContainer.className = "todo-list";

searchForm.append(searchField, searchButton);
searchContainer.append(searchForm);
mainContainer.append(searchContainer, tasksContainer);
document.body.append(mainContainer);

class Task {
constructor(title, completed = false) {
this.id = Math.random().toString(36).slice(2);
this.completed = completed;
this.title = title;
}
}


function renderTasks() {
tasksContainer.innerHTML = '';
tasksStore.forEach((task) => {
const unfinishedTask = document.createElement('div');
unfinishedTask.id = task.id;
unfinishedTask.className = 'todo-list__task';
unfinishedTask.textContent = task.title;

if (task.completed) {
unfinishedTask.classList.add('todo-list__item-completed');
}

const deleteButton = document.createElement('button');
deleteButton.className = "todo-list__deleteButton";
deleteButton.textContent = "X";
deleteButton.onclick = function () {
unfinishedTask.remove();
tasksStore = tasksStore.filter((task) => task.id !== unfinishedTask.id);
saveInLocalStorage();
};

const taskCheckBox = document.createElement('input');
taskCheckBox.setAttribute ('type', 'checkbox');
taskCheckBox.className = 'todo-list__checkbox';

const editButton = createEditButton();
const edit = editTasks();

unfinishedTask.append(editButton);
tasksContainer.prepend(unfinishedTask);
unfinishedTask.append(deleteButton);
unfinishedTask.prepend(taskCheckBox);
unfinishedTask.append(editButton);
unfinishedTask.append(edit);

searchField.value = '';
});
saveInLocalStorage();
}

function createEditButton() {
    const editButton = document.createElement('button');
editButton.className = "todo-list__editButton";

const imagePencil = document.createElement('img');
imagePencil.className = 'todo-list__image' 
imagePencil.src = 'C:/Users/Danil/Desktop/pencil.jpg';

editButton.append(imagePencil);
return editButton;
}

function editTasks() {
    const editButton = createEditButton();

    const input = document.createElement('input');
    input.className = 'todo-list__editTaskInput';

    const okButton = document.createElement('button');
    okButton.className = 'todolist__editOkButton';

    const cancelButton = document.createElement('button');
    cancelButton.className = 'todo-list__cancelButton';

    editButton.onclick = function() {
        input.value = searchField.value;
        if (okButton.onclick) {
            input.value = task.title;
        } else if (cancelButton.onclick) {
            input.value = searchField.value;
        }
    }
    input.append(okButton);
    input.append(cancelButton);
}

function completeTask(event) {
const checkbox = event.target;
const taskContainer = checkbox.closest('div');
const taskIdx = tasksStore.findIndex((task) => task.id == taskContainer.id);

if (taskIdx !== -1) {
tasksStore[taskIdx].completed = true;
}

renderTasks();
}

function saveInLocalStorage() {
localStorage.setItem('tasksStore', JSON.stringify(tasksStore));
}

function readFromLocalStorage() {
tasksStore = JSON.parse(localStorage.getItem('tasksStore')) || [];
}

function createNewTask (event) {
console.log('event', event);
event.preventDefault();
if (searchField.value) {
// Создали таск и добавили его в хранилище
const task = new Task(searchField.value);
tasksStore.push(task);

renderTasks();
}
}

searchForm.addEventListener('submit', createNewTask);

readFromLocalStorage();
renderTasks();