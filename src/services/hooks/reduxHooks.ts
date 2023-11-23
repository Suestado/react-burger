import { TypedUseSelectorHook, useSelector as selectorHook, useDispatch as dispatchHook, } from 'react-redux';
import { AppDispatch, RootState } from "../actions/types";

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export const useDispatch = () => dispatchHook<AppDispatch>();
