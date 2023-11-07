// Tools:
import { Routes, Route, Navigate } from "react-router-dom";

// Content:
import PageLogin from "./pages/PageLogin";
import PageHome from "./pages/PageHome";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<PageLogin />} />
      <Route path="/" element={<PageHome />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
