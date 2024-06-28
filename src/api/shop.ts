import { axiosInstance } from "./axios";
export interface TopShopType {
  id: number;
  name: string;
  hotline: string;
  avatar: string | null;
  slogan: string;
  rating: number;
  rate: number;
}
const getTopShop = async (parentServiceId: 1 | 2 | 3, limit = 6) => {
  const res = await axiosInstance.get<TopShopType[]>("shops/top", {
    params: { parentServiceId, limit },
  });
  return res.data;
};

const shopApi = { getTopShop };
export default shopApi;
