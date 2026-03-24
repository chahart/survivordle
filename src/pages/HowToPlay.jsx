import useSEO from "../shared/useSEO";

export default function About() {
  useSEO({
    title: "How to Play Survivordle — Daily Survivor Castaway Guessing Game",
    description: "Learn how to play Survivordle, the daily guessing game for Survivor fans. Discover the rules, strategies, and what makes each puzzle unique.",
    canonical: "https://survivordle.com/how-to-play",
  });
  return (
    <div className="page">
      <div className="modal" style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h2 className="modal-title">How to Play</h2>

        <p className="modal-body">
          Each day, a new Survivor castaway is chosen as the answer. You have <strong>8 guesses</strong> to identify them.
          Because many players have appeared in multiple seasons, you are guessing a <strong>specific castaway + season appearance</strong>, not just the person.
        </p>

        <div className="modal-section-title">After each guess, each column turns:</div>
        <div className="modal-legend">
          <div className="modal-legend-row"><span className="modal-dot correct" />Exact match</div>
          <div className="modal-legend-row"><span className="modal-dot close" />Close but not exact</div>
          <div className="modal-legend-row"><span className="modal-dot wrong" />No match</div>
        </div>

        <div className="modal-section-title">Arrow direction on 🟧 close cells:</div>
        <p className="modal-body">
          <strong>↑ the answer did worse</strong><br/>
          <strong>↓ the answer did better</strong>
        </p>

        <div className="modal-section-title">Column guide:</div>
        <div className="modal-cols">
          <div className="modal-col-row"><span className="modal-col-name">Season</span><span className="modal-col-desc">🟧 if within ±2</span></div>
          <div className="modal-col-row"><span className="modal-col-name">Placement</span><span className="modal-col-desc">🟧 if within ±3</span></div>
          <div className="modal-col-row"><span className="modal-col-name">Gender</span><span className="modal-col-desc">Exact</span></div>
          <div className="modal-col-row"><span className="modal-col-name">Tribe Color</span><span className="modal-col-desc">Exact</span></div>
          <div className="modal-col-row"><span className="modal-col-name">Returnee</span><span className="modal-col-desc">Yes/No</span></div>
          <div className="modal-col-row"><span className="modal-col-name">Age</span><span className="modal-col-desc">🟧 if ±5</span></div>
        </div>
      </div>
    </div>
  );
}