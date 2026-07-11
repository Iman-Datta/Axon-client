import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchWithAuth } from "../../utils/fetchWithAuth";
import OrganizationHeader from "../../components/organization/OrganizationHeader";

const API = import.meta.env.VITE_API_URL;

function OrganizationDetailsPage() {
  const { slug } = useParams();

  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);

  const [organization, setOrganization] = useState(null);

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

        if (response.ok) {
          setOrganization(data.organization);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchOrganization();
  }, [slug, dispatch, accessToken]);

  if (!organization) {
    return (
      <main className="min-h-screen bg-[#0d1117] text-white pt-20">
        <div className="max-w-7xl mx-auto px-6">Loading...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0d1117] text-[#c9d1d9] pt-20">
      <div className="max-w-7xl mx-auto px-6">
        <OrganizationHeader organization={organization} />

        <div className="mt-12">
          <h2 className="text-5xl font-bold text-white mb-4">
            Welcome to {organization.name}
          </h2>

          <p className="text-xl text-[#8b949e]">{organization.description}</p>
        </div>
      </div>
    </main>
  );
}

export default OrganizationDetailsPage;
