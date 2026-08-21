import { useEffect, useRef, useState } from "react";
import { X, ChevronDown, Search, Rocket, ArrowLeft } from "lucide-react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import StoryPointStepper from "./StoryPointStepper";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";

const API = import.meta.env.VITE_API_URL;

function MoveToBoardModal({
  ticket,
  epics = [],
  members: initialMembers = [],
  onClose,
  onConfirm,
  loading = false,
  error,
}) {
  const modalRef = useRef(null);
  const [step, setStep] = useState("form"); // "form" | "confirm"
  const [validationError, setValidationError] = useState(null);

  const { slug, project_slug } = useParams();
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);

  const [formData, setFormData] = useState({
    title: ticket?.title || "",
    description: ticket?.description || "",
    epic: ticket?.epic?.id ? String(ticket.epic.id) : "",
    story_points: ticket?.story_points ?? 1,
    assignee: ticket?.assignee?.id ? String(ticket.assignee.id) : "",
    priority: ticket?.priority || "MEDIUM",
    type: ticket?.type || "TASK",
    due_date: ticket?.due_date ? ticket.due_date.slice(0, 10) : "",
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ---- assignee search (mandatory) ----
  const [memberOptions, setMemberOptions] = useState(initialMembers);
  const [memberQuery, setMemberQuery] = useState("");
  const [membersLoading, setMembersLoading] = useState(false);
  const [membersError, setMembersError] = useState(null);
  const [showMemberDropdown, setShowMemberDropdown] = useState(false);
  const memberFieldRef = useRef(null);

  useEffect(() => {
    if (!slug || !project_slug) return;
    let cancelled = false;

    async function fetchMembers() {
      setMembersLoading(true);
      setMembersError(null);
      try {
        const res = await fetchWithAuth(
          `${API}/projects/${slug}/${project_slug}/members/`,
          {},
          dispatch,
          accessToken,
        );
        if (!res.ok) throw new Error("Failed to load members");
        const data = await res.json();
        if (!cancelled && data?.success) {
          setMemberOptions(data.members || []);
        }
      } catch (err) {
        if (!cancelled)
          setMembersError(err.message || "Failed to load members");
      } finally {
        if (!cancelled) setMembersLoading(false);
      }
    }

    fetchMembers();
    return () => {
      cancelled = true;
    };
  }, [slug, project_slug, accessToken, dispatch]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        memberFieldRef.current &&
        !memberFieldRef.current.contains(e.target)
      ) {
        setShowMemberDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedMember = memberOptions.find(
    (m) => String(m.id) === String(formData.assignee),
  );

  const filteredMembers = memberOptions
    .filter((m) => {
      const q = memberQuery.trim().toLowerCase();
      if (!q) return true;
      const fullName =
        `${m.first_name || ""} ${m.last_name || ""}`.toLowerCase();
      return (
        m.username?.toLowerCase().includes(q) ||
        m.github_username?.toLowerCase().includes(q) ||
        fullName.includes(q)
      );
    })
    .slice(0, 3);

  const handleSelectMember = (member) => {
    setFormData((prev) => ({
      ...prev,
      assignee: member ? String(member.id) : "",
    }));
    setMemberQuery("");
    setShowMemberDropdown(false);
  };

  const selectedEpic =
    epics.find((e) => String(e.id) === String(formData.epic)) ||
    (ticket?.epic
      ? { id: ticket.epic.id, name: ticket.epic.name, color: ticket.epic.color }
      : null);

  const epicOptions = epics.length
    ? epics
    : ticket?.epic
      ? [{ id: ticket.epic.id, name: ticket.epic.name }]
      : [];

  const inputClass =
    "mt-2 w-full rounded-xl border border-[#30363d] bg-[#0d1117] px-4 py-3 text-sm text-[#e6edf3] placeholder:text-[#6e7681] outline-none transition-all focus:border-[#58a6ff] focus:ring-2 focus:ring-[#58a6ff]/20";
  const selectClass = `${inputClass} appearance-none pr-10`;
  const labelClass = "text-sm font-medium text-[#8b949e]";

  const buildPayload = () => ({
    title: formData.title,
    description: formData.description,
    epic_id: formData.epic ? Number(formData.epic) : null,
    story_points: formData.story_points,
    assignee: formData.assignee ? Number(formData.assignee) : null,
    priority: formData.priority,
    type: formData.type,
    due_date: formData.due_date || null,
  });

  const handleReview = (e) => {
    e.preventDefault();
    setValidationError(null);

    if (!formData.title.trim()) return setValidationError("Title is required.");
    if (!formData.description.trim())
      return setValidationError("Description is required.");
    if (!formData.epic) return setValidationError("Epic is required.");
    if (!formData.assignee) return setValidationError("Assignee is required.");
    if (!formData.due_date) return setValidationError("Due date is required.");

    setStep("confirm");
  };

  const handleConfirm = () => {
    onConfirm(buildPayload());
  };

  const priorityLabels = {
    LOW: "Low",
    MEDIUM: "Medium",
    HIGH: "High",
    URGENT: "Urgent",
  };
  const typeLabels = {
    TASK: "Task",
    BUG: "Bug",
    IMPROVEMENT: "Improvement",
    FEATURE: "Feature",
  };

  return (
    <div
      onMouseDown={handleBackdropClick}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
    >
      <div
        ref={modalRef}
        onMouseDown={(e) => e.stopPropagation()}
        className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-[#30363d] bg-[#161b22] shadow-[0_20px_80px_rgba(0,0,0,0.65)]"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#30363d] px-6 py-5">
          <div>
            <div className="flex items-center gap-2.5">
              {step === "confirm" && (
                <button
                  type="button"
                  onClick={() => setStep("form")}
                  className="rounded-lg p-1 text-[#8b949e] hover:bg-[#21262d] hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
              )}
              <h2 className="text-xl font-semibold text-[#e6edf3]">
                {step === "form" ? "Add to Sprint" : "Confirm & Send to Board"}
              </h2>
              {ticket?.ticket_number && (
                <span className="rounded-md bg-[#0d1117] px-2 py-0.5 font-mono text-[11px] font-medium text-[#6e7681] ring-1 ring-[#30363d]">
                  {ticket.ticket_number}
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-[#8b949e]">
              {step === "form"
                ? "Fill in every field before this ticket can go live on the board."
                : "Review the details below — this will move the ticket to OPEN."}
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

        {step === "form" ? (
          <form
            onSubmit={handleReview}
            className="flex flex-1 flex-col overflow-hidden"
          >
            <div className="custom-scrollbar flex-1 space-y-6 overflow-y-auto px-6 py-6">
              <div>
                <label className={labelClass}>
                  Title <span className="text-red-400">*</span>
                </label>
                <input
                  required
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  Description <span className="text-red-400">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className={`${inputClass} resize-none`}
                />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>
                    Epic <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <select
                      required
                      name="epic"
                      value={formData.epic}
                      onChange={handleChange}
                      className={selectClass}
                    >
                      <option value="">Select Epic</option>
                      {epicOptions.map((epic) => (
                        <option key={epic.id} value={epic.id}>
                          {epic.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6e7681]" />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Story Points</label>
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

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>Priority</label>
                  <div className="relative">
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
                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6e7681]" />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Type</label>
                  <div className="relative">
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className={selectClass}
                    >
                      <option value="TASK">Task</option>
                      <option value="BUG">Bug</option>
                      <option value="IMPROVEMENT">Improvement</option>
                      <option value="FEATURE">Feature</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6e7681]" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div ref={memberFieldRef} className="relative">
                  <label className={labelClass}>
                    Assignee <span className="text-red-400">*</span>
                  </label>
                  <div className="relative mt-2">
                    {selectedMember ? (
                      <div className="flex items-center justify-between rounded-xl border border-[#30363d] bg-[#0d1117] px-3.5 py-2.5">
                        <div className="flex min-w-0 items-center gap-2.5">
                          <img
                            src={selectedMember.avatar}
                            alt=""
                            className="h-6 w-6 shrink-0 rounded-full ring-1 ring-[#30363d]"
                          />
                          <div className="min-w-0 leading-tight">
                            <p className="truncate text-sm text-[#e6edf3]">
                              {selectedMember.first_name}{" "}
                              {selectedMember.last_name}
                            </p>
                            <p className="truncate text-xs text-[#6e7681]">
                              @{selectedMember.username}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleSelectMember(null)}
                          className="ml-2 shrink-0 rounded-md p-1 text-[#8b949e] transition-colors hover:bg-[#21262d] hover:text-[#e6edf3]"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div className="relative">
                        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6e7681]" />
                        <input
                          type="text"
                          value={memberQuery}
                          onChange={(e) => {
                            setMemberQuery(e.target.value);
                            setShowMemberDropdown(true);
                          }}
                          onFocus={() => setShowMemberDropdown(true)}
                          placeholder="Search members..."
                          className={`${inputClass} pl-10`}
                          autoComplete="off"
                        />
                      </div>
                    )}

                    {showMemberDropdown && !selectedMember && (
                      <div className="absolute z-20 mt-1.5 w-full overflow-hidden rounded-xl border border-[#30363d] bg-[#161b22] shadow-2xl">
                        {membersLoading ? (
                          <div className="px-4 py-3 text-sm text-[#8b949e]">
                            Loading members...
                          </div>
                        ) : membersError ? (
                          <div className="px-4 py-3 text-sm text-red-400">
                            {membersError}
                          </div>
                        ) : filteredMembers.length === 0 ? (
                          <div className="px-4 py-3 text-sm text-[#6e7681]">
                            No members found
                          </div>
                        ) : (
                          filteredMembers.map((member) => (
                            <button
                              key={member.id}
                              type="button"
                              onClick={() => handleSelectMember(member)}
                              className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left transition-colors hover:bg-[#21262d]"
                            >
                              <img
                                src={member.avatar}
                                alt=""
                                className="h-6 w-6 shrink-0 rounded-full ring-1 ring-[#30363d]"
                              />
                              <div className="min-w-0 flex-1 leading-tight">
                                <p className="truncate text-sm text-[#e6edf3]">
                                  {member.first_name} {member.last_name}
                                </p>
                                <p className="truncate text-xs text-[#6e7681]">
                                  @{member.username} · {member.role}
                                </p>
                              </div>
                            </button>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className={labelClass}>
                  Due Date <span className="text-red-400">*</span>
                </label>
                <input
                  required
                  type="date"
                  name="due_date"
                  value={formData.due_date}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              {validationError && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  {validationError}
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2.5 border-t border-[#30363d] bg-[#0d1117] px-6 py-5">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-[#30363d] bg-[#161b22] px-5 py-2.5 text-sm font-medium text-[#c9d1d9] transition-all hover:border-[#484f58] hover:bg-[#21262d]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 rounded-xl bg-[#238636] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#2ea043] hover:shadow-[0_0_20px_rgba(46,160,67,0.3)]"
              >
                <Rocket className="h-3.5 w-3.5" />
                Review & Send
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="custom-scrollbar flex-1 space-y-5 overflow-y-auto px-6 py-6">
              <div className="rounded-2xl border border-[#30363d] bg-[#0d1117] p-5">
                <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-[#6e7681]">
                  Title
                </p>
                <p className="text-sm font-medium text-[#e6edf3]">
                  {formData.title}
                </p>

                <p className="mb-1.5 mt-4 text-[11px] font-semibold uppercase tracking-wide text-[#6e7681]">
                  Description
                </p>
                <p className="text-sm leading-relaxed text-[#c9d1d9]">
                  {formData.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-[#30363d] bg-[#0d1117] p-4">
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-[#6e7681]">
                    Epic
                  </p>
                  <p className="text-sm text-[#e6edf3]">
                    {selectedEpic?.name || "—"}
                  </p>
                </div>
                <div className="rounded-2xl border border-[#30363d] bg-[#0d1117] p-4">
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-[#6e7681]">
                    Story Points
                  </p>
                  <p className="text-sm text-[#e6edf3]">
                    {formData.story_points}
                  </p>
                </div>
                <div className="rounded-2xl border border-[#30363d] bg-[#0d1117] p-4">
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-[#6e7681]">
                    Priority
                  </p>
                  <p className="text-sm text-[#e6edf3]">
                    {priorityLabels[formData.priority]}
                  </p>
                </div>
                <div className="rounded-2xl border border-[#30363d] bg-[#0d1117] p-4">
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-[#6e7681]">
                    Type
                  </p>
                  <p className="text-sm text-[#e6edf3]">
                    {typeLabels[formData.type]}
                  </p>
                </div>
                <div className="rounded-2xl border border-[#30363d] bg-[#0d1117] p-4">
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-[#6e7681]">
                    Assignee
                  </p>
                  <p className="text-sm text-[#e6edf3]">
                    {selectedMember
                      ? `${selectedMember.first_name} ${selectedMember.last_name}`
                      : "—"}
                  </p>
                </div>

                <div className="col-span-2 rounded-2xl border border-[#30363d] bg-[#0d1117] p-4">
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-[#6e7681]">
                    Due Date
                  </p>
                  <p className="text-sm text-[#e6edf3]">{formData.due_date}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-[#388bfd]/30 bg-[#388bfd]/10 px-4 py-3 text-sm text-[#79c0ff]">
                <Rocket className="h-4 w-4 shrink-0" />
                Confirming will set this ticket's status to{" "}
                <span className="font-semibold">OPEN</span> and put it on the
                board.
              </div>

              {error && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  {error}
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2.5 border-t border-[#30363d] bg-[#0d1117] px-6 py-5">
              <button
                type="button"
                onClick={() => setStep("form")}
                disabled={loading}
                className="rounded-xl border border-[#30363d] bg-[#161b22] px-5 py-2.5 text-sm font-medium text-[#c9d1d9] transition-all hover:border-[#484f58] hover:bg-[#21262d] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                disabled={loading}
                className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-all ${
                  loading
                    ? "cursor-not-allowed bg-[#30363d] text-[#8b949e]"
                    : "bg-[#238636] hover:bg-[#2ea043] hover:shadow-[0_0_20px_rgba(46,160,67,0.3)]"
                }`}
              >
                <Rocket className="h-3.5 w-3.5" />
                {loading ? "Sending..." : "Confirm & Send to Board"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default MoveToBoardModal;
