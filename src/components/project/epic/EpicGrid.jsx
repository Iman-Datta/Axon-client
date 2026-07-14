import EpicCard from "./EpicCard";

function EpicGrid({ epics }) {
  if (epics.length === 0) {
    return (
      <div className="rounded-2xl border border-[#30363d] bg-[#161b22] p-10 text-center">
        <h3 className="text-lg font-semibold text-[#e6edf3]">No epics yet</h3>

        <p className="mt-2 text-[#8b949e]">
          Create your first epic to organize related tickets.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {epics.map((epic) => (
        <EpicCard key={epic.id} epic={epic} />
      ))}
    </div>
  );
}

export default EpicGrid;
