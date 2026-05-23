import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import Navbar from "./components/shared/Navbar";

import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/Auth";
import Dashboard from "./pages/Dashboard";

const API = import.meta.env.VITE_API_URL;

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    const res = await fetch(`${API}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.message || "Login failed.");
    }

    navigate("/dashboard");
  };

  return (
    <div className="bg-[#0d1117] text-[#c9d1d9] min-h-screen">
      {location.pathname !== "/auth" && <Navbar />}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage onLogin={handleLogin} />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;