// Tools:
import { Routes, Route } from "react-router-dom";

// Content:
import PageLogin from "./pages/PageLogin";
import PageRegister from "./pages/PageRegister";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<PageLogin />} />
      <Route path="/register" element={<PageRegister />} />
    </Routes>
  );
}

export default App;
