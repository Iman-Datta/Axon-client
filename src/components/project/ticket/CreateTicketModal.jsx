import { useEffect, useRef, useState } from "react";
import { X, ChevronDown } from "lucide-react";

import StoryPointStepper from "./StoryPointStepper";

function CreateTicketModal({ epics, members, onClose, onSubmit }) {
  const modalRef = useRef(null);

  const [showAdvanced, setShowAdvanced] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    epic: "",
    story_points: 1,
    assignee: "",
    status: "OPEN",
    kanban_column: "TODO",
    priority: "MEDIUM",
    type: "TASK",
    estimated_hours: "",
    due_date: "",
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      epic_id: formData.epic ? Number(formData.epic) : null,
      assignee: formData.assignee ? Number(formData.assignee) : null,
      estimated_hours: formData.estimated_hours || null,
      due_date: formData.due_date || null,
    };

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
            <h2 className="text-xl font-semibold text-[#e6edf3]">
              Create Ticket
            </h2>

            <p className="mt-1 text-sm text-[#8b949e]">
              Add a new work item to your project.
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
              </div>
            </section>

            {/* Assignment */}
            <section>
              <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#6e7681]">
                Assignment
              </h3>

              <div className="grid grid-cols-2 gap-5">
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
              </div>
            </section>

            {/* Planning */}
            <section>
              <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#6e7681]">
                Planning
              </h3>

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
            </section>

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
                    Status
                  </label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className={selectClass}
                  >
                    <option value="OPEN">Open</option>
                    <option value="BLOCKED">Blocked</option>
                    <option value="DONE">Done</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
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

                  <input
                    type="number"
                    step="0.5"
                    name="estimated_hours"
                    value={formData.estimated_hours}
                    onChange={handleChange}
                    className={inputClass}
                  />
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
              className="rounded-xl bg-[#238636] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#2ea043] hover:shadow-[0_0_20px_rgba(46,160,67,0.3)]"
            >
              Create Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTicketModal;
