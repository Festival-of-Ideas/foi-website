'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import FlyLink from './FlyLink';

const links = [
  ['/', 'Home'],
  ['/about', 'About'],
  ['/speakers', 'Speakers'],
  ['/partners', 'Partners'],
  ['/programmes', 'Programmes'],
  ['/gallery', 'Gallery'],
  // ['/volunteers', 'Volunteers'], // hidden: volunteer route is switched off (app/_volunteers)
];
// Not in the Figma bar; kept reachable from the mobile menu and footer.
const mobileExtra = [['/leadership', 'Leadership']];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href) => (href === '/' ? pathname === '/' : pathname.startsWith(href));
  const close = () => setMobile(false);

  return (
    <>
      <header className={`nav${scrolled ? ' scrolled' : ''}`} id="siteNav">
        <FlyLink href="/" className="brand" onClick={close} aria-label="Festival of Ideas Delhi — home">
          <img src="/img/logo-nav.webp" alt="Festival of Ideas Delhi" width="141" height="58" />
        </FlyLink>

        <nav className="links" aria-label="Main">
          {links.map(([href, label]) => (
            <FlyLink key={href} href={href} className={`nav-link${isActive(href) ? ' active' : ''}`} aria-current={isActive(href) ? 'page' : undefined}>{label}</FlyLink>
          ))}
          <FlyLink href="/attendees" className="nav-cta">Join the festival</FlyLink>
        </nav>

        <button className={`burger${mobile ? ' open' : ''}`} aria-label="Open menu" aria-expanded={mobile} onClick={() => setMobile(true)}><span /><span /><span /></button>
      </header>

      <div className={`scrim${mobile ? ' show' : ''}`} onClick={close} />
      <div className={`mobile-panel${mobile ? ' open' : ''}`} inert={!mobile}>
        <div className="close-row">
          <button className="burger open" aria-label="Close menu" style={{ display: 'flex' }} onClick={close}><span /><span /><span /></button>
        </div>
        {[...links, ...mobileExtra].map(([href, label]) => (
          <FlyLink key={href} href={href} onClick={close} className={`m-link${isActive(href) ? ' active' : ''}`}>{label}</FlyLink>
        ))}
        <FlyLink href="/attendees" onClick={close} className="nav-cta">Join the festival</FlyLink>
      </div>
    </>
  );
}
