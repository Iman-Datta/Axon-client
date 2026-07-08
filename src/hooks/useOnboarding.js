import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchWithAuth } from "../utils/fetchWithAuth";

const API = import.meta.env.VITE_API_URL;

export function useOnboarding() {
  const dispatch = useDispatch();

  const accessToken = useSelector((state) => state.auth.accessToken);

  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStatus = useCallback(async () => {
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

      setStatus(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [dispatch, accessToken]);

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
