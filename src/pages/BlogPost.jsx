import { useParams, Link, Navigate } from "react-router-dom";
import { getPost } from "./posts";
import useSEO from "../shared/useSEO";

const POST_CSS = `
.post-page {
  max-width: 680px;
  margin: 0 auto;
  padding: 32px 0 80px;
}

.post-back {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  color: var(--text3);
  text-decoration: none;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-bottom: 32px;
  transition: color 0.2s;
}

.post-back:hover { color: #e8742a; }

.post-header {
  margin-bottom: 36px;
  padding-bottom: 28px;
  border-bottom: 1px solid var(--border);
}

.post-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(28px, 5vw, 44px);
  letter-spacing: 2px;
  color: var(--text);
  line-height: 1.15;
  margin: 0 0 16px;
}

.post-meta {
  font-size: 12px;
  color: var(--text4);
  letter-spacing: 1px;
  text-transform: uppercase;
}

.post-meta span {
  margin: 0 8px;
  opacity: 0.4;
}

.post-body {
  font-size: 15px;
  color: var(--text2);
  line-height: 1.8;
}

.post-body p {
  margin-bottom: 20px;
}

.post-body h2 {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 26px;
  letter-spacing: 2px;
  color: #e8742a;
  margin: 40px 0 16px;
}

.post-body a {
  color: #e8742a;
  text-decoration: none;
}

.post-body a:hover {
  text-decoration: underline;
}

.post-body strong {
  color: var(--text);
  font-weight: 600;
}

.post-body em {
  color: var(--text3);
  font-style: italic;
}

.post-footer {
  margin-top: 56px;
  padding-top: 28px;
  border-top: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.post-footer-author {
  font-size: 13px;
  color: var(--text3);
  line-height: 1.65;
}

.post-footer-author strong {
  color: var(--text);
}

.post-footer-links {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.post-footer-link {
  font-size: 13px;
  font-weight: 600;
  color: #e8742a;
  text-decoration: none;
  padding: 8px 16px;
  border: 1px solid #e8742a44;
  border-radius: 6px;
  transition: all 0.2s;
}

.post-footer-link:hover {
  background: #e8742a22;
  border-color: #e8742a;
}
`;

// ─── Post content components ───────────────────────────────────────────────

function PostHowIBuilt() {
  return (
    <div className="post-body">
      <p>
        One month ago, I was anxiously awaiting the premiere of my favorite show, Survivor. The biggest season yet,
        24 people, and all the reason to be genuinely excited about what we'd see on TV.
      </p>
      <p>
        Each morning, part of my daily routine is solving a slew of daily puzzles. The classic Wordle, Connections,
        some LinkedIn games (shoutout Tango) and even some sports-related ones if I have time or am stuck in traffic
        on the bus after work.
      </p>
      <p>
        Sitting around one Sunday night with my roommates, I started wondering: is there any daily game for Survivor?
        Any sort of trivia game, let alone something that refreshes every day? From there, I haven't looked back.
        Over 200,000 games played, visitors from over 100 countries, and only one Survivordle.
      </p>

      <h2>What is Survivordle?</h2>
      <p>
        <a href="https://survivordle.com">Survivordle.com</a> is a daily guessing game for Survivor fans. Each day,
        a castaway from any US season is chosen as the answer. You guess players one at a time, and after each guess
        the game reveals six pieces of information about that castaway's appearance. There's also an Archive mode for
        past daily puzzles and an Unlimited mode if one puzzle a day isn't enough.
      </p>

      <h2>The Data Problem</h2>
      <p>
        Before a single line of game code could be written, I needed a proper dataset to feed the site.
      </p>
      <p>
        I started with the survivoR package built by Daniel Oehm, an extensive R database covering every piece of
        Survivor history, and got to work shaping it into something usable for the game. The goal was a single
        spreadsheet where every row represents one contestant's appearance on one season, because a returning player
        like Corinne or Vytas needed their own entry for each time they played. That distinction matters a lot for
        the game, making it different from other adjacent websites and games.
      </p>
      <p>
        From there, the grunt work began. Formulas were built, such as one to determine whether a player qualifies
        as a returnee. Tribe colors were cross-referenced against the Survivor Wiki. Nicknames were added for
        contestants whose real names fans might not recognize: Frosti, Chicken, Cao Boi, even less noticeable ones
        like Bob. Hints like who was voted out immediately before and after each contestant were pulled in to support
        the in-game hint system.
      </p>
      <p>
        One early mistake: the original version used the starting tribe name as a data point, which was redundant
        since the season was already there and less meaningful than the tribe color. Switching to color made for a
        more interesting and universal clue. That kind of fix — responding to what players actually found useful —
        became a recurring theme in how the game evolved.
      </p>
      <p>
        Once the spreadsheet was in good enough shape, I needed a reliable way to turn it into something the website
        could use. The site runs on a JSON file — a structured list of every contestant's appearance — that loads
        when you open the game. Rather than manually reformat the spreadsheet every time I made a change, I wrote a
        small script that does it automatically: run the script, get a clean updated file. Getting the data structure
        right took a good amount of time. It was tricky to deal with players who appeared in multiple seasons,
        filling gaps where data was missing, and making sure the logic that categorizes players as jury members,
        finalists, or winners held up across 49 seasons worth of edge cases.
      </p>

      <h2>Game Logic</h2>
      <p>
        Now that there was a database, the format for the game had to be decided on. When a guess is made, the game
        reads the guessed castaway against the answer, and each of the six cells returns one of three results: green
        for an exact match, orange for a close match, or gray for an incorrect guess.
      </p>
      <p>
        I thought for a long time about the thresholds for orange, and consulted my closest Survivor fan friends
        about it. For the season, the cell will show up as green if correct, and orange if within 2. Survivor seasons
        have numbers associated with them, either as their title (Survivor: 46) or as the number of the season
        (Season 15 — Survivor: China). The arrow will point up if the season number is higher, signifying a newer
        season, and down if the season number is lower, signifying an older season. Most people's first guesses are
        based off of a middle season, hence why it should be rewarded only if you are really close. The placement is
        within 3 for orange, which felt like a good range since some of the lower placing contestants are harder to
        guess. For placement arrows, it is based on the number position the castaway finished in. If you guess a
        contestant that got 7th place, a down arrow would signify that the contestant did better than 7th, anywhere
        from 6th to 1st. An up arrow would signify doing worse, anywhere from 8th to 20th (or 24th soon). The age
        being within 5 for orange is mostly because a lot of people consider contestants old, young, or neither, and
        it's rare someone knows the exact age of all players at the time their season aired. Up for older, down for
        younger. It's a good range for seeing who is in their 20s, 30s, or 75 (RIP Rudy).
      </p>
      <p>
        Putting the puzzle size at 8 guesses felt like the right number due to the sheer volume of contestants,
        plus it's a very satisfying number. A nice number with some more wiggle room than Wordle gives. Enough to
        where if you know your Survivor trivia, each puzzle can be solvable.
      </p>

      <h2>Designing the Game</h2>
      <p>
        There's a lot of nuances to Survivordle that are very easy to forget. The major thing that people often
        comment on is that you are not just guessing a player, but rather a player and season combination — or what
        I call an appearance. I chose to make it this way to keep the dimensionality the same across all castaways.
        Zooming out, this makes sense, as it would be hard to push hints in two (or more) directions towards a
        castaway who appeared multiple times. The complexity is worth the slight confusion in my eyes.
      </p>
      <p>
        The hints provided can be useful and interesting, yet are sometimes uninformative. The outcome hint provides
        the episode and day that the person was eliminated, or if they made it to the end. This hint is more
        context-based, and provides a big hint when the outcome is something niche (quit, medevac, lost
        fire-making challenge). The other hint reveals the players voted out before and after the contestant,
        possibly showing if this person was the first person eliminated or the winner. I like this hint better, as
        sometimes seeing some names is a good refresher of the season itself and the episode structure.
      </p>
      <p>
        As much as I hate to say it, the Give Up button is helpful, and I can admit to using it a handful of times.
        Out of almost 900 appearances, I don't quite know everyone, and am coming to terms about being okay with
        that. It's a useful button that saves some time, and originally lived elsewhere before being moved to be
        right by the hints.
      </p>
      <p>
        Colorblind mode was a feature suggested by someone who sent me an email — if you have thoughts on features
        like this, please email at{" "}
        <a href="mailto:survivordlegame@gmail.com">survivordlegame@gmail.com</a>. The standard color scheme of the
        site relies on green and yellow/orange being identifiable, and for a portion of players, it wasn't. This
        mode switches the correct green squares into a blue color, which paints a better picture for colorblind
        players, increasing the accessibility of the game.
      </p>
      <p>
        I absolutely love the stats page. This exists for the players to see their daily stats for the daily puzzle
        and unlimited, but the data analyst in me thought it needed some more pizzazz. On the page, you'll find the
        difficulty of the daily puzzles compared to the last week of puzzles. From there, it will rank these 7
        puzzles as easy, normal, or hard difficulty, including the average number of guesses it took the average
        player to solve. A global stats page shows the amount of total games played, guesses made, and a guess
        distribution chart. It also shows the most common first guesses for puzzles — I have suspected some users
        realizing this and spamming "meme" contestants (shoutout Carl Bilancione). There's so much more I want to
        do with this page, but you can only do so much.
      </p>
      <p>
        For those wondering, I don't pick the daily puzzles. I play as any typical player would, which is awesome.
        It was determined by a random sequence of numbers, set back on February 23rd, when puzzle #1 was. Every
        player in the world gets the same daily puzzle, and I am no different.
      </p>

      <h2>Website Infrastructure</h2>
      <p>
        The site runs on React and Vite, a fast, lightweight setup that made sense for a static game with no
        backend rendering needed.
      </p>
      <p>
        On February 23, 2026, Survivordle officially launched on Vercel. The domain came shortly after, and
        survivordle.com was born. As the game grew, daily traffic started hitting Vercel's request limits in ways
        I hadn't anticipated. That's a good problem to have, but still a problem. I migrated hosting to Cloudflare
        Pages, and page views and visits are now tracked through Cloudflare and Google Analytics.
      </p>
      <p>
        For the game data itself — every solve event, guess count, win or loss, mode played — it all logs
        anonymously to Supabase, a cloud database. None of it is tied to any individual. It exists purely to power
        the stats page and help me understand how the game is actually being played.
      </p>

      <h2>Outreach</h2>
      <p>
        The audience of Survivordle was built from nothing.
      </p>
      <p>
        After launching, posting on r/Survivor was the first move. That put the very early version of the site in
        front of superfans — exactly the people I wanted, who can catch errors, give real feedback, and pass it
        along if they liked it. The first few hours of comments made it clear that the placement arrows were
        confusing people, which is still the most common question I get to this day.
      </p>
      <p>
        A few days later, I woke up to a TikTok on my FYP of @SurvivorTeg (shoutout!) playing the daily puzzle.
        Watching someone actually engage with something I built, unprompted, is a feeling that's hard to describe.
        It also made me realize the game needed more. Hours later, Unlimited and Archive modes were live. The Stats
        page followed shortly after.
      </p>
      <p>
        From there the game started to take on a life of its own. People were posting scores on X, creators across
        platforms were making daily solve videos, and I was in countless DMs on Instagram, Twitter, and TikTok
        trying to get the word out. The moment that stood out most was easily reaching out to a Survivor runner-up
        expecting to introduce them to the game, and getting back that they already knew about it and loved playing
        it, and had just been talking about it with some other contestants. That was a nice thing to wake up to.
      </p>
      <p>
        After a month of plays, a Twitter account was created, <a href="https://x.com/Survivordle" target="_blank" rel="noopener noreferrer">@Survivordle</a>.
        There will be a hub for Survivordle, including general Survivor commentary, statistics, and classic banter.
      </p>

      <h2>What's Next</h2>
      <p>
        The game is going to keep growing, and there are a few specific things I'm working toward.
      </p>
      <p>
        On the product side, I want to add a New Era filter to Unlimited mode — for the players who want to stay in
        their lane and only guess from Seasons 41 onward. It's the most requested thing I've heard from the newer
        fan base, and it makes sense.
      </p>
      <p>
        I've also started building a model that predicts how difficult a puzzle will be before anyone plays it. The
        inputs are things from the site you see after a guess — season, placement (in tiers), returnee status, age —
        and as the model gets more accurate with more data, it'll show up directly on the site. More on that soon.
      </p>
      <p>
        And I plan to keep writing. Coming up: a breakdown of the data behind a good first guess, and a deeper look
        at how the difficulty model actually works. If either of those sounds interesting, follow along and help
        support the site.
      </p>
      <p>
        The future is looking bright for Survivordle, and I really appreciate you for reading this far.
        Now, <a href="https://survivordle.com">go play Today's Puzzle</a>!
      </p>
    </div>
  );
}

// ─── Post registry ──────────────────────────────────────────────────────────
// Add new post components here as you write them.
const POST_CONTENT = {
  "how-i-built-survivordle": PostHowIBuilt,
};

// ─── Post page ───────────────────────────────────────────────────────────────
export default function BlogPost() {
  const { slug } = useParams();
  const post = getPost(slug);
  const Content = POST_CONTENT[slug];

  useSEO(post ? {
    title: `${post.title} — Survivordle Blog`,
    description: post.description,
    canonical: `https://survivordle.com/blog/${slug}`,
  } : {
    title: "Post Not Found — Survivordle",
    description: "",
    canonical: `https://survivordle.com/blog`,
  });

  if (!post || !Content) return <Navigate to="/blog" replace />;

  return (
    <>
      <style>{POST_CSS}</style>
      <div className="post-page">
        <Link to="/blog" className="post-back">← All Posts</Link>

        <div className="post-header">
          <h1 className="post-title">{post.title}</h1>
          <div className="post-meta">
            {post.dateDisplay}<span>·</span>{post.readTime}
          </div>
        </div>

        <Content />

        <div className="post-footer">
          <p className="post-footer-author">
            Written by <strong>Charlie Hart</strong>, creator of Survivordle.
            Questions or feedback? <a href="mailto:survivordlegame@gmail.com">survivordlegame@gmail.com</a>
          </p>
          <div className="post-footer-links">
            <a href="https://survivordle.com" className="post-footer-link">Play Today's Puzzle →</a>
            <a href="https://x.com/Survivordle" target="_blank" rel="noopener noreferrer" className="post-footer-link">Follow @Survivordle</a>
          </div>
        </div>
      </div>
    </>
  );
}
