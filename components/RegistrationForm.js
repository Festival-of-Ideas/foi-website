'use client';

import { useState } from 'react';

const copy = {
  attendee: { endpoint: '/api/attendees', title: 'Attendee registration', phone: '10-digit mobile', org: ['College / Organisation', 'Your college or organisation'] },
  delegate: { endpoint: '/api/delegates', title: 'Delegate registration', phone: 'WhatsApp preferred', org: ['Organisation associated', 'Your organisation'] },
};

// Posts to /api/attendees or /api/delegates, which save one Notion row per email and answer 409 for repeats.
export default function RegistrationForm({ kind }) {
  const c = copy[kind];
  const fields = [
    ['name', 'Full name', 'text', 'Your name', 'name'],
    ['email', 'Email', 'email', 'you@example.com', 'email'],
    ['phone', 'Mobile number', 'tel', c.phone, 'tel'],
    ['organisation', c.org[0], 'text', c.org[1], 'organization'],
  ];
  const [status, setStatus] = useState('idle'); // idle | sending | done | error
  const [error, setError] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    if (status === 'sending') return;
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    setStatus('sending');
    setError('');
    try {
      const res = await fetch(c.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again.');
      setStatus('done');
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
  }

  if (status === 'done') {
    return (
      <div className="vol-form att-done" role="status">
        <img src="/img/butterfly.webp" alt="" width="72" height="72" />
        <h3>You&apos;re registered!</h3>
        <p>See you at the festival, 29 Oct – 1 Nov 2026.</p>
      </div>
    );
  }

  return (
    <form className="vol-form att-form" onSubmit={onSubmit}>
      <h3>{c.title}</h3>
      <p className="att-sub">One registration per email address.</p>
      {fields.map(([name, label, type, placeholder, autoComplete]) => (
        <label key={name} className="detail-field">
          <span>{label}</span>
          <input name={name} type={type} placeholder={placeholder} autoComplete={autoComplete} required maxLength={500} />
        </label>
      ))}
      {/* honeypot: hidden from people, bots fill it */}
      <input className="hp" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      {error && <p className="att-error" role="alert">{error}</p>}
      <button className="btn-primary att-submit" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Registering…' : 'Register'}
      </button>
    </form>
  );
}
