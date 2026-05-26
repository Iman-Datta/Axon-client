import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/shared/Navbar";

import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/Auth";
import Dashboard from "./pages/Dashboard";

function App() {
  const location = useLocation();

  return (
    <div className="bg-[#0d1117] text-[#c9d1d9] min-h-screen">
      {location.pathname !== "/auth" && <Navbar />}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
