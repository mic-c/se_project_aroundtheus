export default class Card {
  constructor(
    data,
    cardSelector,
    handleCardImageClick,
    handleCardDelete,
    handleCardLike
  ) {
    this._name = data.name;
    this._link = data.link;
    this.isLiked = data.isLiked;
    this._id = data._id;
    this._handleCardImageClick = handleCardImageClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;

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
      .addEventListener("click", () => this._handleCardDelete(this));

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

  getView() {
    this._element = this._getTemplate();
    this._createCard();

    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__image").alt = this._name;
    this._element.querySelector(".card__title").textContent = this._name;

    this._setEventListeners();
    return this._element;
  }

  //method to create card
  _createCard() {
    const cardImageElement = this._element.querySelector(".card__image");
    const cardTitleElement = this._element.querySelector(".card__title");

    this._updateLikeStatus();
  }

  //method to handle card like and unlike in DOM
  _updateLikeStatus() {
    if (this.like) {
      this._element
        .querySelector(".card__like-button")
        .classList.add("card__like-button_active");
    } else {
      this._element
        .querySelector(".card__like-button")
        .classList.remove("card__like-button_active");
    }
  }
}
