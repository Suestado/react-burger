class MainApiClass {
  constructor({ baseURL }) {
    this._baseHeaders = {
      'Content-Type': 'application/json',
    };

    this._checkResponse = (res) => {
      if (res.ok) {
        return res.json();
      } else {
        return res.json().then((err) => Promise.reject(err));
      }
    };

    this._checkSuccess = (res) => {
      if (res && res.success) {
        return res;
      } else {
        return res.json().then((err) => Promise.reject(err));
      }
    };

    this._request = function (endpoint, method, headers, body) {
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
    this._baseHeaders,
    JSON.stringify({
      ingredients,
    }),
  );

  registerUser = (name, email, password) => this._request(
    'auth/register',
    'POST',
    this._baseHeaders,
    JSON.stringify({
      name,
      email,
      password,
    }),
  )
    .then((res) => {
      localStorage.setItem('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      return res;
    });

  loginUser = (email, password) => this._request(
    'auth/login',
    'POST',
    this._baseHeaders,
    JSON.stringify({
      email,
      password,
    }),
  )
    .then((res) => {
      localStorage.setItem('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      return res;
    });

  checkAuth = (token) => this._request(
    'auth/user',
    'GET',
    {
      ...this._baseHeaders,
      authorization: token,
    },
  );

  refreshToken = (refreshToken) => this._request(
    'auth/user',
    'PATCH',
    this._baseHeaders,
    JSON.stringify({
      token: refreshToken,
    }),
  );

  forgotPassword = (email) => this._request(
    'password-reset',
    'POST',
    this._baseHeaders,
    JSON.stringify({
      email: email,
    }),
  );

  resetPassword = (password, token) => this._request(
    'password-reset/reset',
    'POST',
    this._baseHeaders,
    JSON.stringify({
      password: password,
      token: token,
    }),
  );

  updateUser = (name, email, password, token) => this._request(
    'auth/user',
    'PATCH',
    {
      ...this._baseHeaders,
      authorization: token,
    },
    password ?
      JSON.stringify({
        name,
        email,
        password,
      })
      :
      JSON.stringify({
        name,
        email,
      }),
  );

  logOut = (refreshToken) => this._request(
    'auth/logout',
    'POST',
    this._baseHeaders,
    JSON.stringify({
      token: refreshToken,
    }),
  );
}



const MainApi = new MainApiClass({
  baseURL: 'https://norma.nomoreparties.space/api/',
});

export default MainApi;
