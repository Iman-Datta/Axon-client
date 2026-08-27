export const isNetworkFailure = (err) => {
  return err instanceof TypeError && /fetch/i.test(err.message);
};

export const redirectToServerDown = () => {
  if (window.location.pathname !== "/server-error") {
    window.location.href = "/server-error";
  }
};

export const handleFetchFailure = (err) => {
  if (isNetworkFailure(err)) {
    redirectToServerDown();
  }
  throw err;
};

export const handleResponseStatus = (response) => {
  if (response.status >= 500) {
    redirectToServerDown();
  }
  return response;
};

// src/utils/serverStatus.js  (add this function)
export const checkServerReachable = async (apiBase) => {
  try {
    const res = await fetch(`${apiBase}/health/`, { method: "GET" });
    return res.ok;
  } catch {
    return false;
  }
};
