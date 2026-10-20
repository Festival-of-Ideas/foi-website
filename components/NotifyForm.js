'use client';

import { useState } from 'react';

// ponytail: shows the thank-you only; emails aren't stored anywhere yet (same as the old site).
export default function NotifyForm() {
  const [done, setDone] = useState(false);
  return (
    <>
      <form
        className="notify-form reveal"
        onSubmit={(e) => {
          e.preventDefault();
          const input = e.currentTarget.elements.email;
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) return;
          setDone(true);
          input.value = '';
        }}
      >
        <input type="email" name="email" placeholder="you@example.com" aria-label="Email address" required />
        <button type="submit">Notify me</button>
      </form>
      <div className={`notify-msg${done ? ' show' : ''}`} role="status">{done ? 'Thanks — you’re on the list!' : ''}</div>
    </>
  );
}
