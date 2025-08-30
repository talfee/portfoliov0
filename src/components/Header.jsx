import { Link, useLocation } from "react-router-dom";
import "./styles.css";

export default function Header() {
  const { pathname } = useLocation();
  return (
    <header className="header">
      <div className="cloud" aria-hidden="true">☁</div>

      <nav className="nav">
        <Link className={`nav-btn ${pathname === "/" ? "active" : ""}`} to="/">Home</Link>
        <Link className={`nav-btn ${pathname === "/past" ? "active" : ""}`} to="/past">Past</Link>
      </nav>
    </header>
  );
}
