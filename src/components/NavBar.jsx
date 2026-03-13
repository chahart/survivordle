import { NavLink } from "react-router-dom";

export default function NavBar({ onShowHow, lightMode, onToggleLight, colorblind, onToggleColorblind }) {
  return (
    <nav className="nav">
      {/* Row 1: Logo + utility buttons */}
      <div className="nav-row1">
        <NavLink to="/" className="nav-logo">SURV🔥VORDLE</NavLink>
        <div className="nav-right">
          <button className="nav-btn how" onClick={onShowHow} title="How to Play">?</button>
          <NavLink to="/stats"
            className={({ isActive }) => `nav-btn${isActive ? " active" : ""}`}
            style={{ textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}
            title="Stats"
          >
            📊
          </NavLink>
          <button
            className="nav-btn"
            onClick={onToggleColorblind}
            title="Colorblind mode"
            style={colorblind ? { borderColor: "#4a8aff", color: "#4a8aff" } : {}}
          >
            👁
          </button>
          <button className="nav-btn" onClick={onToggleLight} title="Toggle theme">
            {lightMode ? "🌙" : "☀️"}
          </button>
        </div>
      </div>

      {/* Row 2: Page links */}
      <div className="nav-row2">
        <div className="nav-tabs">
          <NavLink to="/" end className={({ isActive }) => `nav-tab${isActive ? " active" : ""}`}>
            Daily
          </NavLink>
          <NavLink to="/archive" className={({ isActive }) => `nav-tab${isActive ? " active" : ""}`}>
            Archive
          </NavLink>
          <NavLink to="/unlimited" className={({ isActive }) => `nav-tab${isActive ? " active" : ""}`}>
            Unlimited
          </NavLink>
        </div>
        <div className="nav-secondary">
          <NavLink to="/about" className={({ isActive }) => `nav-secondary-link${isActive ? " active" : ""}`}>
            About
          </NavLink>
          <NavLink to="/privacy" className={({ isActive }) => `nav-secondary-link${isActive ? " active" : ""}`}>
            Privacy
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
