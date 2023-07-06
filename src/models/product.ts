import { ItemAttribute } from "./common";

export interface Product extends ItemAttribute {
  id: string;
  name: string;
  price: string;
}
