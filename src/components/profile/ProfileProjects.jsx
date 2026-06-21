import {
  FolderGit2,
  GitBranch,
  Clock,
  Users,
  CheckCircle2,
} from "lucide-react";

function ProfileProjects() {
  const projects = [
    {
      name: "Axon Server",
      desc: "Django REST backend with JWT auth, OAuth, organizations and ticket automation.",
      stack: "Django REST Framework",
      tickets: 42,
      members: 8,
      status: "Active",
    },

    {
      name: "Axon Client",
      desc: "Modern React collaboration dashboard with GitHub style workflow.",
      stack: "React • Redux • Tailwind",
      tickets: 28,
      members: 5,
      status: "Development",
    },

    {
      name: "Git Automation Engine",
      desc: "Automatically moves tickets using commits, branches and pull requests.",
      stack: "GitHub Webhooks",
      tickets: 18,
      members: 3,
      status: "Testing",
    },
  ];

  return (
    <div className="mt-6">
      <div
        className="
flex
justify-between
items-center
mb-4
"
      >
        <h3
          className="
text-sm
font-medium
text-[#c9d1d9]
"
        >
          Pinned Projects
        </h3>

        <span
          className="
text-xs
text-[#8b949e]
"
        >
          {projects.length} projects
        </span>
      </div>

      <div
        className="
grid
grid-cols-1
md:grid-cols-2
gap-4
"
      >
        {projects.map((project) => (
          <div
            key={project.name}
            className="
border
border-[#30363d]
bg-[#161b22]/70
rounded-2xl
p-5
hover:border-[#2f81f7]/50
transition
"
          >
            <div
              className="
flex
items-center
gap-3
"
            >
              <FolderGit2 size={20} className="text-[#2f81f7]" />

              <h4
                className="
font-semibold
text-[#e6edf3]
"
              >
                {project.name}
              </h4>
            </div>

            <p
              className="
mt-3
text-sm
text-[#8b949e]
leading-relaxed
"
            >
              {project.desc}
            </p>

            <div
              className="
mt-4
text-xs
text-[#8b949e]
"
            >
              {project.stack}
            </div>

            <div
              className="
flex
justify-between
mt-5
text-sm
"
            >
              <span
                className="
flex
items-center
gap-1.5
text-[#8b949e]
"
              >
                <CheckCircle2 size={14} />
                {project.tickets} tickets
              </span>

              <span
                className="
flex
items-center
gap-1.5
text-[#8b949e]
"
              >
                <Users size={14} />

                {project.members}
              </span>

              <span
                className="
flex
items-center
gap-1.5
text-green-400
"
              >
                <GitBranch size={14} />

                {project.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfileProjects;
