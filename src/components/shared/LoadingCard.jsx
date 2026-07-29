import { Loader2 } from "lucide-react";

function LoadingCard({ title = "Loading...", description = "Please wait..." }) {
  return (
    <div className="mx-auto flex min-h-80 max-w-6xl flex-col items-center justify-center rounded-xl border border-[#30363d] bg-[#161b22]">
      <Loader2 className="h-8 w-8 animate-spin text-blue-500" />

      <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>

      <p className="mt-2 text-sm text-gray-400">{description}</p>
    </div>
  );
}

export default LoadingCard;
