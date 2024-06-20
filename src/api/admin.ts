import { ShopType, UserType } from "../type";
import { axiosInstance, AxiosError } from "./axios";
import axios from "axios";

const findAllShops = async () => {
  const response = await axiosInstance.get(`shops/admin`);
  return response.data;
};

const getTopShop = async () => {
  const response = await axiosInstance.get<ShopType[]>(
    "shops/admin/getTopShop"
  );
  return response.data;
};
const findAllCustomer = async () => {
  const response = await axiosInstance.get("users/admin/getCustomers");
  return response.data;
};

const findCommentWithValueOf5 = async () => {
  const response = await axiosInstance.get("comments/getWithValueOf5");
  return response.data;
};

const getAllRequestCooperation = async () => {
  const response = await axiosInstance.get("request-cooperation");
  return response.data;
};

const getAllUser = async () => {
  const response = await axiosInstance.get<UserType[]>("users/admin");
  return response.data;
};

const acceptedRequestCooperation = async (id: number) => {
  const response = await axiosInstance.patch(
    `request-cooperation/${id}/accept`
  );
  return response.data;
};
export {
  findAllShops,
  findAllCustomer,
  findCommentWithValueOf5,
  getTopShop,
  getAllRequestCooperation,
  getAllUser,
  acceptedRequestCooperation,
};
