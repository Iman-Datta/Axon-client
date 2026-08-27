import { refreshAccessToken } from "./refreshAccessToken";
import { clearUser, setAccessToken } from "../redux/slices/authSlice";
import { handleFetchFailure, handleResponseStatus } from "./serverStatus";

export const fetchWithAuth = async (
  url,
  options = {},
  dispatch,
  accessToken,
) => {
  let token = accessToken;

  if (!token) {
    try {
      token = await refreshAccessToken();
      dispatch(setAccessToken(token));
    } catch (error) {
      dispatch(clearUser());
      throw error;
    }
  }

  let response;
  try {
    response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });
  } catch (error) {
    handleFetchFailure(error);
  }

  handleResponseStatus(response);

  if (response.status === 401) {
    try {
      const newToken = await refreshAccessToken();
      dispatch(setAccessToken(newToken));

      try {
        response = await fetch(url, {
          ...options,
          headers: {
            ...options.headers,
            Authorization: `Bearer ${newToken}`,
          },
          credentials: "include",
        });
      } catch (error) {
        handleFetchFailure(error);
      }

      handleResponseStatus(response);
    } catch (error) {
      dispatch(clearUser());
      throw error;
    }
  }

  return response;
};
