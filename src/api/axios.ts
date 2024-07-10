import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});
const onRequest = (config: InternalAxiosRequestConfig) => {
  config.headers.set("Content-Type", "application/json");
  config.headers.Authorization = "Bearer " + localStorage.getItem("token");
  return config;
};
const onResponse = (response: AxiosResponse) => {
  if (
    response.config.url === "/auth/login" ||
    response.config.url === "/auth/register"
  ) {
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
export { AxiosError, axiosInstance };
