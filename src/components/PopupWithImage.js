import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._previewImagepopup = this._popupElement.querySelector(
      ".modal__image-preview"
    );
    this._previewImageTitle = this._popupElement.querySelector(
      ".modal__image_title"
    );
  }

  open(name, link) {
    this._previewImageTitle.textContent = name;
    this._previewImagepopup.src = link;
    this._previewImagepopup.alt = name;

    super.open();
  }
}
