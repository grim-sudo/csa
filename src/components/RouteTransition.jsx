import { useState } from "react";
import { useLocation } from "react-router-dom";
import { SoccerBall } from "./icons";

/**
 * On every route change, a navy curtain covers the page, a football bounces
 * across left→right, then the curtain lifts to reveal the fresh page.
 *
 * The play counter is bumped during render (not in an effect) the moment the
 * pathname changes, so the curtain mounts in the same commit as the content
 * swap — the new page never flashes before the curtain covers it. The first
 * mount is skipped naturally (path matches the seeded state) and reduced-motion
 * users get no animation. This is the React "adjust state during render"
 * pattern, which re-renders immediately without an intermediate paint.
 */
export function RouteTransition() {
  const { pathname } = useLocation();
  const [prevPath, setPrevPath] = useState(pathname);
  const [play, setPlay] = useState(0);

  if (pathname !== prevPath) {
    setPrevPath(pathname);
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPlay((n) => n + 1);
    }
  }

  if (play === 0) return null;

  return (
    <div className="route-swish" key={play} aria-hidden="true">
      <span className="swish-cover" />
      <span className="swish-ball">
        <span className="ball-bob"><SoccerBall /></span>
      </span>
    </div>
  );
}
