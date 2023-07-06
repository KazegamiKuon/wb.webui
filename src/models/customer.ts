import { ItemAttribute } from "./common";

export interface Customer extends ItemAttribute {
  id: string;
  name: string | null;
  dateOfBirth: string | null;
  email: string | null;
}
