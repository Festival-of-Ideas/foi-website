'use client';

import { useState } from 'react';

const TEAMS = [
  'Space Design & Venue Aesthetics', 'Graphics & UI/UX Design', 'Business Zone', 'Media Coverage & Partnerships',
  'Fortress India', 'Society & Club Collaborations', 'Multimedia Content Creation & Photography',
  'Sponsorship & Brand Connections', 'Editorial & Research', 'Marketing & Promotions', 'House of Fiction',
];

// name must match the keys /api/volunteer expects.
const BASIC = [
  { name: 'name', label: 'Name *', type: 'text', autoComplete: 'name', placeholder: 'Your full name', error: 'Please enter your name.' },
  { name: 'phone', label: 'Phone Number (available on WhatsApp) *', type: 'tel', autoComplete: 'tel', placeholder: 'Your WhatsApp number', error: 'Enter a valid 10-digit Indian mobile number (starting with 6-9).' },
  { name: 'email', label: 'E-Mail *', type: 'email', autoComplete: 'email', placeholder: 'Your E-mail', error: 'Please enter a valid E-mail.' },
  { name: 'college', label: 'College *', type: 'text', autoComplete: 'organization', placeholder: 'Your college', error: 'Please enter your college.' },
  { name: 'course_year', label: 'Course and Year *', type: 'text', placeholder: 'e.g. B.A. Economics Honours, 2nd Year', error: 'Please enter your course and year.' },
];

const QUESTIONS = [
  { name: 'about', label: '1. Tell us something about yourself that goes beyond the usual introductions. It could be a quirky habit, an unexpected interest, a hidden talent, a fun fact, or simply something that makes you, you! *' },
  { name: 'team', label: '2. What team would you like to be a part of? *', select: TEAMS, error: 'Please select a team.' },
  { name: 'why_team', label: '3. Why did you choose this particular team? Tell us what interests you about being a part of it. *' },
  { name: 'skills', label: '4. List three skills or strengths that make you a good fit for your chosen team. *', placeholder: 'Your three skills or strengths' },
  { name: 'experience', label: "5. Do you have any relevant experience you'd like to share? This could include volunteering, college societies, projects, internships, personal projects, events, or anything else relevant to the team you've chosen. *", placeholder: 'Your relevant experience' },
  { name: 'idea', label: '6. List one original idea or approach that you think could add value to your chosen team. *', placeholder: 'Your idea or approach' },
  { name: 'anything_else', label: "7. Anything else you'd like to share? Use this space for work links/examples, expectations, ideas, questions, or anything else you'd like us to know.", placeholder: "Anything else you'd like us to know", optional: true },
];

const normalisePhone = (v) => v.replace(/\D/g, '').replace(/^(91|0)(?=\d{10}$)/, '');

function isInvalid(name, value) {
  if (name === 'email') return !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
  if (name === 'phone') return !/^[6-9]\d{9}$/.test(normalisePhone(value));
  return value.length < 2;
}

export default function VolunteerForm() {
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | done
  const [serverMsg, setServerMsg] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const bad = {};
    for (const f of [...BASIC, ...QUESTIONS]) {
      if (!f.optional && isInvalid(f.name, String(data[f.name] || '').trim())) bad[f.name] = true;
    }
    setErrors(bad);
    const first = Object.keys(bad)[0];
    if (first) return form.elements[first].focus();

    setStatus('sending');
    setServerMsg('');
    try {
      const res = await fetch('/api/volunteer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || `HTTP ${res.status}`);
      setStatus('done');
    } catch (err) {
      console.error('Volunteer form submit failed:', err);
      setServerMsg(err.message || 'Could not submit. Please try again.');
      setStatus('idle');
    }
  }

  const field = (f, control) => (
    <div key={f.name} className={`volunteer-field${errors[f.name] ? ' error' : ''}`}>
      <label htmlFor={`v-${f.name}`}>{f.label}</label>
      {control}
      {!f.optional && <div className="volunteer-error">{f.error || 'Please answer this question.'}</div>}
    </div>
  );

  if (status === 'done') {
    return (
      <div className="success-box show">
        <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6" /><path d="M8 12.5l2.5 2.5L16 9.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        <h4 style={{ margin: '0 0 6px', color: 'var(--plum)' }}>Application received</h4>
        <p style={{ fontSize: 13, opacity: 0.75, margin: 0 }}>Thank you for applying to volunteer with the Festival of Ideas 2026. The volunteer team will communicate further updates through the official channels.</p>
      </div>
    );
  }

  return (
    <div className="volunteer-form-shell">
      <div>
        <h3 style={{ margin: '0 0 6px', fontSize: 20, color: 'var(--plum)' }}>Volunteer Registration</h3>
        <p style={{ fontSize: 13, opacity: 0.7, margin: 0 }}>Please read the guidelines before filling the form below.</p>
      </div>
      <div className="volunteer-guidance">
        <h4>Before you apply</h4>
        <p>The Volunteer Programme is for students currently enrolled in any course and year in New Delhi. The festival is scheduled from <strong>29 October to 1 November 2026</strong> at the <strong>Shri Ram College of Commerce (SRCC), University of Delhi</strong>.</p>
        <div className="volunteer-guidance-grid">
          <div className="volunteer-guidance-item"><strong>Commitment:</strong> To be present all four days of the festival, attend organizing team orientation, and work on tasks with your allocated team.</div>
          <div className="volunteer-guidance-item"><strong>Incentives:</strong> Hands-on Organizing Team Experience, High Value Certification with vetting systems, volunteer merchandise, food and high-profile networking opportunities</div>
          <div className="volunteer-guidance-item"><strong>Opportunities:</strong> Work across areas such as outreach, media, research, content, aesthetics, partnerships etc.</div>
          <div className="volunteer-guidance-item"><strong>Selection:</strong> This is the first round of applications; further shortlisting rounds shall follow.</div>
        </div>
      </div>
      <form noValidate onSubmit={onSubmit}>
        <div className="volunteer-scroll-box">
          <div className="volunteer-section-label">Section 1 · Basic Info About You</div>
          {BASIC.map((f) => field(f, <input id={`v-${f.name}`} name={f.name} type={f.type} autoComplete={f.autoComplete} placeholder={f.placeholder} />))}

          <div className="volunteer-section-label" style={{ marginTop: 24 }}>Section 2 · Let us get to know you better!</div>
          <p style={{ fontSize: 11.5, lineHeight: 1.6, opacity: 0.72, margin: '-5px 0 15px' }}>Answer these questions to explain your interests, skill set and enthusiasm. Keep your responses honest and crisp. The form asks applicants not to plagiarize or use AI tools.</p>
          {QUESTIONS.map((f) => field(f, f.select ? (
            <select id={`v-${f.name}`} name={f.name} defaultValue="">
              <option value="">Select a team</option>
              {f.select.map((t) => <option key={t}>{t}</option>)}
            </select>
          ) : (
            <textarea id={`v-${f.name}`} name={f.name} placeholder={f.placeholder || 'Your answer'} />
          )))}

          <button className="volunteer-submit" type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Submitting…' : 'Submit Volunteer Application'}
          </button>
          {serverMsg && <p role="alert" style={{ color: '#C23B3B', fontSize: 12, lineHeight: 1.5, margin: '10px 0 0' }}>{serverMsg}</p>}
          <p className="volunteer-note">By submitting, you confirm that the information provided is yours and that you have read the volunteer requirements above.</p>
        </div>
      </form>
    </div>
  );
}
