import { navigate } from "@reach/router";
import axios from "axios";
import jwtDecode from "jwt-decode";

export const TOKEN_KEY = "token";
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    switch (error.response.status) {
      case 401:
        navigate("/login");
        break;
      case 404:
      case 403:
        navigate("/");
        break;
      default:
    }
    return Promise.reject(error.response);
  }
);

export function setToken(token) {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}

export function getUserFromAccessToken(token) {
  const decodedJwt = jwtDecode(token);
  return { username: decodedJwt.username };
}

export function isTokenValid(token) {
  try {
    const decodedJwt = jwtDecode(token);
    const currentTime = Date.now().valueOf() / 1000;
    return decodedJwt.exp > currentTime;
  } catch (error) {
    return false;
  }
}

export default axios;
