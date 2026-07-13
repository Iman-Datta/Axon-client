import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrganizationMembers } from "../services/organizationService";

export function useOrganizationMembers() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);

  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMembers();
  }, [slug]);

  async function fetchMembers() {
    try {
      setLoading(true);

      const response = await getOrganizationMembers(
        slug,
        accessToken,
        dispatch,
      );

      const data = await response.json();

      if (response.ok) {
        setMembers(data.members);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return {
    members,
    loading,
    refetch: fetchMembers,
  };
}
