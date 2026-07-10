import { useNavigate } from "react-router-dom";

function NewResourceButton({ label, path }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(path)}
      className="px-3 py-1.5 rounded-md bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-sm font-medium text-[#e6edf3] transition-colors"
    >
      {label}
    </button>
  );
}

export default NewResourceButton;
