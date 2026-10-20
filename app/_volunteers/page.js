import PageHead from '../../components/PageHead';
import FlyLink from '../../components/FlyLink';
import { staticPageMetadata } from '../../lib/seo';

export const metadata = staticPageMetadata('/volunteers');

export default function VolunteersPage() {
  return (
    <section className="page" id="page-volunteers">
      <div className="wrap">
        <div className="vol-grid">
          <div>
            <PageHead eyebrow="VOLUNTEER PROGRAMME" title="Volunteer forms are closed now" desc="We would love to see you as an attendee." />
          </div>
          <div className="vol-form volunteer-closed" role="status">
            <span className="volunteer-closed-label">APPLICATIONS CLOSED</span>
            <h3>We would love to see you as an attendee.</h3>
            <FlyLink className="btn-primary" href="/attendees">Explore attendee registration</FlyLink>
          </div>
        </div>
      </div>
    </section>
  );
}
