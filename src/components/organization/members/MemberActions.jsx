import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MoreHorizontal } from "lucide-react";

function MemberActions({ onChangeRole, onRemove }) {
  const [open, setOpen] = useState(false);

  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const [position, setPosition] = useState({
    top: 0,
    left: 0,
  });

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        !buttonRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }

    function handleEsc(e) {
      if (e.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);

      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  useEffect(() => {
    if (!open || !buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();

    const menuHeight = 110;

    const openUp = window.innerHeight - rect.bottom < menuHeight;

    setPosition({
      top: openUp ? rect.top - menuHeight - 8 : rect.bottom + 8,
      left: rect.right - 224,
    });
  }, [open]);

  return (
    <>
      <div className="relative flex justify-end">
        <button
          ref={buttonRef}
          onClick={() => setOpen((v) => !v)}
          className="rounded-md p-2 text-[#8b949e] transition hover:bg-[#21262d] hover:text-[#e6edf3]"
        >
          <MoreHorizontal size={18} />
        </button>
      </div>

      {open &&
        createPortal(
          <div
            ref={menuRef}
            style={{
              top: position.top,
              left: position.left,
            }}
            className="fixed z-[9999] w-56 overflow-hidden rounded-lg border border-[#30363d] bg-[#161b22] shadow-2xl"
          >
            <button
              onClick={() => {
                setOpen(false);
                onChangeRole?.();
              }}
              className="w-full px-4 py-3 text-left text-sm text-[#e6edf3] hover:bg-[#21262d]"
            >
              Change role
            </button>

            <div className="border-t border-[#30363d]" />

            <button
              onClick={() => {
                setOpen(false);
                onRemove?.();
              }}
              className="w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-[#21262d]"
            >
              Remove from organization
            </button>
          </div>,
          document.body,
        )}
    </>
  );
}

export default MemberActions;
