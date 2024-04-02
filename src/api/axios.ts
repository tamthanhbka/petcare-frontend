import axios, {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
});
const onRequest = (config: InternalAxiosRequestConfig) => {
  config.headers.set("Content-Type", "application/json");
  config.headers.Authorization = "Bearer " + localStorage.getItem("token");
  return config;
};
const onResponse = (response: AxiosResponse) => {
  if (response.config.url === "/auth/login") {
    const token = response.data;
    localStorage.setItem("token", token);
  }
  return response;
};
// const onRejected = (error: AxiosError<any, any>) => {
//   const response = error.response;
//   const type = response?.data.type;
//   if (type === "token") {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//   }
// };
axiosInstance.interceptors.request.use(onRequest);
axiosInstance.interceptors.response.use(
  onResponse
  // , onRejected
);
export { axiosInstance, AxiosError };
