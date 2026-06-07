const API = import.meta.env.VITE_API_URL;

export const refreshAccessToken = async () => {
  const res = await fetch(`${API}/auth/refresh/`, {
    method: "POST",
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error("Refresh failed");
  }

  return data.access_token;
};
