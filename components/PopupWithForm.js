import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".popup__form");
    // save handleFormSubmit to the this object
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    // move this to constructor: this._popupForm = this._popupElement.querySelector(".popup_form"); beacuse we dont want to do whats right below every time we call the getInput values function
    this._inputList = this._popupForm.querySelectorAll(".popup__input");

    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
      //TODO:
      // add a key/value pair to the values object for easch input
      // the key is input.name
      // the value is input.value
      //need to use brackets notation, not dot notation
      //just one line of code here that is needed to add keys to this values object
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      // call handleFormSubmit ( call it via the this object)
      //TODO: pass result of _getInputValues to submission handler
      this._handleFormSubmit(inputValues);
    });
  }
}
export default PopupWithForm;
