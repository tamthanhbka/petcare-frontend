import axios from "axios";
import { CommuneType, DistrictType, ProvinceType } from "../type";

export const getProvinces = async () => {
  const response = await axios.get<{ status: string; results: ProvinceType[] }>(
    "https://api.mysupership.vn/v1/partner/areas/province"
  );
  return response.data.results;
};

export const getDistricts = async (province: string) => {
  const response = await axios.get<{ status: string; results: DistrictType[] }>(
    `https://api.mysupership.vn/v1/partner/areas/district?province=${province}`
  );
  return response.data.results;
};

export const getCommunes = async (district: string) => {
  const response = await axios.get<{ status: string; results: CommuneType[] }>(
    `https://api.mysupership.vn/v1/partner/areas/commune?district=${district}`
  );
  return response.data.results;
};
