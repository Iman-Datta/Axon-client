import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchWithAuth } from "../../utils/fetchWithAuth";
import Sidebar from "../settings/workspace/Sidebar";
import SettingsHeader from "../settings/workspace/SettingsHeader";

const API = import.meta.env.VITE_API_URL;

function WorkspaceSettingsLayout({ type }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const { slug } = useParams();

  useEffect(() => {
    async function fetchSettingsDetails() {
      try {
        setLoading(true);
        setError("");

        const url =
          type === "personal" ? `${API}/auth/me/` : `${API}/org/${slug}/`;

        const response = await fetchWithAuth(url, {}, dispatch, accessToken);

        if (!response.ok) {
          throw new Error(`Failed to load workspace (${response.status})`);
        }

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.message || "Failed to load workspace");
        }

        const extracted = type === "personal" ? data.user : data.organization;
        setDetails(extracted);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchSettingsDetails();
  }, [type, dispatch, accessToken, slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0d1117] text-[#c9d1d9]">
        <div className="flex min-h-screen items-center justify-center text-sm text-[#8b949e]">
          Loading settings...
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[#0d1117] text-[#c9d1d9]">
        <div className="flex min-h-screen items-center justify-center text-sm text-[#f85149]">
          {error}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0d1117] text-[#c9d1d9]">
      <div className="mx-auto max-w-6xl px-6 pb-16 pt-16 sm:pt-20">
        <SettingsHeader type={type} details={details} />
        <div className="border-t border-[#21262d]" />
        <div className="grid grid-cols-1 gap-10 pt-10 md:grid-cols-[220px_minmax(0,1fr)]">
          <Sidebar type={type} />
          <section className="min-w-0 md:border-l md:border-[#21262d] md:pl-10">
            <Outlet context={{ details, type, onUpdate: setDetails }} />
          </section>
        </div>
      </div>
    </main>
  );
}

export default WorkspaceSettingsLayout;
