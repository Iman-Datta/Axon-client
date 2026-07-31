// components/project/epic/EpicGrid.jsx
import { useState, useEffect, useCallback } from "react";
import EpicCard from "./EpicCard";
import EpicDetailDrawer from "./EpicDetailDrawer";
import { Layers } from "lucide-react";

const CLOSE_ANIMATION_MS = 250;

function EpicGrid({ epics, onEdit, onDelete }) {
  const [selectedEpic, setSelectedEpic] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Open on next frame so the panel actually transitions from off-screen
  const handleCardClick = useCallback((epic) => {
    setSelectedEpic(epic);
    requestAnimationFrame(() => setDrawerOpen(true));
  }, []);

  const handleClose = useCallback(() => {
    setDrawerOpen(false);
    // keep the epic mounted until the close transition finishes
    setTimeout(() => setSelectedEpic(null), CLOSE_ANIMATION_MS);
  }, []);

  // Esc to close
  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e) => e.key === "Escape" && handleClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawerOpen, handleClose]);

  if (epics.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-[#30363d] bg-[#161b22] p-10 text-center">
        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#0d1117] ring-1 ring-[#30363d]">
          <Layers className="h-5 w-5 text-[#8b949e]" />
        </div>
        <h3 className="mt-3 text-sm font-semibold text-[#e6edf3]">
          No epics yet
        </h3>
        <p className="mt-1 text-xs text-[#8b949e]">
          Create your first epic to organize related tickets.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {epics.map((epic) => (
          <EpicCard
            key={epic.id}
            epic={epic}
            onClick={handleCardClick}
            active={selectedEpic?.id === epic.id && drawerOpen}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>

      {selectedEpic && (
        <EpicDetailDrawer
          epic={selectedEpic}
          open={drawerOpen}
          onClose={handleClose}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
    </>
  );
}

export default EpicGrid;
