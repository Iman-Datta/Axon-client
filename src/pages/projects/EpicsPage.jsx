import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import EpicHeader from "../../components/project/epic/EpicHeader";
import EpicGrid from "../../components/project/epic/EpicGrid";
import EpicFormModal from "../../components/project/epic/EpicFormModal";
import ConfirmDeleteModal from "../../components/project/epic/ConfirmDeleteModal";

import useEpics from "../../hooks/useEpics";

import { createEpic, updateEpic, deleteEpic } from "../../services/epicService";

function EpicPage() {
  const { slug, project_slug } = useParams();

  const dispatch = useDispatch();

  const accessToken = useSelector((state) => state.auth.accessToken);

  // create / edit modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [selectedEpic, setSelectedEpic] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // delete confirm state
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const { epics, count, loading, error, refetch } = useEpics(
    slug,
    project_slug,
  );

  const closeModal = useCallback(() => {
    setSubmitError("");
    setModalMode("create");
    setSelectedEpic(null);
    setModalOpen(false);
  }, []);

  useEffect(() => {
    if (!modalOpen && !deleteTarget) return;

    const handleEsc = (e) => {
      if (e.key !== "Escape") return;

      if (deleteTarget) {
        setDeleteTarget(null);
        setDeleteError("");
      } else if (modalOpen) {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [modalOpen, deleteTarget, closeModal]);

  const openCreateModal = () => {
    setModalMode("create");
    setSelectedEpic(null);
    setSubmitError("");
    setModalOpen(true);
  };

  const openEditModal = (epic) => {
    setModalMode("edit");
    setSelectedEpic(epic);
    setSubmitError("");
    setModalOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
      setSubmitError("");
      setSubmitLoading(true);

      if (modalMode === "edit" && selectedEpic) {
        await updateEpic(
          slug,
          project_slug,
          selectedEpic.id,
          formData,
          dispatch,
          accessToken,
        );
      } else {
        await createEpic(slug, project_slug, formData, dispatch, accessToken);
      }

      closeModal();
      refetch();
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  const openDeleteConfirm = (epic) => {
    setDeleteError("");
    setDeleteTarget(epic);
  };

  const closeDeleteConfirm = () => {
    if (deleteLoading) return;
    setDeleteTarget(null);
    setDeleteError("");
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      setDeleteLoading(true);
      setDeleteError("");

      await deleteEpic(
        slug,
        project_slug,
        deleteTarget.id,
        dispatch,
        accessToken,
      );

      setDeleteTarget(null);
      refetch();
    } catch (err) {
      setDeleteError(err.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div className="mt-22 space-y-3 px-2">
      <EpicHeader count={count} onCreateEpic={openCreateModal} />

      <EpicGrid
        epics={epics}
        onEdit={openEditModal}
        onDelete={openDeleteConfirm}
      />

      {modalOpen && (
        <EpicFormModal
          mode={modalMode}
          epic={selectedEpic}
          onClose={closeModal}
          onSubmit={handleFormSubmit}
          loading={submitLoading}
          error={submitError}
        />
      )}

      {deleteTarget && (
        <ConfirmDeleteModal
          epic={deleteTarget}
          onCancel={closeDeleteConfirm}
          onConfirm={handleConfirmDelete}
          loading={deleteLoading}
          error={deleteError}
        />
      )}
    </div>
  );
}

export default EpicPage;
