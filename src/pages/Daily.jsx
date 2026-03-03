import { useState, useEffect } from "react";
import { getDailyAnswer, getPuzzleNumber, msUntilMidnightET } from "../shared/gameLogic";
import { loadTodayGame, saveCompletedGame, loadStorage, saveStorage } from "../shared/storage";
import { STATUS_EMOJI } from "../shared/constants";
import GameBoard from "../components/GameBoard";

export default function Daily({ contestants, onShowStats, colorblind }) {
  const [answer,  setAnswer]  = useState(null);
  const [loading, setLoading] = useState(true);
  const [saved,   setSaved]   = useState(null);

  const puzzleNum = getPuzzleNumber();

  useEffect(() => {
    if (!contestants.length) return;
    const ans = getDailyAnswer(contestants);
    setAnswer(ans);
    const todaySaved = loadTodayGame(puzzleNum);
    if (todaySaved) {
      setSaved(todaySaved);
      setTimeout(() => onShowStats?.(), 600);
    }
    setLoading(false);
  }, [contestants]);

  // Auto-refresh at midnight ET
  useEffect(() => {
    const timer = setTimeout(() => window.location.reload(), msUntilMidnightET());
    return () => clearTimeout(timer);
  }, []);

  function handleComplete({ won, guessCount, emojiGrid, guesses, results, gaveUp }) {
    saveCompletedGame({ puzzleNum, won, gaveUp, guessCount, emojiGrid });
    const s = loadStorage();
    saveStorage({ ...s, guessObjects: guesses, resultObjects: results });
  }

  if (loading || !answer) return <div className="loading">🔥 Loading the tribe…</div>;

  return (
    <>
      {/* Header */}
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
        <div className="tagline">Guess the Survivor Castaway &nbsp;·&nbsp; #{puzzleNum}</div>
      </header>

      <GameBoard
        colorblind={colorblind}
        key={puzzleNum}
        answer={answer}
        mode="daily"
        puzzleNum={puzzleNum}
        contestants={contestants}
        onComplete={handleComplete}
        onShowStats={onShowStats}
        initialGuesses={saved?.guessObjects  || []}
        initialResults={saved?.resultObjects || []}
        initialGameOver={saved?.gameOver     || false}
        initialWon={saved?.won               || false}
        initialGaveUp={saved?.gaveUp         || false}
      />
    </>
  );
}
