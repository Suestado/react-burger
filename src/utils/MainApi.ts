import { IngredientInterface } from "./commonTypes";

const baseURL = 'https://norma.nomoreparties.space/api/';
const baseHeaders = {
  'Content-Type': 'application/json',
};

const checkResponse = <T>(res: Response): Promise<T> => {
  if (res.ok) {
    return res.json();
  } else {
    return res.json().then((err) => Promise.reject(err));
  }
};

interface IcheckResponse {
  success: boolean,
};

type TcheckSuccess<T> = {
  success: boolean,
  json: () => Promise<any>
} & T

const checkSuccess = <T>(res: TcheckSuccess<T>): Promise<TcheckSuccess<T>> => {
  if (res && res.success) {
    console.log(res)
    return Promise.resolve(res);
  } else {
    return res.json().then((err) => Promise.reject(err));
  }
};

export const request = <T>(
  endpoint: string,
  method: string,
  headers?: { [key: string]: string; authorization?: any; },
  body?: string
): Promise<T> => {
  return fetch(`${baseURL}${endpoint}`, {
    method: method,
    headers: headers,
    body: body,
  })
    .then(res => checkResponse<T>(res))
    .then(res => checkSuccess<T>(res));
};


export const getIngredients = (): Promise<IngredientInterface> => request<IngredientInterface>('ingredients', 'GET');

interface IgetOrderNumber extends IcheckResponse {
  order: {
    number: number
  }
}

export const getOrderNumber = (ingredients: IngredientInterface[]): Promise<IgetOrderNumber> => request<IgetOrderNumber>(
  'orders',
  'POST',
  baseHeaders,
  JSON.stringify({
    ingredients,
  }),
);

interface UserInterface extends IcheckResponse {
  user: {
    email: string,
    name: string
  }
  accessToken: string,
  refreshToken: string,
}

export const registerUser = (name: string, email: string, password: string): Promise<UserInterface> => request<UserInterface>(
  'auth/register',
  'POST',
  baseHeaders,
  JSON.stringify({
    name,
    email,
    password,
  }),
)
  .then((res: UserInterface) => {
    localStorage.setItem('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res;
  });

export const loginUser = (email: string, password: string): Promise<UserInterface> => request<UserInterface>(
  'auth/login',
  'POST',
  baseHeaders,
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

interface IcheckAuth extends IcheckResponse {
  email: string,
  name: string,
}

export const checkAuth = (token: string): Promise<IcheckAuth> => request<IcheckAuth>(
  'auth/user',
  'GET',
  {
    ...baseHeaders,
    authorization: token,
  },
);

interface IrefreshToken extends IcheckResponse {
  accessToken: string,
  refreshToken: string,
}

export const refreshToken = (refreshToken: string): Promise<IrefreshToken> => request<IrefreshToken>(
  'auth/user',
  'PATCH',
  baseHeaders,
  JSON.stringify({
    token: refreshToken,
  }),
);

interface IforgotPassword extends IcheckResponse {
  message: string
}

export const forgotPassword = (email: string): Promise<IforgotPassword> => request<IforgotPassword>(
  'password-reset',
  'POST',
  baseHeaders,
  JSON.stringify({
    email: email,
  }),
);

interface IresetPassword extends IcheckResponse {
  message: string
}

export const resetPassword = (password: string, token: string): Promise<IresetPassword> => request<IresetPassword>(
  'password-reset/reset',
  'POST',
  baseHeaders,
  JSON.stringify({
    password: password,
    token: token,
  }),
);

interface IupdateUser extends IcheckResponse {
  email: string,
  name: string,
}

export const updateUser = (
  name: string,
  email: string,
  password: string,
  token: string,
): Promise<IupdateUser> => request<IupdateUser>(
  'auth/user',
  'PATCH',
  {
    ...baseHeaders,
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

interface IlogOut extends IcheckResponse {
  message: string
}

export const logOut = (refreshToken: string): Promise<IlogOut> => request<IlogOut>(
  'auth/logout',
  'POST',
  baseHeaders,
  JSON.stringify({
    token: refreshToken,
  }),
);

