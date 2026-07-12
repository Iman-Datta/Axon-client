import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchWithAuth } from "../../utils/fetchWithAuth";
import OrganizationLayout from "../../components/organization/OrganizationLayout";
import { setCurrentWorkspace } from "../../redux/slices/workspaceSlice";

const API = import.meta.env.VITE_API_URL;

function OrganizationDetailsPage() {
  const { slug } = useParams();

  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);

  const [organization, setOrganization] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrganization() {
      try {
        const response = await fetchWithAuth(
          `${API}/org/${slug}/`,
          {},
          dispatch,
          accessToken,
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch organization.");
        }

        const org = {
          ...data.organization,
          type: "organization",
        };

        setOrganization(org);
        dispatch(setCurrentWorkspace(org));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrganization();
  }, [slug, dispatch, accessToken]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0d1117] text-white pt-20">
        <div className="max-w-7xl mx-auto px-6">Loading...</div>
      </main>
    );
  }

  if (!organization) {
    return (
      <main className="min-h-screen bg-[#0d1117] text-white pt-20">
        <div className="max-w-7xl mx-auto px-6">Organization not found.</div>
      </main>
    );
  }

  return (
    <OrganizationLayout organization={organization}>
      {/* Organization Overview Content */}
    </OrganizationLayout>
  );
}

export default OrganizationDetailsPage;
