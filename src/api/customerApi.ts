import { ListResponse } from "models/common";
import { Customer } from "models/customer";
import axiosClient from "./axiosClient";

const url = "customers";
const customerApi = {
  getAll(): Promise<ListResponse<Customer>> {
    return axiosClient.get(url);
  },
  createCustomers(data: Customer[]) {
    return axiosClient.post(url, data);
  },
};

export default customerApi;
