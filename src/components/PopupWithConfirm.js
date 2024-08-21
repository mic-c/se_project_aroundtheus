import Popup from "./Popup";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._confirmBtn = this._popupElement.querySelector(".modal__button");
  }

  handleFormSubmit(submit) {
    this._handleFormSubmit = submit;
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmBtn.addEventListener("click", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this);
    });
  }
}
