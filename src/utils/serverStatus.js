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
