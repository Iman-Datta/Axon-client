import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchWithAuth } from "../utils/fetchWithAuth";
import { setOnboardingStatus } from "../redux/slices/onboardingSlice";

const API = import.meta.env.VITE_API_URL;

export function useOnboarding() {
  const dispatch = useDispatch();

  const accessToken = useSelector((state) => state.auth.accessToken);

  const onboarding = useSelector((state) => state.onboarding.status);

  const loaded = useSelector((state) => state.onboarding.loaded);

  const [status, setStatus] = useState(onboarding);
  const [loading, setLoading] = useState(!loaded);
  const [error, setError] = useState(null);

  const fetchStatus = useCallback(async () => {
    if (loaded && onboarding) {
      setStatus(onboarding);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const res = await fetchWithAuth(
        `${API}/auth/onboarding/status/`,
        {},
        dispatch,
        accessToken,
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed");
      }

      dispatch(setOnboardingStatus(data));
      setStatus(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [loaded, onboarding, dispatch, accessToken]);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  return {
    status,
    loading,
    error,
    refresh: fetchStatus,
  };
}
