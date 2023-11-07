// Tools:
import { Routes, Route, Navigate } from "react-router-dom";

// Content:
import PageLogin from "./pages/PageLogin";
import PageHome from "./pages/PageHome";
import PageRegister from "./pages/PageRegister";

function App() {
  return (
    <Routes>
      <Route path="/register" element={<PageRegister />} />
      <Route path="/login" element={<PageLogin />} />
      <Route path="/" element={<PageHome />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
