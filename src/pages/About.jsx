import useSEO from "../shared/useSEO";

export default function About() {
  useSEO({
    title: "About — Survivordle",
    description: "Learn about Survivordle, the daily Survivor castaway guessing game. Launched February 2026.",
    canonical: "https://survivordle.com/about",
  });

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
        <div className="tagline">About</div>
      </header>

      <div className="about-page">

        <section className="about-section">
          <h2 className="about-heading">What is Survivordle?</h2>
          <p className="about-body">
            Survivordle is a daily guessing game about the TV show Survivor. 
            Each day, a new castaway is chosen at random, and you have 8 guesses to figure out who it is. 
            After each guess, the game board gives you color-based feedback on attributes to the specific answer's season, placement, gender, tribe color, returnee status, and age. 
            This narrows it down until you either solve it, give up, or run out of guesses.
          </p>
          <p className="about-body">
            A new puzzle drops every day at midnight ET. You can also replay every past puzzle in Archive mode, or play endlessly in Unlimited mode. Check out the stats page to see how you stack up against other players, view your guess distribution, track total number of plays, and more!
          </p>
          <p className="about-body">
            Not affiliated with the Survivor TV show or its producers in any way, just a tribute to the greatest show of all time.
          </p>
        </section>


        <div className="about-divider" />

        <section className="about-section">
          <h2 className="about-heading">The Creator</h2>
          <p className="about-body">
            Hey! I'm Charlie Hart, the creator of Survivordle. 
            I built this game because I love Survivor and wanted to create a trivia game for the community.
            What started as an idea became a fun side-project, and I'm so grateful to everyone who has played!
          </p>
        </section>

        <div className="about-divider" />

        <section className="about-section">
          <h2 className="about-heading">Get in Touch</h2>
          <p className="about-body">
            Have feedback, catch any error, or want to talk Survivor? Reach out!
          </p>
          <div className="about-links">
            <a
              href="mailto:survivordlegame@gmail.com"
              className="about-link"
            >
              ✉️ survivordlegame@gmail.com
            </a>
            <a
              href="https://x.com/xCharlieHart"
              target="_blank"
              rel="noopener noreferrer"
              className="about-link"
            >
              𝕏 @xCharlieHart
            </a>
            <a
              href="https://instagram.com/charl13hart"
              target="_blank"
              rel="noopener noreferrer"
              className="about-link"
            >
              Instagram @charl13hart
            </a>
            <a href="https://www.buymeacoffee.com/chahart" target="_blank" rel="noopener noreferrer">
              <img
                src="https://img.buymeacoffee.com/button-api/?text=Buy me a beer&emoji=🍺&slug=chahart&button_colour=ffc64d&font_colour=000000&font_family=Poppins&outline_colour=000000&coffee_colour=FFDD00"
                alt="Buy me a beer"
                className="bmc-img"
              />
            </a>
          </div>
        </section>

      </div>
    </>
  );
}
