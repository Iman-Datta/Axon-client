import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/shared/Navbar";

import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/Auth";

function App() {
  return (
    <div className="bg-[#0d1117] min-h-screen text-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </div>
  );
}

export default App;
