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

.post-body h3 {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 20px;
  letter-spacing: 1.5px;
  color: var(--text);
  margin: 28px 0 10px;
}

.post-body table {
  width: 100%;
  border-collapse: collapse;
  margin: 16px 0 24px;
  font-size: 14px;
}

.post-body th {
  text-align: left;
  padding: 8px 12px;
  color: var(--text3);
  border-bottom: 1px solid var(--border);
  font-weight: 600;
  font-size: 11px;
  letter-spacing: 0.8px;
  text-transform: uppercase;
}

.post-body td {
  padding: 8px 12px;
  color: var(--text2);
  border-bottom: 1px solid var(--border);
}

.post-formula {
  background: rgba(232, 116, 42, 0.06);
  border-left: 3px solid #e8742a;
  border-radius: 4px;
  padding: 16px 20px;
  margin: 16px 0;
  font-size: 14px;
  line-height: 2.1;
  color: var(--text2);
}

.post-body img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 16px 0;
  display: block;
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

function PostBestFirstGuess() {
  const ageChart = "/age-graph.png";

  return (
    <div className="post-body">
      <p>
        Everyone has an opener. Some people start with MLB Hall of Famer Jeff Kent, who famously called out
        President Barack Obama after getting voted out. Some go with the winner or Sia's fan favorite of a
        recent season. Others throw in a random early boot just for fun. These are all valid, and there's no
        wrong answer, but I wanted to know what the math actually said about the best possible first guess.
      </p>
      <p>
        So, I built a scoring system that evaluates every castaway's appearance in the Survivordle dataset as a first guess.
        Here's what I found.
      </p>

      <h2>Why This Is Interesting</h2>
      <p>
        Survivordle is a game of narrowing, similar to <em>Guess Who?</em>, but with the people as niche
        internet celebrities who talk about hidden immunity idols and have way too dramatic RHAP post-game
        interviews. Each guess chips away at the pool of 893 possible answers until zeroing in on a single
        castaway, or giving up, similar to the likes of Purple Kelly. Guessing anyone gives you information,
        but some guesses give more information than others. After watching{" "}
        <a href="https://www.youtube.com/watch?v=v68zYyaEmEA" target="_blank" rel="noopener noreferrer">
          3Blue1Brown's Solving Wordle using information theory
        </a>
        , where math is used to determine which five-letter word does the best job as a first guess, I wanted
        to apply similar tactics to Survivordle.
      </p>
      <p>
        The idea is simple: I simulate every castaway as a first guess against every other castaway as the
        possible answer. Score all of them based on the "quality" of the guess, average across all possible
        answers, and you have an objective ranking of every opener in the game, from 1 to 893.
      </p>

      <h2>How the Scoring Works</h2>
      <p>
        Each guess in Survivordle reveals six pieces of information: Season, Placement, Gender, Tribe Color,
        Returnee Status, and Age. For a first guess to be effective, it needs to paint the clearest possible
        picture for the next guess.
      </p>
      <p>
        Not all six columns are equal, and two of them don't affect the strength of a first guess at all.
      </p>
      <p>
        <strong>Gender and Returnee Status do not matter for this.</strong> At first this might seem weird,
        but it makes sense. For example, if you guess a male non-returnee like Ken Hoang and the answer is a
        female returnee like Eliza Orlins, both cells come back gray, which displays as much information as
        if you'd guessed a female returnee and gotten two greens. The information gained is identical
        regardless of which value you guessed, so these columns aren't included in the modeling.
      </p>
      <p>
        The four columns that actually drive the score are:
      </p>
      <p>
        <strong>Season &gt; Placement &gt; Age &gt; Tribe Color</strong>
      </p>
      <p>
        <em>
          Note: This is subjective, and my best guess at the consensus of Survivordle players and Survivor
          fans alike. The top two are easily Season and Placement, with Age being relevant but many exact ages
          are unknown. Tribe Color gives good feedback, but is less well-known than the others, so it matters
          the least. There are also two non-binary contestants in the dataset, and since on the second guess,
          you can figure that out, gender is not used. There are slightly more male appearances than females,
          and significantly more non-returnees than returnees. 
          Lastly, different contestants can have different scores from different seasons.
        </em>
      </p>

      <h3>The Formula</h3>
      <p>
        For each (guess, answer) pair, the score is the sum of column scores across Season (S), Placement (P),
        Age (A), and Tribe Color (T). Each column contributes based on the result:
      </p>
      <div className="post-formula">
        <div><strong>Green</strong> (exact match) — column weight × 1.0</div>
        <div><strong>Orange</strong> (within threshold) — column weight × 0.5</div>
        <div><strong>Gray with direction arrow</strong> — column weight × (castaways eliminated by arrow ÷ 892)</div>
        <div><strong>Gray, tribe color only</strong> — 0</div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Column</th>
            <th>Weight</th>
            <th>Threshold for Orange</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Season</td><td>10</td><td>±2 seasons</td></tr>
          <tr><td>Placement</td><td>8</td><td>±3 places</td></tr>
          <tr><td>Age</td><td>3</td><td>±5 years</td></tr>
          <tr><td>Tribe Color</td><td>1</td><td>exact only</td></tr>
        </tbody>
      </table>

      <h3>The Dynamic Gray Score</h3>
      <p>
        The most important part of the formula is the gray & direction score. Unlike Wordle, where wrong
        letters are simply wrong, a wrong Season, Placement, or Age still gives you important context for
        the process of elimination. The value of that information depends entirely on where in the distribution
        your guess falls.
      </p>
      <p>
        The formula scores are based on this: the gray & direction score equals the column weight multiplied
        by the fraction of the 892-person pool that arrow actually eliminates. A perfectly centered guess
        extracts the most information even on a complete miss, because every arrow cuts the field as close
        to 50/50 as possible.
      </p>
      <p>
        If you guess Season 10 and the answer is Season 40, the Up arrow eliminates everyone from Seasons 1–10. 
        Since the early seasons were smaller, that might only eliminate 150 people. 
        But guessing Season 25 eliminates nearly half the field regardless of which way the arrow points, 
        so even a wrong guess there is more informative than a wrong guess at the extremes.
      </p>
      <p>
        With that being said, let's look at what a strong Survivordle first guess should look like.
      </p>

      <h2>The Ideal Profile</h2>
      <p>
        Before looking at the rankings, it helps to understand what high-scoring castaways have in common.
        The model gravitates toward a very specific archetype.
      </p>
      <p>
        <strong>Seasons 24 to 28 provide an excellent middle ground.</strong> A guess in this range resulting
        in gray would leave you with about 20 seasons in each direction. Guessing Season 1 or Season 49 leaves
        you in gray territory against most of the field, and the arrow barely cuts anything. Season 25 is
        technically the middle season, but there are more populated casts in the seasons later than 25,
        suggesting that Season 26 or 27 might be a stronger starting point.
      </p>
      <p>
        <strong>Early Jury is the way to go.</strong> Mid-placement covers a wideband of the field. Winners
        and first boots sit at the extremes and produce nearly useless directional arrows. Someone who finished
        8th–11th sits comfortably in the middle, giving you a clean split in both directions.
      </p>
      <p>
        <strong>Thirty-something year olds are a good pick.</strong> The age distribution peaks in the early-to-mid
        30s. A guess near that center covers most ground on a yellow, and extracts the maximum information from
        a wrong answer. Guessing senior citizens produces a down arrow that eliminates almost nobody. But Carl
        Bilancione is still in the top 5 most common guesses, hmm…
      </p>
      <img src={ageChart} alt="Age distribution of Survivor castaways in the Survivordle dataset" />
      <p>
        The figure above shows that the age distribution technically peaks in the late 20s, but skews toward
        older ages, making the mean and median in the 30s.
      </p>
      <p>
        <strong>Popular tribe color.</strong> Blue/Teal (21.8%), Yellow/Gold (19.2%), Orange (18.5%), and
        Red (15.9%) make up over 75% of all tribe assignments. A correct tribe color is a small bonus, worth
        +1 in the model, and more common with these colors than with Magenta, Brown, or Black.
      </p>

      <h2>The Leaderboard</h2>
      <p>
        When calculating the scores, the best score received 100%, and everything else was scaled in relation
        to that, then graded on a letter system with pluses and minuses down to 60% — everything below 60
        became an F.
      </p>

      <h3>S-Tier (Score: 100)</h3>
      <p>
        Only two castaways in the entire dataset score a perfect 100. Amazingly, they are brothers.
      </p>
      <p>
        <strong>#1 Vytas Baskauskas</strong> (Season 27, 10th place, Age 33, Red) and{" "}
        <strong>#2 Aras Baskauskas</strong> (Season 27, 11th place, Age 31, Yellow/Gold) are the <strong>only</strong> two
        S-tier first guesses in Survivordle. The Baskauskas brothers have near-identical profiles and fit the
        criteria perfectly to split each tier of season, placement, and age. Aras was a former winner, but his
        brother narrowly took the crown as the best Survivordle first guess.
      </p>

      <h3>A+ Tier (Scores 97–99.9)</h3>
      <p>
        21 castaways land here, all from Seasons 22–30, all with placements between 8th and 12th.
      </p>
      <p>
        <strong>#3 Reynold Toepfer</strong> (Season 26, 8th place, Age 30, Orange) is damn near as close to
        S-Tier as it gets. Season 26 of 49, placement right in the middle, age near the mean.{" "}
        <strong>#5 Sarah Lacina</strong> (Season 28, 11th place, Age 29, Orange) makes the list as the
        top-scoring female. <strong>#11 RC Saint-Amour</strong> (Season 25, 11th place, Age 27, Yellow/Gold)
        is the most common first guess, but falls just short of the top for a slightly younger age than
        average. <strong>#14 Jeremy Collins</strong> (Season 29, 10th place, Age 36, Blue/Teal) scores an A+
        on his first appearance, only for the rest of his results to be significantly lower on the scale.
      </p>

      <h3>A Tier (Scores 93–96.9)</h3>
      <p>
        48 castaways fall here, placing from 6th–13th on seasons 17–34.
      </p>
      <p>
        <strong>#25 Malcolm Freberg</strong> earns an A from his second stint in Caramoan.{" "}
        <strong>#26 Courtney Yates</strong> makes a strong case from Heroes vs. Villains.{" "}
        <strong>#52 John Cochran</strong> from South Pacific makes an appearance as well. Less than 10% of
        guesses are A-Tier and above, putting these players in special territory.{" "}
        <strong>#30, #41 Zeke Smith</strong> (Millennials vs. Gen X, Game Changers),{" "}
        <strong>#31, #62 Joe Anglim</strong> (Worlds Apart, Cambodia), and{" "}
        <strong>#45, #66 Laura Morett</strong> (Blood vs. Water, Samoa) all appear twice in A-Tier.
      </p>
      <p>
        <strong>#18, #46 Brenda Lowe</strong> (Nicaragua, Caramoan) is the best returnee for a first guess,
        appearing in both A+ and A tier. Congrats, Brenda! <strong>#75 Coach Wade</strong> is the best guess
        for anyone currently on Survivor 50: In The Hands of the Fans.
      </p>

      <h3>B Tier (Scores 80–89.9)</h3>
      <p>
        This is where the model starts rewarding players who are close but slightly off on one or two
        categories. You'll find <strong>Rupert Boneham</strong> on Heroes vs. Villains checking in with a
        solid placement, but the season is slightly early and his higher age pulls the score down.{" "}
        <strong>Cirie Fields</strong> on Game Changers grades out B- as her highest score from her four
        appearances — giving her a brutal break once again as the best contestant to never win, or receive
        an A tier or greater as a first Survivordle guess. The youngest person ever,{" "}
        <strong>Will Wahl</strong>, finds himself in the B tier despite being 18 when he played.
      </p>

      <h3>C Tier (Scores 70–79.9)</h3>
      <p>
        The C tier has 200 players, all with some upside as guesses but nothing flashy. Here we see winners
        like <strong>Kim Spradlin-Wolfe</strong> (highest scoring winner), <strong>Boston Rob</strong>,{" "}
        <strong>Tony Vlachos</strong> (Cagayan), and <strong>Natalie Anderson</strong>. There is decent
        information, but not a ton compared to the heavy hitters. Some other legends to reside in C tier:{" "}
        <strong>Chet Welch</strong>, <strong>Shamar Thomas</strong>, and <strong>Jacquie Berg</strong>.
      </p>

      <h3>D and F Tier: More Than 1 in 4 Guesses Is Bad</h3>
      <p>
        Over 25% of the possible guesses were graded as an F, not even coming within 60% of the best
        possible guess of the Baskauskas brothers. Lots of new era players, lots of early seasons. The extreme
        ends of the spectrum regarding season, placement, and age.
      </p>
      <p>
        <strong>Savannah Louie</strong> is the worst first guess from Survivor 50. S tier legend, F tier first
        guess <strong>Wendy-Jo DeSmidt-Kohlhoff</strong> is the only player from Seasons 20–35 to land in F
        tier. <strong>Aras Baskauskas</strong> has an incredible profile from Blood vs. Water, and also an
        incredibly bad profile from his win on Survivor: Panama.
      </p>
      <p>
        The three worst guesses in the entire dataset are the three oldest castaways from the Tagi tribe on
        Season 1:
      </p>
      <p>
        <strong>#893 Rudy Boesch</strong> (Season 1, 3rd place, Age 72, Orange). Rudy is a Survivor legend
        that will always be remembered, but his profile as a Survivordle first guess is historically bad. The
        age is almost guaranteed to be lower, the season is almost guaranteed to be higher, and the placement
        is almost guaranteed to be higher. It doesn't quite get worse than that.
      </p>
      <p>
        <strong>#892 Richard Hatch</strong> (Season 1, Winner, Age 39, Orange). Another legend from Season 1,
        and this profile sticks out for similar reasons as Rudy's. Guessing the 1st place finisher from the
        1st season is not a huge help when the answer is Mari Takahashi, who got 19th on Season 33. If you
        are guessing Richard Hatch as a starter, there are bigger problems at hand.
      </p>
      <p>
        <strong>#891 Sonja Christopher</strong> (Season 1, 16th place, Age 63, Orange). Once again, it makes
        sense. The first person ever voted out on the show (and STILL more of a Game Changer than Sierra
        Dawn-Thomas) is not a lot of information for a first guess. The three worst Survivordle guesses are
        the three oldest contestants from the Tagi tribe on Survivor's first season. Funny how things work
        out, and it's not hard to see why.
      </p>

      <h2>Should You Actually Use This?</h2>
      <p>
        Not really, lol. The model is weighted on what I think matters most in a Survivordle guess, and I
        prioritized season and placement heavily because that's how most players (including myself) think
        about the board. If you're someone who knows tribe colors and ages off the top of your head, get a
        hobby. Just kidding, but the optimal guess for your style might look different. It's not that deep.
      </p>
      <p>
        What's interesting is how the math reveals players you'd never think to guess. Nobody is starting
        their rounds with Leif Manson or Reed Kelly. Yet, these are excellent openers — the math says why:
        they sit in the middle of the important categories, and are unfortunately unimportant to Survivor fans
        compared to players like Malcolm and Parvati.
      </p>
      <p>
        This was a really cool experiment to conduct and write about. If you found this interesting and read
        this far, let me know what else I should dig into about the nuances of Survivordle.
      </p>
    </div>
  );
}

// ─── Post registry ──────────────────────────────────────────────────────────
// Add new post components here as you write them.
const POST_CONTENT = {
  "best-first-guess": PostBestFirstGuess,
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
