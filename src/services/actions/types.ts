import { ThunkDispatch } from 'redux-thunk';
import { store } from "../../index";
import { UTBurgerConstructorActions } from "./burgerConstructorActions";
import { UTFullIngredientsActions } from "./fullIngredientsListActions";
import { UTOrderDetails } from "./orderDetailsActions";
import { UTUserActions } from "./userActions";
import { UTOrderLineActions } from "./orderLineActions";

export type RootState = ReturnType<typeof store.getState>;

export type TApplicationActions = UTBurgerConstructorActions | UTFullIngredientsActions | UTOrderDetails | UTUserActions | UTOrderLineActions;

export type AppDispatch = ThunkDispatch<RootState, unknown, TApplicationActions>;
