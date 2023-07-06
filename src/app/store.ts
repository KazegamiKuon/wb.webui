import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import adminReducer from "features/admin/adminSlice";
import showReducer from "features/show/showSlice";

export const store = configureStore({
  reducer: {
    showState: showReducer,
    adminState: adminReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
