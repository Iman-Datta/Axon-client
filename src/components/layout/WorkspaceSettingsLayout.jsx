import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchWithAuth } from "../../utils/fetchWithAuth";

const API = import.meta.env.VITE_API_URL;

function WorkspaceSettingsLayout({ type = "personal" }) {
  console.log("WorkspaceSettingsLayout loaded, type:", type);

  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    async function fetchSettingsDetails() {
      try {
        setLoading(true);
        setError("");

        const url = type === "personal" ? `${API}/auth/me/` : `${API}/org/my/`;

        const response = await fetchWithAuth(url, {}, dispatch, accessToken);

        if (!response.ok) {
          throw new Error(`Failed to load workspace (${response.status})`);
        }

        const data = await response.json();

        setDetails(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchSettingsDetails();
  }, [type, dispatch, accessToken]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0d1117] text-[#c9d1d9]">
        <div className="flex min-h-screen items-center justify-center">
          Loading settings...
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[#0d1117] text-[#c9d1d9]">
        <div className="flex min-h-screen items-center justify-center text-red-400">
          {error}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0d1117] text-[#c9d1d9]">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-[220px_minmax(0,1fr)] gap-10">
          <section className="min-w-0">
            <Outlet context={{ details, type }} />
          </section>
        </div>
      </div>
    </main>
  );
}

export default WorkspaceSettingsLayout;
