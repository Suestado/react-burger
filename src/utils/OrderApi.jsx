class OrderApiClass {
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

  getOrderNumber(ingredients) {
    return this._request(
      'POST',
      JSON.stringify({
        'ingredients': ingredients,
      }),
    );
  }

}

const OrderApi = new OrderApiClass({
  baseURL: 'https://norma.nomoreparties.space/api/orders',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default OrderApi;
