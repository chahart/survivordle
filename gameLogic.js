/**
 * gameLogic.js
 * All comparison logic, daily seeding, and scoring lives here.
 * Pure functions — no UI, no side effects. Easy to test.
 */

// ─── JURY TIER ORDER ─────────────────────────────────────────────────────────
const JURY_TIER_RANK = {
  "Non-Jury":  0,
  "Jury":      1,
  "Finalist":  2,
  "Winner":    3,
};

// ─── COMPARISON THRESHOLDS ───────────────────────────────────────────────────
const THRESHOLDS = {
  season:     2,   // ±2 seasons = close (tight, rewards precision)
  placement:  3,   // ±3 placements = close
  age:        5,   // ±5 years = close
  episodeOut: 1,   // ±1 episode = close
  juryTier:   1,   // ±1 tier rank = close (e.g. Jury vs Finalist)
};

/**
 * Compare two numeric values.
 * Returns: { status: "correct"|"close"|"wrong", hint: "↑"|"↓"|null }
 */
function compareNumeric(guessVal, answerVal, threshold) {
  if (guessVal === answerVal) return { status: "correct", hint: null };
  const diff = Math.abs(guessVal - answerVal);
  const close = diff <= threshold;
  return {
    status: close ? "close" : "wrong",
    hint: guessVal < answerVal ? "↑" : "↓",
  };
}

/**
 * Compare two text values (exact match only).
 */
function compareText(guessVal, answerVal) {
  return guessVal === answerVal
    ? { status: "correct", hint: null }
    : { status: "wrong",   hint: null };
}

/**
 * Compare jury tier using ranked order.
 * Adjacent tiers (e.g. Jury vs Finalist) = close.
 */
function compareJuryTier(guessVal, answerVal) {
  if (guessVal === answerVal) return { status: "correct", hint: null };
  const gRank = JURY_TIER_RANK[guessVal] ?? -1;
  const aRank = JURY_TIER_RANK[answerVal] ?? -1;
  const diff = Math.abs(gRank - aRank);
  return {
    status: diff <= THRESHOLDS.juryTier ? "close" : "wrong",
    hint: gRank < aRank ? "↑" : "↓",
  };
}

/**
 * Evaluate a full guess against the answer.
 * Returns an array of cell descriptors for the UI to render.
 */
export function evaluateGuess(guess, answer) {
  return [
    {
      label: "Season",
      display: `S${guess.season}`,
      ...compareNumeric(guess.season, answer.season, THRESHOLDS.season),
    },
    {
      label: "Season Name",
      display: guess.seasonName,
      ...compareText(guess.seasonName, answer.seasonName),
    },
    {
      label: "Placement",
      display: `#${guess.placement}`,
      ...compareNumeric(guess.placement, answer.placement, THRESHOLDS.placement),
    },
    {
      label: "Gender",
      display: guess.gender,
      ...compareText(guess.gender, answer.gender),
    },
    {
      label: "Tribe",
      display: guess.startingTribe,
      ...compareText(guess.startingTribe, answer.startingTribe),
    },
    {
      label: "Returnee",
      display: guess.returnee ? "Yes" : "No",
      ...compareText(guess.returnee, answer.returnee),
    },
    {
      label: "Age",
      display: guess.age ?? "?",
      ...compareNumeric(guess.age, answer.age, THRESHOLDS.age),
    },
    {
      label: "Episode Out",
      display: guess.episodeOut ? `Ep ${guess.episodeOut}` : "?",
      ...compareNumeric(guess.episodeOut, answer.episodeOut, THRESHOLDS.episodeOut),
    },
    {
      label: "Finish",
      display: guess.juryTier,
      ...compareJuryTier(guess.juryTier, answer.juryTier),
    },
    // Reveal-only column — no scoring, just shows context
    {
      label: "Voted Out Between",
      display: [guess.placedAfter, guess.placedBefore].filter(Boolean).join(" → ") || "—",
      status: "reveal",
      hint: null,
    },
  ];
}

/**
 * Get today's answer deterministically by date.
 * Same answer for every player on the same calendar day.
 * Pool = all contestants (hardcore mode).
 */
export function getDailyAnswer(contestants) {
  const today = new Date();
  // Build a stable numeric seed from YYYYMMDD
  const seed =
    today.getFullYear() * 10000 +
    (today.getMonth() + 1) * 100 +
    today.getDate();
  // Simple but stable index selection
  const idx = seed % contestants.length;
  return contestants[idx];
}

/**
 * Check if a guess array represents a win (all scored cells are correct).
 */
export function isWin(result) {
  return result
    .filter(cell => cell.status !== "reveal")
    .every(cell => cell.status === "correct");
}

export const MAX_GUESSES = 8;
