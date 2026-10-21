import PageHead from '../../components/PageHead';
import CheckList from '../../components/CheckList';
import RegistrationForm from '../../components/RegistrationForm';
import { staticPageMetadata } from '../../lib/seo';

export const metadata = staticPageMetadata('/attendees');

export default function AttendeesPage() {
  return (
    <section className="page" id="page-attendees">
      <div className="wrap">
        <div className="vol-grid">
          <div className="att-intro">
            <PageHead eyebrow="JOIN THE FESTIVAL" title="Register as an Attendee" desc="Come experience the talks, people, ideas and activities across the festival." descStyle={{ marginBottom: 0 }} />
            <CheckList items={['Access the festival programme and sessions', 'Explore the bazaar, gallery and festival spaces', 'Receive festival updates and registration details']} />
            <img className="att-art" src="/img/register-art.webp" alt="" width="664" height="488" />
          </div>
          <RegistrationForm kind="attendee" />
        </div>
      </div>
    </section>
  );
}
