import { Address } from "cluster";

export type ShopType = {
  id: number;
  name: string;
  hotline: string;
  slogan: string;
  avatar: string;
  staffId: number;
  addressId: number;
  rating: number;
  address: AddressType;
  services: ServiceShopType[];
};

export type AddressType = {
  id: number;
  province: string;
  district: string;
  ward: string;
  detail: string;
};

export type ServiceType = {
  id: number;
  name: string;
  parentId: number;
  parent: ServiceType;
};

export type ServiceShopType = {
  id: number;
  image: string;
  description: string;
  lowestPrice: number;
  highestPrice: number;
  serviceId: number;
  shop: ShopType;
  service: ServiceType;
  rating: number;
};

export type ProvinceType = {
  code: string;
  name: string;
};

export type DistrictType = {
  code: string;
  name: string;
  province: string;
};

export type CommuneType = {
  code: string;
  name: string;
  district: string;
  province: string;
};

export type CommentType = {};

export type RequestCooperationType = {
  id: number;
  email: string;
  shopName: string;
  slogan: string;
  phone: string;
  status: string;
  province: string;
  district: string;
  ward: string;
  detail: string;
};

export type UserType = {
  id: number;
  email: string;
  fullName: string;
  phone: string;
  dateOfBirth: Date;
  avatar: string;
  role: string;
  isActive: boolean;
};
