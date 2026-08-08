import { useState } from "react";
import { useOutletContext, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AlertTriangle, Loader2, LogOut, Trash2, Clock } from "lucide-react";

import { fetchWithAuth } from "../../../utils/fetchWithAuth";

const API = import.meta.env.VITE_API_URL;

function SectionHeading({ children }) {
  return (
    <h2 className="text-xs font-semibold uppercase tracking-wider text-[#6e7681]">
      {children}
    </h2>
  );
}

function DangerRow({
  title,
  description,
  actionLabel,
  actionIcon: Icon,
  onAction,
  disabled,
  isLoading,
}) {
  return (
    <div className="flex flex-col gap-4 rounded-md border border-[#f85149]/30 bg-[#2d1b1f]/40 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="text-sm font-medium text-[#e6edf3]">{title}</p>
        <p className="mt-1 text-sm text-[#8b949e]">{description}</p>
      </div>
      <button
        type="button"
        onClick={onAction}
        disabled={disabled || isLoading}
        className="flex shrink-0 items-center gap-1.5 rounded-md border border-[#f85149]/40 bg-[#f85149]/10 px-3.5 py-1.5 text-sm font-medium text-[#f85149] transition-colors hover:bg-[#f85149]/20 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? (
          <Loader2 size={14} className="animate-spin" />
        ) : (
          <Icon size={14} />
        )}
        {actionLabel}
      </button>
    </div>
  );
}

function DangerOrg() {
  const { type } = useOutletContext();
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const user = useSelector((state) => state.auth.user);
  const isOrg = type === "organization";

  const [showComingSoon, setShowComingSoon] = useState(false);

  const [confirmingLeave, setConfirmingLeave] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const [leaveError, setLeaveError] = useState(null);

  const handleDeleteAccountClick = () => {
    setShowComingSoon(true);
  };

  const handleLeaveOrg = async () => {
    setIsLeaving(true);
    setLeaveError(null);

    try {
      const response = await fetchWithAuth(
        `${API}/org/${slug}/leave/`,
        { method: "DELETE" },
        dispatch,
        accessToken,
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok || data.success === false) {
        throw new Error(
          data?.message || "Couldn't leave the organization. Try again.",
        );
      }

      navigate(`/${user.username}`, { replace: true });
    } catch (err) {
      setLeaveError(err.message || "Something went wrong. Try again.");
      setIsLeaving(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <div>
        <h1 className="text-base font-semibold text-[#e6edf3]">Danger Zone</h1>
        <p className="mt-1 text-sm text-[#8b949e]">
          {isOrg
            ? "Leaving this organization removes your access immediately."
            : "Deleting your account is permanent and cannot be undone."}
        </p>
      </div>

      <div className="mt-8 space-y-5">
        <SectionHeading>
          <span className="flex items-center gap-1.5 text-[#f85149]">
            <AlertTriangle size={13} />
            Irreversible actions
          </span>
        </SectionHeading>

        {isOrg ? (
          <>
            {!confirmingLeave ? (
              <DangerRow
                title="Leave organization"
                description="You'll lose access to this organization's projects, teams, and settings. You can be re-invited later by a member with permission."
                actionLabel="Leave organization"
                actionIcon={LogOut}
                onAction={() => setConfirmingLeave(true)}
              />
            ) : (
              <div className="rounded-md border border-[#f85149]/40 bg-[#2d1b1f]/60 p-4">
                <p className="text-sm font-medium text-[#e6edf3]">
                  Are you sure you want to leave this organization?
                </p>
                <p className="mt-1 text-sm text-[#8b949e]">
                  This action can't be undone from here — you'd need a new
                  invite to rejoin.
                </p>

                {leaveError && (
                  <p className="mt-3 text-sm text-[#f85149]">{leaveError}</p>
                )}

                <div className="mt-4 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleLeaveOrg}
                    disabled={isLeaving}
                    className="flex items-center gap-1.5 rounded-md bg-[#f85149] px-3.5 py-1.5 text-sm font-medium text-white transition-colors hover:bg-[#da3633] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isLeaving ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <LogOut size={14} />
                    )}
                    {isLeaving ? "Leaving…" : "Yes, leave organization"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setConfirmingLeave(false);
                      setLeaveError(null);
                    }}
                    disabled={isLeaving}
                    className="rounded-md border border-[#30363d] px-3.5 py-1.5 text-sm text-[#c9d1d9] transition-colors hover:border-[#8b949e] hover:bg-[#161b22] disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <DangerRow
              title="Delete account"
              description="Permanently remove your account and all associated data. This cannot be undone."
              actionLabel="Delete account"
              actionIcon={Trash2}
              onAction={handleDeleteAccountClick}
            />

            {showComingSoon && (
              <div className="flex items-center gap-2 rounded-md border border-[#30363d] bg-[#161b22] px-3.5 py-3 text-sm text-[#8b949e]">
                <Clock size={15} className="shrink-0 text-[#8b949e]" />
                Account deletion isn't available yet — this is coming in a
                future update.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default DangerOrg;
