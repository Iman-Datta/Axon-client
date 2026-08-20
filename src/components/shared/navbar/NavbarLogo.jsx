import { Link } from "react-router-dom";

function NavbarLogo() {
  return (
    <Link to="/" className="flex items-center gap-3">
      <img src="/Logo.png" alt="Axon" className="w-10 h-10 object-contain" />

      <span className="text-[17px] font-medium tracking-[0.18em] text-white">
        AXON
      </span>
    </Link>
  );
}

export default NavbarLogo;
