function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#30363d] border-t-[#58a6ff]" />
      <p className="text-sm text-[#8b949e]">Loading profile overview...</p>
    </div>
  );
}

export default LoadingState;
