import { notFound } from 'next/navigation';
import BackLink from '../../../components/BackLink';
import { Portrait } from '../../../components/SpeakerCard';
import { allSpeakers, findSpeaker, publishedSpeakers } from '../../../data/speakers';
import { pageMetadata } from '../../../lib/seo';

export const dynamicParams = false;
export const generateStaticParams = () => allSpeakers.map((s) => ({ id: s.id }));

export async function generateMetadata({ params }) {
  const sp = findSpeaker((await params).id);
  if (!sp) notFound();
  return pageMetadata({
    path: `/speakers/${sp.id}`,
    title: sp.name,
    description: `${sp.name} — ${sp.role}. Explore their profile at Festival of Ideas Delhi.`,
    image: sp.image || undefined,
    index: publishedSpeakers.some((speaker) => speaker.id === sp.id),
  });
}

export default async function SpeakerDetail({ params }) {
  const sp = findSpeaker((await params).id);
  if (!sp) notFound();
  return (
    <section className="page" id="page-speaker-detail">
      <div className="wrap">
        <BackLink href="/speakers">Back to Speakers</BackLink>
        <div className="detail-grid">
          <Portrait sp={sp} tint={sp.id.startsWith('p') ? 'past' : 'upcoming'} eager />
          <div>
            <h1 className="detail-name">{sp.name}</h1>
            <div className="detail-role">{sp.role}</div>
            <p className="detail-bio">{sp.bio}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
