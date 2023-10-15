class MainApiClass {
  constructor({ baseURL, headers }) {
    this._checkResponse = (res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка ${res.status}`);
      }
    };

    this._checkSuccess = (res) => {
      if (res && res.success) {
        return res;
      }
      return Promise.reject(`Ответ не success: ${res}`);
    };

    this._request = function (endpoint, method, body) {
      return fetch(`${baseURL}${endpoint}`, {
        method: method,
        headers: headers,
        body: body,
      })
        .then(this._checkResponse)
        .then(this._checkSuccess);
    };
  }

  getIngredients = () => this._request('ingredients', 'GET');

  getOrderNumber = (ingredients) => this._request(
    'orders',
    'POST',
    JSON.stringify({
      'ingredients': ingredients,
    }));
}

const MainApi = new MainApiClass({
  baseURL: 'https://norma.nomoreparties.space/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default MainApi;
