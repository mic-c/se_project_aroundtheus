export default class Card {
  constructor(data, cardSelector, handleCardImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._handleCardImageClick = handleCardImageClick;

    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", () => this._handleLikeIcon());

    this._element
      .querySelector(".card__trash-button")
      .addEventListener("click", () => this._handleDeleteCard());

    this._element
      .querySelector(".card__image")
      .addEventListener("click", () =>
        this._handleCardImageClick(this._name, this._link)
      );
  }

  _handleLikeIcon() {
    this._element
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  getView() {
    this._element = this._getTemplate();

    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__image").alt = this._name;
    this._element.querySelector(".card__title").textContent = this._name;

    this._setEventListeners();
    return this._element;
  }
}
