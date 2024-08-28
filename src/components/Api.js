export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) return res.json();
    return Promise.reject(`Error: ${res.status} + ${res.message}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  // Get Current User Info
  getProfile() {
    return fetch(this._baseUrl + "/users/me", {
      method: "GET",
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // Update Profile Info
  patchProfileInfo(nameVar, bioVar) {
    return fetch(this._baseUrl + "/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: nameVar,
        about: bioVar,
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // Update Avatar
  patchProfileAvatar(link) {
    return fetch(this._baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // Get Initial Cards
  getCards() {
    return fetch(this._baseUrl + "/cards", {
      method: "GET",
      headers: this._headers,
    })
      .then(this._checkResponse)
      .then((result) => {
        return result;
      });
  }
  // Create Card (POST)
  postCards(card) {
    return fetch(this._baseUrl + "/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: card.modal__input_type_title,
        link: card.modal__input_type_link,
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.error("POST Card Error:", err);
      });
  }

  // Delete Card
  deleteCard(cardID) {
    return fetch(`${this._baseUrl}/cards/${cardID}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res
          .text()
          .then((text) => Promise.reject(`Error: ${res.status} - ${text}`));
      })
      .then((result) => {
        console.log(result);
      });
  }

  // Like the Card (PUT)
  putCardLike(cardID) {
    return fetch(this._baseUrl + `/cards/${cardID}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  // Dislike Card (DELETE)
  deleteCardLike(cardID) {
    return fetch(this._baseUrl + `/cards/${cardID}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(`Error: ${res.status}`);
    });
  }
}
