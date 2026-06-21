import {
  GitCommit,
  GitPullRequest,
  CheckCircle2,
  UserPlus,
  Rocket,
} from "lucide-react";

function ActivityFeed() {
  const activities = [
    {
      icon: Rocket,
      title: "Created project Axon",
      time: "Today",
    },

    {
      icon: GitPullRequest,
      title: "Merged PR #42 - JWT refresh system",
      time: "2 hours ago",
    },

    {
      icon: GitCommit,
      title: "Pushed 12 commits to axon-server",
      time: "Yesterday",
    },

    {
      icon: CheckCircle2,
      title: "Completed ticket AXON-101 GitHub automation",
      time: "3 days ago",
    },

    {
      icon: UserPlus,
      title: "Added Rahul as Backend Developer",
      time: "Last week",
    },
  ];

  return (
    <div className="mt-6">
      <h3
        className="
mb-4
font-medium
"
      >
        Recent Activity
      </h3>

      <div
        className="
space-y-4
"
      >
        {activities.map(({ icon: Icon, title, time }) => (
          <div
            key={title}
            className="
flex gap-4
p-4
rounded-2xl
border border-[#30363d]
bg-[#161b22]/70
"
          >
            <div
              className="
w-10 h-10
rounded-xl
bg-[#21262d]
flex
items-center
justify-center
"
            >
              <Icon size={18} className="text-blue-400" />
            </div>

            <div>
              <p
                className="
text-sm
text-[#c9d1d9]
"
              >
                {title}
              </p>

              <span
                className="
text-xs
text-[#8b949e]
"
              >
                {time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActivityFeed;
