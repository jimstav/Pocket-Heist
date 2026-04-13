// this page should be used only as a splash page to decide where a user should be navigated to
// when logged in --> to /heists
// when not logged in --> to /login

import { Clock8 } from 'lucide-react';

export default function Home() {
  return (
    <div className="center-content">
      <div className="page-content">
        <h1>
          P<Clock8 className="logo" strokeWidth={2.75} />
          cket Heist
        </h1>
        <div>Tiny missions. Big office mischief.</div>
        <p>
          Welcome to Pocket Heist — the app that turns your office into a
          playground. Assign sneaky micro-missions to your colleagues, complete
          daring tasks before the clock runs out, and climb the leaderboard one
          harmless prank at a time.
        </p>
        <p>
          Whether you&apos;re hiding someone&apos;s stapler, leaving a cryptic
          note on the whiteboard, or staging a full desk takeover — every heist
          counts. Ready to cause some chaos?
        </p>
      </div>
    </div>
  );
}
