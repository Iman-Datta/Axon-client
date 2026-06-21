import { useMemo } from "react";

const COLORS = [
  "bg-[#161b22] border border-[#30363d]",
  "bg-[#0e4429]",
  "bg-[#006d32]",
  "bg-[#26a641]",
  "bg-[#39d353]",
];

function ContributionGraph() {
  const graph = useMemo(() => {
    return Array.from({ length: 53 }, () =>
      Array.from({ length: 7 }, () => ({
        level: Math.floor(Math.random() * 5),
      })),
    );
  }, []);

  return (
    <div
      className="
mt-6
p-5
rounded-2xl
border border-[#30363d]
bg-[#161b22]/70
"
    >
      <div
        className="
flex justify-between
items-center
mb-5
"
      >
        <h3
          className="
font-medium
text-[#c9d1d9]
"
        >
          Contribution Activity
        </h3>

        <span
          className="
text-sm
text-[#8b949e]
"
        >
          847 contributions this year
        </span>
      </div>

      <div
        className="
overflow-x-auto
"
      >
        <div
          className="
flex gap-[3px]
min-w-[700px]
"
        >
          {graph.map((week, i) => (
            <div
              key={i}
              className="
flex flex-col
gap-[3px]
"
            >
              {week.map((day, j) => (
                <div
                  key={j}
                  className={`
w-[11px]
h-[11px]
rounded-[3px]
${COLORS[day.level]}
`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div
        className="
mt-4
flex justify-between
items-center
"
      >
        <p
          className="
text-xs
text-[#8b949e]
"
        >
          Code, tickets and GitHub events power your activity.
        </p>

        <div
          className="
flex gap-1 items-center
"
        >
          <span className="text-xs text-[#8b949e]">Less</span>

          {COLORS.map((c, i) => (
            <div
              key={i}
              className={`
w-3 h-3 rounded-sm
${c}
`}
            />
          ))}

          <span className="text-xs text-[#8b949e]">More</span>
        </div>
      </div>
    </div>
  );
}

export default ContributionGraph;
