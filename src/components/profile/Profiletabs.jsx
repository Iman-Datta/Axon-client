import { LayoutGrid, FolderGit2, Building2, Activity } from "lucide-react";

const tabs = [
  {
    id: "overview",
    label: "Overview",
    icon: LayoutGrid,
  },

  {
    id: "projects",
    label: "Projects",
    icon: FolderGit2,
  },

  {
    id: "organizations",
    label: "Organizations",
    icon: Building2,
  },

  {
    id: "activity",
    label: "Activity",
    icon: Activity,
  },
];

function ProfileTabs({ activeTab, onChange }) {
  return (
    <div
      className="
border-b
border-[#30363d]
"
    >
      <nav
        className="
flex gap-2
overflow-x-auto
"
      >
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={`
relative
px-4 py-3
flex gap-2
items-center
text-sm
transition

${activeTab === id ? "text-white" : "text-[#8b949e] hover:text-white"}

`}
          >
            <Icon size={16} />

            {label}

            {activeTab === id && (
              <span
                className="
absolute
bottom-0
left-0
right-0
h-[2px]
bg-blue-500
rounded-full
"
              />
            )}
          </button>
        ))}
      </nav>
    </div>
  );
}

export default ProfileTabs;
