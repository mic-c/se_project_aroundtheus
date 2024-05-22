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

//*   Functions    *//
function openPopup(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", escapeKeyListener);
  modal.addEventListener("mousedown", handleOverlay);
  //modal.querySelector(".modal__close").addEventListener("click", () => {
  //closePopup(imagePreviewModal);
  // });
}

function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", escapeKeyListener);
  modal.removeEventListener("mousedown", handleOverlay);
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

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  const deleteButton = cardElement.querySelector(".card__trash-button");
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImage.addEventListener("click", handleCardImageClick);

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

//*   Image Preview Listeners   *//
function handleCardImageClick(event) {
  if (event.target.classList.contains("card__image")) {
    const cardImage = event.target;
    const cardTitle = cardImage.closest(".card").querySelector(".card__title");
    imagePreviewModal.querySelector("#preview-image").src = cardImage.src;
    imagePreviewModal.querySelector("#preview-image").alt =
      cardTitle.textContent;
    imagePreviewModal.querySelector(".modal__image_title").textContent =
      cardTitle.textContent;
    openPopup(imagePreviewModal);
  }
}
