import FlyLink from './FlyLink';

export default function BackLink({ href, children }) {
  return (
    <FlyLink className="back-link" href={href}>
      <svg viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      {children}
    </FlyLink>
  );
}
