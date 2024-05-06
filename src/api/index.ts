import { Dayjs } from "dayjs";
import { ServiceShopType, ServiceType, ShopType } from "../type";
import { axiosInstance, AxiosError } from "./axios";
import axios from "axios";

const getShopByStaff = async () => {
  const response = await axiosInstance.get<ShopType>(`/shops/staff`);
  return response.data;
};

const updateShopByStaff = async (shop?: ShopType) => {
  const response = await axiosInstance.patch<ShopType>(`/shops`, { ...shop });
  return response.data;
};

const getAllServiceByStaff = async () => {
  const response = await axiosInstance.get<ServiceShopType[]>(
    `/shops/staff/services`
  );
  return response.data;
};

const addShopServiceByStaff = async (
  description?: string,
  lowestPrice?: number,
  highestPrice?: number,
  serviceId?: number
) => {
  const response = await axiosInstance.post(`shop-service`, {
    description: description,
    lowestPrice: lowestPrice,
    highestPrice: highestPrice,
    serviceId: serviceId,
  });
  return response.data;
};

const getShopServiceByStaff = async (id: string) => {
  const response = await axiosInstance.get<ServiceShopType>(
    `shop-service/${id}`
  );
  return response.data;
};

const updateShopServiceByStaff = async (
  id: string,
  shopService?: ServiceShopType
) => {
  const response = await axiosInstance.patch<ServiceShopType>(
    `shop-service/${id}`,
    { ...shopService }
  );
  return response.data;
};

const removeShopServiceByStaff = async (id: string) => {
  const response = await axiosInstance.delete(`shop-service/${id}`);
  return response.data;
};

const getListServiceByStaff = async () => {
  const response = await axiosInstance.get<ServiceType[]>(`services`);
  return response.data;
};
const getShopInfo = async (id: string) => {
  console.log(id);
  const response = await axiosInstance.get(`/shops/${id}`);
  return response.data;
};

const getServicesOfShop = async (id: string) => {
  const response = await axiosInstance.get(`/shops/${id}/services`);
  return response.data;
};

const getMe = () => {
  return axiosInstance.get("/auth").then((res) => res.data);
};
const searchShop = async (meta: {
  key: string;
  skip?: number;
  sort?: string;
  order?: string;
}) => {
  const { key, skip, sort, order } = meta;

  const searchParam = new URLSearchParams();
  key && searchParam.set("key", key);
  skip && searchParam.set("skip", skip.toString());
  sort && searchParam.set("sort", sort);
  order && searchParam.set("order", order);
  const res = await axiosInstance.get<{ shops: ShopType[]; count: number }>(
    `/shops?${searchParam.toString()}`
  );
  return res.data;
};

const getListBooking = async () => {
  const response = await axiosInstance.get<any[]>("/bookings/user");
  return response.data;
};

const sendRequestBooking = async (serviceId: string, time: Dayjs) => {
  const response = await axiosInstance.post("/bookings", { serviceId, time });
  return response.data;
};

const login = async (email: string, password: string) => {
  await axiosInstance.post("/auth/login", { email, password });
  const data = await getMe();
  return data;
};

const signup = async (
  email: string,
  phone: string,
  password: string,
  username: string
) => {
  await axiosInstance.post("/auth/signup", {
    email,
    phone,
    password,
    username,
  });
  const response = await axiosInstance.get("/me");
  return response.data.data;
};

export {
  getMe,
  login,
  signup,
  AxiosError,
  getShopInfo,
  getServicesOfShop,
  searchShop,
  getListBooking,
  sendRequestBooking,
  getShopByStaff,
  updateShopByStaff,
  getAllServiceByStaff,
  getShopServiceByStaff,
  updateShopServiceByStaff,
  removeShopServiceByStaff,
  getListServiceByStaff,
  addShopServiceByStaff,
};
