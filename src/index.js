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

function createNewTask (event) {
    event.preventDefault();
    if (searchField.value) {
        const unfinishedTask = document.createElement('div');
        unfinishedTask.className = 'todo-list__task';
        const deleteButton = document.createElement('button');
        deleteButton.className = "todo-list__deleteButton";
        deleteButton.textContent = "X";
        deleteButton.onclick = function () {
            unfinishedTask.remove();
        };
        unfinishedTask.textContent = searchField.value;
        tasksContainer.prepend(unfinishedTask);
        unfinishedTask.append(deleteButton);
        searchField.value = "";
        return unfinishedTask;
    }
}

searchForm.addEventListener('submit', createNewTask);
