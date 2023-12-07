import { GET_INGREDIENTS, GET_INGREDIENTS_SUCCESS } from '../../../utils/constants';
import getIngredients from '../fullIngredientsListActions';
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock';
import { testIngredient } from './testData';

const configureMockStore = require('redux-mock-store').default;
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  it('creates FETCH_TODOS_SUCCESS when fetching todos has been done', () => {
    fetchMock.getOnce('https://norma.nomoreparties.space/api/ingredients', {
      fullIngredientList: [testIngredient],
    })

    const expectedActions = [
      { type: GET_INGREDIENTS },
      { type: GET_INGREDIENTS_SUCCESS, fullIngredientList: [testIngredient] }
    ]
    const store = mockStore({ fullIngredientList: [] })

    return store.dispatch(getIngredients()).then(() => {
// Возвращаем асинхронный экшен
      expect(store.getActions()).toEqual(expectedActions)
    })

  })
})
