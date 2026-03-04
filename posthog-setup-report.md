<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of your project. The existing PostHog `posthog-js` SDK (already tracking `game_completed`, `guess_submitted`, `gave_up`, `hint_used`, and `result_shared`) was enhanced with three new events covering the archive and unlimited modes and user settings changes. The hardcoded PostHog API key in `src/main.jsx` was replaced with Vite environment variables (`import.meta.env.VITE_POSTHOG_KEY` and `import.meta.env.VITE_POSTHOG_HOST`), with values written securely to a `.env` file (git-ignored). All five edited/created files pass ESLint with zero errors.

| Event | Description | File |
|---|---|---|
| `game_completed` | Fired when a game finishes (win, loss, or give-up) with outcome, mode, guess count, and hint details | `src/components/GameBoard.jsx` |
| `guess_submitted` | Fired on each individual guess attempt with mode, puzzle, guess number, and correctness | `src/components/GameBoard.jsx` |
| `gave_up` | Fired when the player clicks Give Up, capturing guesses made and hints used | `src/components/GameBoard.jsx` |
| `hint_used` | Fired when the Outcome or Neighbors hint is revealed, with hint type and guess count at reveal | `src/components/GameBoard.jsx` |
| `result_shared` | Fired when the player copies their result grid to the clipboard | `src/components/GameBoard.jsx` |
| `archive_puzzle_selected` | Fired when a player selects a past puzzle from the Archive list (top of archive funnel) | `src/pages/Archive.jsx` |
| `unlimited_new_game_started` | Fired when the player clicks New Game in Unlimited mode after finishing a game | `src/pages/Unlimited.jsx` |
| `settings_changed` | Fired when the player toggles Light Mode or Colorblind Mode, with the setting name and new state | `src/App.jsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard — Analytics basics**: https://us.posthog.com/project/330258/dashboard/1329027
- **Games Completed (Win vs Loss)** — daily win/loss trend: https://us.posthog.com/project/330258/insights/lHoay5IP
- **Game Completion Funnel** — first guess → game completed: https://us.posthog.com/project/330258/insights/0IzX3aOF
- **Hint Usage by Type** — outcome vs neighbors hints per day: https://us.posthog.com/project/330258/insights/XlpcpIQK
- **Share Rate vs Games Completed** — viral share rate over time: https://us.posthog.com/project/330258/insights/IPh1tZqq
- **Games Played by Mode** — daily vs archive vs unlimited breakdown: https://us.posthog.com/project/330258/insights/qdwyuZhr

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/posthog-integration-javascript_node/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
