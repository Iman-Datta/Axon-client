function StoryPointStepper({ value, onChange }) {
  const points = [1, 2, 3, 5, 8, 13, 21, 34];

  const currentIndex = points.indexOf(value);

  const decrease = () => {
    if (currentIndex > 0) {
      onChange(points[currentIndex - 1]);
    }
  };

  const increase = () => {
    if (currentIndex < points.length - 1) {
      onChange(points[currentIndex + 1]);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={decrease}
        className="h-9 w-9 rounded-lg border border-[#30363d] bg-[#0d1117]"
      >
        -
      </button>

      <span className="w-10 text-center text-[#e6edf3] font-medium">
        {value}
      </span>

      <button
        type="button"
        onClick={increase}
        className="h-9 w-9 rounded-lg border border-[#30363d] bg-[#0d1117]"
      >
        +
      </button>
    </div>
  );
}

export default StoryPointStepper;
