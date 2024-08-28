import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector("form");
    this._submitButton = this._popupElement.querySelector(".modal__button");
    this._submitButtonText = this._submitButton.textContent;
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popupElement.querySelectorAll(".modal__input");
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  _setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name] || ""; // Handle missing values
    });
  }

  _setEventListeners() {
    this._popupForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const data = this._getInputValues();
      console.log("Form data:", data);
      this.renderLoading(true);
      try {
        await this._handleFormSubmission(data);
      } catch (error) {
        console.error("Form submission failed", error);
      } finally {
        this.renderLoading(false);
        this.reset();
      }
    });
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Saving...";
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  reset() {
    this._popupForm.reset();
    super.close();
  }
}
