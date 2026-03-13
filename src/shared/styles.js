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
    --giveup-border:#4a1a1a;
    --giveup-color: #c0504a;
    --nav-bg:       #0f0f0f;
    --nav-border:   #1e1e1e;
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
    --giveup-border:#e0b0b0;
    --giveup-color: #c0392b;
    --nav-bg:       #ede8de;
    --nav-border:   #d0c8bc;
  }

  body { background: var(--bg); color: var(--text); font-family: 'DM Sans', sans-serif; min-height: 100vh; transition: background 0.25s, color 0.25s; }

  /* ── Nav bar ── */
  .nav {
    background: var(--nav-bg); border-bottom: 1px solid var(--nav-border);
    position: sticky; top: 0; z-index: 100;
  }
  /* Row 1: logo + utility buttons */
  .nav-row1 {
    max-width: 960px; margin: 0 auto; padding: 0 16px;
    display: flex; align-items: center; height: 48px; gap: 8px;
  }
  .nav-logo {
    font-family: 'Bebas Neue', sans-serif; font-size: 22px; letter-spacing: 3px;
    background: linear-gradient(to right, #e8742a, #f7c66a);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    text-decoration: none; flex-shrink: 0;
  }
  .nav-right { display: flex; align-items: center; gap: 6px; margin-left: auto; }
  .nav-btn {
    width: 32px; height: 32px; border-radius: 50%;
    background: transparent; border: 1.5px solid var(--how-border);
    color: var(--how-color); cursor: pointer; font-size: 14px;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.2s; flex-shrink: 0;
  }
  .nav-btn:hover { border-color: #e8742a; color: #e8742a; }
  .nav-btn.how { font-family: 'Bebas Neue', sans-serif; font-size: 17px; }

  /* Row 2: page tabs */
  .nav-row2 {
    max-width: 960px; margin: 0 auto; padding: 0 8px;
    display: flex; align-items: center;
    border-top: 1px solid var(--nav-border);
  }
  .nav-tabs { display: flex; align-items: center; gap: 0; }
  .nav-tab {
    font-size: 12px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase;
    color: var(--text3); text-decoration: none; padding: 8px 14px;
    border-bottom: 2px solid transparent; transition: all 0.2s; white-space: nowrap;
  }
  .nav-tab:hover { color: var(--text); }
  .nav-tab.active { color: #e8742a; border-bottom-color: #e8742a; }
  .nav-secondary { display: flex; align-items: center; gap: 4px; margin-left: auto; }
  .nav-secondary-link {
    font-size: 11px; color: var(--text3); text-decoration: none;
    padding: 8px 8px; opacity: 0.6; transition: opacity 0.2s; white-space: nowrap;
  }
  .nav-secondary-link:hover { opacity: 1; }
  .nav-secondary-link.active { opacity: 1; color: #e8742a; }

  @media (max-width: 500px) {
    .nav-secondary { display: none; }
    .nav-tab { padding: 8px 12px; font-size: 11px; }
  }

  /* ── Page wrapper ── */
  .page { max-width: 960px; margin: 0 auto; padding: 24px 16px 80px; overflow-x: hidden; width: 100%; box-sizing: border-box; }

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
    border-radius: 2px 2px 1px 1px; align-self: center;
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
    font-size: 11px; font-weight: 500; padding: 5px 12px;
    transition: all 0.2s; white-space: nowrap; flex-shrink: 0; opacity: 0.85;
  }
  .giveup-btn:hover { border-color: #e05040; color: #e05040; opacity: 1; }
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
  @media (max-width: 700px) {
    .ac-item { flex-direction: column; align-items: flex-start; gap: 2px; padding: 10px 14px; }
    .ac-meta { white-space: normal; font-size: 11px; }
  }

  /* ── Hints ── */
  .hint-bar { display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 20px; flex-wrap: wrap; }
  .tribe-color-dot {
    display: block; width: 10px; height: 10px; border-radius: 50%;
    flex-shrink: 0; border: 1px solid rgba(255,255,255,0.15);
  }
  .modal-link { color: #e8742a; text-decoration: underline; }
  .modal-link:hover { color: #ff9a50; }
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
  .cell-arrow-label { font-size: 8px; font-weight: 600; opacity: 0.8; letter-spacing: 0.5px; text-transform: uppercase; line-height: 1; margin-top: 1px; }

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
  .modal-support { display: flex; flex-direction: column; align-items: center; gap: 14px; margin-top: 4px; }
  .modal-support-bmc { display: flex; justify-content: center; }
  .bmc-img { height: 40px; width: auto; border-radius: 8px; }
  .modal-contact { font-size: 12px; color: var(--text3); text-align: center; }
  .modal-link { color: #e8742a; text-decoration: none; font-weight: 600; }
  .modal-link:hover { text-decoration: underline; }

  /* ── Stats modal ── */
  .stats-btn { font-size: 18px; }
  .stat-row { display: flex; align-items: center; gap: 12px; margin-bottom: 10px; }
  .stat-label { font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: var(--text3); width: 20px; text-align: right; flex-shrink: 0; }
  .stat-bar-wrap { flex: 1; background: var(--bg3); border-radius: 4px; overflow: hidden; height: 24px; }
  .stat-bar { height: 100%; background: linear-gradient(90deg, #e8742a, #b03020); border-radius: 4px; display: flex; align-items: center; justify-content: flex-end; padding-right: 8px; min-width: 28px; transition: width 0.4s ease; }
  .stat-bar.best { background: linear-gradient(90deg, #2a8a2a, #1a5a1a); }
  .stat-bar-count { font-size: 11px; font-weight: 700; color: #fff; }
  .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 20px; text-align: center; }
  .stats-grid-item { display: flex; flex-direction: column; gap: 4px; }
  .stats-grid-num { font-family: 'Bebas Neue', sans-serif; font-size: 36px; color: #e8742a; line-height: 1; }
  .stats-grid-label { font-size: 10px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; color: var(--text3); line-height: 1.3; }
  .stats-divider { height: 1px; background: var(--border); margin: 16px 0; }

  /* ── Archive page ── */
  .archive-list { display: flex; flex-direction: column; gap: 6px; }
  .archive-item {
    display: flex; align-items: center; justify-content: space-between;
    padding: 10px 14px; border-radius: 8px; border: 1px solid var(--border);
    background: var(--bg2); cursor: pointer; transition: all 0.15s; gap: 12px;
    text-decoration: none;
  }
  .archive-item:hover { border-color: #e8742a; }
  .archive-item-left { display: flex; flex-direction: column; gap: 2px; }
  .archive-item-num { font-family: 'Bebas Neue', sans-serif; font-size: 18px; color: #e8742a; letter-spacing: 1px; line-height: 1; }
  .archive-item-date { font-size: 12px; color: var(--text3); }
  .archive-play-btn {
    background: linear-gradient(135deg, #e8742a, #b03020); border: none; border-radius: 6px;
    color: #fff; cursor: pointer; font-family: 'Bebas Neue', sans-serif;
    font-size: 15px; letter-spacing: 1px; padding: 6px 16px; white-space: nowrap;
  }

  /* ── Mode banner (archive/unlimited) ── */
  .mode-banner {
    display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;
    background: var(--hint-bg); border: 1px solid var(--hint-border);
    border-radius: 8px; padding: 10px 16px; margin-bottom: 18px;
  }
  .mode-banner-left { display: flex; flex-direction: column; gap: 2px; }
  .mode-banner-label { font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--hint-label-c); }
  .mode-banner-title { font-family: 'Bebas Neue', sans-serif; font-size: 22px; color: #e8742a; letter-spacing: 1px; }

  /* Desktop: show full label, hide short */
  .col-full  { display: inline; }
  .col-short { display: none; }

  @media (max-width: 700px) {
    .col-headers, .guess-row, .empty-row {
      grid-template-columns: minmax(70px, 100px) repeat(6, 1fr);
      gap: 3px;
    }
    .guess-name {
      font-size: 9px; padding: 5px 7px; min-height: 60px;
      line-height: 1.25; white-space: normal; word-break: break-word;
    }
    .guess-cell { min-height: 60px; padding: 4px 2px; }
    .cell-main  { font-size: 8.5px; }
    .cell-sub   { font-size: 7.5px; }
    .cell-hint  { font-size: 11px; margin-top: 2px; }
    .col-head   { font-size: 7.5px; letter-spacing: 0px; padding: 0 1px;
                  white-space: normal; word-break: break-word; line-height: 1.2; }
    .col-full   { display: none; }
    .col-short  { display: inline; }

  }

  @media (max-width: 400px) {
    .col-headers, .guess-row, .empty-row {
      grid-template-columns: minmax(60px, 85px) repeat(6, 1fr);
      gap: 2px;
    }
    .guess-name { font-size: 8px; padding: 4px 5px; }
    .col-head   { font-size: 7px; }
    .cell-main  { font-size: 8px; }
  }
`;

export default CSS;

// Append tab styles for unlimited page
const TAB_CSS = `
  .ul-tabs {
    display: flex; gap: 4px; margin-bottom: 20px;
    border-bottom: 1px solid var(--border); padding-bottom: 0;
  }
  .ul-tab {
    background: none; border: none; border-bottom: 2px solid transparent;
    color: var(--text3); cursor: pointer; font-family: 'DM Sans', sans-serif;
    font-size: 13px; font-weight: 600; letter-spacing: 0.5px;
    padding: 8px 16px; margin-bottom: -1px; transition: all 0.2s;
  }
  .ul-tab:hover { color: var(--text); }
  .ul-tab.active { color: #e8742a; border-bottom-color: #e8742a; }
`;

const PRIVACY_CSS = `
  .privacy-body { max-width: 680px; margin: 0 auto; }
  .privacy-updated { font-size: 12px; color: var(--text4); margin-bottom: 28px; }
  .privacy-section { margin-bottom: 28px; }
  .privacy-heading {
    font-family: 'Bebas Neue', sans-serif; font-size: 20px; letter-spacing: 2px;
    color: #e8742a; margin-bottom: 10px;
  }
  .privacy-section p { font-size: 14px; color: var(--text2); line-height: 1.8; margin-bottom: 10px; }
  .privacy-section strong { color: var(--text); }
  .privacy-list {
    list-style: none; padding: 0; margin: 10px 0;
    display: flex; flex-direction: column; gap: 6px;
  }
  .privacy-list li {
    font-size: 14px; color: var(--text2); line-height: 1.7;
    padding-left: 16px; position: relative;
  }
  .privacy-list li::before {
    content: '·'; position: absolute; left: 0; color: #e8742a; font-weight: 700;
  }
  .privacy-link { color: #e8742a; text-decoration: none; }
  .privacy-link:hover { text-decoration: underline; }
`;

const SUBTAB_CSS = `
  .ul-subtabs {
    display: flex; gap: 4px; margin-bottom: 20px; margin-top: -8px;
  }
  .ul-subtab {
    background: var(--bg3); border: 1px solid var(--border); border-radius: 6px;
    color: var(--text3); cursor: pointer; font-family: 'DM Sans', sans-serif;
    font-size: 12px; font-weight: 600; letter-spacing: 0.5px;
    padding: 6px 14px; transition: all 0.2s;
  }
  .ul-subtab:hover { color: var(--text); border-color: var(--text3); }
  .ul-subtab.active { background: #e8742a22; border-color: #e8742a; color: #e8742a; }
`;


const STATS_PAGE_CSS = `
  .stats-page-body { max-width: 680px; margin: 0 auto; }
  .sp-section-title {
    font-size: 11px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase;
    color: #e8742a; margin-bottom: 14px; margin-top: 4px;
  }
  .sp-sub-title {
    font-size: 11px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase;
    color: var(--text3); margin-bottom: 10px; margin-top: 16px;
  }

  /* Difficulty card */
  .sp-difficulty-card {
    display: flex; align-items: center; gap: 16px;
    background: var(--bg2); border: 1px solid var(--border);
    border-radius: 10px; padding: 16px 20px;
  }
  .sp-diff-emoji { font-size: 32px; flex-shrink: 0; }
  .sp-diff-right { display: flex; flex-direction: column; gap: 4px; }
  .sp-diff-label { font-family: 'Bebas Neue', sans-serif; font-size: 24px; letter-spacing: 1px; line-height: 1; }
  .sp-diff-sub   { font-size: 12px; color: var(--text3); }

  /* 7-day chart */
  .sp-chart {
    display: flex; align-items: flex-end; gap: 8px;
    height: 140px; padding-bottom: 0;
  }
  .sp-chart-col {
    flex: 1; display: flex; flex-direction: column; align-items: center;
    gap: 4px; height: 100%;
  }
  .sp-chart-val   { font-size: 10px; color: var(--text3); font-weight: 600; }
  .sp-chart-bar-wrap {
    flex: 1; width: 100%; display: flex; align-items: flex-end;
  }
  .sp-chart-bar {
    width: 100%; border-radius: 4px 4px 0 0;
    border: 1px solid; transition: height 0.3s ease;
  }
  .sp-chart-label { font-size: 10px; color: var(--text3); font-weight: 600; margin-top: 4px; }
  .sp-chart-emoji { font-size: 12px; }

  /* First guesses */
  .sp-fg-row {
    display: flex; align-items: center; gap: 10px; margin-bottom: 8px;
  }
  .sp-fg-rank { font-size: 11px; font-weight: 700; color: var(--text3); width: 24px; flex-shrink: 0; }
  .sp-fg-bar-wrap {
    flex: 1; background: var(--bg3); border-radius: 6px;
    height: 32px; position: relative; overflow: hidden;
  }
  .sp-fg-bar {
    position: absolute; left: 0; top: 0; bottom: 0;
    background: linear-gradient(90deg, #e8742a33, #e8742a22);
    border-radius: 6px; transition: width 0.4s ease;
  }
  .sp-fg-name {
    position: absolute; left: 12px; top: 50%; transform: translateY(-50%);
    font-size: 13px; color: var(--text2); font-weight: 500; white-space: nowrap;
  }
`;


const ABOUT_CSS = `
  .about-page {
    max-width: 600px; margin: 0 auto; padding: 8px 0 48px;
  }
  .about-section { margin-bottom: 4px; }
  .about-heading {
    font-family: 'Bebas Neue', sans-serif; font-size: 22px; letter-spacing: 2px;
    color: #e8742a; margin: 0 0 12px; text-transform: uppercase;
  }
  .about-body {
    font-size: 14px; line-height: 1.75; color: var(--text2);
    margin: 0 0 10px;
  }
  .about-divider {
    border: none; border-top: 1px solid var(--border);
    margin: 24px 0;
  }
  .about-stats {
    display: flex; gap: 12px; flex-wrap: wrap;
  }
  .about-stat {
    flex: 1; min-width: 120px;
    background: var(--bg2); border: 1px solid var(--border);
    border-radius: 10px; padding: 16px 12px;
    display: flex; flex-direction: column; align-items: center; gap: 4px;
  }
  .about-stat-num {
    font-family: 'Bebas Neue', sans-serif; font-size: 28px;
    color: #e8742a; letter-spacing: 1px; line-height: 1;
  }
  .about-stat-label {
    font-size: 11px; color: var(--text3);
    text-transform: uppercase; letter-spacing: 1.5px; text-align: center;
  }
  .about-links {
    display: flex; flex-direction: column; gap: 10px; margin-top: 4px;
  }
  .about-link {
    font-size: 14px; color: var(--text2);
    text-decoration: none; display: inline-flex; align-items: center; gap: 8px;
    transition: color 0.2s;
  }
  .about-link:hover { color: #e8742a; }
`;

export { TAB_CSS, SUBTAB_CSS, PRIVACY_CSS, STATS_PAGE_CSS, ABOUT_CSS };
