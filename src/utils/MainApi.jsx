class MainApiClass {
  constructor({ baseURL, headers }) {
    this._request = function (method, body) {
      return fetch(baseURL, {
        method: method,
        headers: headers,
        body: body,
      })
        .then(this._checkResponse);
    };

    this._checkResponse = (res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(res.status);
      }
    };
  }

  getIngredients() {
    return this._request(
      'GET',
    );
  }

}

const MainApi = new MainApiClass({
  baseURL: 'https://norma.nomoreparties.space/api/ingredients',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default MainApi;
