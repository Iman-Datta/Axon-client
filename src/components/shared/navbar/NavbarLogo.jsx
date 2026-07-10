import { Link } from "react-router-dom";
import AxonLogo from "../AxonLogo";

function NavbarLogo() {
  return (
    <Link to="/" className="flex items-center gap-3.5">
      <AxonLogo />
      <span className="text-[22px] font-semibold text-white">Axon</span>
    </Link>
  );
}

export default NavbarLogo;
