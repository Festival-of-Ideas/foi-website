import FlyLink from './FlyLink';
import { initials } from '../data/speakers';

// Figma "Card / Past speaker": leaf-shaped tinted portrait (pink = upcoming, purple = past), name, role.
export function Portrait({ sp, tint = 'past', eager }) {
  return (
    <div className={`sp-portrait ${tint}`}>
      {sp.image
        ? <img src={sp.image} alt={sp.name} width="402" height="547" loading={eager ? 'eager' : 'lazy'} decoding="async" />
        : <span className="sp-initials">{initials(sp.name)}</span>}
    </div>
  );
}

// `dup` marks the marquee's repeated copy: hidden from assistive tech and the tab order.
export default function SpeakerCard({ sp, tint, i = 0, dup }) {
  return (
    <FlyLink
      href={`/speakers/${sp.id}`}
      className={`sp-card reveal${dup ? ' sp-dup' : ''}`}
      style={{ '--i': i }}
      {...(dup && { 'aria-hidden': true, tabIndex: -1 })}
    >
      <Portrait sp={sp} tint={tint} />
      <h4>{sp.name}</h4>
      <p>{sp.role}</p>
    </FlyLink>
  );
}
