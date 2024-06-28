import axios from "axios";
import { CommuneType, DistrictType, ProvinceType } from "../type";

const baseUrl = "https://api.mysupership.vn/v1/partner/areas/";
interface ResultType<T> {
  status: string;
  results: T[];
}
export const getProvinces = async () => {
  const response = await axios.get<ResultType<ProvinceType>>(
    `${baseUrl}province`
  );
  return response.data.results;
};

export const getDistricts = async (province: string) => {
  const response = await axios.get<ResultType<DistrictType>>(
    `${baseUrl}district?province=${province}`
  );
  return response.data.results;
};

export const getCommunes = async (district: string) => {
  const response = await axios.get<ResultType<CommuneType>>(
    `${baseUrl}commune?district=${district}`
  );
  return response.data.results;
};
