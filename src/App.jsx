import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import CSS, { TAB_CSS, SUBTAB_CSS, PRIVACY_CSS, STATS_PAGE_CSS } from "./shared/styles";
import NavBar from "./components/NavBar";
import { HowToPlayModal } from "./components/Modals";
import Daily from "./pages/Daily";
import Archive from "./pages/Archive";
import Unlimited from "./pages/Unlimited";
import Privacy from "./pages/Privacy";
import Stats from "./pages/Stats";

export default function App() {
  const [contestants,  setContestants]  = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [lightMode,    setLightMode]    = useState(false);
  const [colorblind,   setColorblind]   = useState(false);
  const [showHow,      setShowHow]      = useState(false);

  useEffect(() => {
    fetch("/contestants.json")
      .then(r => r.json())
      .then(data => { setContestants(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return (
    <>
      <style>{CSS}</style>
      <style>{TAB_CSS}{SUBTAB_CSS}{PRIVACY_CSS}{STATS_PAGE_CSS}</style>
      <div className="page"><div className="loading">🔥 Loading the tribe…</div></div>
    </>
  );

  return (
    <>
      <style>{CSS}</style>
      <style>{TAB_CSS}{SUBTAB_CSS}{PRIVACY_CSS}{STATS_PAGE_CSS}</style>
      <style>{lightMode ? "body{background:#f5f0e8}" : "body{background:#0a0a0a}"}</style>
      <div className={lightMode ? "light" : ""}>

        <NavBar
          onShowHow={() => setShowHow(true)}
          lightMode={lightMode}
          onToggleLight={() => setLightMode(m => !m)}
          colorblind={colorblind}
          onToggleColorblind={() => setColorblind(m => !m)}
        />

        {showHow && <HowToPlayModal onClose={() => setShowHow(false)} />}

        <div className="page">
          <Routes>
            <Route path="/"          element={<Daily     contestants={contestants} colorblind={colorblind} />} />
            <Route path="/archive"   element={<Archive   contestants={contestants} colorblind={colorblind} />} />
            <Route path="/unlimited" element={<Unlimited contestants={contestants} colorblind={colorblind} />} />
            <Route path="/stats"     element={<Stats />} />
            <Route path="/privacy"   element={<Privacy />} />
          </Routes>
        </div>

      </div>
    </>
  );
}
