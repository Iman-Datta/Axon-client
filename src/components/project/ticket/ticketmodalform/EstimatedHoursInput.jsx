import { Plus, Minus } from "lucide-react";

export default function EstimatedHoursInput({ value, onChange }) {
  const handleStep = (delta) => {
    const current = value === "" ? 0 : Number(value);
    const next = Math.max(0, current + delta);
    onChange(next === 0 ? "" : next);
  };

  const handleInput = (e) => {
    const raw = e.target.value;
    if (raw === "") {
      onChange("");
      return;
    }
    const parsed = Math.max(0, Math.floor(Number(raw)));
    if (!Number.isNaN(parsed)) {
      onChange(parsed);
    }
  };

  return (
    <div className="mt-2 flex items-stretch overflow-hidden rounded-xl border border-[#30363d] bg-[#0d1117] transition-all focus-within:border-[#58a6ff] focus-within:ring-2 focus-within:ring-[#58a6ff]/20">
      <button
        type="button"
        onClick={() => handleStep(-1)}
        disabled={value === "" || Number(value) <= 0}
        className="flex w-10 shrink-0 items-center justify-center text-[#8b949e] transition-colors hover:bg-[#21262d] hover:text-[#e6edf3] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"
      >
        <Minus className="h-3.5 w-3.5" />
      </button>

      <input
        type="number"
        inputMode="numeric"
        step={1}
        min={0}
        value={value}
        onChange={handleInput}
        onKeyDown={(e) => {
          if (e.key === "-" || e.key === "." || e.key === "e") {
            e.preventDefault();
          }
        }}
        placeholder="0"
        className="w-full border-x border-[#30363d] bg-transparent px-3 py-3 text-center text-sm text-[#e6edf3] outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />

      <button
        type="button"
        onClick={() => handleStep(1)}
        className="flex w-10 shrink-0 items-center justify-center text-[#8b949e] transition-colors hover:bg-[#21262d] hover:text-[#e6edf3]"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
