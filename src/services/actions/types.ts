import { ThunkDispatch } from 'redux-thunk';
import { store } from "../../index";
import { UTBurgerConstructorActions } from "./burgerConstructorActions";
import { UTFullIngredientsActions } from "./fullIngredientsListActions";
import { UTOrderDetails } from "./orderDetailsActions";
import { UTUserActions } from "./userActions";

export type RootState = ReturnType<typeof store.getState>;

export type TApplicationActions = UTBurgerConstructorActions | UTFullIngredientsActions | UTOrderDetails | UTUserActions;

export type AppDispatch = ThunkDispatch<RootState, unknown, TApplicationActions>;
