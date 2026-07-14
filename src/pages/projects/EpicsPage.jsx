import { useState } from "react";
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

  const [openModal, setOpenModal] = useState(false);

  const { epics, count, loading, error, refetch } = useEpics(
    slug,
    project_slug,
  );

  const handleCreateEpic = async (formData) => {
    try {
      await createEpic(slug, project_slug, formData, dispatch, accessToken);

      setOpenModal(false);

      await refetch();
    } catch (error) {
      console.log(error);
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
          onClose={() => setOpenModal(false)}
          onSubmit={handleCreateEpic}
        />
      )}
    </div>
  );
}

export default EpicPage;
