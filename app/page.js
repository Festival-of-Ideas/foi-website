import FlyLink from '../components/FlyLink';
import NotifyForm from '../components/NotifyForm';
import SpeakerCard from '../components/SpeakerCard';
import MemoriesMosaic from '../components/MemoriesMosaic';
import { pastSpeakers } from '../data/speakers';
import { absoluteUrl, SITE_NAME, SOCIAL_LINKS, staticPageMetadata } from '../lib/seo';

export const metadata = staticPageMetadata('/');

// Describe the same brand and official profiles that visitors see on this page.
const siteIdentity = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': absoluteUrl('/#website'),
      name: SITE_NAME,
      alternateName: 'Festival of Ideas',
      url: absoluteUrl('/'),
      publisher: { '@id': absoluteUrl('/#organization') },
    },
    {
      '@type': 'Organization',
      '@id': absoluteUrl('/#organization'),
      name: SITE_NAME,
      alternateName: 'Festival of Ideas',
      url: absoluteUrl('/'),
      logo: absoluteUrl('/assets/logo-butterfly.png'),
      description: 'An initiative of the Festival of Ideas Foundation celebrating ideas across the life, culture and economy of the Indian people.',
      sameAs: Object.values(SOCIAL_LINKS),
    },
    {
      '@type': 'Event',
      '@id': absoluteUrl('/#event'),
      name: 'Festival of Ideas Delhi 2026',
      description: 'The fourth edition of the Festival of Ideas Delhi: talks, competitions, books and performances on the life, culture and economy of the Indian people.',
      startDate: '2026-10-29T09:30:00+05:30',
      endDate: '2026-11-01',
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      url: absoluteUrl('/'),
      image: absoluteUrl('/img/hero.webp'),
      location: {
        '@type': 'Place',
        name: 'University of Delhi',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Maurice Nagar',
          addressLocality: 'Delhi',
          postalCode: '110007',
          addressCountry: 'IN',
        },
      },
      organizer: { '@id': absoluteUrl('/#organization') },
      // Entry is free with attendee registration (see the About FAQ)
      offers: {
        '@type': 'Offer',
        price: 0,
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
        url: absoluteUrl('/attendees'),
      },
    },
  ],
};

// Figma's past-speaker picks, in its order, with the shorter role lines the design uses
const pastPicks = [
  ['p1', 'External Affairs Minister of India'],
  ['p7', 'Former Minister, France & EU MP'],
  ['p3', 'Minister of Petroleum & Natural Gas'],
  ['p4', 'Former Union Minister & Public Intellectual'],
  ['p5', 'Chairman, 15th Finance Commission'],
  ['p8', 'Minister of Law & Justice'],
  ['p9', 'Former Union Minister, WCD'],
  ['p10', 'Journalist & Interviewer'],
].map(([id, role]) => ({ ...pastSpeakers.find((s) => s.id === id), role }));

const registerOptions = [
  { href: '/attendees', title: 'Attendees', text: 'Join and enjoy the festival.', icon: '/img/icon-attendee.svg' },
  { href: '/delegates', title: 'Delegates', text: 'Take part as a delegate.', icon: '/img/icon-delegate.svg' },
];

const Arrow = () => <span aria-hidden="true">→</span>;

export default function Home() {
  return (
    <section className="page" id="page-home">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteIdentity).replace(/</g, '\\u003c') }}
      />

      {/* Hero */}
      <div className="hero">
        <div className="hero-copy">
          <div className="hero-bfly"><img src="/img/butterfly.webp" alt="" width="100" height="100" /></div>
          <h1>Festival of Ideas</h1>
          <p className="hero-tagline">Ideas from the Life, Culture &amp; Economy of the Indian People</p>
          <div className="hero-ctas">
            <FlyLink className="btn-primary" href="/attendees">Register now</FlyLink>
            <FlyLink className="btn-ghost" href="/programmes">Explore the festival</FlyLink>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="art-clip"><img className="art" src="/img/hero.webp" alt="" width="1600" height="1067" fetchPriority="high" /></div>
          <img className="swoosh l" src="/img/swoosh-left.svg" alt="" />
          <img className="swoosh r" src="/img/swoosh-right.svg" alt="" />
          <img className="hills" src="/img/hills-hero.svg" alt="" />
        </div>
      </div>

      {/* About */}
      <div className="home-sec about">
        <div className="eyebrow reveal"><span>ABOUT THE FESTIVAL</span></div>
        <h2 className="home-title reveal">Let noble thoughts come to us from all directions</h2>
        <p className="lede reveal">The Festival of Ideas Delhi 2026 is a premier intellectual forum bringing together leading voices across the life, culture and economy of the Indian people. An initiative of the Festival of Ideas Foundation, the platform aims at celebrating ideas that spark positive economic and social change in a rapidly evolving global order. Join us as we endeavour to create an accessible space that fosters curiosity, open debate, diverse perspectives, and a shared purpose among young inquisitive minds.</p>
        <div className="info-grid">
          <div className="info-card reveal" style={{ '--i': 1 }}>
            <div className="info-head"><span className="badge"><img src="/img/icon-calendar.svg" alt="" /></span><h3>Follow us</h3></div>
            <ul className="petals">
              <li>Behind-the-scenes &amp; highlight reels</li>
              <li>Speaker announcements first</li>
              <li><a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer">@festivalofideasdelhi</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Moments */}
      <div className="home-sec moments">
        <h2 className="home-title reveal">Moments from the festival</h2>
        <div className="mosaic"><MemoriesMosaic /></div>
        <FlyLink href="/gallery" className="text-link">View the full gallery <Arrow /></FlyLink>
      </div>

      {/* Past speakers */}
      <div className="home-sec speakers-sec">
        <img className="leaf" src="/img/leaf-almond-a.svg" alt="" style={{ right: '4.4%', top: 133, transform: 'rotate(62.45deg) scaleX(-1)' }} />
        <img className="leaf" src="/img/leaf-willow-b.svg" alt="" style={{ right: '4.3%', top: 235, transform: 'rotate(-66.3deg) scaleX(-1)' }} />
        <h2 className="home-title reveal">Past Speakers</h2>
        {/* 4×2 grid on desktop; on phones the track scrolls as a looping marquee (second copy fills the loop) */}
        <div className="sp-marquee">
          <div className="sp-track">
            {pastPicks.map((sp, i) => <SpeakerCard key={sp.id} sp={sp} tint="past" i={i % 4} />)}
            {pastPicks.map((sp) => <SpeakerCard key={`${sp.id}-dup`} sp={sp} tint="past" dup />)}
          </div>
        </div>
        <FlyLink href="/speakers" className="text-link">View all speakers <Arrow /></FlyLink>
      </div>

      {/* Register */}
      <div className="register" id="register">
        <div className="register-head">
          <h2 className="home-title reveal">Register for the Festival</h2>
          <p className="reveal">Choose how you want to take part.</p>
          <img className="register-art" src="/img/register-art.webp" alt="" width="664" height="488" loading="lazy" />
        </div>
        <div className="register-grid">
          {registerOptions.map((o, i) => (
            <FlyLink key={o.href} href={o.href} className="register-card reveal" style={{ '--i': i }}>
              <img className="reg-icon" src={o.icon} alt="" width="58" height="58" />
              <h3>{o.title}</h3>
              <p>{o.text}</p>
              <span className="pill-btn">Register</span>
            </FlyLink>
          ))}
        </div>
      </div>

      {/* Notify */}
      <div className="home-sec notify">
        <img className="leaf" src="/img/leaf-willow-a.svg" alt="" style={{ left: '3.5%', top: -10, transform: 'rotate(-57.07deg) scaleX(-1)' }} />
        <img className="leaf" src="/img/leaf-almond-b.svg" alt="" style={{ left: '2.5%', top: 120, transform: 'rotate(-115.57deg) scaleX(-1)' }} />
        <h2 className="home-title reveal">Get notified</h2>
        <p className="reveal">Leave your email — we&apos;ll send the schedule and speaker line-up as it&apos;s announced.</p>
        <NotifyForm />
      </div>
    </section>
  );
}
