import { useState } from "react";
import { Link } from "react-router-dom";
import useSEO from "../shared/useSEO";

const FAQ_CSS = `
.faq-page {
  max-width: 680px;
  margin: 0 auto;
  padding: 32px 0 64px;
}

.faq-hero {
  text-align: center;
  margin-bottom: 40px;
}

.faq-hero h1 {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(28px, 5vw, 40px);
  letter-spacing: 3px;
  color: #e8742a;
  margin: 0 0 10px;
}

.faq-hero p {
  font-size: 14px;
  color: var(--text3);
  line-height: 1.6;
}

.faq-section-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--text4);
  margin: 32px 0 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border);
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.faq-item {
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
  transition: border-color 0.2s;
}

.faq-item.open {
  border-color: #e8742a44;
}

.faq-question {
  width: 100%;
  background: var(--bg2);
  border: none;
  text-align: left;
  padding: 16px 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  transition: background 0.15s;
  font-family: 'DM Sans', sans-serif;
}

.faq-question:hover {
  background: var(--bg3);
}

.faq-q-text {
  font-size: 14px;
  font-weight: 600;
  color: var(--text1, var(--text));
  line-height: 1.4;
}

.faq-chevron {
  font-size: 11px;
  color: var(--text3);
  flex-shrink: 0;
  transition: transform 0.2s;
}

.faq-item.open .faq-chevron {
  transform: rotate(180deg);
  color: #e8742a;
}

.faq-answer {
  padding: 0 18px 16px;
  font-size: 14px;
  color: var(--text2);
  line-height: 1.75;
  background: var(--bg2);
  border-top: 1px solid var(--border);
}

.faq-answer p {
  margin: 12px 0 0;
}

.faq-answer p:first-child {
  margin-top: 12px;
}

.faq-answer a {
  color: #e8742a;
  text-decoration: none;
}

.faq-answer a:hover {
  text-decoration: underline;
}

.faq-answer strong {
  color: var(--text);
}

.faq-answer ul {
  margin: 8px 0 0 0;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.faq-answer li {
  line-height: 1.65;
}

.faq-contact {
  margin-top: 40px;
  text-align: center;
  padding: 20px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--bg2);
}

.faq-contact p {
  font-size: 14px;
  color: var(--text3);
  margin-bottom: 6px;
}

.faq-contact a {
  color: #e8742a;
  text-decoration: none;
  font-weight: 600;
}

.faq-contact a:hover {
  text-decoration: underline;
}
`;

const SECTIONS = [
  {
    label: "Gameplay",
    items: [
      {
        q: "How do I play Survivordle?",
        a: <>
          <p>Type any Survivor castaway's name into the search bar and select them from the dropdown. After each guess, six columns will reveal how close you are to the answer using the feedback as colors. You have 8 guesses to identify the  castaway. <Link to="/how-to-play">See the full How to Play guide</Link> for a breakdown of every column.</p>
        </>
      },
      {
        q: "What do the colors mean?",
        a: <>
          <p><strong>Green</strong> means your guess exactly matches the answer for that column. <strong>Orange</strong> means you're close but not exact — within a few seasons, placement spots, or years of age depending on the column. <strong>Gray</strong> means no match.</p>
        </>
      },
      {
        q: "What do the placement arrows mean?",
        a: <>
          <p>Arrows appear on Season, Placement, and Age when the cell is orange. 
            For placement, <strong>↑ means the answer did worse</strong> than your guess (e.g. you guessed 4th, the answer placed lower). 
            <strong>↓ means the answer did better</strong> (e.g. you guessed 10th, the answer placed higher). 
            For Season, ↑ means an higher (later) season, ↓ means a lower (earlier) one. 1 = Season 1 (Borneo), 20 = Season 20 (Heroes vs. Villains), and so on...</p>
        </>
      },
      {
        q: "How close is 'close' for each column?",
        a: <>
          <p>The orange thresholds are:</p>
          <ul>
            <li><strong>Season</strong> — within ±2 seasons</li>
            <li><strong>Placement</strong> — within ±3 finishing positions</li>
            <li><strong>Age</strong> — within ±5 years</li>
          </ul>
          <p>Gender, Tribe Color, and Returnee are exact match only — green or gray, no orange.</p>
        </>
      },
      {
        q: "What does Tribe Color mean?",
        a: <>
          <p>Tribe Color shows the color of the castaway's starting tribe for that season — for example, yellow, red, or blue. 
            It's green if your guess matches exactly, gray if not. There's no orange for this column since there's no meaningful "close" between tribe colors. 
            Colors are sourced from the <a href="https://survivor.fandom.com/wiki/Tribe#Tribe_Colors_Per_Season" target="_blank" rel="noopener noreferrer">Survivor Wiki</a>.
            Note: on Survivor: Game Changers, Mana listed as orange and not red on the Survivor Wiki.</p>
        </>
      },
      {
        q: "What does Returnee mean?",
        a: <>
          <p>Returnee indicates whether the castaway has played Survivor more than once, Yes or No. 
            Importantly, this reflects their <strong>overall history</strong>, not whether this specific appearance is a return. 
            So if you're guessing John Cochran in South Pacific (his first season), Returnee will still show Yes because he went on to play again.
            If there is a current season in progress, the returnee status will be updated after the season finale airs.</p>
        </>
      },
      {
        q: "What are hints and should I use them?",
        a: <>
          <p>After your first guess, two optional hints become available. <strong>Reveal Outcome</strong> tells you whether the answer was a pre-jury boot, juror, finalist, or winner — plus the episode and day they were eliminated. <strong>Reveal Voted-Out Neighbors</strong> shows the castaways eliminated just before and just after the answer in boot order.</p>
          <p>Using hints doesn't count against your guesses or affect your streak, but hint usage is noted in your shareable result. Use them guilt-free.</p>
        </>
      },
      {
        q: "Can I give up?",
        a: <><p>Yes. After your first guess, a Give Up button appears in the hint bar. 
          Pressing it reveals the answer and counts as a loss for your streak. 
          Sometimes the answer just isn't coming to you — no shame in it, except when it's a winner.</p></>
      },
    ]
  },
  {
    label: "The Game",
    items: [
      {
        q: "When does a new puzzle come out?",
        a: <><p>A new castaway is selected every day at <strong>midnight ET</strong>. The puzzle resets automatically, so if you're playing late at night in a western timezone, the puzzle may have already changed.</p></>
      },
      {
        q: "What seasons are included?",
        a: <><p>Survivordle includes castaways from every US Survivor season, from Survivor: Borneo (Season 1) through the most recently completed season (Season 49). 
          Seasons that are currently airing are not included until they wrap up.</p></>
      },
      {
        q: "Can the same castaway appear twice?",
        a: <><p>Yes! Returnees who played in multiple seasons are treated as separate entries. 
          Bruce Perreault in 44 and Bruce Perreault in 45 are different answers. 
          When you search for a returnee, you'll see all their seasons listed in the dropdown so you can pick the right one.
          Once every possible castaway has appeared, this allows for an appearance to be used again.</p></>
      },
      {
        q: "What are the different game modes?",
        a: <>
          <p>There are three modes:</p>
          <ul>
            <li><strong>Daily</strong> — one new puzzle per day, same castaway for everyone</li>
            <li><strong>Archive</strong> — replay any past daily puzzle you may have missed</li>
            <li><strong>Unlimited</strong> — a random castaway every round, no daily limit, tracked separately from your Daily stats</li>
          </ul>
        </>
      },
      {
        q: "How is the daily castaway chosen?",
        a: <><p>The daily puzzle follows a fixed, predetermined shuffle of all castaways — seeded so that the order is consistent and non-repeating. Every castaway will eventually appear before any repeats. It's not random each day, which means everyone playing on the same day gets the same puzzle.</p></>
      },
    ]
  },
  {
    label: "Stats & Streaks",
    items: [
      {
        q: "Where are my stats stored?",
        a: <><p>Your personal stats — streak, win rate, and guess distribution — are stored locally in your browser using localStorage. They never leave your device. This means if you clear your browser data or switch devices, your stats will reset. We have no way to recover them.</p></>
      },
      {
        q: "Why did my streak reset?",
        a: <><p>Streaks reset if you miss a day, give up, or run out of guesses. The streak counts consecutive days solved — there's no grace period for skipping a day. Archive mode doesn't count toward your daily streak.</p></>
      },
      {
        q: "What's on the Stats page?",
        a: <><p>The <Link to="/stats">Stats page</Link> shows three things: your personal daily stats (streak, win rate, guess distribution), today's daily puzzle difficulty based on how the community is performing, and global stats showing overall solve rates and the most common first guesses.</p></>
      },
    ]
  },
  {
    label: "Technical",
    items: [
      {
        q: "Does Survivordle collect my personal data?",
        a: <><p>No personal information is collected. When you complete a game, we anonymously log gameplay data — guesses used, win/loss, hint usage, and game mode — to help understand puzzle difficulty. This data cannot be traced back to any individual. See our <Link to="/privacy">Privacy Policy</Link> for full details.</p></>
      },
      {
        q: "Is Survivordle free?",
        a: <><p>Yes, completely free. If you'd like to support the game, you can <a href="https://www.buymeacoffee.com/chahart" target="_blank" rel="noopener noreferrer">buy the creator a beer</a> — it's appreciated but never required.</p></>
      },
      {
        q: "Is Survivordle affiliated with CBS or the Survivor TV show?",
        a: <><p>No. Survivordle is an independent fan-made project and is not affiliated with CBS, Survivor, or its producers in any way. It's a tribute to the show, nothing more.</p></>
      },
      {
        q: "I found an error in the data. How do I report it?",
        a: <><p>Please email <a href="mailto:survivordlegame@gmail.com">survivordlegame@gmail.com</a> with the castaway name, season, and what you think is incorrect. Data errors do happen and we appreciate when players catch them.</p></>
      },
    ]
  }
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item${open ? " open" : ""}`}>
      <button className="faq-question" onClick={() => setOpen(o => !o)}>
        <span className="faq-q-text">{q}</span>
        <span className="faq-chevron">{open ? "▲" : "▼"}</span>
      </button>
      {open && <div className="faq-answer">{a}</div>}
    </div>
  );
}

export default function FAQ() {
  useSEO({
    title: "FAQ — Survivordle",
    description: "Frequently asked questions about Survivordle — the daily Survivor castaway guessing game. Get answers about gameplay, scoring, streaks, and more.",
    canonical: "https://survivordle.com/faq",
  });

  return (
    <>
      <style>{FAQ_CSS}</style>
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
        <div className="tagline">FAQ</div>
      </header>

      <div className="faq-page">
        <div className="faq-hero">
          <h1>Frequently Asked Questions</h1>
          <p>Everything you need to know about how Survivordle works.</p>
        </div>

        {SECTIONS.map(section => (
          <div key={section.label}>
            <div className="faq-section-label">{section.label}</div>
            <div className="faq-list">
              {section.items.map(item => (
                <FAQItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          </div>
        ))}

        <div className="faq-contact">
          <p>Don't see your question answered here?</p>
          <a href="mailto:survivordlegame@gmail.com">survivordlegame@gmail.com</a>
        </div>
      </div>
    </>
  );
}
