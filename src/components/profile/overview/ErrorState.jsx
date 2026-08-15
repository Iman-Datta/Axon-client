import { AlertTriangle } from "lucide-react";

function ErrorState({ message }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/5 py-20 text-center">
      <AlertTriangle size={20} className="text-red-400" />
      <p className="text-sm font-medium text-red-400">{message}</p>
    </div>
  );
}

export default ErrorState;
