import { ListResponse } from "models/common";
import { Shop } from "models/shop";
import axiosClient from "./axiosClient";

const url = "shops";
const shopApi = {
  getAll(): Promise<ListResponse<Shop>> {
    return axiosClient.get(url);
  },
  createShops(data: Shop[]) {
    return axiosClient.post(url, data);
  },
};

export default shopApi;
