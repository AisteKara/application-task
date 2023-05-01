import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";

import About from "./pages/About/About";
import Films from "./pages/Films/Films";

function App() {
  return (
    <div
      style={{
        display: "flex",
        overflow: "scroll"
      }}
    >
      <Sidebar />
      <Routes>
        <Route path="/" element={<Films />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
