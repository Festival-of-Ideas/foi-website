'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import FlyLink from './FlyLink';
import { aboutSections } from '../data/about';

const links = [
  ['/', 'Home'],
  ['/about', 'About'],
  ['/leadership', 'Leadership'],
  ['/speakers', 'Speakers'],
  ['/partners', 'Partners'],
  // ['/programmes', 'Programmes'], // hidden from the navbar; route still live
  ['/gallery', 'Gallery'],
  // ['/volunteers', 'Volunteers'], // hidden: volunteer route is switched off (app/_volunteers)
];

// Dropdown sub-pages, keyed by parent link. Always rendered (just visually hidden) so crawlers see every link.
// The default About section links to /about, its canonical URL.
const menus = {
  '/about': aboutSections.map((s) => [s.default ? '/about' : `/about/${s.slug}`, s.tab]),
  '/speakers': [['/speakers', 'Past Speakers'], ['/speakers?tab=expected', 'Expected Speakers']],
};

const Caret = ({ className }) => (
  <svg className={className} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 4.5 6 7.5l3-3" /></svg>
);

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [openGroup, setOpenGroup] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href) => (href === '/' ? pathname === '/' : pathname.startsWith(href));
  // Query-string entries (speaker tabs) can't be matched from the pathname alone, so they never show active.
  const isSubActive = (href) => !href.includes('?') && pathname === href;
  const close = () => setMobile(false);

  return (
    <>
      <header className={`nav${scrolled ? ' scrolled' : ''}`} id="siteNav">
        <FlyLink href="/" className="brand" onClick={close} aria-label="Festival of Ideas Delhi — home">
          <img src="/img/logo-nav.webp" alt="Festival of Ideas Delhi" width="124" height="51" />
        </FlyLink>

        <nav className="links" aria-label="Main">
          {links.map(([href, label]) => {
            const link = (
              <FlyLink key={href} href={href} className={`nav-link${isActive(href) ? ' active' : ''}`} aria-current={isActive(href) ? 'page' : undefined}>
                {label}{menus[href] && <Caret className="nav-caret" />}
              </FlyLink>
            );
            if (!menus[href]) return link;
            return (
              <div key={href} className="nav-item">
                {link}
                <div className="nav-drop">
                  <div className="nav-drop-panel">
                    {menus[href].map(([subHref, subLabel]) => (
                      <FlyLink key={subHref} href={subHref} className={`drop-link${isSubActive(subHref) ? ' active' : ''}`}>{subLabel}</FlyLink>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
          <FlyLink href="/attendees" className="nav-cta">Join the festival</FlyLink>
        </nav>

        <button className={`burger${mobile ? ' open' : ''}`} aria-label="Open menu" aria-expanded={mobile} onClick={() => setMobile(true)}><span /><span /><span /></button>
      </header>

      <div className={`scrim${mobile ? ' show' : ''}`} onClick={close} />
      <div className={`mobile-panel${mobile ? ' open' : ''}`} inert={!mobile}>
        <div className="close-row">
          <button className="burger open" aria-label="Close menu" style={{ display: 'flex' }} onClick={close}><span /><span /><span /></button>
        </div>
        {links.map(([href, label]) => {
          const sub = menus[href];
          const expanded = openGroup === href;
          return (
            <div key={href} className="m-group">
              <div className="m-row">
                <FlyLink href={href} onClick={close} className={`m-link${isActive(href) ? ' active' : ''}`}>{label}</FlyLink>
                {sub && (
                  <button className="m-toggle" aria-expanded={expanded} aria-label={`${expanded ? 'Hide' : 'Show'} ${label} pages`} onClick={() => setOpenGroup(expanded ? null : href)}>
                    <Caret />
                  </button>
                )}
              </div>
              {sub && (
                <div className={`m-sub${expanded ? ' open' : ''}`} inert={!expanded}>
                  <div>
                    {sub.map(([subHref, subLabel]) => (
                      <FlyLink key={subHref} href={subHref} onClick={close} className={`m-sublink${isSubActive(subHref) ? ' active' : ''}`}>{subLabel}</FlyLink>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
        <FlyLink href="/attendees" onClick={close} className="nav-cta">Join the festival</FlyLink>
      </div>
    </>
  );
}
