// Tools:
import { Routes, Route } from "react-router-dom";

// Content:
import PageLogin from "./pages/PageLogin";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<PageLogin />} />
    </Routes>
  );
}

export default App;
