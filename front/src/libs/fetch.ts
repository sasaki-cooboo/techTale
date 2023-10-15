import Axios from "axios";

export const getApiPath = () => {
  if (process.env.NODE_ENV === "production") {
    return `https://${process.env.NEXT_PUBLIC_MY_DOMAIN}`;
  }
  if (typeof window === "undefined") {
    return `http://nginx`; // ssr
  }
  return `http://localhost`; // csr
};

const fetch = Axios.create({
  baseURL: getApiPath(),
  withCredentials: true,
});

export default fetch;
