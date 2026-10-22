import PageHead from '../../components/PageHead';
import CheckList from '../../components/CheckList';
import { staticPageMetadata } from '../../lib/seo';

export const metadata = staticPageMetadata('/delegates');

export default function DelegatesPage() {
  return (
    <section className="page" id="page-delegates">
      <div className="wrap">
        <div className="vol-grid">
          <div className="att-intro">
            <PageHead eyebrow="JOIN THE DELEGATION" title="Register as a Delegate" desc="Take part as a delegate and engage more closely with the festival programme." descStyle={{ marginBottom: 0 }} />
            <CheckList items={['Participate in selected festival sessions', 'Connect with speakers, students and fellow delegates', 'Receive delegate-specific festival information']} />
            <img className="att-art" src="/img/register-art.webp" alt="" width="664" height="488" />
          </div>
          {/* ponytail: form lives in components/RegistrationForm.js; swap it back in when registration opens */}
          <div className="vol-form att-form">
            <h3>Delegate registration</h3>
            <p className="coming-soon">Coming soon!</p>
          </div>
        </div>
      </div>
    </section>
  );
}
