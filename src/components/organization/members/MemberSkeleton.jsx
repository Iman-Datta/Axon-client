function MemberSkeleton() {
  return (
    <div className="mt-8 overflow-hidden rounded-xl border border-[#30363d] bg-[#0d1117]">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="flex items-center justify-between border-b border-[#21262d] p-5 last:border-b-0"
        >
          {/* Left Side */}
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="h-12 w-12 animate-pulse rounded-full bg-[#21262d]" />

            {/* User Info */}
            <div className="space-y-2">
              <div className="h-4 w-40 animate-pulse rounded bg-[#21262d]" />
              <div className="h-3 w-28 animate-pulse rounded bg-[#21262d]" />
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-6">
            <div className="h-4 w-20 animate-pulse rounded bg-[#21262d]" />
            <div className="h-4 w-16 animate-pulse rounded bg-[#21262d]" />
            <div className="h-8 w-8 animate-pulse rounded bg-[#21262d]" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default MemberSkeleton;
