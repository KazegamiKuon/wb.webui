import { BillResponseData } from "models/bill";
import { SingleResponse } from "models/common";
import axiosClient from "./axiosClient";

const url = "bills";
const billApi = {
  getAll(): Promise<SingleResponse<BillResponseData>> {
    return axiosClient.get(url);
  },
};
export default billApi;
