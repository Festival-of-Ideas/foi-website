import { notFound } from 'next/navigation';
import BackLink from '../../../components/BackLink';
import FlyLink from '../../../components/FlyLink';
import { programmes, findProgramme } from '../../../data/programmes';
import { pageMetadata } from '../../../lib/seo';

export const dynamicParams = false;

export const generateStaticParams = () => programmes.map((p) => ({ id: p.id }));

export async function generateMetadata({ params }) {
  const programme = findProgramme((await params).id);
  if (!programme) notFound();
  return pageMetadata({
    path: `/programmes/${programme.id}`,
    title: programme.detailTitle,
    description: programme.blurb,
    image: programme.image,
  });
}

export default async function ProgrammeDetail({ params }) {
  const pr = findProgramme((await params).id);
  if (!pr) notFound();
  const others = programmes.filter((p) => p.id !== pr.id);

  return (
    <section className="page" id="page-prog-detail">
      <div className="wrap">
        <BackLink href="/programmes">Back to Festival Layout</BackLink>

        <article className="about-content-card prog-detail">
          <div className="about-text">
            <div className="eyebrow"><span>{pr.title.toUpperCase()}</span></div>
            <h1>{pr.detailTitle}</h1>
            <div className="about-copy"><p>{pr.description}</p></div>
            <FlyLink className="btn-primary" href="/attendees">Register to attend</FlyLink>
          </div>
          <div className="about-visual"><img src={pr.image} alt={pr.detailTitle} /></div>
        </article>

        <h2 className="prog-more-title">More spaces</h2>
        <div className="prog-more">
          {others.map((p, i) => (
            <FlyLink key={p.id} href={`/programmes/${p.id}`} className="prog-mini reveal" style={{ '--i': i }}>
              <img src={p.image} alt="" loading="lazy" />
              <span>{p.title}</span>
            </FlyLink>
          ))}
        </div>
      </div>
    </section>
  );
}
