import FlyLink from '../../components/FlyLink';
import { programmes } from '../../data/programmes';
import { staticPageMetadata } from '../../lib/seo';

export const metadata = staticPageMetadata('/programmes');

export default function ProgrammesPage() {
  return (
    <section className="page" id="page-programmes">
      <div className="wrap">
        <header className="about-head">
          <div className="eyebrow"><span>FESTIVAL LAYOUT</span></div>
          <h1 className="page-title">Explore the festival grounds</h1>
        </header>

        <div className="prog-grid">
          {programmes.map((p, i) => (
            <FlyLink key={p.id} href={`/programmes/${p.id}`} className="prog-card reveal" style={{ '--i': i % 2 }}>
              <div className="prog-media">
                <img src={p.image} alt={p.alt} loading="lazy" />
                <span className="prog-num">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <div className="prog-body">
                <h2>{p.title}</h2>
                <p>{p.blurb}</p>
                <span className="text-link">Explore <span aria-hidden="true">→</span></span>
              </div>
            </FlyLink>
          ))}
        </div>
      </div>
    </section>
  );
}
