import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import EpicHeader from "../../components/project/epic/EpicHeader";
import EpicGrid from "../../components/project/epic/EpicGrid";
import CreateEpicModal from "../../components/project/epic/CreateEpicModal";

import useEpics from "../../hooks/useEpics";

import { createEpic } from "../../services/epicService";

function EpicPage() {
  const { slug, project_slug } = useParams();

  const dispatch = useDispatch();

  const accessToken = useSelector((state) => state.auth.accessToken);
  const [submitError, setSubmitError] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const { epics, count, loading, error, refetch } = useEpics(
    slug,
    project_slug,
  );

  useEffect(() => {
    if (!openModal) return;

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setOpenModal(false);
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [openModal]);

  const handleCreateEpic = async (formData) => {
    try {
      setSubmitError("");

      await createEpic(slug, project_slug, formData, dispatch, accessToken);

      setOpenModal(false);

      refetch();
    } catch (err) {
      setSubmitError(err.message);
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div className="mt-18 space-y-8">
      <EpicHeader onCreateEpic={() => setOpenModal(true)} />

      <h1>Total Epics: {count}</h1>

      <EpicGrid epics={epics} />

      {openModal && (
        <CreateEpicModal
          onClose={() => {
            setSubmitError("");
            setOpenModal(false);
          }}
          onSubmit={handleCreateEpic}
          error={submitError}
        />
      )}
    </div>
  );
}

export default EpicPage;
