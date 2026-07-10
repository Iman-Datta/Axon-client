import { useEffect, useState } from "react";
import { CheckCircle2, Circle, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { fetchWithAuth } from "../../utils/fetchWithAuth";

const API = import.meta.env.VITE_API_URL;

function ProfileChecklist({ user }) {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);

  const STORAGE_KEY = "axon-profile-checklist-hidden";

  const [showChecklist, setShowChecklist] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) !== "true";
  });
  const [checklist, setChecklist] = useState([]);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetchWithAuth(
          `${API}/auth/onboarding/status/`,
          {},
          dispatch,
          accessToken,
        );

        const data = await res.json();

        if (!res.ok) {
          return;
        }

        const items = [
          {
            id: "username",
            label: "Username created",
            done: data.identity.requirements.username,
          },
          {
            id: "email",
            label: "Email verified",
            done: data.identity.requirements.email,
          },
          {
            id: "github",
            label: "GitHub connected",
            done: data.identity.requirements.github,
          },
          {
            id: "profile",
            label: "Profile completed",
            done: data.profile.status,
          },
        ];

        setChecklist(items);
        const allCompleted = items.every((item) => item.done);

        if (allCompleted) {
          localStorage.setItem(STORAGE_KEY, "true");
          setShowChecklist(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchStatus();
  }, [dispatch, accessToken]);

  const completedCount = checklist.filter((item) => item.done).length;

  const progress = checklist.length
    ? Math.round((completedCount / checklist.length) * 100)
    : 0;

  if (!showChecklist || checklist.length === 0) {
    return null;
  }

  return (
    <div className="border border-[#30363d] bg-linear-to-br from-[#161b22] to-[#0d1117] rounded-2xl p-5 mb-6 relative">
      <button
        onClick={() => {
          localStorage.setItem(STORAGE_KEY, "true");
          setShowChecklist(false);
        }}
        className="absolute top-4 right-4 text-[#8b949e] hover:text-white"
      >
        <X size={16} />
      </button>

      <h3 className="text-base font-semibold text-[#e6edf3]">
        Welcome to Axon, {user.first_name}
      </h3>

      <p className="text-sm text-[#8b949e] mb-4">
        Your developer workspace is ready.
      </p>

      <div className="h-1.5 bg-[#21262d] rounded-full overflow-hidden mb-5">
        <div
          className="h-full bg-[#2f81f7] rounded-full"
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
