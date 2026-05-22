import { Routes, Route } from "react-router-dom";

import Navbar from "./components/shared/Navbar";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/Auth";
import Dashboard from "./pages/Dashboard"

function App() {
  return (
    <div className="bg-[#0d1117] text-[#c9d1d9] min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path='/dashboard' element={<Dashboard/>} />
      </Routes>
    </div>
  );
}

export default App;
