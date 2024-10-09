import Popup from "./Popup";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector("modal__close-button");
    this._confirmBtn = this._popupElement.querySelector(
      ".modal__popup__button"
    );
    this._handleFormSubmit = handleFormSubmit;
  }

  open(id) {
    this._id = id;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmBtn.addEventListener("click", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._id);
    });
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._popupForm.textContent = "Delete...";
    } else {
      this._popupForm.textContent = "Yes";
    }
  }
}
