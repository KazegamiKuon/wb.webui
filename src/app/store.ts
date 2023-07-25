import {
  Action,
  AnyAction,
  MiddlewareArray,
  ThunkAction,
  ThunkMiddleware,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import adminReducer from "features/admin/adminSlice";
import showReducer from "features/show/showSlice";
import { AdminState, ShowState } from "models";
import logger from "./logger";

export interface RootState {
  showState: ShowState;
  adminState: AdminState;
}

export const store = configureStore<
  RootState,
  AnyAction,
  MiddlewareArray<[ThunkMiddleware<RootState, AnyAction>]>
>({
  reducer: combineReducers({
    adminState: adminReducer,
    showState: showReducer,
  }),

  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware();
    if (process.env.NODE_ENV === "development") {
      middlewares.concat(logger);
    }
    return middlewares;
  },
});

export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
