const SUPABASE_URL = "https://ctznxbrgcijyjtnfesfp.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0em54YnJnY2lqeWp0bmZlc2ZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIyOTE1MjMsImV4cCI6MjA4Nzg2NzUyM30.qEnDJSHeSqZu7L1dx6uB5MyjN8DZNwAjL5G_0GmcncM";

export async function logSolveEvent({ puzzle, guesses, hints, won, mode, firstGuess }) {
  try {
    const now = new Date();
    const pad = n => String(n).padStart(2, "0");
    const h = now.getHours();
    const timestamp = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} `
      + `${pad(h % 12 || 12)}:${pad(now.getMinutes())}${h < 12 ? "am" : "pm"}`;
    const finalGuesses = won ? guesses : 9;
    await fetch(`${SUPABASE_URL}/rest/v1/solve_events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
        "Prefer": "return=minimal",
      },
      body: JSON.stringify({
        puzzle,
        guesses: finalGuesses,
        hints,
        won,
        mode,
        timestamp,
        first_guess: firstGuess || null,
      }),
    });
  } catch {
    // Fail silently — never disrupt gameplay
  }
}

export async function fetchUnlimitedStats() {
  try {
    // Fetch unlimited and unlimited-giveup rows separately then combine
    const [r1, r2] = await Promise.all([
      fetch(`${SUPABASE_URL}/rest/v1/solve_events?select=guesses,won,first_guess&mode=eq.unlimited&limit=50000`, {
        headers: {
          "apikey": SUPABASE_ANON_KEY,
          "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
        },
      }),
      fetch(`${SUPABASE_URL}/rest/v1/solve_events?select=guesses,won,first_guess&mode=eq.unlimited-giveup&limit=50000`, {
        headers: {
          "apikey": SUPABASE_ANON_KEY,
          "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
        },
      }),
    ]);
    const [d1, d2] = await Promise.all([r1.json(), r2.json()]);
    return [...(Array.isArray(d1) ? d1 : []), ...(Array.isArray(d2) ? d2 : [])];
  } catch {
    return [];
  }
}
