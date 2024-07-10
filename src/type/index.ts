export type ShopType = {
  id: number;
  name: string;
  hotline: string;
  slogan: string;
  avatar: string;
  staffId: number;
  addressId: number;
  rating: number | null;
  address: AddressType;
  services: ServiceShopType[];
  isActive: boolean;
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
  parentId?: number;
  parent: ServiceType;
};

export type ServiceAdminType = ServiceType & {
  count: string;
  parentName: string;
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

export type CommentType = {
  id: number;
  content: string;
  value: number;
  userId: number;
  shopServiceId: number;
  createdAt: string;
  user: UserType;
};

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
  role: "staff" | "user" | "admin";
  isActive: boolean;
};
export interface BookingType {
  id: number;
  userId: number;
  shopServiceId: number;
  time: string;
  status: "completed" | "pending" | "cancel" | "rejected" | "accepted";
  createdAt: string;
  shopService: ShopServiceType;
}

export interface ShopServiceType {
  id: number;
  image: string;
  description: string;
  lowestPrice: number;
  highestPrice: number;
  shopId: number;
  serviceId: number;
  rating: number;
  shop: ShopType;
  service: ServiceType;
}

export interface MaxCustomerType {
  id: number;
  shopId: number;
  serviceId: number;
  maxCustomer: number;
  shop: ShopType;
  service: ServiceType;
}

export interface BookingStaffType {
  id: number;
  user_id: number;
  shop_service_id: number;
  time: string;
  status: string;
  createdAt: string;
  fullName: string;
  email: string;
  serviceName: string;
  user_avatar: string;
}

export interface TopServiceAdminType {
  id: number;
  shopAvatar: string;
  serviceName: string;
  shopName: string;
  count: string;
}
