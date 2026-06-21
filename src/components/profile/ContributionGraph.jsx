import { useMemo } from "react";

const LEVEL_COLORS = [
  "bg-[#161b22] border border-[#30363d]",
  "bg-[#0e4429]",
  "bg-[#006d32]",
  "bg-[#26a641]",
  "bg-[#39d353]",
];

const MONTHS = [
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
];

function ContributionGraph() {
  const grid = useMemo(() => {
    return Array.from({ length: 53 }, () => {
      return Array.from({ length: 7 }, () => ({
        level: Math.floor(Math.random() * 5),
      }));
    });
  }, []);

  return (
    <div
      className="
border
border-[#30363d]
bg-[#161b22]/70
rounded-2xl
p-5
mt-6
"
    >
      <div
        className="
flex
justify-between
items-center
mb-5
flex-wrap
gap-3
"
      >
        <h3
          className="
text-sm
font-medium
text-[#c9d1d9]
"
        >
          Contribution activity
        </h3>

        <span
          className="
text-xs
text-[#8b949e]
"
        >
          847 contributions in the last year
        </span>
      </div>

      <div
        className="
overflow-x-auto
"
      >
        <div
          className="
min-w-[680px]
"
        >
          <div
            className="
flex
gap-[3px]
mb-2
"
          >
            {MONTHS.map((month) => (
              <span
                key={month}
                className="
text-[11px]
text-[#8b949e]
w-[46px]
"
              >
                {month}
              </span>
            ))}
          </div>

          <div
            className="
flex
gap-[3px]
"
          >
            {grid.map((week, i) => (
              <div
                key={i}
                className="
flex
flex-col
gap-[3px]
"
              >
                {week.map((day, j) => (
                  <div
                    key={j}
                    className={`
w-[10px]
h-[10px]
rounded-[2px]
${LEVEL_COLORS[day.level]}
`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="
flex
justify-between
mt-4
items-center
flex-wrap
gap-3
"
      >
        <p
          className="
text-xs
text-[#8b949e]
"
        >
          Your graph grows from commits, tickets and pull requests.
        </p>

        <div
          className="
flex
items-center
gap-1
"
        >
          <span
            className="
text-xs
text-[#8b949e]
"
          >
            Less
          </span>

          {LEVEL_COLORS.map((c, i) => (
            <div
              key={i}
              className={`
w-[10px]
h-[10px]
rounded-[2px]
${c}
`}
            />
          ))}

          <span
            className="
text-xs
text-[#8b949e]
"
          >
            More
          </span>
        </div>
      </div>
    </div>
  );
}

export default ContributionGraph;
