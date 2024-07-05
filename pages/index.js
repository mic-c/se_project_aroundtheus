import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

//*    Elements    *//
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const profileEditCloseButton = profileEditModal.querySelector(".modal__close");
const addCardModalCloseButton = addCardModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const addNewCardButton = document.querySelector(".profile__add-button");
const addCardFormElement = addCardModal.querySelector(".modal__form");
const cardTitleInput = addCardFormElement.querySelector("#card-title-input");
const cardUrlInput = addCardFormElement.querySelector("#card-url-input");
const profileFormElement = profileEditModal.querySelector(".modal__form");
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const imagePreviewModal = document.querySelector("#modal__image-preview");
const cardListEl = document.querySelector(".cards__list");
const previewModalPictureEl = document.querySelector(".modal__image-preview");
const previewModalTitleEl = document.querySelector(".modal__image_title");
//*   Functions    *//
//function escapeKeyListener(evt) {
// closePopup(imagePreviewModal);
//}

function closePopupClick(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}

function openPopup(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", escapeKeyListener);
  modal.addEventListener("mousedown", handleOverlay);
  modal
    .querySelector(".modal__close")
    .addEventListener("click", escapeKeyListener);
}

function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", escapeKeyListener);
  modal.removeEventListener("mousedown", handleOverlay);
  modal
    .querySelector(".modal__close")
    .removeEventListener("click", escapeKeyListener);
}

function escapeKeyListener(evt) {
  if (evt.key === "Escape") {
    const openModal = document.querySelector(".modal_opened");
    closePopup(openModal);
  }
}

function handleOverlay(evt) {
  if (Array.from(evt.target.classList).includes("modal_opened")) {
    closePopup(evt.target);
  }
}

//*   Event Handlers   *//
function handleProfileFormSubmit(event) {
  event.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleAddCardFormSubmit(event) {
  event.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardsWrap);
  addCardFormElement.reset();
  closePopup(addCardModal);
  addFormValidator.toggleButtonState();
}

//*    Event Listeners    *//
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditModal);
});
profileEditCloseButton.addEventListener("click", () =>
  closePopup(profileEditModal)
);

const cardsWrap = document.querySelector(".cards__list");

//*  Form Listeners    *//
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);
profileFormElement.addEventListener("submit", handleProfileFormSubmit);

//*  Form data   *//
const nameInput = profileFormElement.querySelector(".profile__title");

//*  Task 1. Rendering Cards   *//
initialCards.forEach((cardData) => cardsWrap.prepend(getCardElement(cardData)));

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  cardsWrap.prepend(cardElement);
}

function getCardElement(cardData) {
  const card = new Card(cardData, "#card-template", handleCardImageClick);
  return card.getView();
}

function handleCardImageClick(name, link) {
  previewModalPictureEl.src = link;
  previewModalPictureEl.alt = name;
  previewModalTitleEl.textContent = name;
  openPopup(imagePreviewModal);
}

//*  add new card button  *//
addNewCardButton.addEventListener("click", () => openPopup(addCardModal));
addCardModalCloseButton.addEventListener("click", () =>
  closePopup(addCardModal)
);

//*   Image Preview Listeners   *//

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

// Validation //
const editFormEl = profileEditModal.querySelector(".modal__form");
const addFormEl = addCardModal.querySelector(".modal__form");
const addFormValidator = new FormValidator(config, addFormEl);
addFormValidator.enableValidation();
const editFormValidator = new FormValidator(config, editFormEl);
editFormValidator.enableValidation();
