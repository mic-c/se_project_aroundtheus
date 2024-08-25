export default class UserInfo {
  constructor(nameSelector, aboutSelector, avatarSelector) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent,
    };
  }

  setUserInfoOnSubmit(name, description) {
    this._name.textContent = name;
    this._description.textContent = description;
  }

  setUserInfo(name, about, avatar) {
    this._name.textContent = name;
    this._about.textContent = about;
    this._avatar.src = avatar;
  }

  setUserAvatar(avatarURl) {
    this._avatar.src = avatarURl;
  }
}
