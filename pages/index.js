console.log("INDEX JS IS RUNNING");
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";

import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";

import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

function handleDelete(completed) {
  if (completed) {
    todoCounter.updateCompleted(false);
  }

  todoCounter.updateTotal(false);
}

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
  return todo.getView();
};

const renderTodo = (item) => {
  const todoElement = generateTodo(item);
  section.addItem(todoElement);
};

const section = new Section({
  items: initialTodos,
  renderer: renderTodo,
  containerSelector: ".todos__list",
});

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    let date = "";

    if (inputValues.date) {
      date = new Date(inputValues.date);
      date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    }
    const values = {
      name: inputValues.name,
      date,
      completed: false,
      id: uuidv4(),
    };
    renderTodo(values);
    todoCounter.updateTotal(true);

    addTodoPopup.close();
    newTodoValidator.resetValidation();
  },
});
addTodoPopup.setEventListeners();

section.renderItems();

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});
