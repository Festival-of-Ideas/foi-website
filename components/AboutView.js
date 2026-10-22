import Link from 'next/link';
import Faq from './Faq';
import { aboutSections } from '../data/about';

// Each About tab: copy + a visual (image, or the butterfly emblem when there's no photo).
const panels = {
  'festival-of-ideas': {
    title: 'Festival of Ideas',
    image: { src: '/assets/mainaudi.webp', alt: 'Festival of Ideas stage in the SRCC main auditorium', w: 1200, h: 722 },
    facts: [['4th', 'Edition'], ['4 days', '29 Oct – 1 Nov']],
    body: (
      <>
        <p>The Festival of Ideas Delhi 2026 is a premier intellectual forum celebrating ideas drawn from the life, culture and economy of the Indian people.</p>
        <p>An initiative of the Festival of Ideas Foundation, we endeavour to cultivate an accessible space for young inquisitive minds, introducing them to noble ideas that inspire meaningful economic &amp; social change towards a shared purpose.</p>
        <p className="about-quote">May ideas come to us from everywhere.</p>
      </>
    ),
  },
  'fortress-india': {
    title: 'Fortress India',
    body: (
      <p>Fortress India is a national movement calling upon Indians to recognise that the defence of our Republic is no longer the task of the soldier alone. National security now rests equally on how we treat our land, history, ecology, institutions, values and our understanding of each. India&apos;s strength will depend not on weaponry or rhetoric, but on the discipline, foresight, and unity of its people.</p>
    ),
    link: ['https://fortressindia.in/', 'Visit FortressIndia.in'],
  },
};

export default function AboutView({ slug }) {
  const p = panels[slug];
  return (
    <section className="page" id="page-about">
      <div className="wrap">
        <header className="about-head">
          <div className="eyebrow"><span>ABOUT US</span></div>
          <h1 className="page-title">About the Festival</h1>
          <p className="page-desc">Ideas from the Life, Culture &amp; Economy of the Indian People</p>
        </header>

        <nav className="about-tabs" role="tablist" aria-label="About Us sections">
          {aboutSections.map((s) => (
            <Link key={s.slug} href={`/about/${s.slug}`} scroll={false} role="tab" aria-selected={s.slug === slug} className={`about-tab${s.slug === slug ? ' active' : ''}`}>{s.tab}</Link>
          ))}
        </nav>

        {/* keyed so switching tabs replays the entrance */}
        <article className="about-content-card" role="tabpanel" key={slug}>
          <div className="about-text">
            <h2>{p.title}</h2>
            <div className="about-copy">{p.body}</div>
            {p.facts && (
              <dl className="about-facts">
                {p.facts.map(([n, l]) => <div key={l}><dt>{n}</dt><dd>{l}</dd></div>)}
              </dl>
            )}
            {p.link && <a className="text-link" href={p.link[0]} target="_blank" rel="noopener noreferrer">{p.link[1]} <span aria-hidden="true">→</span></a>}
          </div>
          <div className={`about-visual${p.image ? '' : ' emblem'}`}>
            {p.image
              ? <img src={p.image.src} alt={p.image.alt} width={p.image.w} height={p.image.h} />
              : <img src="/img/butterfly.webp" alt="" width="240" height="240" />}
          </div>
        </article>

        <section className="faq-wrap" aria-labelledby="faqTitle">
          <div className="faq-intro reveal">
            <div className="eyebrow"><span>GOOD TO KNOW</span></div>
            <h2 id="faqTitle">Frequently asked questions</h2>
            <p>Everything you need before you visit. Still curious? Write to us through the contacts in the footer.</p>
          </div>
          <Faq />
        </section>
      </div>
    </section>
  );
}
