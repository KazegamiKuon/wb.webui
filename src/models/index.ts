import { Bill } from "./bill";
import { Customer } from "./customer";
import { Product } from "./product";
import { Shop } from "./shop";

export interface ShowState {
  isLoading: boolean;
  bills: Bill[];
}

export interface AdminState {
  customerState: {
    isLoading: boolean;
    customers: Customer[];
  };
  shopState: {
    isLoading: boolean;
    shops: Shop[];
  };
  productState: {
    isLoading: boolean;
    products: Product[];
  };
}
