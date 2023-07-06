import { ItemAttribute } from "./common";

export interface Shop extends ItemAttribute {
  id: string;
  name: string;
  location: string;
}
