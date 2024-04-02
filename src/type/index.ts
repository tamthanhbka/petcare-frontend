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
};

export type ServiceShopType = {
  id: number;
  image: string;
  description: string;
  lowestPrice: number;
  highestPrice: number;
  shop: ShopType;
  service: ServiceType;
};
