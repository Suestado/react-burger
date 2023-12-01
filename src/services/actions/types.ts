import { ThunkDispatch } from 'redux-thunk';
import { UTBurgerConstructorActions } from "./burgerConstructorActions";
import { UTFullIngredientsActions } from "./fullIngredientsListActions";
import { UTOrderDetails } from "./orderDetailsActions";
import { UTUserActions } from "./userActions";
import { UTOrderLineActions } from "./orderLineActions";
import { UTUserOrdersActions } from "./userOrdersActions";
import rootReducer from "../reducers/rootReducer";

//Стейт лучше не брать через getState.store, так как в таком варианте выпадает ошибка, что тип стора сам на себя зацикливается
export type RootState = ReturnType<typeof rootReducer>;

export type TApplicationActions = UTBurgerConstructorActions | UTFullIngredientsActions | UTOrderDetails | UTUserActions | UTOrderLineActions | UTUserOrdersActions;

export type AppDispatch = ThunkDispatch<RootState, unknown, TApplicationActions>;
