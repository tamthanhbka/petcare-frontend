export type ShopType = {
  id: number;
  name: string;
  hotline: string;
  slogan: string;
  avatar: string;
  staffId: number;
  addressId: number;
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
