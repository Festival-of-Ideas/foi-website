'use client';

import { Fragment, useEffect, useState } from 'react';

const TARGET = new Date('2026-10-29T09:30:00+05:30').getTime();
const pad = (n) => String(n).padStart(2, '0');

function remaining() {
  const diff = Math.max(0, TARGET - Date.now());
  return [Math.floor(diff / 86400000), Math.floor((diff % 86400000) / 3600000), Math.floor((diff % 3600000) / 60000), Math.floor((diff % 60000) / 1000)];
}

export default function Countdown() {
  // Starts at zeros so server and client HTML match; real values fill in after mount.
  const [parts, setParts] = useState([0, 0, 0, 0]);
  useEffect(() => {
    setParts(remaining());
    const t = setInterval(() => setParts(remaining()), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="countdown-row" role="timer" aria-label="Time until the festival opens">
      {['DAYS', 'HOURS', 'MINUTES', 'SECONDS'].map((lbl, i) => (
        <Fragment key={lbl}>
          {i > 0 && <span className="cd-sep" aria-hidden="true">:</span>}
          {/* keyed on the value so each change replays the tick animation */}
          <div className="cd-box"><div className="num"><span key={parts[i]}>{pad(parts[i])}</span></div><div className="lbl">{lbl}</div></div>
        </Fragment>
      ))}
    </div>
  );
}
