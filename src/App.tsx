// Tools:
import { Routes, Route, Navigate } from "react-router-dom";

// Content:
import PageLogin from "./pages/PageLogin";
import PageHome from "./pages/PageHome";
import PageRegister from "./pages/PageRegister";
import PageAdmin from "./pages/PageAdmin";
import PageResetPassword from "./pages/PageResetPassword";

function App() {
  return (
    <Routes>
      <Route path="/register" element={<PageRegister />} />
      <Route path="/login" element={<PageLogin />} />
      <Route path="/resetPassword" element={<PageResetPassword />} />
      <Route path="/" element={<PageHome />} />
      <Route path="/adminpanel" element={<PageAdmin />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
