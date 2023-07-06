import { ListResponse } from "models/common";
import { Product } from "models/product";
import axiosClient from "./axiosClient";

const url = "products";
const productApi = {
  getAll(): Promise<ListResponse<Product>> {
    return axiosClient.get(url);
  },
  createProducts(data: Product[]) {
    return axiosClient.post(url, data);
  },
};

export default productApi;
