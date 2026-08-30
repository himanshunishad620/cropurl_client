import axios from "axios";
import config from ".././config/config";
const axiosApi = axios.create({
  baseURL: config.baseUrl,
  withCredentials: true,
});

export default axiosApi;
