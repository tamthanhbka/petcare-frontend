import {
  ServiceAdminType,
  ServiceType,
  ShopType,
  TopServiceAdminType,
  UserType,
} from "../type";
import { axiosInstance } from "./axios";

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

const rejectedRequestCooperation = async (id: number) => {
  const response = await axiosInstance.patch(
    `request-cooperation/${id}/reject`
  );
  return response.data;
};

const blockShop = async (shopId: number) => {
  const response = await axiosInstance.patch(`shops/blockShop`, {
    shopId,
  });
  return response.data;
};

const openShop = async (shopId: number) => {
  const response = await axiosInstance.patch(`shops/openShop`, {
    shopId,
  });
  return response.data;
};

const blockUser = async (userId: number) => {
  const response = await axiosInstance.patch(`users/blockUser`, {
    userId,
  });
  return response.data;
};

const openUser = async (userId: number) => {
  const response = await axiosInstance.patch(`users/openUser`, {
    userId,
  });
  return response.data;
};

const getAllParentService = async () => {
  const response = await axiosInstance.get<ServiceType[]>(`services/parent`);
  return response.data;
};

const getAllService = async () => {
  const response = await axiosInstance.get<ServiceAdminType[]>(`services/`);
  return response.data;
};

const createService = async (name: string, parentId: number) => {
  const response = await axiosInstance.post("services", { name, parentId });
  return response.data;
};

const deleteService = async (id: number) => {
  const response = await axiosInstance.delete(`services/${id}`);
  return response.data;
};

const getTopServiceByBooking = async () => {
  const response = await axiosInstance.get<TopServiceAdminType[]>(
    "shop-service/getTopByBooking"
  );
  return response.data;
};

export {
  acceptedRequestCooperation,
  findAllCustomer,
  findAllShops,
  findCommentWithValueOf5,
  getAllRequestCooperation,
  getAllUser,
  getTopShop,
  blockShop,
  blockUser,
  openShop,
  openUser,
  getAllParentService,
  getAllService,
  createService,
  deleteService,
  getTopServiceByBooking,
  rejectedRequestCooperation,
};
