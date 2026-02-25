import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
//import
import FormValidator from "../components/FormValidator.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
// const todoTemplate = document.querySelector("#todo-template"); -> remove
const todosList = document.querySelector(".todos__list");

const counterText = document.querySelector(".counter__text");

const updateCounter = () => {
  const total = document.querySelectorAll(".todo").length;
  const completed = document.querySelectorAll(
    ".todo__completed:checked"
  ).length;
  counterText.textContent = `Showing ${completed} out of ${total} completed`;
};

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
  document.removeEventListener("keydown", handleEscClose);
};

const handleEscClose = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_visible");
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
};

const openModal = (modal) => {
  modal.classList.add("popup_visible");
  document.addEventListener("keydown", handleEscClose);
};

// The logic in this function should all be handled in the Todo class.
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", updateCounter);
  return todo.getView();
};

addTodoButton.addEventListener("click", () => {
  newTodoValidator.resetValidation();
  openModal(addTodoPopup);
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
});

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  // Create a date object and adjust for timezone
  let date = "";
  if (dateInput) {
    date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  }
  const values = {
    name,
    date,
    completed: false,
    id: uuidv4(),
  };
  const todo = generateTodo(values);
  todosList.append(todo);

  updateCounter();

  closeModal(addTodoPopup);

  newTodoValidator.resetValidation();
});

initialTodos.forEach((item) => {
  const todo = generateTodo(item);
  todosList.append(todo);
});

updateCounter();
