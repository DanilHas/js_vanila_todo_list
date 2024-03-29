class Task {
  constructor(title) {
    this.id = Math.random().toString(36).slice(2);
    this.title = title;
    this.completed = false;
    this.date = new Date().toLocaleDateString();
  }
}

let tasksStore = [];

const filter = {
  start: null,
  end: null,
};

let filterArr = [];

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

const calendarButton = document.createElement("button");
calendarButton.className = "todo-list__calendar-button";

const calendarButtonText = document.createElement("p");
calendarButtonText.textContent = "Filter by date";
calendarButtonText.className = "todo-list__calendar-button-text";

const filterDate = document.createElement("p");
filterDate.className = "todo-list__filter-date";

const imageCalendarButton = document.createElement("img");
imageCalendarButton.className = "todo-list__image-calendar-button";
imageCalendarButton.src =
  "../js_vanila_todo_list/assets/icons/CalendarIcon.svg";

const leftTopContainer = document.createElement("div");
leftTopContainer.className = "todo-list__left-top-container";

addButton.append(imagePlus);
calendarButton.prepend(imageCalendarButton);
calendarButton.append(calendarButtonText, filterDate);
leftTopContainer.append(title, calendarButton);
topContainer.append(leftTopContainer, addButton);
mainContainer.append(topContainer, tasksContainer);
document.body.append(mainContainer);


let isActive = true;

addButton.onclick = function () {
  if (isActive) {
  const task = document.createElement("div");
  task.className = "todo-list__task todo-list__task-creating-now";

  const taskLeftContainer = document.createElement("div");
  taskLeftContainer.className = "todo-list__task-left-container";

  const checkBox = document.createElement("input");
  checkBox.setAttribute("type", "radio");
  checkBox.className = "todo-list__checkbox";

  const tasksInput = document.createElement("input");
  tasksInput.className = "todo-list__input";

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
        renderTasks(tasksStore);
        isActive = true;
      }
    }
  });

  taskLeftContainer.append(tasksInput);

  task.append(checkBox, taskLeftContainer);

  tasksContainer.prepend(task);

  tasksInput.focus();
  isActive = false;
}
};

document.addEventListener("click", function (event) {
  const createdTaskContainer = document.querySelector(
    ".todo-list__task-creating-now"
  );
  const editedTaskContainer = document.querySelector(
    ".todo-list__task-editing-now"
  );

  if (createdTaskContainer) {
    if (
      event.target.className === "todo-list__add-button" ||
      createdTaskContainer.contains(event.target) ||
      addButton.contains(event.target)
    ) {
      return;
    }

    const input = createdTaskContainer.querySelector(".todo-list__input");

    if (input && !input.value) {
      createdTaskContainer.remove();
      return;
    } else {
      createdTaskContainer.remove();
      tasksStore.push(new Task(input.value));
      renderTasks(tasksStore);
      isActive = true;
    }
  } else if (editedTaskContainer) {
    const editInput = editedTaskContainer.querySelector(
      ".todo-list__editInput"
    );

    if (
      event.target.className === "todo-list__task-editing-now" ||
      editInput.contains(event.target) ||
      event.target.className === "todo-list__editButton" ||
      event.target.className === "todo-list__imageEditButton"
    ) {
      return;
    }
    if (!editInput.value) {
      editedTaskContainer.remove();
      tasksStore = tasksStore.filter(
        (task) => task.id !== editedTaskContainer.id
      );
      return;
    } else {
      const currentTask = tasksStore.find(
        (task) => task.id === editedTaskContainer.id
      );
      currentTask.title = editInput.value;
      renderTasks(tasksStore);
    }
  }

  const calendarContainer = document.querySelector(
    ".todo-list__calendar-container"
  );
  const calendarButton = document.querySelector(".todo-list__calendar-button");
  if (calendarContainer) {
    if (
      calendarButton.contains(event.target) ||
      calendarContainer.contains(event.target) ||
      event.target.tagName === "TD"
    )
      return;
    else {
      calendarContainer.remove();
      filter.start = null;
      filter.end = null;
      const filterDate = document.querySelector(".todo-list__filter-date");
      filterDate.innerHTML = "";
      const calendarButtonText = document.querySelector(
        ".todo-list__calendar-button-text"
      );
      calendarButtonText.textContent = "Filter by date";
    }
  }
});

function createTaskCheckbox(checked) {
  const checkBox = document.createElement("input");
  checkBox.setAttribute("type", "radio");
  checkBox.className = "todo-list__checkbox";
  checkBox.checked = checked;
  checkBox.addEventListener("click", completeTask);
  return checkBox;
}

function renderTasks(arr) {
  const tasksContainer = document.querySelector(".todo-list__tasks-container");
  tasksContainer.innerHTML = "";

  arr.forEach((task) => {
    const taskContainer = document.createElement("div");
    taskContainer.className = "todo-list__task";
    taskContainer.id = task.id;

    if (task.completed) {
      taskContainer.classList.add("todo-list__task-completed");
    }
    const taskLeftContainer = document.createElement("div");
    taskLeftContainer.className = "todo-list__task-left-container";

    const checkBox = createTaskCheckbox(task.completed);

    const taskTitle = document.createElement("p");
    taskTitle.className = "todo-list__task-title";
    taskTitle.textContent = task.title;

    const taskUpdatingDate = document.createElement("p");
    taskUpdatingDate.className = "todo-list__task-updating-date";
    taskUpdatingDate.textContent = task.date;

    const taskRightContainer = document.createElement("div");
    taskRightContainer.className = "todo-list__task-right-container";

    const editButton = document.createElement("button");
    editButton.className = "todo-list__editButton";

    const deleteButton = document.createElement("button");
    deleteButton.className = "todo-list__deleteButton";

    deleteButton.onclick = (event) => {
      const taskContainer = event.target.closest(".todo-list__task");
      tasksStore = tasksStore.filter((task) => task.id !== taskContainer.id);
      saveInLocalStorage();
      renderTasks(tasksStore);
    };

    editButton.addEventListener("click", (event) => {
      const taskContainer = event.target.closest(".todo-list__task");
      const taskTitle = taskContainer.querySelector(".todo-list__task-title");
      const editInput = document.createElement("input");
      editInput.className = "todo-list__editInput";
      editInput.value = taskTitle.textContent;
      taskContainer.classList.add("todo-list__task-editing-now");

      editInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
          const taskContainer = event.target.closest(".todo-list__task");
          const editInput = taskContainer.querySelector(
            ".todo-list__editInput"
          );

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
            saveInLocalStorage();
            renderTasks(tasksStore);
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

    saveInLocalStorage();
  });
}

function completeTask(event) {
  const checkBox = event.target;
  const taskContainer = checkBox.closest(".todo-list__task");
  const taskIdx = tasksStore.findIndex((task) => task.id == taskContainer.id);

  if (taskIdx !== -1) {
    tasksStore[taskIdx].completed = !tasksStore[taskIdx].completed;
  }

  renderTasks(tasksStore);
}

function saveInLocalStorage() {
  localStorage.setItem("tasksStore", JSON.stringify(tasksStore));
}

function readFromLocalStorage() {
  tasksStore = JSON.parse(localStorage.getItem("tasksStore")) || [];
}

readFromLocalStorage();
renderTasks(tasksStore);

const calendarStore = {
  now: new Date(),
  offset: 0,
};

const createWeek = () =>
  Array.from(new Array(7), () => document.createElement("td"));
const createRow = () => document.createElement("tr");

const createCalendarDates = (year, month) =>
  [...Array(new Date(year, month + 1, 0).getDate()).keys()].reduce(
    (acc, element) => {
      const day = element + 1;
      const weekDay = new Date(year, month, day).getDay();
      const dayRemap = [6, 0, 1, 2, 3, 4, 5];
      if (day === 1 || weekDay === 1) {
        const row = createRow();
        const week = createWeek();
        row.append(...week);
        acc.push(row);
      }
      acc[acc.length - 1].children[dayRemap[weekDay]].textContent = day;

      const rangeCell = acc[acc.length - 1].children[dayRemap[weekDay]];
      const rangeDate = new Date(year, month, day);
      if (filter.start < rangeDate && filter.end > rangeDate) {
        rangeCell.classList.add("todo-list__range-cells");
      }

      const calendarBody = document.querySelector(".todo-list__calendar-body");
      if (calendarBody && filter.start !== null) {
        if (filter.start.getDate().toString() === rangeCell.textContent)
          rangeCell.className = "todo-list__filter-start-date";
        else if (filter.end.getDate().toString() === rangeCell.textContent)
          rangeCell.className = "todo-list__filter-end-date";
      }
      return acc;
    },
    []
  );

const createCalendarLayout = () => {
  const calendarContainer = document.createElement("div");
  calendarContainer.className = "todo-list__calendar-container";

  const calendarHeadContainer = document.createElement("div");
  calendarHeadContainer.className = "todo-list__calendar-head-container";

  const prevMonth = document.createElement("button");
  prevMonth.className = "todo-list__prev-month-button";
  const prevMonthArrowImage = document.createElement("img");
  prevMonthArrowImage.src =
    "../js_vanila_todo_list/assets/icons/prevMonthArrow.svg";

  const nextMonth = document.createElement("button");
  nextMonth.className = "todo-list__next-month-button";
  const nextMonthArrowImage = document.createElement("img");
  nextMonthArrowImage.src =
    "../js_vanila_todo_list/assets/icons/nextMonthArrow.svg";

  const monthSwitchContainer = document.createElement("div");
  monthSwitchContainer.className = "todo-list__month-switch-container";

  const calendar = document.createElement("table");
  calendar.className = "todo-list__calendar";

  const calendarTopContainer = document.createElement("thead");

  const daysString = document.createElement("tr");
  const monday = document.createElement("th");
  monday.textContent = "Mo";
  const tuesday = document.createElement("th");
  tuesday.textContent = "Tu";
  const wednesday = document.createElement("th");
  wednesday.textContent = "We";
  const thursday = document.createElement("th");
  thursday.textContent = "Th";
  const friday = document.createElement("th");
  friday.textContent = "Fr";
  const saturday = document.createElement("th");
  saturday.textContent = "Sa";
  const sunday = document.createElement("th");
  sunday.textContent = "Su";

  const applyButton = document.createElement("button");
  applyButton.textContent = "Apply";
  applyButton.className = "todo-list__calendar-apply-button";

  const calendarBody = document.createElement("tbody");
  calendarBody.className = "todo-list__calendar-body";

  nextMonth.addEventListener("click", () => {
    filter.start = null;
    filter.end = null;
    const filterDate = document.querySelector(".todo-list__filter-date");
    filterDate.textContent = "";
    calendarBody.innerHTML = "";
    calendarStore.offset += 1;
    calendarBody.append(
      ...createCalendarDates(
        calendarStore.now.getFullYear(),
        calendarStore.now.getMonth() + calendarStore.offset
      )
    );
    monthNow = document.querySelector(".todo-list__calendar-month-label");
    yearNow = document.querySelector(".todo-list__calendar-year-label");
    monthNow.remove();
    yearNow.remove();
    const nowDate = new Date();
    nowDate.setMonth(nowDate.getMonth() + calendarStore.offset);
    changeCalendarLabel(
      nowDate.getFullYear(),
      nowDate.toLocaleString("eng", { month: "long" })
    );
  });

  prevMonth.addEventListener("click", () => {
    filter.start = null;
    filter.end = null;
    const filterDate = document.querySelector(".todo-list__filter-date");
    filterDate.textContent = "";
    calendarBody.innerHTML = "";
    calendarStore.offset -= 1;
    calendarBody.append(
      ...createCalendarDates(
        calendarStore.now.getFullYear(),
        calendarStore.now.getMonth() + calendarStore.offset
      )
    );
    monthNow = document.querySelector(".todo-list__calendar-month-label");
    yearNow = document.querySelector(".todo-list__calendar-year-label");
    monthNow.remove();
    yearNow.remove();
    const nowDate = new Date();
    nowDate.setMonth(nowDate.getMonth() + calendarStore.offset);
    changeCalendarLabel(
      nowDate.getFullYear(),
      nowDate.toLocaleString("eng", { month: "long" })
    );
  });

  calendarBody.append(
    ...createCalendarDates(
      calendarStore.now.getFullYear(),
      calendarStore.now.getMonth()
    )
  );
  daysString.append(
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday
  );
  calendarTopContainer.append(daysString);
  calendar.append(calendarTopContainer, calendarBody);
  prevMonth.append(prevMonthArrowImage);
  nextMonth.append(nextMonthArrowImage);
  monthSwitchContainer.append(prevMonth, nextMonth);
  calendarHeadContainer.append(monthSwitchContainer);
  calendarContainer.append(calendarHeadContainer, calendar, applyButton);
  mainContainer.append(calendarContainer);
};

const changeCalendarLabel = (year, month) => {
  const monthNow = document.createElement("p");
  monthNow.textContent = month;
  monthNow.className = "todo-list__calendar-month-label";
  const yearNow = document.createElement("p");
  yearNow.textContent = year;
  yearNow.className = "todo-list__calendar-year-label";

  const calendarDateConteiner = document.createElement("div");
  calendarDateConteiner.className = "todo-list__calendar-date-container";

  const calendarHeadContainer = document.querySelector(
    ".todo-list__calendar-head-container"
  );
  calendarDateConteiner.append(monthNow, yearNow);
  calendarHeadContainer.prepend(calendarDateConteiner);
};

const createCalendarDateRange = () => {
  const calendarBody = document.querySelector(".todo-list__calendar-body");

  calendarBody.addEventListener("click", (event) => {
    const target = event.target;
    if (target.tagName !== "TD" || target.textContent === "") return;

    if (!filter.start) {
      filter.start = new Date(
        calendarStore.now.getFullYear(),
        calendarStore.now.getMonth() + calendarStore.offset,
        parseInt(target.textContent)
      );
      filter.end = new Date(
        calendarStore.now.getFullYear(),
        calendarStore.now.getMonth() + calendarStore.offset,
        parseInt(target.textContent) + 1,
        0,
        0 - 1
      );
    } else if (
      filter.start &&
      filter.start.getFullYear() === filter.end.getFullYear() &&
      filter.start.getMonth() === filter.end.getMonth() &&
      filter.start.getDate() === filter.end.getDate()
    ) {
      filter.end = new Date(
        calendarStore.now.getFullYear(),
        calendarStore.now.getMonth() + calendarStore.offset,
        parseInt(target.textContent)
      );
    }

    calendarBody.innerHTML = "";
    calendarBody.append(
      ...createCalendarDates(
        calendarStore.now.getFullYear(),
        calendarStore.now.getMonth() + calendarStore.offset
      )
    );

    if (
      filter.start.getFullYear() === filter.end.getFullYear() &&
      filter.start.getMonth() === filter.end.getMonth() &&
      filter.start.getDate() === filter.end.getDate()
    ) {
      calendarButtonText.textContent = "Filter by date:";
      filterDate.textContent = `${filter.start.toLocaleDateString()}`;
    } else {
      calendarButtonText.textContent = "Filter by date:";
      filterDate.textContent = `${filter.start.toLocaleDateString()} - ${filter.end.toLocaleDateString()}`;
    }
  });
};

const createFilterByDdate = () => {
  const applyButton = document.querySelector(
    ".todo-list__calendar-apply-button"
  );
  applyButton.addEventListener("click", () => {
    const calendarContainer = document.querySelector(
      ".todo-list__calendar-container"
    );
    if (filter.start === null) calendarContainer.remove();
    else
      filterArr = tasksStore.filter(
        (task) =>
          filter.start.toLocaleDateString() <= task.date &&
          filter.end.toLocaleDateString() >= task.date
      );
    renderTasks(filterArr);
    calendarContainer.remove();

    if (filter.start !== null) {
      const deleteFilterButton = document.createElement("button");
      deleteFilterButton.className = "todo-list__delete-filter-button";

      const calendarButton = document.querySelector(
        ".todo-list__calendar-button"
      );
      const imageDeleteFilterButton = document.createElement("img");
      imageDeleteFilterButton.src =
        "../js_vanila_todo_list/assets/icons/Cross.svg";
      imageDeleteFilterButton.className =
        "todo-list__image-delete-filter-button";

      deleteFilterButton.append(imageDeleteFilterButton);
      calendarButton.append(deleteFilterButton);

      deleteFilterByDate();
    }
  });
};

const deleteFilterByDate = () => {
  const deleteFilterButton = document.querySelector(
    ".todo-list__delete-filter-button"
  );
  const filterDate = document.querySelector(".todo-list__filter-date");
  deleteFilterButton.addEventListener("click", () => {
    filter.start = null;
    filter.end = null;
    renderTasks(tasksStore);
    deleteFilterButton.remove();
    filterDate.innerHTML = "";
    const calendarButtonText = document.querySelector(
      ".todo-list__calendar-button-text"
    );
    calendarButtonText.textContent = "Filter by date";
  });
};

let isCalendarContainerShow = false;
calendarButton.addEventListener("click", () => {
  const calendarContainer = document.querySelector(
    ".todo-list__calendar-container"
  );
  if (isCalendarContainerShow && calendarContainer) {
    calendarContainer.remove();
    filter.start = null;
    filter.end = null;
    const filterDate = document.querySelector(".todo-list__filter-date");
    filterDate.innerHTML = "";
    const calendarButtonText = document.querySelector(
      ".todo-list__calendar-button-text"
    );
    calendarButtonText.textContent = "Filter by date";
    isCalendarContainerShow = false;
  } else {
    createCalendarLayout();
    changeCalendarLabel(
      calendarStore.now.getFullYear(),
      calendarStore.now.toLocaleString("eng", { month: "long" })
    );
    createCalendarDateRange();
    createFilterByDdate();
    isCalendarContainerShow = true;
  }
});
