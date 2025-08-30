import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Past from "./pages/Past";
import Layout from "./components/Layout";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/past" element={<Past />} />
      </Routes>
    </Layout>
  );
}
