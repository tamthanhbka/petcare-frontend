import { CommentType } from "../type";
import { axiosInstance } from "./axios";
const getAllByShop = async (shopId: number) => {
  const res = await axiosInstance.get<CommentType[]>(
    "comments/getAllByService",
    {
      params: { shopId },
    }
  );
  return res.data;
};

const commentApi = { getAllByShop };
export default commentApi;
