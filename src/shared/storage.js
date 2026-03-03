const STORAGE_KEY = "survivordle_state";

export function loadStorage() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
  catch { return {}; }
}

export function saveStorage(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }
  catch {}
}

export function loadTodayGame(puzzleNum) {
  const s = loadStorage();
  if (s.puzzleNum === puzzleNum && s.gameOver) return s;
  return null;
}

export function saveCompletedGame({ puzzleNum, won, gaveUp, guessCount, emojiGrid }) {
  const s = loadStorage();
  const stats = s.stats || { played: 0, wins: 0, currentStreak: 0, maxStreak: 0, dist: {} };
  stats.played += 1;
  if (won) {
    stats.wins += 1;
    stats.currentStreak += 1;
    stats.maxStreak = Math.max(stats.maxStreak, stats.currentStreak);
    stats.dist[guessCount] = (stats.dist[guessCount] || 0) + 1;
  } else {
    stats.currentStreak = 0;
  }
  saveStorage({ puzzleNum, won, gaveUp, guessCount, emojiGrid, gameOver: true, stats });
}
