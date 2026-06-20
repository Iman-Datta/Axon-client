import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchWithAuth } from "../utils/fetchWithAuth";

const API = import.meta.env.VITE_API_URL;

export const useOnboarding = () => {
  const dispatch = useDispatch();

  const accessToken = useSelector((state) => state.auth.accessToken);

  const [onboarding, setOnboarding] = useState(null);

  const [loading, setLoading] = useState(true);

  const checkOnboarding = async () => {
    try {
      const res = await fetchWithAuth(
        `${API}/auth/onboarding/status/`,
        {},
        dispatch,
        accessToken,
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error("Onboarding check failed");
      }

      setOnboarding(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkOnboarding();
  }, []);

  return {
    onboarding,
    loading,
    refresh: onboarding,
  };
};
