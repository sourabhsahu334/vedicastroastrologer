import axios from "axios";
// import { retrieveSubdomain, retrieveToken } from "./authStorage";


const prodUrl = `https://www.radicalone.co.in/vedicastro/astrologer.php`;

export const http = axios.create({
  baseURL: prodUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
  },
  timeout: 3000,
});

http.interceptors.request.use(
  async (config) => {
    // const subdomain = await retrieveSubdomain();
    // const token = await retrieveToken();
    // const bearerAuth = token ? token : null;
    // if (subdomain) config.headers.origin = `http://${subdomain}.medorn.com`;
    // if (bearerAuth) config.headers.Authorization = `bearer ${bearerAuth}`;
    console.log("config", config.params);
    return config;
  },
  (error) => {
    // console.log("##axiosErr", err);
    return Promise.reject(error);
  },
);
