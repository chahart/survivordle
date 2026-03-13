import { NavLink } from "react-router-dom";

export default function NavBar({ onShowHow, lightMode, onToggleLight, colorblind, onToggleColorblind }) {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <NavLink to="/" className="nav-logo">SURV🔥VORDLE</NavLink>

        <div className="nav-links">
          <NavLink to="/" end className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}>
            Daily
          </NavLink>
          <NavLink to="/archive" className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}>
            Archive
          </NavLink>
          <NavLink to="/unlimited" className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}>
            Unlimited
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
            style={{ marginLeft: "auto", fontSize: "11px", opacity: 0.6 }}
          >
            About
          </NavLink>
          <NavLink to="/privacy" className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
            style={{ fontSize: "11px", opacity: 0.6 }}
          >
            Privacy
          </NavLink>
        </div>

        <div className="nav-right">
          <button className="nav-btn how" onClick={onShowHow} title="How to Play">?</button>
          <NavLink to="/stats" className={({ isActive }) => `nav-btn${isActive ? " active" : ""}`}
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
    </nav>
  );
}
