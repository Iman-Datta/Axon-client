import { refreshAccessToken } from "./refreshAccessToken";

import { clearUser, setAccessToken } from "../redux/slices/authSlice";

export const fetchWithAuth = async (
  url,
  options = {},
  dispatch,
  accessToken,
) => {
  let token = accessToken;

  // first load case
  if (!token) {
    try {
      token = await refreshAccessToken();

      dispatch(setAccessToken(token));
    } catch (error) {
      dispatch(clearUser());
      throw error;
    }
  }

  let response = await fetch(url, {
    ...options,

    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },

    credentials: "include",
  });

  // token expired case
  if (response.status === 401) {
    try {
      const newToken = await refreshAccessToken();

      dispatch(setAccessToken(newToken));

      response = await fetch(url, {
        ...options,

        headers: {
          ...options.headers,
          Authorization: `Bearer ${newToken}`,
        },

        credentials: "include",
      });
    } catch (error) {
      dispatch(clearUser());

      throw error;
    }
  }

  return response;
};