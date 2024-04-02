import { Dayjs } from "dayjs";
import { ShopType } from "../type";
import { axiosInstance, AxiosError } from "./axios";

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
};
