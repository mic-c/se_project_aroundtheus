import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._submitButton = this._popupElement.querySelector(".modal__button");
    this._submitButtonText = this._submitButton.textContent;
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popupElement.querySelectorAll(".modal__input");
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => (inputValues[input.name] = input.value));
    return inputValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", this._handleSubmit);
    super.setEventListeners();
  }

  _handleSubmit = (evt) => {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
    this._popupForm.reset();
  };
}
