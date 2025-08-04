import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "../constants";

const apiInstance = axios.create({
  baseURL: `${BASE_URL}/api`,
  withCredentials: true, // allow sending cookies automatically
});

//request interceptor
apiInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

//responce interceptor
apiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      Cookies.remove("token");
      // Optional: redirect to login
      // window.location.href = "/auth/login";
    }

    return Promise.reject(error);
  }
);

export default apiInstance;
