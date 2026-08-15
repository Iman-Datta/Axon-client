import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWithAuth } from "../utils/fetchWithAuth";

const API = import.meta.env.VITE_API_URL;

export function useProfileOverview() {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);

  const [overviewData, setOverviewData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchOverview = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetchWithAuth(`${API}/auth/my/overview/`, {}, dispatch, accessToken);
        if (!res.ok) throw new Error("Failed to fetch profile overview data");
        const data = await res.json();
        if (isMounted) setOverviewData(data.profile);
      } catch (err) {
        if (isMounted) setError(err.message || "Something went wrong");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchOverview();
    return () => {
      isMounted = false;
    };
  }, [dispatch, accessToken]);

  return { overviewData, loading, error };
}
