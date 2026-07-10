import { useMemo } from "react";
import { CheckCircle2, Circle, X } from "lucide-react";

function ProfileChecklist({ user }) {
  const STORAGE_KEY = "axon-profile-checklist-hidden";

  const checklist = useMemo(
    () => [
      {
        id: "username",
        label: "Username created",
        done: !!user?.username,
      },
      {
        id: "email",
        label: "Email verified",
        done: !!user?.is_email_verified,
      },
      {
        id: "github",
        label: "GitHub connected",
        done: !!user?.github_profile,
      },
      {
        id: "profile",
        label: "Profile completed",
        done: !!user?.is_profile_completed,
      },
    ],
    [user],
  );

  const completedCount = checklist.filter((item) => item.done).length;

  const progress = Math.round((completedCount / checklist.length) * 100);

  const allCompleted = completedCount === checklist.length;

  const isHidden = localStorage.getItem(STORAGE_KEY) === "true";

  if (isHidden || allCompleted) {
    return null;
  }

  return (
    <div className="border border-[#30363d] bg-linear-to-br from-[#161b22] to-[#0d1117] rounded-2xl p-5 mb-6 relative">
      <button
        onClick={() => {
          localStorage.setItem(STORAGE_KEY, "true");
          window.location.reload();
        }}
        className="absolute top-4 right-4 text-[#8b949e] hover:text-white"
      >
        <X size={16} />
      </button>

      <h3 className="text-base font-semibold text-[#e6edf3]">
        Welcome to Axon, {user?.first_name || user?.username || "Developer"}
      </h3>

      <p className="text-sm text-[#8b949e] mb-4">
        Your developer workspace is ready.
      </p>

      <div className="h-1.5 bg-[#21262d] rounded-full overflow-hidden mb-5">
        <div
          className="h-full bg-[#2f81f7] rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {checklist.map((item) => (
          <div key={item.id} className="flex items-center gap-2">
            {item.done ? (
              <CheckCircle2 size={17} className="text-[#238636]" />
            ) : (
              <Circle size={17} className="text-[#8b949e]" />
            )}

            <span className="text-sm text-[#c9d1d9]">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfileChecklist;
