import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { ShowState } from "models";
import { Bill } from "models/bill";

const initialState: ShowState = {
  isLoading: false,
  bills: [],
};
const showSlice = createSlice({
  name: "showState",
  initialState: initialState,
  reducers: {
    setShowIsLoading(state) {
      console.log("isloading");
      state.isLoading = true;
    },
    setBills(state, action: PayloadAction<Bill[]>) {
      state.isLoading = false;
      state.bills = action.payload;
    },
  },
});
//actions
export const showActions = showSlice.actions;
//selector
export const billSelector = createSelector(
  (state: RootState) => state.showState.bills,
  (data) => data
);
export const showLoadingSelector = createSelector(
  (state: RootState) => state.showState.isLoading,
  (data) => data
);
//reducer
const showReducer = showSlice.reducer;
export default showReducer;
