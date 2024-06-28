import { axiosInstance } from "./axios";
export interface RatingType {
  content: string;
  value: number;
  shopServiceId: number;
}
const rating = async (payload: RatingType) => {
  const res = await axiosInstance.post("comments", payload);
  return res.data;
};

const shopServiceApi = { rating };
export default shopServiceApi;
