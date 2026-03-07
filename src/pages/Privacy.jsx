import useSEO from "../shared/useSEO";
export default function Privacy() {
  useSEO({
    title: "Privacy Policy — Survivordle",
    description: "Survivordle privacy policy. Learn what data we collect and how it is used.",
    canonical: "https://survivordle.com/privacy",
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
        <div className="tagline">Privacy Policy</div>
      </header>

      <div className="privacy-body">
        <p className="privacy-updated">Last updated: March 2026</p>

        <section className="privacy-section">
          <h2 className="privacy-heading">Overview</h2>
          <p>
            Survivordle is a free daily puzzle game. We are committed to being transparent about
            the limited data we collect. We do not collect any personally identifiable information.
            We do not sell data to third parties.
          </p>
        </section>

        <section className="privacy-section">
          <h2 className="privacy-heading">Data We Collect</h2>
          <p>
            When you complete a game, we anonymously log the following:
          </p>
          <ul className="privacy-list">
            <li>The castaway that was guessed</li>
            <li>Number of guesses used</li>
            <li>Whether the puzzle was solved or not</li>
            <li>Whether hints were used</li>
            <li>Game mode (Daily, Archive, or Unlimited)</li>
            <li>Approximate time of play</li>
          </ul>
          <p>
            No account, name, email address, or device identifier is associated with this data.
            It cannot be traced back to any individual.
          </p>
        </section>

        <section className="privacy-section">
          <h2 className="privacy-heading">Local Storage</h2>
          <p>
            Survivordle stores your game progress, streak, and statistics locally in your browser
            using localStorage. This data never leaves your device and is not accessible to us.
            You can clear it at any time by clearing your browser's site data.
          </p>
        </section>

        <section className="privacy-section">
          <h2 className="privacy-heading">Analytics</h2>
          <p>
            We use <strong>PostHog</strong> to understand how players interact with the game —
            for example, which pages are visited and how gameplay sessions flow. PostHog collects
            standard anonymized web analytics data such as page views, session duration, and
            interaction events. No personal information is included.
          </p>
          <p>
            We also use <strong>Vercel Analytics</strong> for basic site performance monitoring,
            which collects anonymized traffic data.
          </p>
          <p>
            Game completion data (described above) is stored in <strong>Supabase</strong>, a
            cloud database provider. All data stored is anonymous and aggregated to help us
            understand puzzle difficulty and player behavior.
          </p>
        </section>

        <section className="privacy-section">
          <h2 className="privacy-heading">Cookies</h2>
          <p>
            Survivordle does not use tracking cookies. Analytics tools may set minimal functional
            cookies to distinguish unique sessions. These cookies contain no personal information
            and are not used for advertising purposes.
          </p>
        </section>

        <section className="privacy-section">
          <h2 className="privacy-heading">Advertising</h2>
          <p>
            Survivordle may display advertisements in the future through third-party ad networks
            such as Google AdSense. If and when ads are introduced, this policy will be updated
            to reflect any additional data practices required by those networks.
          </p>
        </section>

        <section className="privacy-section">
          <h2 className="privacy-heading">Third-Party Services</h2>
          <p>The following third-party services are used by Survivordle:</p>
          <ul className="privacy-list">
            <li><strong>Supabase</strong> — anonymous game event storage (<a className="privacy-link" href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer">privacy policy</a>)</li>
            <li><strong>PostHog</strong> — product analytics (<a className="privacy-link" href="https://posthog.com/privacy" target="_blank" rel="noopener noreferrer">privacy policy</a>)</li>
            <li><strong>Vercel</strong> — hosting and performance analytics (<a className="privacy-link" href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">privacy policy</a>)</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2 className="privacy-heading">Children's Privacy</h2>
          <p>
            Survivordle does not knowingly collect any information from children under the age of 13.
            The game contains no age-restricted content.
          </p>
        </section>

        <section className="privacy-section">
          <h2 className="privacy-heading">Contact</h2>
          <p>
            Questions about this privacy policy? Email us at{" "}
            <a className="privacy-link" href="mailto:survivordlegame@gmail.com">
              survivordlegame@gmail.com
            </a>
          </p>
        </section>
      </div>
    </>
  );
}
