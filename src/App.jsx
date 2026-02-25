import { useState, useEffect, useRef, useMemo } from "react";

// ─── GAME LOGIC ───────────────────────────────────────────────────────────────
const JURY_TIER_RANK = { "Non-Jury": 0, "Jury": 1, "Finalist": 2, "Winner": 3 };
const THRESHOLDS = { season: 2, placement: 3, age: 5, juryTier: 1 };
const MAX_GUESSES = 8;

function compareNumeric(g, a, t) {
  if (g == null || a == null) return { status: "wrong", hint: null };
  if (g === a) return { status: "correct", hint: null };
  return { status: Math.abs(g - a) <= t ? "close" : "wrong", hint: g < a ? "↑" : "↓" };
}
function compareText(g, a) {
  return g === a ? { status: "correct", hint: null } : { status: "wrong", hint: null };
}

function evaluateGuess(guess, answer) {
  return [
    { label: "Season",    displayMain: `S${guess.season}`,           displaySub: guess.seasonName,  ...compareNumeric(guess.season,     answer.season,     THRESHOLDS.season) },
    { label: "Placement", displayMain: `#${guess.placement}`,        displaySub: null,              ...compareNumeric(guess.placement,  answer.placement,  THRESHOLDS.placement) },
    { label: "Gender",    displayMain: guess.gender,                  displaySub: null,              ...compareText(guess.gender,        answer.gender) },
    { label: "Tribe",     displayMain: guess.startingTribe,           displaySub: null,              ...compareText(guess.startingTribe, answer.startingTribe) },
    { label: "Returnee",  displayMain: guess.returnee ? "Yes" : "No", displaySub: null,              ...compareText(guess.returnee,      answer.returnee) },
    { label: "Age",       displayMain: guess.age ?? "?",              displaySub: null,              ...compareNumeric(guess.age,        answer.age,        THRESHOLDS.age) },
  ];
}

// Survivordle #1 = February 23, 2026
const START_DATE = new Date(2026, 1, 23); // month is 0-indexed

function getPuzzleNumber() {
  // Anchor to Eastern Time so everyone gets the same puzzle at the same moment.
  // "en-CA" gives YYYY-MM-DD format which is easy to parse.
  const etDateStr = new Date().toLocaleDateString("en-CA", { timeZone: "America/New_York" });
  const [y, m, d] = etDateStr.split("-").map(Number);
  const todayUTC = Date.UTC(y, m - 1, d);
  const startUTC = Date.UTC(START_DATE.getFullYear(), START_DATE.getMonth(), START_DATE.getDate());
  return Math.floor((todayUTC - startUTC) / 86400000) + 1;
}

// Seeded pseudo-random number generator (mulberry32)
// Same seed always produces the same sequence — deterministic shuffle
function mulberry32(seed) {
  return function() {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

// Fisher-Yates shuffle using a seeded RNG so order is identical for all players
function seededShuffle(arr, seed) {
  const a = [...arr];
  const rand = mulberry32(seed);
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Shuffle once with a fixed seed so the order never changes between deploys
const SHUFFLE_SEED = 20260223; // Feb 23 2026 — change this to re-randomize if ever needed

function getDailyAnswer(contestants) {
  const shuffled = seededShuffle(contestants, SHUFFLE_SEED);
  const puzzleNum = getPuzzleNumber();
  const idx = (puzzleNum - 1) % shuffled.length;
  return shuffled[idx];
}

function isWin(result) {
  return result.every(c => c.status === "correct");
}

// Normalize for search: lowercase and strip periods so M.C. matches MC
function normalize(str) {
  return (str || "").toLowerCase().replace(/\./g, "");
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  /* ── CSS Variables — dark mode (default) ── */
  :root {
    --bg:           #0a0a0a;
    --bg2:          #141414;
    --bg3:          #1a1a1a;
    --border:       #2e2e2e;
    --border2:      #222;
    --text:         #f0ede6;
    --text2:        #bbb;
    --text3:        #888;
    --text4:        #555;
    --placeholder:  #555;
    --col-head:     #666;
    --col-head-name:#4a4a4a;
    --tagline:      #777;
    --counter:      #666;
    --search-note:  #666;
    --hint-label:   #666;
    --ac-bg:        #161616;
    --ac-hover:     #222;
    --ac-border:    #1e1e1e;
    --ac-meta:      #666;
    --cell-wrong-bg:#111;
    --cell-wrong-border: #2a2a2a;
    --cell-wrong-text:   #777;
    --empty-bg:     #0d0d0d;
    --empty-border: #1a1a1a;
    --hint-bg:      #111824;
    --hint-border:  #2a2a4a;
    --hint-label-c: #5a5a9a;
    --hint-val:     #9898d8;
    --hint-btn-bg:  #161624;
    --hint-btn-border: #2e2e4e;
    --hint-btn-text:#8888cc;
    --modal-bg:     #141414;
    --modal-border: #2e2e2e;
    --shadow:       rgba(0,0,0,0.8);
    --how-border:   #444;
    --how-color:    #888;
    --giveup-border:#2e2e2e;
    --giveup-color: #777;
  }

  /* ── Light mode overrides ── */
  .light {
    --bg:           #f5f0e8;
    --bg2:          #ffffff;
    --bg3:          #ede8de;
    --border:       #d0c8bc;
    --border2:      #d8d0c4;
    --text:         #1a1410;
    --text2:        #3a3028;
    --text3:        #6a5e50;
    --text4:        #8a7e70;
    --placeholder:  #a09080;
    --col-head:     #7a6e60;
    --col-head-name:#8a7e70;
    --tagline:      #8a7a6a;
    --counter:      #8a7a6a;
    --search-note:  #8a7a6a;
    --hint-label:   #8a7a6a;
    --ac-bg:        #ffffff;
    --ac-hover:     #f0ebe0;
    --ac-border:    #e8e0d4;
    --ac-meta:      #9a8a7a;
    --cell-wrong-bg:#e8e2d8;
    --cell-wrong-border: #c8c0b4;
    --cell-wrong-text:   #6a5e50;
    --empty-bg:     #ede8de;
    --empty-border: #ddd8cc;
    --hint-bg:      #eee8f8;
    --hint-border:  #c8c0e0;
    --hint-label-c: #7060a0;
    --hint-val:     #5040a0;
    --hint-btn-bg:  #eee8f8;
    --hint-btn-border: #c8c0e0;
    --hint-btn-text:#6050b0;
    --modal-bg:     #ffffff;
    --modal-border: #d0c8bc;
    --shadow:       rgba(0,0,0,0.3);
    --how-border:   #b0a898;
    --how-color:    #6a5e50;
    --giveup-border:#c0b8ac;
    --giveup-color: #8a7a6a;
  }

  body { background: var(--bg); color: var(--text); font-family: 'DM Sans', sans-serif; min-height: 100vh; transition: background 0.25s, color 0.25s; }
  .app { max-width: 960px; margin: 0 auto; padding: 24px 16px 80px; }

  /* ── Header ── */
  .header { text-align: center; margin-bottom: 28px; position: relative; }
  .logo {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(52px, 10vw, 88px); letter-spacing: 5px; line-height: 1;
    display: inline-flex; align-items: flex-end; gap: 0;
  }
  .logo-surv {
    background: linear-gradient(to right, #7a3010 0%, #c05020 40%, #e8742a 75%, #f7c66a 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .logo-vor {
    background: linear-gradient(to right, #f7c66a 0%, #e8742a 30%, #c05020 70%, #8a3515 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .logo-dle {
    background: linear-gradient(to right, #7a3010 0%, #5a2008 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .logo-torch {
    display: inline-flex; flex-direction: column; align-self: center; justify-content: flex-end;
    height: clamp(50px, 6vw, 53px); margin: 0 4px; position: relative; bottom: 0;
  }
  .logo-torch-flame {
    font-size: clamp(14px, 2.6vw, 22px); line-height: 0; display: block;
    animation: flicker 3s ease-in-out infinite alternate;
    margin-left: 3px; margin-bottom: -3px;
  }
  .logo-torch-stem {
    width: clamp(5px, 0.8vw, 7px); flex: 1;
    background: linear-gradient(180deg, #e8742a 0%, #7a3010 100%);
    border-radius: 2px 2px 1px 1px; margin-top: 0px; align-self: center;
  }
  @keyframes flicker {
    0%   { transform: scaleX(1)    scaleY(1);    opacity: 1; }
    35%  { transform: scaleX(0.88) scaleY(1.06); opacity: 0.9; }
    65%  { transform: scaleX(1.1)  scaleY(0.96); opacity: 1; }
    100% { transform: scaleX(0.94) scaleY(1.04); opacity: 0.93; }
  }
  .torch-row { display: flex; align-items: center; justify-content: center; gap: 10px; margin: 6px 0 4px; }
  .torch-line { height: 1px; width: 72px; background: linear-gradient(90deg, transparent, #e8742a); }
  .torch-line.r { background: linear-gradient(90deg, #e8742a, transparent); }
  .tagline { color: var(--tagline); font-size: 12px; letter-spacing: 3.5px; text-transform: uppercase; }

  /* ── Header icon buttons ── */
  .header-btns { position: absolute; top: 0; left: 0; display: flex; gap: 8px; }
  .how-btn, .theme-btn {
    width: 34px; height: 34px; border-radius: 50%;
    background: transparent; border: 2px solid var(--how-border);
    color: var(--how-color); cursor: pointer;
    font-size: 16px; line-height: 1;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.2s;
  }
  .how-btn:hover, .theme-btn:hover { border-color: #e8742a; color: #e8742a; }

  .loading { text-align: center; padding: 80px; color: var(--text3); font-size: 14px; letter-spacing: 2px; }

  /* ── Legend ── */
  .legend { display: flex; gap: 18px; justify-content: center; flex-wrap: wrap; margin-bottom: 22px; }
  .legend-item { display: flex; align-items: center; gap: 7px; font-size: 12px; color: var(--text3); }
  .legend-dot { width: 12px; height: 12px; border-radius: 3px; flex-shrink: 0; }
  .legend-dot.correct { background: #1e4d1e; border: 1px solid #3a8a3a; }
  .legend-dot.close   { background: #5a3a08; border: 1px solid #e8742a; }
  .legend-dot.wrong   { background: var(--cell-wrong-bg); border: 1px solid var(--cell-wrong-border); }

  /* ── Search ── */
  .input-area { position: relative; margin-bottom: 24px; }
  .search-wrap { display: flex; gap: 10px; }
  .search-input {
    flex: 1; background: var(--bg2); border: 1px solid var(--border); border-radius: 8px;
    color: var(--text); font-family: 'DM Sans', sans-serif; font-size: 15px;
    padding: 13px 16px; outline: none; transition: border-color 0.2s, background 0.25s;
  }
  .search-input:focus { border-color: #e8742a; }
  .search-input::placeholder { color: var(--placeholder); }
  .giveup-btn {
    background: transparent; border: 1px solid var(--giveup-border); border-radius: 8px;
    color: var(--giveup-color); cursor: pointer; font-family: 'DM Sans', sans-serif;
    font-size: 13px; font-weight: 500; padding: 0 18px;
    transition: all 0.2s; white-space: nowrap; flex-shrink: 0;
  }
  .giveup-btn:hover { border-color: #c0392b; color: #c0392b; }
  .search-note {
    font-size: 11px; color: var(--search-note); text-align: center;
    margin-top: 8px; letter-spacing: 0.3px; font-style: italic;
  }

  /* ── Autocomplete ── */
  .autocomplete {
    position: absolute; top: calc(100% + 4px); left: 0; right: 0;
    background: var(--ac-bg); border: 1px solid var(--border); border-radius: 8px;
    max-height: 240px; overflow-y: auto; z-index: 200;
    box-shadow: 0 8px 32px var(--shadow);
  }
  .ac-item {
    padding: 11px 16px; cursor: pointer; font-size: 14px;
    display: flex; justify-content: space-between; align-items: center;
    border-bottom: 1px solid var(--ac-border); transition: background 0.12s; gap: 12px;
    color: var(--text);
  }
  .ac-item:last-child { border-bottom: none; }
  .ac-item:hover, .ac-item.active { background: var(--ac-hover); }
  .ac-name { font-weight: 500; }
  .ac-meta { color: var(--ac-meta); font-size: 12px; white-space: nowrap; flex-shrink: 0; }
  .ac-legal { color: var(--ac-meta); font-size: 12px; font-weight: 400; margin-left: 4px; }

  /* ── Hints ── */
  .hint-bar { display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 20px; flex-wrap: wrap; }
  .hint-label { font-size: 12px; color: var(--hint-label); letter-spacing: 1.5px; text-transform: uppercase; }
  .hint-btn {
    background: var(--hint-btn-bg); border: 1px solid var(--hint-btn-border); border-radius: 6px;
    color: var(--hint-btn-text); cursor: pointer; font-family: 'DM Sans', sans-serif;
    font-size: 12px; font-weight: 600; padding: 7px 14px; transition: all 0.2s; letter-spacing: 0.3px;
  }
  .hint-btn:hover:not(:disabled) { opacity: 0.8; }
  .hint-btn.revealed { opacity: 0.5; cursor: default; }
  .hint-panels { display: flex; gap: 12px; margin-bottom: 18px; flex-wrap: wrap; }
  .hint-panel {
    flex: 1; min-width: 200px; background: var(--hint-bg); border: 1px solid var(--hint-border);
    border-radius: 8px; padding: 12px 16px; animation: slideIn 0.25s ease;
  }
  .hint-panel-label { font-size: 10px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: var(--hint-label-c); margin-bottom: 5px; }
  .hint-panel-value { font-size: 14px; color: var(--hint-val); font-weight: 500; }

  /* ── Counter / error ── */
  .guess-counter { text-align: center; font-size: 12px; color: var(--counter); letter-spacing: 2.5px; text-transform: uppercase; margin-bottom: 18px; }
  .error-msg { text-align: center; font-size: 13px; color: #e05040; margin: -14px 0 14px; }

  /* ── Grid ── */
  .col-headers { display: grid; grid-template-columns: 160px repeat(6, 1fr); gap: 4px; margin-bottom: 5px; }
  .col-head { font-size: 9.5px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: var(--col-head); text-align: center; padding: 0 2px; }
  .col-head:first-child { text-align: left; color: var(--col-head-name); }

  .guesses { display: flex; flex-direction: column; gap: 5px; }
  .guess-row { display: grid; grid-template-columns: 160px repeat(6, 1fr); gap: 4px; animation: slideIn 0.28s ease; }
  @keyframes slideIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }

  .guess-name {
    background: var(--bg2); border: 1px solid var(--border2); border-radius: 6px;
    font-size: 12.5px; font-weight: 600; padding: 9px 12px; color: var(--text);
    display: flex; align-items: center; min-height: 68px;
    overflow: hidden; white-space: nowrap; text-overflow: ellipsis;
  }
  .guess-cell {
    border-radius: 6px; display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    min-height: 68px; padding: 6px 4px; text-align: center;
  }
  .guess-cell.correct { background: #1a4d1a; border: 1px solid #4aaa4a; color: #b0ffb0; }
  .guess-cell.close   { background: #4a2a05; border: 1px solid #f09030; color: #ffd080; }
  .guess-cell.wrong   { background: var(--cell-wrong-bg); border: 1px solid var(--cell-wrong-border); color: var(--cell-wrong-text); }

  .cell-main { font-size: 11px; font-weight: 700; line-height: 1.3; word-break: break-word; }
  .cell-sub  { font-size: 9.5px; font-weight: 500; opacity: 0.8; margin-top: 2px; line-height: 1.2; word-break: break-word; }
  .cell-hint { font-size: 15px; margin-top: 3px; font-weight: 700; line-height: 1; }

  .empty-row { display: grid; grid-template-columns: 160px repeat(6, 1fr); gap: 4px; }
  .empty-cell { background: var(--empty-bg); border: 1px solid var(--empty-border); border-radius: 6px; min-height: 68px; }

  /* ── Status banner ── */
  .status-banner { text-align: center; margin: 22px 0; padding: 18px 24px; border-radius: 10px; font-size: 15px; font-weight: 500; line-height: 1.6; }
  .status-banner.win  { background: #132413; border: 1px solid #4aaa4a; color: #b0ffb0; }
  .status-banner.lose { background: #2a1010; border: 1px solid #aa4a4a; color: #ffb0b0; }
  .status-name { display: block; margin-top: 6px; font-family: 'Bebas Neue', sans-serif; font-size: 26px; letter-spacing: 2px; color: #e8742a; }
  .status-sub  { display: block; color: var(--text3); font-size: 13px; margin-top: 4px; }
  .share-btn {
    display: inline-block; margin-top: 14px; background: var(--bg3); border: 1px solid var(--border);
    border-radius: 6px; color: var(--text2); cursor: pointer; font-family: 'DM Sans', sans-serif;
    font-size: 13px; padding: 8px 20px; transition: all 0.2s;
  }
  .share-btn:hover { border-color: #e8742a; color: var(--text); }

  /* ── How to Play button ── */
  .how-btn {
    font-family: 'Bebas Neue', sans-serif; font-size: 20px;
  }

  /* ── Modal ── */
  .modal-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.75);
    z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 16px;
  }
  .modal {
    background: var(--modal-bg); border: 1px solid var(--modal-border); border-radius: 12px;
    max-width: 520px; width: 100%; max-height: 88vh; overflow-y: auto;
    padding: 28px 28px 24px; position: relative;
    box-shadow: 0 24px 64px var(--shadow);
  }
  .modal-close {
    position: absolute; top: 16px; right: 16px;
    background: none; border: none; color: var(--text3); cursor: pointer;
    font-size: 18px; line-height: 1; transition: color 0.2s;
  }
  .modal-close:hover { color: var(--text); }
  .modal-title { font-family: 'Bebas Neue', sans-serif; font-size: 28px; letter-spacing: 3px; color: #e8742a; margin-bottom: 16px; }
  .modal-body { font-size: 13.5px; color: var(--text2); line-height: 1.7; margin-bottom: 16px; }
  .modal-body strong { color: var(--text); }
  .modal-section-title { font-size: 11px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: #e8742a; margin-bottom: 10px; margin-top: 20px; }
  .modal-legend { display: flex; flex-direction: column; gap: 7px; margin-bottom: 4px; }
  .modal-legend-row { display: flex; align-items: center; gap: 10px; font-size: 13px; color: var(--text2); }
  .modal-dot { width: 14px; height: 14px; border-radius: 3px; flex-shrink: 0; }
  .modal-dot.correct { background: #1a4d1a; border: 1px solid #4aaa4a; }
  .modal-dot.close   { background: #4a2a05; border: 1px solid #f09030; }
  .modal-dot.wrong   { background: var(--cell-wrong-bg); border: 1px solid var(--cell-wrong-border); }
  .modal-cols { display: flex; flex-direction: column; gap: 8px; }
  .modal-col-row { display: flex; gap: 12px; font-size: 13px; }
  .modal-col-name { color: var(--text); font-weight: 600; min-width: 80px; flex-shrink: 0; }
  .modal-col-desc { color: var(--text2); line-height: 1.5; }

  @media (max-width: 700px) {
    .col-headers, .guess-row, .empty-row { grid-template-columns: 110px repeat(6, 1fr); }
    .guess-name { font-size: 10px; padding: 6px 8px; }
    .guess-cell { min-height: 58px; }
    .cell-main  { font-size: 9.5px; }
    .col-head   { font-size: 8px; }
  }
`;

const COLUMNS = ["Season", "Placement", "Gender", "Tribe", "Returnee", "Age"];
const STATUS_EMOJI = { correct: "🟩", close: "🟧", wrong: "⬛" };

export default function App() {
  const [contestants, setContestants] = useState([]);
  const [loading, setLoading]         = useState(true);
  const [answer, setAnswer]           = useState(null);
  const [guesses, setGuesses]         = useState([]);
  const [results, setResults]         = useState([]);
  const [gameOver, setGameOver]       = useState(false);
  const [won, setWon]                 = useState(false);
  const [query, setQuery]             = useState("");
  const [activeIdx, setActiveIdx]     = useState(-1);
  const [error, setError]             = useState("");
  const [copied, setCopied]           = useState(false);
  const [hintEpisode,   setHintEpisode]   = useState(false);
  const [gaveUp,        setGaveUp]        = useState(false);
  const [showHow,       setShowHow]       = useState(false);
  const [lightMode,     setLightMode]     = useState(false);
  const [hintNeighbors, setHintNeighbors] = useState(false);
  const inputRef = useRef(null);

  // Load data
  useEffect(() => {
    fetch("/contestants.json")
      .then(r => r.json())
      .then(data => { setContestants(data); setAnswer(getDailyAnswer(data)); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  // Auto-refresh at midnight Eastern so the puzzle updates without a manual reload
  useEffect(() => {
    function msUntilMidnightET() {
      const now = new Date();
      // Get current time string in ET, then calculate next midnight
      const etStr = now.toLocaleString("en-CA", { timeZone: "America/New_York", hour12: false });
      // etStr is like "2026-02-23, 23:45:00" — parse hours/mins/secs
      const timePart = etStr.split(", ")[1];
      const [h, m, s] = timePart.split(":").map(Number);
      const secondsUntilMidnight = (24 * 3600) - (h * 3600 + m * 60 + s);
      return secondsUntilMidnight * 1000 + 500; // +500ms buffer
    }
    const timer = setTimeout(() => window.location.reload(), msUntilMidnightET());
    return () => clearTimeout(timer);
  }, []);

  // Autocomplete — derived, no state needed
  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    const qNorm = normalize(query);
    return contestants
      .filter(c =>
        normalize(c.name).includes(qNorm) ||
        normalize(c.showName).includes(qNorm)
      )
      .slice(0, 10);
  }, [query, contestants]);

  // Submit a guess given a contestant object directly
  function submitGuess(c) {
    if (!c || gameOver) return;
    if (guesses.some(g => g.id === c.id)) { setError("Already guessed that appearance!"); return; }
    setError("");
    const result     = evaluateGuess(c, answer);
    const newGuesses = [...guesses, c];
    const newResults = [...results, result];
    setGuesses(newGuesses);
    setResults(newResults);
    setQuery("");
    setActiveIdx(-1);
    if (isWin(result))                         { setWon(true);  setGameOver(true); }
    else if (newGuesses.length >= MAX_GUESSES) { setGameOver(true); }
  }

  function handleKeyDown(e) {
    if (e.key === "ArrowDown") {
      e.preventDefault(); setActiveIdx(i => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault(); setActiveIdx(i => Math.max(i - 1, -1));
    } else if (e.key === "Enter") {
      const target = activeIdx >= 0 ? suggestions[activeIdx] : suggestions[0];
      if (target) submitGuess(target);
    } else if (e.key === "Escape") {
      setQuery("");
    }
  }

  function handleGiveUp() {
    setGaveUp(true);
    setGameOver(true);
  }

  function handleShare() {
    const date = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" });
    const hintLines = [];
    if (hintEpisode)   hintLines.push("💡 Outcome hint used");
    if (hintNeighbors) hintLines.push("💡 Neighbors hint used");
    const hintBlock = hintLines.length ? "\n" + hintLines.join("\n") : "";
    const text = `Survivordle #${puzzleNum} — ${won ? guesses.length : "X"}/${MAX_GUESSES} 🔥${hintBlock}\n`
      + results.map(row => row.map(c => STATUS_EMOJI[c.status] || "⬛").join("")).join("\n");
    navigator.clipboard?.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  }

  const remaining     = MAX_GUESSES - guesses.length;
  const hasAnyGuesses = guesses.length > 0;
  const puzzleNum     = getPuzzleNumber();

  if (loading) return (
    <><style>{CSS}</style>
    <div className="app"><div className="loading">🔥 Loading the tribe…</div></div></>
  );

  return (
    <>
      <style>{CSS}</style>
      <style>{lightMode ? "body{background:#f5f0e8}" : "body{background:#0a0a0a}"}</style>
      <div className={`app${lightMode ? " light" : ""}`}>

        {/* Header */}
        {/* How to Play modal */}
        {showHow && (
          <div className="modal-overlay" onClick={() => setShowHow(false)}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setShowHow(false)}>✕</button>
              <h2 className="modal-title">How to Play</h2>

              <p className="modal-body">
                Each day, a new Survivor castaway is chosen as the answer. You have <strong>8 guesses</strong> to identify them.
                Because many players have appeared in multiple seasons, you are guessing a <strong>specific castaway + season appearance</strong> — not just the person.
              </p>

              <div className="modal-section-title">After each guess, each column turns:</div>
              <div className="modal-legend">
                <div className="modal-legend-row"><span className="modal-dot correct" />Exact match</div>
                <div className="modal-legend-row"><span className="modal-dot close" />Close — but not exact (see thresholds below)</div>
                <div className="modal-legend-row"><span className="modal-dot wrong" />No match</div>
              </div>

              <div className="modal-section-title">Arrow direction on 🟧 close cells:</div>
              <p className="modal-body">
                <strong>↑ the answer did better</strong> than your guess (e.g. you guessed 9th, answer placed higher)<br/>
                <strong>↓ the answer did worse</strong> than your guess (e.g. you guessed 4th, answer placed lower)
              </p>

              <div className="modal-section-title">Column guide:</div>
              <div className="modal-cols">
                <div className="modal-col-row"><span className="modal-col-name">Season</span><span className="modal-col-desc">Season number. 🟧 if within ±2 seasons.</span></div>
                <div className="modal-col-row"><span className="modal-col-name">Placement</span><span className="modal-col-desc">Finishing position (1 = winner). 🟧 if within ±3 places.</span></div>
                <div className="modal-col-row"><span className="modal-col-name">Gender</span><span className="modal-col-desc">Exact match only.</span></div>
                <div className="modal-col-row"><span className="modal-col-name">Tribe</span><span className="modal-col-desc">Starting tribe. Exact match only.</span></div>
                <div className="modal-col-row"><span className="modal-col-name">Returnee</span><span className="modal-col-desc">Has this person played more than once? Yes or No, even if this is technically their first.</span></div>
                <div className="modal-col-row"><span className="modal-col-name">Age</span><span className="modal-col-desc">Age at time of filming. 🟧 if within ±5 years.</span></div>
              </div>

              <div className="modal-section-title">Hints (available after your first guess):</div>
              <p className="modal-body">
                <strong>Reveal Outcome</strong> — shows whether the answer was a pre-jury boot, juror, finalist, or winner, plus the episode and day they were eliminated.<br/><br/>
                <strong>Reveal Voted-Out Neighbors</strong> — shows the names of the castaways eliminated just before and after the answer.
              </p>
            </div>
          </div>
        )}

        <header className="header">
          <div className="header-btns">
            <button className="how-btn" onClick={() => setShowHow(true)} title="How to Play">?</button>
            <button className="theme-btn" onClick={() => setLightMode(m => !m)} title="Toggle light/dark mode">
              {lightMode ? "🌙" : "☀️"}
            </button>
          </div>
          <div style={{ textAlign: "center" }}>
            <div className="logo">
              <span className="logo-surv">SURV</span>
              <span className="logo-torch">
                <span className="logo-torch-flame">🔥</span>
                <span className="logo-torch-stem" />
              </span>
              <span className="logo-vor">VOR</span>
              <span className="logo-dle">DLE</span>
            </div>
          </div>
          <div className="torch-row">
            <div className="torch-line" />
            <div className="torch-line r" />
          </div>
          <div className="tagline">Guess the Survivor Castaway &nbsp;·&nbsp; #{puzzleNum}</div>
        </header>

        {/* Legend */}
        <div className="legend">
          {[["correct","Exact match"],["close","Close"],["wrong","No match"]].map(([cls,lbl]) => (
            <div className="legend-item" key={cls}><div className={`legend-dot ${cls}`} />{lbl}</div>
          ))}
        </div>


        {/* Search input */}
        {!gameOver && (
          <div className="input-area">
            <div className="search-wrap">
              <input
                ref={inputRef}
                className="search-input"
                placeholder="Search by castaway name…"
                value={query}
                autoComplete="off"
                onChange={e => { setQuery(e.target.value); setActiveIdx(-1); }}
                onKeyDown={handleKeyDown}
              />
              <button className="giveup-btn" onClick={handleGiveUp}>Give Up</button>
            </div>
            <div className="search-note">You are guessing a castaway and their specific season appearance</div>
            {suggestions.length > 0 && (
              <div className="autocomplete">
                {suggestions.map((c, i) => (
                  <div
                    key={c.id}
                    className={`ac-item${i === activeIdx ? " active" : ""}`}
                    onMouseDown={() => submitGuess(c)}
                  >
                    <span className="ac-name">{c.name}</span>
                    <span className="ac-meta">{c.seasonNameFull} · S{c.season}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {error && <div className="error-msg">{error}</div>}

        {!gameOver && (
          <div className="guess-counter">
            {guesses.length === 0
              ? `${MAX_GUESSES} guesses`
              : `${remaining} guess${remaining !== 1 ? "es" : ""} remaining`}
          </div>
        )}

        {/* Hints — appear after first guess */}
        {hasAnyGuesses && (
          <div className="hint-bar">
            <span className="hint-label">Hints:</span>
            <button
              className={`hint-btn${hintEpisode ? " revealed" : ""}`}
              onClick={() => setHintEpisode(true)}
              disabled={hintEpisode}
            >
              {hintEpisode ? "✓ Outcome Revealed" : "💡 Reveal Outcome"}
            </button>
            <button
              className={`hint-btn${hintNeighbors ? " revealed" : ""}`}
              onClick={() => setHintNeighbors(true)}
              disabled={hintNeighbors}
            >
              {hintNeighbors ? "✓ Neighbors Revealed" : "💡 Reveal Voted-Out Neighbors"}
            </button>
          </div>
        )}

        {(hintEpisode || hintNeighbors) && answer && (
          <div className="hint-panels">
            {hintEpisode && (() => {
              const tier       = answer.juryTier;
              const isWinner   = tier === "Winner";
              const isFinalist = tier === "Finalist";
              const tierLabel  = isWinner || isFinalist ? "Finalist" : tier === "Jury" ? "Juror" : "Pre-Jury";
              const outcomeText = isWinner
                ? "Survived until Final Tribal Council (Won)"
                : isFinalist
                ? "Survived until Final Tribal Council"
                : `Eliminated during Episode ${answer.episodeOut ?? "?"}, Day ${answer.day ?? "?"}`;
              return (
                <div className="hint-panel">
                  <div className="hint-panel-label">Outcome</div>
                  <div className="hint-panel-value">{tierLabel} — {outcomeText}</div>
                </div>
              );
            })()}
            {hintNeighbors && (
              <div className="hint-panel">
                <div className="hint-panel-label">Voted Out Between</div>
                <div className="hint-panel-value">
                  {[answer.placedAfter, answer.placedBefore].filter(Boolean).join(" → ") || "No data"}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Game over banner */}
        {gameOver && (
          <div className={`status-banner ${won ? "win" : "lose"}`}>
            {won
              ? <>🔥 Survivordle #{puzzleNum} — got it in {guesses.length}!</>
              : gaveUp
              ? <>You gave up. Better luck tomorrow.</>
              : <>Survivordle #{puzzleNum} — the tribe has voted you out.</>
            }
            <span className="status-name">{answer.name}</span>
            <span className="status-sub">{answer.seasonNameFull} · {answer.result}</span>
            <br />
            {!gaveUp && <button className="share-btn" onClick={handleShare}>{copied ? "✓ Copied!" : "📋 Share Result"}</button>}
          </div>
        )}

        {/* Column headers */}
        <div className="col-headers">
          <div className="col-head">Castaway</div>
          {COLUMNS.map(c => <div key={c} className="col-head">{c}</div>)}
        </div>

        {/* Guess grid */}
        <div className="guesses">
          {guesses.map((g, i) => (
            <div key={g.id} className="guess-row">
              <div className="guess-name">{g.name}</div>
              {results[i].map((cell, j) => (
                <div key={j} className={`guess-cell ${cell.status}`}>
                  <span className="cell-main">{cell.displayMain}</span>
                  {cell.displaySub && <span className="cell-sub">{cell.displaySub}</span>}
                  {cell.hint && <span className="cell-hint">{cell.hint}</span>}
                </div>
              ))}
            </div>
          ))}
          {!gameOver && Array.from({ length: remaining }).map((_, i) => (
            <div key={i} className="empty-row">
              <div className="empty-cell" />
              {Array.from({ length: 6 }).map((_, j) => <div key={j} className="empty-cell" />)}
            </div>
          ))}
        </div>

      </div>
    </>
  );
}
