import { useState, useCallback, useEffect } from "react";
import { getRandomAnswer } from "../shared/gameLogic";
import { fetchUnlimitedStats } from "../shared/supabase";
import GameBoard from "../components/GameBoard";

function StatsTab() {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUnlimitedStats().then(rows => {
      setData(rows);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="loading">Loading stats…</div>;
  if (!data || data.length === 0) return (
    <p style={{ textAlign: "center", color: "var(--text3)", marginTop: "40px" }}>
      No unlimited data yet — play some games first!
    </p>
  );

  const total    = data.length;
  const wins     = data.filter(r => r.won).length;
  const solvedPct = Math.round((wins / total) * 100);
  const avgGuesses = wins > 0
    ? (data.filter(r => r.won).reduce((sum, r) => sum + r.guesses, 0) / wins).toFixed(1)
    : "—";

  // Guess distribution (wins only, 1–8)
  const dist = {};
  data.filter(r => r.won).forEach(r => {
    dist[r.guesses] = (dist[r.guesses] || 0) + 1;
  });
  const maxDist = Math.max(...Object.values(dist), 1);

  // Top first guesses
  const fgCount = {};
  data.forEach(r => {
    if (r.first_guess) fgCount[r.first_guess] = (fgCount[r.first_guess] || 0) + 1;
  });
  const topFirstGuesses = Object.entries(fgCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div>
      {/* Summary numbers */}
      <div className="stats-grid" style={{ marginTop: "8px" }}>
        <div className="stats-grid-item">
          <span className="stats-grid-num">{total.toLocaleString()}</span>
          <span className="stats-grid-label">Total Plays</span>
        </div>
        <div className="stats-grid-item">
          <span className="stats-grid-num">{solvedPct}%</span>
          <span className="stats-grid-label">Solved</span>
        </div>
        <div className="stats-grid-item">
          <span className="stats-grid-num">{wins.toLocaleString()}</span>
          <span className="stats-grid-label">Wins</span>
        </div>
        <div className="stats-grid-item">
          <span className="stats-grid-num">{avgGuesses}</span>
          <span className="stats-grid-label">Avg Guesses</span>
        </div>
      </div>

      {/* Guess distribution */}
      {wins > 0 && (
        <>
          <div className="stats-divider" />
          <div className="modal-section-title" style={{ marginTop: 0 }}>Guess Distribution (Wins)</div>
          {[1,2,3,4,5,6,7,8].map(n => {
            const count = dist[n] || 0;
            const pctBar = Math.round((count / maxDist) * 100);
            const isBest = count === Math.max(...Object.values(dist));
            return (
              <div key={n} className="stat-row">
                <span className="stat-label">{n}</span>
                <div className="stat-bar-wrap">
                  <div
                    className={`stat-bar${isBest ? " best" : ""}`}
                    style={{ width: count > 0 ? `${Math.max(pctBar, 4)}%` : "0%" }}
                  >
                    {count > 0 && <span className="stat-bar-count">{count}</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </>
      )}

      {/* Top first guesses */}
      {topFirstGuesses.length > 0 && (
        <>
          <div className="stats-divider" />
          <div className="modal-section-title" style={{ marginTop: 0 }}>Most Common First Guesses</div>
          {topFirstGuesses.map(([name, count], i) => (
            <div key={name} className="stat-row">
              <span className="stat-label" style={{ width: "16px" }}>#{i + 1}</span>
              <div style={{ flex: 1, display: "flex", justifyContent: "space-between", alignItems: "center", background: "var(--bg3)", borderRadius: "6px", padding: "6px 12px" }}>
                <span style={{ fontSize: "13px", color: "var(--text2)" }}>{name}</span>
                <span style={{ fontSize: "12px", color: "var(--text3)", fontWeight: 700 }}>{count.toLocaleString()}x</span>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default function Unlimited({ contestants, colorblind }) {
  const [answer,      setAnswer]      = useState(() => getRandomAnswer(contestants));
  const [gameKey,     setGameKey]     = useState(0);
  const [gameOver,    setGameOver]    = useState(false);
  const [activeTab,   setActiveTab]   = useState("play"); // "play" | "stats"

  const newGame = useCallback(() => {
    setAnswer(getRandomAnswer(contestants));
    setGameKey(k => k + 1);
    setGameOver(false);
    setActiveTab("play");
  }, [contestants]);

  function handleComplete() {
    setGameOver(true);
  }

  return (
    <>
      <header className="header">
        <div className="logo">
          <span className="logo-surv">SURV</span>
          <span className="logo-torch">
            <span className="logo-torch-flame">🔥</span>
            <span className="logo-torch-stem" />
          </span>
          <span className="logo-vor">VOR</span>
          <span className="logo-dle">DLE</span>
        </div>
        <div className="torch-row">
          <div className="torch-line" />
          <div className="torch-line r" />
        </div>
        <div className="tagline">Unlimited Mode &nbsp;·&nbsp; Play as many as you like</div>
      </header>

      {/* Tab switcher */}
      <div className="ul-tabs">
        <button
          className={`ul-tab${activeTab === "play" ? " active" : ""}`}
          onClick={() => setActiveTab("play")}
        >
          ♾️ Play
        </button>
        <button
          className={`ul-tab${activeTab === "stats" ? " active" : ""}`}
          onClick={() => setActiveTab("stats")}
        >
          📊 Stats
        </button>
      </div>

      {activeTab === "play" && (
        <>
          <div className="mode-banner">
            <div className="mode-banner-left">
              <span className="mode-banner-label">Unlimited Mode</span>
              <span className="mode-banner-title">♾️ Random castaway every game</span>
            </div>
            {gameOver && (
              <button className="archive-play-btn" onClick={newGame}>
                🔀 New Game
              </button>
            )}
          </div>

          <GameBoard
            key={gameKey}
            answer={answer}
            mode="unlimited"
            puzzleNum={null}
            contestants={contestants}
            onComplete={handleComplete}
            colorblind={colorblind}
          />
        </>
      )}

      {activeTab === "stats" && <StatsTab />}
    </>
  );
}
