import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Past from "./pages/Past.jsx";

export default function App() {
  return (
    <div>
      <nav style={{ padding: "1rem" }}>
        <Link to="/">Home</Link>
        <Link to="/past">Past</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/past" element={<Past />} />
      </Routes>
    </div>
  );
}
