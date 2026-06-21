import { LayoutGrid, BookMarked, Building2, Activity } from "lucide-react";

const TABS = [
  {
    id: "overview",
    label: "Overview",
    icon: LayoutGrid,
  },

  {
    id: "projects",
    label: "Projects",
    icon: BookMarked,
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
flex
items-center
gap-1
overflow-x-auto
"
      >
        {TABS.map(({ id, label, icon: Icon }) => {
          const active = activeTab === id;

          return (
            <button
              key={id}
              onClick={() => onChange(id)}
              className={`
relative
flex
items-center
gap-2
px-4
py-3
text-sm
font-medium
transition

${active ? "text-[#c9d1d9]" : "text-[#8b949e] hover:text-white"}

`}
            >
              <Icon size={15} />

              {label}

              {active && (
                <span
                  className="
absolute
left-0
right-0
-bottom-px
h-[2px]
bg-[#2f81f7]
rounded-full
"
                />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

export default ProfileTabs;
