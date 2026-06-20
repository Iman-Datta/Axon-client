import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchWithAuth } from "../utils/fetchWithAuth";

const API = import.meta.env.VITE_API_URL;

export function useOnboarding() {
  const dispatch = useDispatch();

  const accessToken = useSelector((state) => state.auth.accessToken);

  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchStatus = async () => {
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
  };

  useEffect(() => {
    const load = async () => {
      await fetchStatus();
    };

    load();
  }, []);

  return {
    status,
    loading,
    error,
    refresh: fetchStatus,
  };
}
