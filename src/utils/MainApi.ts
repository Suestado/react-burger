import { IngredientInterface } from "./commonTypes";

const baseURL = 'https://norma.nomoreparties.space/api/';
const baseHeaders = {
  'Content-Type': 'application/json',
};

const checkResponse = <T>(res: Response): Promise<TcheckSuccess<T>> => {
  if (res.ok) {
    return res.json();
  } else {
    return res.json().then((err) => Promise.reject(err));
  }
};

interface IcheckResponse {
  success: boolean,
}

type TcheckSuccess<T> = {
  success: boolean,
  json: () => Promise<any>
} & T

const checkSuccess = <T>(res: TcheckSuccess<T>): Promise<TcheckSuccess<T>> => {
  if (res && res.success) {
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

interface IgetIngredients extends IcheckResponse {
  data: IngredientInterface[]
}

export const getIngredients = (): Promise<IgetIngredients> => request<IgetIngredients>('ingredients', 'GET');

interface IgetOrderNumber extends IcheckResponse {
  order: {
    number: number;
  }
  name: string;
}

export const getOrderNumber = (ingredients: string[]): Promise<IgetOrderNumber> => request<IgetOrderNumber>(
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
  user: {
    email: string,
    name: string,
  }
}

export const checkAuth = (token: string | null): Promise<IcheckAuth> => {
  if (!token) return Promise.reject("Токен не найден в хранилище")

  return request<IcheckAuth>(
    'auth/user',
    'GET',
    {
      ...baseHeaders,
      authorization: token,
    },
  )
};

interface IrefreshToken extends IcheckResponse {
  accessToken: string,
  refreshToken: string,
}

export const refreshToken = (refreshToken: string | null): Promise<IrefreshToken> => {
  if (!refreshToken) return Promise.reject("Токен не найден в хранилище")

  return request<IrefreshToken>(
    'auth/user',
    'PATCH',
    baseHeaders,
    JSON.stringify({
      token: refreshToken,
    }),
  )
};

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
  user: {
    email: string,
    name: string,
  }
}

export const updateUser = (
  name: string,
  email: string,
  password: string,
  token: string | null,
): Promise<IupdateUser> => {
  if (!token) return Promise.reject("Токен не найден в хранилище")

  return request<IupdateUser>(
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
  )
};

interface IlogOut extends IcheckResponse {
  message: string
}

export const logOut = (refreshToken: string | null): Promise<IlogOut> => {
  if (!refreshToken) return Promise.reject("Токен не найден в хранилище")

  return request<IlogOut>(
    'auth/logout',
    'POST',
    baseHeaders,
    JSON.stringify({
      token: refreshToken,
    }),
  )
};

