import Axios from "axios";

export const getApiPath = () => {
  if (process.env.NODE_ENV === "production") {
    return `https://${process.env.NEXT_PUBLIC_API_DOMAIN}`;
  }
  if (typeof window === "undefined") {
    return `http://nginx`; // ssr
  }
  return `http://localhost`; // csr
};

// Basic認証に使用するユーザー名とパスワード
const username = process.env.NEXT_PUBLIC_BASIC_USER;
const password = process.env.NEXT_PUBLIC_BASIC_PASS;

// ベーシック認証用のヘッダーを作成
const authHeader = {
  username,
  password,
};

const fetch = Axios.create({
  baseURL: getApiPath(),
  withCredentials: true,
  headers: {
    Authorization:
      "Basic " +
      Buffer.from(`${authHeader.username}:${authHeader.password}`).toString(
        "base64"
      ),
  },
});

export default fetch;

/**
 * fetch関数、SWRに使用
 *
 * @param url - url
 */
export const fetcher = (url: string) => fetch.get(url).then((res) => res.data);
