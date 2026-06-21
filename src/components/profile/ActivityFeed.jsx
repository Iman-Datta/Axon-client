import {
  GitCommit,
  GitPullRequest,
  CheckCircle2,
  Rocket,
  Users,
} from "lucide-react";

function ActivityFeed() {
  const activity = [
    {
      icon: Rocket,
      text: "Created project Axon",
      time: "Today",
    },

    {
      icon: GitPullRequest,
      text: "Merged PR #42 - JWT refresh system",
      time: "2 hours ago",
    },

    {
      icon: GitCommit,
      text: "Pushed 12 commits to axon-server",
      time: "Yesterday",
    },

    {
      icon: CheckCircle2,
      text: "Completed ticket AXON-101 Git automation",
      time: "3 days ago",
    },

    {
      icon: Users,
      text: "Added Rahul as Backend Developer",
      time: "Last week",
    },
  ];

  return (
    <div
      className="
mt-6
"
    >
      <h3
        className="
text-sm
font-medium
text-[#c9d1d9]
mb-4
"
      >
        Recent activity
      </h3>

      <div
        className="
space-y-4
"
      >
        {activity.map(({ icon: Icon, text, time }) => (
          <div
            key={text}
            className="
flex
gap-4
border
border-[#30363d]
bg-[#161b22]/70
rounded-2xl
p-4
"
          >
            <div
              className="
w-10
h-10
rounded-xl
bg-[#21262d]
flex
items-center
justify-center
"
            >
              <Icon size={18} className="text-[#2f81f7]" />
            </div>

            <div>
              <p
                className="
text-sm
text-[#c9d1d9]
"
              >
                {text}
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
