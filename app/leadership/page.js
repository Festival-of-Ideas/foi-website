import PageHead from '../../components/PageHead';
import SpeakerAvatar, { avatarBg } from '../../components/SpeakerAvatar';
import { leadership } from '../../data/leadership';
import { staticPageMetadata } from '../../lib/seo';

export const metadata = staticPageMetadata('/leadership');

const intro = 'The Festival of Ideas Delhi 2026 is a premier intellectual forum celebrating ideas drawn from the life, culture and economy of the Indian people. A joint initiative by the Shri Ram College of Commerce and supported by the Festival of Ideas Foundation, we endeavour to cultivate an accessible space for young inquisitive minds, introducing them to noble ideas that inspire meaningful economic & social change towards a shared purpose.';

const bg = avatarBg({ color: ['#3B1653', '#C23764'] });

export default function LeadershipPage() {
  return (
    <section className="page" id="page-leadership">
      <div className="wrap">
        <PageHead eyebrow="ABOUT US" title="Our Leadership" desc={intro} />
        {leadership.map((group) => (
          <div key={group.title} className="leader-group">
            <h3>{group.title}</h3>
            <div className="speaker-grid leader-grid">
              {group.people.map((p) => (
                <div key={p.name} className="speaker-card">
                  <div className="avatar-btn" style={p.image ? undefined : bg}>
                    <SpeakerAvatar sp={p} size={260} />
                  </div>
                  {p.tag && <span className="tag">{p.tag}</span>}
                  <h4>{p.name}</h4>
                  <div className="role">{p.role}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
