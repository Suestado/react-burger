import { GET_INGREDIENTS, GET_INGREDIENTS_SUCCESS } from '../../../utils/constants';
import getIngredients from '../fullIngredientsListActions';
import thunk from 'redux-thunk';
import { testIngredient } from './testData';

// можно импортировать конфигуратор import configureMockStore from 'redux-mock-store',
// но тогда светится ошибка, хоть и работает
const configureMockStore = require('redux-mock-store').default;
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions for fullIngredientsListActions', () => {
  //Перед созданием fetch эмулируем его поведение и мокаем ответ
  beforeEach(() => {
    //отлавливает все fetch запросы на глобальном уровне и мокает ответ для корректной проверки на уровне MainApi
    jest.spyOn(global, 'fetch').mockResolvedValue({
      //в первую проверку должен попасть объект с статусом OK и эмуляцийе функции res.json(), которая возвращает json ответа.
      json: jest.fn().mockResolvedValue(
        { result: 'OK' },
      ),
      ok: true,
    });
  });
  // сбрасываем настройки после каждого fetch запроса
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('creates GET_INGREDIENTS_SUCCESS when fetching has been done', () => {
    // делаем fetch запрос и мокаем ответ.
    // так как res.json() возвращает промис, эмулируем это поведение, создавая элемент с ключем json,
    // который является функцией, возвращающей промис.
    fetch.mockImplementationOnce(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ success: true, data: [testIngredient] }),
    }));

    const expectedActions = [
      { type: GET_INGREDIENTS },
      { type: GET_INGREDIENTS_SUCCESS, fullIngredientList: [testIngredient] },
    ];
    const store = mockStore({ fullIngredientList: [] });

    return store.dispatch(getIngredients()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
