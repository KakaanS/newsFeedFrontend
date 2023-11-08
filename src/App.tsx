// Tools:
import { Routes, Route } from "react-router-dom";

// Content:
import PageLogin from "./pages/PageLogin";
import PageHome from "./pages/PageHome";
import PageRegister from "./pages/PageRegister";
<<<<<<< HEAD
import PageAdmin from "./pages/PageAdmin";
=======
import PageResetPassword from "./pages/PageResetPassword";
>>>>>>> a0ad54ca0ed127f3936c5368c87b72977262455d

function App() {
  return (
    <Routes>
      <Route path="/register" element={<PageRegister />} />
      <Route path="/login" element={<PageLogin />} />
      <Route path="/resetPassword" element={<PageResetPassword />} />
      <Route path="/" element={<PageHome />} />
      <Route path="/adminpanel" element={<PageAdmin />} />
    </Routes>
  );
}

export default App;
