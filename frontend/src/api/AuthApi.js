import API, { TOKEN_KEY, getUserFromAccessToken, setToken } from "./APIUtils";
import { setLocalStorage, getLocalStorageValue } from "../utils";

function handleUserResponse(accessToken) {
  setLocalStorage(TOKEN_KEY, accessToken);
  setToken(accessToken);
  return getCurrentUser();
}

export const getCurrentUser = function () {
  return getUserFromAccessToken(getLocalStorageValue(TOKEN_KEY));
};

export function login(username, password) {
  return API.post("/auth/signin", {
    username,
    password,
  }).then((user) => handleUserResponse(user.data));
}

export function register(username, password) {
  return API.post("/auth/signup", { username, password }).then((user) => {
    return handleUserResponse(user.data);
  });
}

//TODO: Hay que ver como mandar el user
export function updateUser(user) {
  return API.put("/user", { user });
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  setToken(null);
}
