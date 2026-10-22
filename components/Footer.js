import FlyLink from './FlyLink';

const cols = [
  ['EXPLORE', [['/speakers', 'Speakers'], ['/programmes', 'Festival Layout'], ['/gallery', 'Gallery']]],
  ['FESTIVAL', [['/about', 'About Us'], ['/partners', 'Past Partners'], /* ['/volunteers', 'Volunteers'], */ ['/leadership', 'Leadership']]],
];

export default function Footer() {
  return (
    <footer>
      <div className="foot-hills" aria-hidden="true"><img src="/img/hills-footer.svg" alt="" /></div>
      <div className="foot-card reveal">
        <div className="foot-grid">
          <div className="foot-brand">
            <img src="/img/logo-footer.webp" alt="Festival of Ideas Delhi" width="216" height="103" />
            <p>Ideas from the Life, Culture and Economy of the Indian People! Hosted by the Festival of Ideas Foundation</p>
          </div>
          {cols.map(([title, items]) => (
            <div key={title} className="foot-col">
              <h5>{title}</h5>
              {items.map(([href, label]) => <FlyLink key={href} href={href}>{label}</FlyLink>)}
            </div>
          ))}
        </div>
        <div className="foot-bottom">
          <span>© 2026 Festival of Ideas. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
