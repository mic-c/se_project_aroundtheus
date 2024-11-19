import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import "../pages/index.css";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, config } from "../utils/constants.js";
import Api from "../components/Api.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";

//API//
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "2e9b8c64-af02-41c6-9bfd-4754c20777e9",
    "Content-type": "application/json",
  },
});

//UserInfo//
const userInfo = new UserInfo(
  ".profile__title",
  ".profile__description",
  ".profile__image"
);

/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */

//Edit Profile//
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditForm = document.forms["profile-edit-form"];
const profileEditBtn = document.querySelector("#profile-edit-button");
const modalInputTitle = document.querySelector("#profile-edit-modal");
const profileTitleInput = profileEditModal.querySelector(
  "#profile-title-input"
);
const profileDescriptionInput = profileEditModal.querySelector(
  "#profile-description-input"
);

//Add New Card //
const addCardModal = document.querySelector("#add-card-modal");
const addCardForm = document.forms["add-card-form"];
const addCardBtn = document.querySelector(".profile__add-button");

function renderCard(cardData) {
  const cardElement = createCard(cardData);
  cardSection.addItem(cardElement);
}

/* -------------------------------------------------------------------------- */
/*                                  Popups                                    */
/* -------------------------------------------------------------------------- */
//Edit Profile Popup //
const editProfilePopup = new PopupWithForm(
  "#profile-edit-modal",
  (profileData) => {
    handleProfileEditSubmit;
    editProfilePopup.renderLoading(true);

    api
      .updateProfileInfo(profileData.title, profileData.description)
      .then((updatedUserInfo) => {
        userInfo.setUserInfo(updatedUserInfo);
        editProfilePopup.close();
      })
      .catch(console.error)
      .finally(() => {
        editProfilePopup.renderLoading(false);
      });
  }
);
editProfilePopup.setEventListeners();

//Add New Card Popup //
const newCardPopup = new PopupWithForm("#add-card-modal", ({ title, url }) => {
  handleAddCardSubmit;
  newCardPopup.renderLoading(true);

  api
    .addCard({ name: title, link: url })
    .then((cardData) => {
      const cardElement = createCard(cardData);
      cardSection.addItem(cardElement);
      newCardPopup.close();
      addCardForm.reset();
      addCardFormValidator.enableValidation();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      newCardPopup.renderLoading(false);
    });
});
newCardPopup.setEventListeners();

//Preview Image Popup //
const previewImagePopup = new PopupWithImage("#modal__image-preview");
previewImagePopup.setEventListeners();

// Edit Avatar Popup //

const avatarEditPopup = new PopupWithForm(
  "#profile-avatar-modal",
  (avatarData) => {
    avatarEditPopup.renderLoading(true);
    api
      .updateAvatar(avatarData.url)
      .then((res) => {
        userInfo.updateAvatar(res);
        avatarEditPopup.close();
        //avatarFormValidator.disableButton();
      })
      .catch(console.error)
      .finally(() => {
        avatarEditPopup.renderLoading(false);
      });
  }
);
avatarEditPopup.setEventListeners();

const deleteConfirm = new PopupWithConfirm("#delete__modal", handleDelete);
deleteConfirm.setEventListeners();

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */
function handleImageClick(name, link) {
  previewImagePopup.open(name, link);
}

function handleProfileEditSubmit(profileData) {
  const name = profileData.title;
  const description = profileData.description;
  user.setUserInfo({ name: name, about: description });
  profileEditPopup.close();
}

function handleAddCardSubmit(newCardData, cardListElement) {
  const name = newCardData.title;
  const alt = newCardData.title;
  const link = newCardData.url;
  renderCard({ name, alt, link });
  newCardPopup.close();
}

function handleCardDeleteClick(id) {
  deleteConfirm.open(id);
}

function createCard(cardData) {
  return new Card(
    cardData,
    "#card-template",
    handleImageClick,
    handleCardLike,
    handleDelete
  ).getView();
}

const cardSection = new Section(
  {
    renderer: (item) => {
      cardSection.addItem(makeCard(item));
    },
  },
  ".cards__list"
);

// Handle card delete //
function handleDelete(card) {
  deleteConfirm.open();
  deleteConfirm.setSubmitAction(() => {
    deleteConfirm.renderLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        card.removeCard();
        deleteConfirm.close();
      })
      .catch(console.error);
  });
}

// Handle Like click //
function handleCardLike(card) {
  if (card._isLiked) {
    api
      .disLikeCard(card._id)
      .then((res) => {
        card.updateIsLiked(res.isLiked);
      })
      .catch((err) => console.log(err));
  } else {
    api
      .likeCard(card._id)
      .then((res) => {
        card.updateIsLiked(res.isLiked);
      })
      .catch(console.error);
  }
}
/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */
//Edit Profile Form //
profileEditBtn.addEventListener("click", () => {
  const cardData = userInfo.getUserInfo();

  profileTitleInput.value = cardData.name;
  profileDescriptionInput.value = cardData.about;
  editProfilePopup.open();
});

//New Card Form //
addCardBtn.addEventListener("click", () => {
  newCardPopup.open();
});

// Avatar Edit Form //
const avatarEditBtn = document.querySelector(".profile__image_edit-pencil");
const avatarForm = document.forms["edit-avatar-form"];

avatarEditBtn.addEventListener("click", () => {
  avatarEditPopup.open();
});

const profileImage = document.querySelector(".profile__image");

profileImage.addEventListener("click", () => {
  const cardData = userInfo.getUserInfo();

  profileTitleInput.value = cardData.name;
  profileDescriptionInput.value = cardData.about;
  avatarEditPopup.open();
});
/* -------------------------------------------------------------------------- */
/*                               Rendering                                 */
/* -------------------------------------------------------------------------- */

// API Calls

api
  .getInitialCards()
  .then((cardData) => {
    cardData.forEach((cardItem) => {
      const cardElement = createCard(cardItem);
      cardSection.addItem(cardElement);
    });
  })
  .catch((err) => {
    console.error("Error fetching initial cards", err);
  });

api
  .getUserInfo()
  .then((data) => {
    userInfo.updateAvatar(data);
    userInfo.setUserInfo(data);
  })
  .catch(console.error);
/* -------------------------------------------------------------------------- */
/*                               Validation                                 */
/* -------------------------------------------------------------------------- */
const addCardFormValidator = new FormValidator(config, addCardForm);
addCardFormValidator.enableValidation();
const profileEditFormValidator = new FormValidator(config, profileEditForm);
profileEditFormValidator.enableValidation();
const avatarFormValidator = new FormValidator(config, avatarForm);
avatarFormValidator.enableValidation();
