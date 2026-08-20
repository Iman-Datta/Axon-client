import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import EpicHeader from "../../components/project/epic/EpicHeader";
import EpicGrid from "../../components/project/epic/EpicGrid";
import EpicFormModal from "../../components/project/epic/EpicFormModal";
import ConfirmDeleteModal from "../../components/project/epic/ConfirmDeleteModal";

import useEpics from "../../hooks/useEpics";

import { createEpic, updateEpic, deleteEpic } from "../../services/epicService";

// Skeleton Component matching EpicCard layout
function EpicSkeletonGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div
          key={item}
          className="relative overflow-hidden rounded-xl border border-[#30363d] bg-[#161b22] p-4 pl-5 shadow-sm"
        >
          {/* Accent strip skeleton */}
          <div className="absolute bottom-0 left-0 top-0 w-1 bg-[#21262d]" />

          {/* Header Title Skeleton */}
          <div className="flex items-center justify-between pr-4">
            <div className="h-5 w-1/2 animate-pulse rounded bg-[#21262d]" />
          </div>

          {/* Description Lines Skeleton */}
          <div className="mt-3 space-y-2">
            <div className="h-3 w-full animate-pulse rounded bg-[#21262d]" />
            <div className="h-3 w-3/4 animate-pulse rounded bg-[#21262d]" />
          </div>

          {/* Progress Bar Skeleton */}
          <div className="mt-4 space-y-2">
            <div className="flex justify-between">
              <div className="h-3 w-20 animate-pulse rounded bg-[#21262d]" />
              <div className="h-3 w-8 animate-pulse rounded bg-[#21262d]" />
            </div>
            <div className="h-1.5 w-full animate-pulse rounded-full bg-[#21262d]" />
          </div>

          {/* Footer Skeleton */}
          <div className="mt-4 flex items-center justify-between border-t border-[#21262d] pt-3">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 animate-pulse rounded-full bg-[#21262d]" />
              <div className="h-3 w-16 animate-pulse rounded bg-[#21262d]" />
            </div>
            <div className="h-3 w-20 animate-pulse rounded bg-[#21262d]" />
          </div>
        </div>
      ))}
    </div>
  );
}

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

  const { epics, count, can_edit, loading, error, refetch } = useEpics(
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

  if (error) {
    return <h1 className="mt-22 px-4 text-red-500">{error}</h1>;
  }

  return (
    <div className="mt-22 space-y-3 px-2">
      <EpicHeader
        count={count}
        can_edit={can_edit}
        onCreateEpic={openCreateModal}
      />

      {loading ? (
        <EpicSkeletonGrid />
      ) : (
        <EpicGrid
          epics={epics}
          can_edit={can_edit}
          onEdit={openEditModal}
          onDelete={openDeleteConfirm}
        />
      )}

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
