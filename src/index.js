class Task {
  constructor(title) {
    this.id = Math.random().toString(36).slice(2);
    this.title = title;
    this.completed = false;
  }
}

let tasksStore = [
  // {
  //   id: 'some id',
  //   title: 'here is some title',
  //   completed: false,
  // },
  new Task("some task 2"),
];

const mainContainer = document.createElement("main");
mainContainer.className = "todo-list";

const tasksContainer = document.createElement("div");
tasksContainer.className = "todo-list__tasks-container";

const title = document.createElement("h1");
title.className = "todo-list__title";
title.textContent = "To Do List";

const addButton = document.createElement("button");
addButton.className = "todo-list__add-button";

const imagePlus = document.createElement("img");
imagePlus.className = "todo-list__image-plus";
imagePlus.src = "../js_vanila_todo_list/assets/icons/Plus.svg";

const topContainer = document.createElement("div");
topContainer.className = "todo-list__top-container";

addButton.append(imagePlus);
topContainer.append(title, addButton);
mainContainer.append(topContainer, tasksContainer);
document.body.append(mainContainer);

addButton.onclick = function () {
  // Мы должны создать таск контейнер для того, чтобы
  // хранить в нем дургие элементы (инпут, чекбокс, текст, кнопки)
  const task = document.createElement("div");
  // Вешаем на таск контейнер классы - один обычный для стилей - "todo-list__task"
  // и второй класс для того, чтобы понять что данный контейнер
  // у нас находится в работе (т.е. мы его создаем) - "todo-list__task-creating"
  task.className = "todo-list__task todo-list__task-creating-now";

  // Создаем контейнер, который нам нужен для того, чтобы хранить в нем чекбокс, инпут/текст и дату
  const taskLeftContainer = document.createElement("div");
  taskLeftContainer.className = "todo-list__task-left-container";
  // Далее мы должны создать чекбокс, который мы засунем в таск контейнер
  const checkBox = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  checkBox.className = "todo-list__checkbox";

  // Далее мы создаем инпут в котором мы будем писать название таски
  const tasksInput = document.createElement("input");
  tasksInput.className = "todo-list__input";

  // TODO:
  // Нужно переделать так, чтобы при нажатии кнопки enter в инпуте
  // у нас создавалась таска
  tasksInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      const taskContainer = document.querySelector(
        ".todo-list__task-creating-now"
      );
      const input = taskContainer.querySelector(".todo-list__input");

      if (input && !input.value) {
        taskContainer.remove();
        return;
      } else {
        taskContainer.remove();
        tasksStore.push(new Task(input.value));
        renderTasks();
      }
    }
  });

  // Добавляем элементы в контейнер с эелментами слева
  taskLeftContainer.append(checkBox, tasksInput);

  task.append(taskLeftContainer);

  // Добавляем контейнер с элементами слева в контейнер
  tasksContainer.prepend(task);

  // Вызываем метод фокус, чтобы курсор появился в инпуте, который мы только что добавили
  tasksInput.focus();
};

document.addEventListener("click", function (event) {
  const taskContainer = document.querySelector(".todo-list__task-creating-now");

  if (
    event.target.className === "todo-list__add-button" ||
    taskContainer.contains(event.target) ||
    addButton.contains(event.target)
  ) {
    return;
  }

  const input = taskContainer.querySelector(".todo-list__input");

  if (input && !input.value) {
    taskContainer.remove();
    return;
  } else {
    taskContainer.remove();
    tasksStore.push(new Task(input.value));
    renderTasks();
  }
});

function renderTasks() {
  const tasksContainer = document.querySelector(".todo-list__tasks-container");
  tasksContainer.innerHTML = "";

  tasksStore.forEach((task) => {
    // создаем конейнер для таски
    const taskContainer = document.createElement("div");
    taskContainer.className = "todo-list__task";
    taskContainer.id = task.id;

    // Создаем контейнер, который нам нужен для того, чтобы хранить в нем чекбокс, текст и дату
    const taskLeftContainer = document.createElement("div");
    taskLeftContainer.className = "todo-list__task-left-container";
    // Далее мы должны создать чекбокс, который мы засунем в таск контейнер
    const checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.className = "todo-list__checkbox";

    // Создаем параграф для того, чтобы добавить в него
    // текст который мы только что написали в инпуте
    const taskTitle = document.createElement("p");
    taskTitle.className = "todo-list__task-title";
    taskTitle.textContent = task.title;

    // Создаем элемент который будет хранить дату создания/обновления нашей таски
    const taskUpdatingDate = document.createElement("p");
    taskUpdatingDate.className = "todo-list__task-updating-date";
    taskUpdatingDate.textContent = new Date().toLocaleDateString();

    const taskRightContainer = document.createElement("div");
    taskRightContainer.className = "todo-list__task-right-container";

    const editButton = document.createElement("button");
    editButton.className = "todo-list__editButton";

    const deleteButton = document.createElement("button");
    deleteButton.className = "todo-list__deleteButton";

    deleteButton.onclick = (event) => {
      const taskContainer = event.target.closest(".todo-list__task");
      tasksStore = tasksStore.filter((task) => task.id !== taskContainer.id);
      renderTasks();
    };

    editButton.addEventListener("click", (event) => {
      const taskContainer = event.target.closest('.todo-list__task');
      const taskTitle = taskContainer.querySelector('.todo-list__task-title');
      const editInput = document.createElement("input");
      editInput.className = "todo-list__editInput";
      editInput.value = taskTitle.textContent;

      editInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
      const taskContainer = event.target.closest(".todo-list__task");
      const editInput = taskContainer.querySelector(".todo-list__editInput");

      if (!editInput.value) {
      taskContainer.remove();
      tasksStore = tasksStore.filter(
       (task) => task.id !== taskContainer.id
       );
       return;
      } else {
      const currentTask = tasksStore.find(
      (task) => task.id === taskContainer.id
      );
      currentTask.title = editInput.value;
      renderTasks();
      }
      }
      });

      taskRightContainer.remove();
      taskUpdatingDate.remove();
      taskTitle.remove();
      taskLeftContainer.append(editInput);
      editInput.focus();
    });

    const imageDeleteButton = document.createElement("img");
    imageDeleteButton.className = "todo-list__imageDeleteButton";
    imageDeleteButton.src =
      "../js_vanila_todo_list/assets/icons/DeleteIcon.svg";

    const imageEditButton = document.createElement("img");
    imageEditButton.className = "todo-list__imageEditButton";
    imageEditButton.src = "../js_vanila_todo_list/assets/icons/EditIcon.svg";

    editButton.append(imageEditButton);
    deleteButton.append(imageDeleteButton);
    taskRightContainer.append(editButton, deleteButton);
    taskLeftContainer.append(taskTitle, taskUpdatingDate);
    taskContainer.append(checkBox, taskLeftContainer, taskRightContainer);

    tasksContainer.prepend(taskContainer);
  });
}

renderTasks();

// 1. Создать правый контейнер
// 2. Создать две кнопки и засунуть в них картинки с иконками (и добавить стили)
// 3. поместить эти кнопки в правый контейнер
// 4. Добавить правый конейнер в taskContainer
// 5. Сделать стили так, чтобы соответствовало дизайнам
// 6. Реализовать функционал по удалению таски
// 7. Реализовать функционал по редактированию таски (хард левел)
