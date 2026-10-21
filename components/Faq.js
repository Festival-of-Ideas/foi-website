'use client';

import { useState } from 'react';

const faqs = [
  ['Who can attend Festival of Ideas?', 'The festival is open to students, faculty and the public. Some workshops have limited seats and require registration.'],
  ['Is there an entry fee?', 'Entry to the venue is free. One must register as an attendee in order to enter the venue. Seats are on a first come, first served basis.'],
  ['Can I still apply to volunteer?', 'Volunteer applications are now closed. Thank you for your interest; shortlisted applicants will be contacted directly by the team.'],
  ['Where can I see the schedule?', 'Detailed day-wise timings are shared under Festival Layout closer to the festival, and by email if you sign up on the Home page.'],
  ['How can my organisation partner with the festival?', 'Reach out through the contact details in the footer — the partnerships team reviews proposals on a rolling basis.'],
];

export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <div className="faq-list">
      {faqs.map(([q, a], i) => (
        // `reveal` sits on a wrapper with a fixed className: Reveal.js adds `.in` straight to the DOM,
        // and a re-render that rebuilt this className would wipe it and hide the item again.
        <div key={q} className="reveal" style={{ '--i': i }}>
          <div className={`faq-item${open === i ? ' open' : ''}`}>
            <button className="faq-q" id={`faq-q${i}`} aria-expanded={open === i} aria-controls={`faq-a${i}`} onClick={() => setOpen(open === i ? null : i)}>
              <span>{q}</span>
              <span className="faq-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg></span>
            </button>
            {/* grid 0fr → 1fr animates to the answer's real height */}
            <div className="faq-a" id={`faq-a${i}`} role="region" aria-labelledby={`faq-q${i}`}><div><p>{a}</p></div></div>
          </div>
        </div>
      ))}
    </div>
  );
}
