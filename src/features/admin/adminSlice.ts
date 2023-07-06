import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { AdminState } from "models";
import { Customer } from "models/customer";
import { Product } from "models/product";
import { Shop } from "models/shop";

const initialState: AdminState = {
  customerState: {
    isLoading: false,
    customers: [],
  },
  shopState: {
    isLoading: false,
    shops: [],
  },
  productState: {
    isLoading: false,
    products: [],
  },
};
const adminSlice = createSlice({
  name: "adminState",
  initialState: initialState,
  reducers: {
    setCustomerIsLoading(state) {
      state.customerState.isLoading = true;
    },
    setCustomers(state, action: PayloadAction<Customer[]>) {
      state.customerState.isLoading = false;
      state.customerState.customers = action.payload;
    },

    setShopIsLoading(state) {
      state.shopState.isLoading = true;
    },
    setShops(state, action: PayloadAction<Shop[]>) {
      state.shopState.isLoading = false;
      state.shopState.shops = action.payload;
    },
    setProductIsLoading(state) {
      state.productState.isLoading = true;
    },
    setProducts(state, action: PayloadAction<Product[]>) {
      state.productState.isLoading = false;
      state.productState.products = action.payload;
    },
  },
});
//actions
export const adminActions = adminSlice.actions;
//selector
export const customersSelector = createSelector(
  (state: RootState) => state.adminState.customerState.customers,
  (data) => data
);
export const customerLoadingSelector = createSelector(
  (state: RootState) => state.adminState.customerState.isLoading,
  (data) => data
);
export const shopsSelector = createSelector(
  (state: RootState) => state.adminState.shopState.shops,
  (data) => data
);
export const shopLoadingSelector = createSelector(
  (state: RootState) => state.adminState.shopState.isLoading,
  (data) => data
);
export const productsSelector = createSelector(
  (state: RootState) => state.adminState.productState.products,
  (data) => data
);
export const productLoadingSelector = createSelector(
  (state: RootState) => state.adminState.productState.isLoading,
  (data) => data
);
//reducer
const adminReducer = adminSlice.reducer;
export default adminReducer;
