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

/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */

//Edit Profile
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditForm = document.forms["profile-edit-form"];
const profileEditBtn = document.querySelector("#profile-edit-button");
const profileTitleInput = profileEditModal.querySelector(
  "#profile-title-input"
);
const profileDescriptionInput = profileEditModal.querySelector(
  "#profile-description-input"
);

//Add New Card
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
//Edit Profile Popup
const editProfilePopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
editProfilePopup.setEventListeners();

//Add New Card Popup
const newCardPopup = new PopupWithForm("#add-card-modal", handleAddCardSubmit);
newCardPopup.setEventListeners();

//Preview Image Popup
const previewImagePopup = new PopupWithImage("#modal__image-preview");
previewImagePopup.setEventListeners();

//Section
const section = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  ".cards__list"
);
section.renderItems();

//UserInfo
const user = new UserInfo(
  ".profile__title",
  ".profile__description",
  ".profile__image"
);

//Constructor body
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "2e9b8c64-af02-41c6-9bfd-4754c20777e9",
    "Content-type": "application/json",
  },
});

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
  editProfilePopup.close();
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
/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */
//Edit Profile Form
profileEditBtn.addEventListener("click", () => {
  const userInput = user.getUserInfo();
  editProfilePopup.setInputValues({
    title: userInput.name,
    description: userInput.about,
  });
  editProfilePopup.open();
});

//New Card Form
addCardBtn.addEventListener("click", () => {
  newCardPopup.open();
  //addCardFormValidator._toggleButtonState();//
});

/* -------------------------------------------------------------------------- */
/*                               Rendering                                 */
/* -------------------------------------------------------------------------- */
api
  .getInitialCards()
  .then((data) => {
    cardSection.renderItems(data);
  })
  .catch((err) => {
    console.error(err);
  });

api.getUserInfo().then((info) => {
  console.log(info);
  user.setUserInfo(info.name, info.about, info.avatar);
});

/* -------------------------------------------------------------------------- */
/*                               Validation                                 */
/* -------------------------------------------------------------------------- */
const addCardFormValidator = new FormValidator(config, addCardForm);
addCardFormValidator.enableValidation();
const profileEditFormValidator = new FormValidator(config, profileEditForm);
profileEditFormValidator.enableValidation();
