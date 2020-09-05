import API, { TOKEN_KEY, getUserFromAccessToken, setToken } from "./ApiUtils";
import { setLocalStorage, getLocalStorageValue } from "../utils";

export default class AuthApi {
  handleUserResponse({ accessToken }) {
    setLocalStorage(TOKEN_KEY, accessToken);
    setToken(accessToken);
    return getCurrentUser();
  }

  getCurrentUser = function () {
    return getUserFromAccessToken(getLocalStorageValue(TOKEN_KEY));
  };

  login(username, password) {
    const url = `/auth/signin`;
    return API.post(url, { username, password }).then((user) =>
      handleUserResponse(user.data)
    );
  }

  register(username, password) {
    const url = `/auth/signup`;
    return API.post(url, { username, password }).then((user) => {
      return handleUserResponse(user.data);
    });
  }
}
