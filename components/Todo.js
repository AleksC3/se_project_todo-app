class Todo {
  constructor(data, selector, handleUpdateCounter) {
    this._data = data;
    this._templateElement = document.querySelector(selector);

    this._handleUpdateCounter = handleUpdateCounter;
  }
  _setEventListeners() {
    this._todoCheckboxEl.addEventListener("change", () => {
      this._data.completed = this._todoCheckboxEl.checked;
      this._handleUpdateCounter();
    });

    this._todoDeleteBtn.addEventListener("click", () => {
      this._todoElement.remove();

      this._handleUpdateCounter();
    });
  }
  _generateCheckboxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");

    this._todoCheckboxEl.checked = this._data.completed;

    if (this._data.id) {
      this._todoCheckboxEl.id = `todo-${this._data.id}`;
      this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
    }
  }

  _setData() {
    this._todoNameEl.textContent = this._data.name;

    const dueDate = new Date(this._data.date);

    if (this._data.date && !isNaN(dueDate)) {
      this._todoDateEl.textContent =
        "Due: " + dueDate.toLocaleDateString("en-US");
    } else {
      this._todoDateEl.textContent = "";
    }
  }

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);
    this._todoNameEl = this._todoElement.querySelector(".todo__name");

    this._todoDateEl = this._todoElement.querySelector(".todo__date");
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

    this._generateCheckboxEl();
    this._setData();
    this._setEventListeners();

    return this._todoElement;
  }
}

export default Todo;
