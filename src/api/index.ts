import axios from "axios";
import { Dayjs } from "dayjs";
import type {
  BookingStaffType,
  BookingType,
  ServiceShopType,
  ServiceType,
  ShopType,
  UserType,
} from "../type";
import { AxiosError, axiosInstance } from "./axios";

const getShopByStaff = async () => {
  const response = await axiosInstance.get<ShopType>(`/shops/staff`);
  return response.data;
};

const updateShopByStaff = async (shop?: ShopType) => {
  const response = await axiosInstance.patch<ShopType>(`/shops`, { ...shop });
  return response.data;
};

const updateMaxCustomerByStaff = async (
  parentServiceId: number,
  value: number
) => {
  const response = await axiosInstance.patch(`/shops/updateMaxCustomer`, {
    value: value,
    parentServiceId: parentServiceId,
  });
  return response.data;
};

const getMaxCustomerByStaff = async () => {
  const response = await axiosInstance.get(`/shops/staff/maxCustomer`);
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
  serviceId?: number,
  image?: string
) => {
  const response = await axiosInstance.post(`shop-service`, {
    description: description,
    lowestPrice: lowestPrice,
    highestPrice: highestPrice,
    serviceId: serviceId,
    image: image,
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
  const response = await axiosInstance.get(`/shops/${id}`);
  return response.data;
};

const getServicesOfShop = async (id: string) => {
  const response = await axiosInstance.get(`/shops/${id}/services`);
  return response.data;
};

const getMe = () => {
  return axiosInstance.get<UserType>("/auth").then((res) => res.data);
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
const getShopsByParent = async (parentId: number) => {
  const res = await axiosInstance.get<ShopType[]>(
    `/shops/getByParent?parentServiceId=${parentId}`
  );
  return res.data;
};

const getListBooking = async () => {
  const response = await axiosInstance.get<BookingType[]>(
    "/bookings/findAllByUser"
  );
  return response.data;
};

const getListBookingByStaff = async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const response = await axiosInstance.get<BookingStaffType[]>(
    "/bookings/findAllByStaff"
  );
  return response.data;
};

const sendRequestBooking = async (shopServiceId: number, time: Dayjs) => {
  const response = await axiosInstance.post("/bookings", {
    shopServiceId,
    time,
  });
  return response.data;
};

const cancelBooking = async (bookingId: number) => {
  const response = await axiosInstance.patch(`/bookings/${bookingId}/cancel`);
  return response.data;
};

const updateStatus = async ({
  bookingId,
  status,
}: {
  bookingId: number;
  status: string;
}) => {
  const response = await axiosInstance.patch(`/bookings/${bookingId}`, {
    status,
  });
  return response.data;
};

const sendRequestCooperation = async (
  email: string,
  shopName: string,
  slogan: string,
  phone: string,
  province: string,
  district: string,
  ward: string,
  detail: string
) => {
  const response = await axiosInstance.post("request-cooperation", {
    email,
    shopName,
    slogan,
    phone,
    province,
    district,
    ward,
    detail,
  });
  return response.data;
};
const CLOUD_NAME = "dk9mcaqzu";
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
const PRESET = "petcare";
const uploadImg = async (file: File) => {
  // Initial FormData
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", PRESET);
  formData.append("folder", "tamtam");

  // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
  return axios
    .post<{ secure_url: string }>(UPLOAD_URL, formData)
    .then((response) => {
      const data = response.data;
      const fileURL = data.secure_url;
      return fileURL;
    });
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
  fullName: string
) => {
  await axiosInstance.post<string>("/auth/register", {
    email,
    password,
    fullName,
    phone,
  });

  return getMe();
};

export {
  AxiosError,
  addShopServiceByStaff,
  cancelBooking,
  getAllServiceByStaff,
  getListBooking,
  getListBookingByStaff,
  getListServiceByStaff,
  getMe,
  getServicesOfShop,
  getShopByStaff,
  getShopInfo,
  getShopServiceByStaff,
  login,
  removeShopServiceByStaff,
  searchShop,
  sendRequestBooking,
  sendRequestCooperation,
  signup,
  updateShopByStaff,
  updateShopServiceByStaff,
  updateStatus,
  uploadImg,
  getShopsByParent,
  updateMaxCustomerByStaff,
  getMaxCustomerByStaff,
};
