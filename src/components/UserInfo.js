export default class UserInfo {
  constructor(nameSelector, aboutSelector, avatar) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent,
    };
  }

  setUserInfo({ name, about }) {
    this._nameElement.textContent = name;
    this._aboutElement.textContent = about;
  }

  setUserAvatar(link) {
    this._avatar.src = link;
  }
}
