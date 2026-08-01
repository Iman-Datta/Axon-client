import { useEffect, useRef, useState } from "react";
import { X, ChevronDown, Plus, Minus } from "lucide-react";

import StoryPointStepper from "./StoryPointStepper";

function TicketFormModal({
  mode = "create",
  ticket = null,
  epics,
  members,
  onClose,
  onSubmit,
  loading = false,
  error,
}) {
  const modalRef = useRef(null);

  const [showAdvanced, setShowAdvanced] = useState(mode === "edit");

  const buildInitialState = (t) => ({
    title: t?.title || "",
    description: t?.description || "",
    epic: t?.epic?.id ? String(t.epic.id) : "",
    story_points: t?.story_points ?? 1,
    assignee: t?.assignee?.id ? String(t.assignee.id) : "",
    status: t?.status || "DRAFT",
    kanban_column: t?.kanban_column || "TODO",
    priority: t?.priority || "MEDIUM",
    type: t?.type || "TASK",
    estimated_hours: t?.estimated_hours ?? "",
    due_date: t?.due_date ? t.due_date.slice(0, 10) : "",
  });

  const [formData, setFormData] = useState(buildInitialState(ticket));

  useEffect(() => {
    if (!ticket) return;
    setFormData(buildInitialState(ticket));
  }, [ticket]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Status has a side effect: leaving Draft auto-opens Advanced Options
  // so priority/type/etc. (which meaningfully matter once work starts) are visible.
  const handleStatusChange = (e) => {
    const value = e.target.value;

    setFormData((prev) => ({ ...prev, status: value }));

    if (value !== "DRAFT") {
      setShowAdvanced(true);
    }
  };

  const handleEstimatedHoursStep = (delta) => {
    setFormData((prev) => {
      const current =
        prev.estimated_hours === "" ? 0 : Number(prev.estimated_hours);
      const next = Math.max(0, current + delta);
      return { ...prev, estimated_hours: next === 0 ? "" : next };
    });
  };

  const handleEstimatedHoursInput = (e) => {
    const raw = e.target.value;

    if (raw === "") {
      setFormData((prev) => ({ ...prev, estimated_hours: "" }));
      return;
    }

    const parsed = Math.max(0, Math.floor(Number(raw)));

    if (!Number.isNaN(parsed)) {
      setFormData((prev) => ({ ...prev, estimated_hours: parsed }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      epic_id: formData.epic ? Number(formData.epic) : null,
      assignee: formData.assignee ? Number(formData.assignee) : null,
      estimated_hours:
        formData.estimated_hours === ""
          ? null
          : Number(formData.estimated_hours),
      due_date: formData.due_date || null,
    };

    delete payload.epic;

    onSubmit(payload);
  };

  const inputClass =
    "mt-2 w-full rounded-xl border border-[#30363d] bg-[#0d1117] px-4 py-3 text-sm text-[#e6edf3] placeholder:text-[#6e7681] outline-none transition-all focus:border-[#58a6ff] focus:ring-2 focus:ring-[#58a6ff]/20";

  const selectClass = `${inputClass} appearance-none pr-10`;

  return (
    <div
      onMouseDown={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
    >
      <div
        ref={modalRef}
        onMouseDown={(e) => e.stopPropagation()}
        className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-[#30363d] bg-[#161b22] shadow-[0_20px_80px_rgba(0,0,0,0.65)]"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#30363d] px-6 py-5">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold text-[#e6edf3]">
                {mode === "create" ? "Create Ticket" : "Edit Ticket"}
              </h2>

              {mode === "edit" && ticket?.ticket_number && (
                <span className="rounded-md bg-[#0d1117] px-2 py-1 font-mono text-[11px] font-medium text-[#6e7681] ring-1 ring-[#30363d]">
                  {ticket.ticket_number}
                </span>
              )}
            </div>

            <p className="mt-1 text-sm text-[#8b949e]">
              {mode === "create"
                ? "Add a new work item to your project."
                : "Update the details of this work item."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-[#8b949e] transition-colors hover:bg-[#21262d] hover:text-[#e6edf3]"
          >
            <X size={20} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-1 flex-col overflow-hidden"
        >
          <div className="custom-scrollbar flex-1 space-y-8 overflow-y-auto px-6 py-6">
            {/* Basic */}
            <section>
              <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#6e7681]">
                Basic Information
              </h3>

              <div className="space-y-5">
                <div>
                  <label className="text-sm font-medium text-[#8b949e]">
                    Title <span className="text-red-400">*</span>
                  </label>

                  <input
                    required
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Implement authentication flow"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-[#8b949e]">
                    Description
                  </label>

                  <textarea
                    rows={5}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Add details about this ticket..."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-5">
                  {/* Epic */}
                  <div>
                    <label className="text-sm font-medium text-[#8b949e]">
                      Epic
                    </label>

                    <div className="relative">
                      <select
                        name="epic"
                        value={formData.epic}
                        onChange={handleChange}
                        className={selectClass}
                      >
                        <option value="">Select Epic</option>

                        {epics.map((epic) => (
                          <option key={epic.id} value={epic.id}>
                            {epic.name}
                          </option>
                        ))}
                      </select>

                      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6e7681]" />
                    </div>
                  </div>

                  {/* Story Points */}
                  <div>
                    <label className="text-sm font-medium text-[#8b949e]">
                      Story Points
                    </label>

                    <div className="mt-3">
                      <StoryPointStepper
                        value={formData.story_points}
                        onChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            story_points: value,
                          }))
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div>
              <label className="text-sm font-medium text-[#8b949e]">
                Status
              </label>

              <div className="relative">
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleStatusChange}
                  className={selectClass}
                >
                  <option value="DRAFT">Draft</option>
                  <option value="OPEN">Open</option>
                  <option value="BLOCKED">Blocked</option>
                  <option value="DONE">Done</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>

                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6e7681]" />
              </div>
            </div>

            {/* Advanced */}
            <button
              type="button"
              onClick={() => setShowAdvanced((prev) => !prev)}
              className="flex w-fit items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-[#58a6ff] transition-colors hover:bg-[#21262d]"
            >
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  showAdvanced ? "rotate-180" : ""
                }`}
              />
              Advanced Options
            </button>

            {showAdvanced && (
              <div className="grid grid-cols-2 gap-5 rounded-2xl border border-[#30363d] bg-[#0d1117]/50 p-5">
                <div>
                  <label className="text-sm font-medium text-[#8b949e]">
                    Assignee
                  </label>

                  <div className="relative">
                    <select
                      name="assignee"
                      value={formData.assignee}
                      onChange={handleChange}
                      className={selectClass}
                    >
                      <option value="">Unassigned</option>

                      {members.map((member) => (
                        <option key={member.id} value={member.id}>
                          {member.username}
                        </option>
                      ))}
                    </select>

                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6e7681]" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-[#8b949e]">
                    Kanban Column
                  </label>

                  <select
                    name="kanban_column"
                    value={formData.kanban_column}
                    onChange={handleChange}
                    className={selectClass}
                  >
                    <option value="BACKLOG">Backlog</option>
                    <option value="TODO">To Do</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="REVIEW">Review</option>
                    <option value="DONE">Done</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-[#8b949e]">
                    Priority
                  </label>

                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className={selectClass}
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                    <option value="URGENT">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-[#8b949e]">
                    Type
                  </label>

                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className={selectClass}
                  >
                    <option value="TASK">Task</option>
                    <option value="BUG">Bug</option>
                    <option value="STORY">Story</option>
                    <option value="FEATURE">Feature</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-[#8b949e]">
                    Estimated Hours
                  </label>

                  <div className="mt-2 flex items-stretch overflow-hidden rounded-xl border border-[#30363d] bg-[#0d1117] transition-all focus-within:border-[#58a6ff] focus-within:ring-2 focus-within:ring-[#58a6ff]/20">
                    <button
                      type="button"
                      onClick={() => handleEstimatedHoursStep(-1)}
                      disabled={
                        formData.estimated_hours === "" ||
                        Number(formData.estimated_hours) <= 0
                      }
                      className="flex w-10 shrink-0 items-center justify-center text-[#8b949e] transition-colors hover:bg-[#21262d] hover:text-[#e6edf3] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>

                    <input
                      type="number"
                      inputMode="numeric"
                      step={1}
                      min={0}
                      name="estimated_hours"
                      value={formData.estimated_hours}
                      onChange={handleEstimatedHoursInput}
                      onKeyDown={(e) => {
                        if (e.key === "-" || e.key === "." || e.key === "e") {
                          e.preventDefault();
                        }
                      }}
                      placeholder="0"
                      className="w-full border-x border-[#30363d] bg-transparent px-3 py-3 text-center text-sm text-[#e6edf3] outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    />

                    <button
                      type="button"
                      onClick={() => handleEstimatedHoursStep(1)}
                      className="flex w-10 shrink-0 items-center justify-center text-[#8b949e] transition-colors hover:bg-[#21262d] hover:text-[#e6edf3]"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-[#8b949e]">
                    Due Date
                  </label>

                  <input
                    type="date"
                    name="due_date"
                    value={formData.due_date}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              </div>
            )}

            {error && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t border-[#30363d] bg-[#0d1117] px-6 py-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-[#30363d] bg-[#161b22] px-5 py-2.5 text-sm font-medium text-[#c9d1d9] transition-all hover:border-[#484f58] hover:bg-[#21262d]"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className={`rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-all ${
                loading
                  ? "cursor-not-allowed bg-[#30363d] text-[#8b949e]"
                  : "bg-[#238636] hover:bg-[#2ea043] hover:shadow-[0_0_20px_rgba(46,160,67,0.3)]"
              }`}
            >
              {loading
                ? mode === "create"
                  ? "Creating..."
                  : "Saving..."
                : mode === "create"
                  ? "Create Ticket"
                  : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TicketFormModal;
