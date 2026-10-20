import Link from 'next/link';
import PageHead from '../../components/PageHead';
import SpeakerCard from '../../components/SpeakerCard';
import { pastSpeakers } from '../../data/speakers';
import { pageMetadata, staticPages } from '../../lib/seo';

export async function generateMetadata({ searchParams }) {
  const expected = (await searchParams).tab === 'expected';
  return pageMetadata({
    ...staticPages.find((page) => page.path === '/speakers'),
    ...(expected ? { title: 'Expected Speakers', description: 'The expected speaker line-up for Festival of Ideas Delhi 2026 will be announced soon.', index: false } : {}),
  });
}

const tabs = [
  { key: 'expected', label: 'Expected Speakers', href: '/speakers?tab=expected' },
  { key: 'past', label: 'Past Speakers', href: '/speakers' },
];

export default async function SpeakersPage({ searchParams }) {
  const tab = (await searchParams).tab === 'expected' ? 'expected' : 'past';

  return (
    <section className="page" id="page-speakers">
      <div className="wrap">
        <PageHead eyebrow="WHO'S SPEAKING" title="Speakers" />

        <div className="tab-row" role="tablist">
          {tabs.map((t) => (
            <Link key={t.key} href={t.href} scroll={false} replace role="tab" aria-selected={tab === t.key} className={`tab-btn${tab === t.key ? ' active' : ''}`}>{t.label}</Link>
          ))}
        </div>

        <div className="sp-grid">
          {tab === 'expected' ? (
            // ponytail: expected list kept in data/speakers.js; render it here once the line-up is announced
            <p className="coming-soon">Coming soon!</p>
          ) : pastSpeakers.map((sp, i) => <SpeakerCard key={sp.id} sp={sp} tint="past" i={i % 4} />)}
        </div>
      </div>
    </section>
  );
}
