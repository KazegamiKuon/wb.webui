import { Customer } from "./customer";
import { Product } from "./product";
import { Shop } from "./shop";

export interface Bill {
  id: string;
  customer: Customer;
  shop: Shop;
  product: Product;
}

export interface BillResponseData {
  isError: boolean;
  bills: Bill[];
}
