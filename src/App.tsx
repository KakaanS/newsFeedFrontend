// Tools:
import { Routes, Route } from "react-router-dom";

// Content:
import PageLogin from "./pages/PageLogin";
import PageHome from "./pages/PageHome";
import PageRegister from "./pages/PageRegister";
import PageAdmin from "./pages/PageAdmin";

function App() {
  return (
    <Routes>
      <Route path="/register" element={<PageRegister />} />
      <Route path="/login" element={<PageLogin />} />
      <Route path="/" element={<PageHome />} />
      <Route path="/adminpanel" element={<PageAdmin />} />
    </Routes>
  );
}

export default App;
