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
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addCardFormElement = addCardModal.querySelector(".modal__form");
const cardTitleInput = addCardFormElement.querySelector("#profile-title-input");
const cardUrlInput = addCardFormElement.querySelector("#profile-url-input");
const profileFormElement = profileEditModal.querySelector(".modal__form");
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const imagePreviewModal = document.querySelector("#modal__image-preview");
const cardListEl = document.querySelector(".cards__list");

function handleCloseClick() {
  closePopup();
}

//*   Functions    *//
function openPopup(modal) {
  modal.classList.add("modal_opened");
  modal
    .querySelector(".modal__close")
    .addEventListener("click", handleCloseClick);
}

function closePopup() {
  const modal = document.querySelector(".modal_opened");

  modal
    .querySelector(".modal__close")
    .removeEventListener("click", handleCloseClick);

  modal.classList.remove("modal_opened");
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
  closePopup(addCardModal);
}

//*    Event Listeners    *//
profileEditButton.addEventListener("click", () => openPopup(profileEditModal));
profileTitleInput.value = profileTitle.textContent;
profileDescriptionInput.value = profileDescription.textContent;
profileEditCloseButton.addEventListener("click", () =>
  closePopup(profileEditModal)
);

const cardsWrap = document.querySelector(".cards__list");

//*  Form Listeners    *//
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);
profileFormElement.addEventListener("submit", handleAddCardFormSubmit);

//*  Form data   *//
const nameInput = profileFormElement.querySelector(".profile__title");

//*  Task 1. Rendering Cards   *//
initialCards.forEach((cardData) => cardsWrap.prepend(getCardElement(cardData)));

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  return cardElement;
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  cardsWrap.prepend(cardElement);
}

//*  add new card button  *//
addNewCardButton.addEventListener("click", () => openPopup(addCardModal));
addCardModalCloseButton.addEventListener("click", () =>
  closePopup(addCardModal)
);
const likeButtons = document.querySelectorAll(".card__like-button");
likeButtons.forEach((likeButtons) => {});

function handleCardImageClick(event) {
  if (event.target.classList.contains("card__image")) {
    const cardImage = event.target;
    const cardTitle = cardImage.closest(".card").querySelector(".card__title");

    imagePreviewModal.querySelector("#preview-image").src = cardImage.src;
    imagePreviewModal.querySelector(".modal__image_title").textContent =
      cardImage.textContent;
    openPopup(imagePreviewModal);
  }
}

//*   Image Preview Listeners   *//
cardListEl.addEventListener("click", handleCardImageClick);
// imagePreviewCloseButton.addEventListener("click", () =>
//   closeModal(imagePreviewModal)
// );
// const deleteButton = cardImage.querySelector(".card__delete-button");
// deleteButton.addEventListener("click", () => {
//   cardImage.remove();
// });
