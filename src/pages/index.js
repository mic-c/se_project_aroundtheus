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
const user = new UserInfo(
  ".profile__title",
  ".profile__description",
  ".profile__avatar"
);

/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */

//Edit Profile//
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditForm = document.forms["profile-edit-form"];
const profileEditBtn = document.querySelector("#profile-edit-button");
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

const renderCard = (cardData) => {
  const card = createCard(cardData);
  section.addItem(card);
};

/* -------------------------------------------------------------------------- */
/*                                  Popups                                    */
/* -------------------------------------------------------------------------- */
//Edit Profile Popup //
const editProfilePopup = new PopupWithForm(
  "#profile-edit-modal",
  (profileData) => {
    editProfilePopup.renderLoading(true);

    api
      .editProfile(profileData.title, profileData.subheader)
      .then((updatedUserInfo) => {
        user.setUserInfo(updatedUserInfo.name, updatedUserInfo.about);
        editProfilePopup.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        editProfilePopup.renderLoading(false);
      });
  }
);
editProfilePopup.setEventListeners();

//Add New Card Popup //
const newCardPopup = new PopupWithForm("#add-card-modal", (newCardData) => {
  newCardPopup.renderLoading(true);

  api
    .addNewCard({ name: newCardData.title, link: newCardData.url })
    .then((cardData) => {
      renderCard(cardData);
      newCardPopup.close();
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

//Section //
const section = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  ".cards__list"
);
section.renderItems();

// Edit Avatar Popup //
const avatarEditPopup = new PopupWithForm(
  "#profile-avatar-modal",
  (formData) => {
    avatarEditPopup.renderLoading(true);

    api
      .updateAvatar(formData.link)
      .then((res) => {
        user.changeAvatar(res.avatar);
        avatarEditPopup.close();
      })
      .catch((err) => console.log("Error updating avatar:", err))
      .finally(() => {
        avatarEditPopup.renderLoading(false);
      });
  }
);
avatarEditPopup.setEventListeners();

const deleteConfirm = new PopupWithConfirm("#delete__modal");
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
  user.setUserInfo(name, description);
  profileEditPopup.close();
}

function handleAddCardSubmit(newCardData, cardListElement) {
  const name = newCardData.title;
  const alt = newCardData.title;
  const link = newCardData.url;
  renderCard({ name, alt, link });
  newCardPopup.close();
}

function createCard(cardData) {
  return new Card(cardData, "#card-template", handleImageClick).getView();
}

const cardSection = new Section(
  {
    renderer: (item) => {
      cardSection.addItem(makeCard(item));
    },
  },
  ".cards"
);

// Handle card delete //
function handleDelete(card) {
  confirmation.open();
  confirmation.setConfirmSubmit(() => {
    api
      .deleteCard(card._id)
      .then(() => {
        confirmation.close();
        card.handleDeleteCard();
      })
      .catch(console.error);
  });
}

// Handle Like click //
function handleLikeCard(card) {
  if (card._isLiked) {
    api
      .removeLike(card._id)
      .then((res) => {
        card.updateIsLiked(res.isLiked);
      })
      .catch((err) => console.log(err));
  } else {
    api
      .addLike(card._id)
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
  const userInput = user.getUserInfo();
  profileEditPopup.setInputValues({
    title: userInput.name,
    description: userInput.about,
  });
  profileEditPopup.open();
});

//New Card Form //
addCardBtn.addEventListener("click", () => {
  newCardPopup.open();
  addCardFormValidator._toggleButtonState();
});

// Delete Card Form //
const confirmation = new PopupDelete({
  popupSelector: "#delete-card-modal",
});
confirmation.setEventListeners();

// Avatar Edit Form //
avatarEditBtn.addEventListener("click", () => {
  avatarEditPopup.open();
  avatarFormValidator.toggleButtonState();
});
/* -------------------------------------------------------------------------- */
/*                               Rendering                                 */
/* -------------------------------------------------------------------------- */

// API Calls
api
  .getProfile()
  .then((currentUser) => {
    console.log("Current user ID:", currentUser._id);
  })
  .catch((err) => {
    console.error("Failed to load user information:", err);
  });

api
  .getCards()
  .then((cardData) => {
    console.log("Fetched cards:", cardData);
    cardData.forEach((cardItem) => {
      const cardElement = createCard(cardItem);
      cardSection.addItem(cardElement);
    });
  })
  .catch((err) => {
    console.error("Error fetching initial cards", err);
  });

/* -------------------------------------------------------------------------- */
/*                               Validation                                 */
/* -------------------------------------------------------------------------- */
const addCardFormValidator = new FormValidator(config, addCardForm);
addCardFormValidator.enableValidation();
const profileEditFormValidator = new FormValidator(config, profileEditForm);
profileEditFormValidator.enableValidation();
