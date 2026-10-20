'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

// Butterfly flock that sweeps across the screen; navigation happens mid-flight.
const wingGradients = [['#5B2A7A', '#C23764'], ['#C23764', '#E8724A'], ['#7C2142', '#B98A4E']];

const butterflySVG = (colors) =>
  '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">' +
  '<g class="fly-wing">' +
  `<path d="M50 46C42 30 22 14 10 18C0 21 6 46 22 54C34 60 46 54 50 46Z" fill="${colors[0]}"/>` +
  `<path d="M50 46C58 30 78 14 90 18C100 21 94 46 78 54C66 60 54 54 50 46Z" fill="${colors[1]}"/>` +
  `<path d="M50 50C40 62 26 70 18 66C10 62 16 82 30 84C40 85 48 74 50 62C52 74 60 85 70 84C84 82 90 62 82 66C74 70 60 62 50 50Z" fill="${colors[0]}"/>` +
  '</g><ellipse cx="50" cy="48" rx="4.5" ry="9" fill="#3A1730"/></svg>';

function playButterflyTransition(swap) {
  const overlay = document.getElementById('flyOverlay');
  if (!overlay || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return swap();
  overlay.innerHTML = '';
  const vw = window.innerWidth, vh = window.innerHeight;
  const startY = vh * (0.3 + Math.random() * 0.35);
  const endY = vh * (0.25 + Math.random() * 0.4);
  const count = 6, duration = 900;

  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'fly-bfly';
    el.innerHTML = butterflySVG(wingGradients[i % wingGradients.length]);
    const size = 46 - i * 4;
    Object.assign(el.style, { width: size + 'px', height: size + 'px', left: '-60px', top: startY + 'px', opacity: (1 - i * 0.15).toFixed(2) });
    overlay.appendChild(el);
    const scale = 1 - i * 0.06;
    el.animate([
      { transform: `translate(0px,0px) rotate(-6deg) scale(${scale})`, offset: 0 },
      { transform: `translate(${vw * 0.5}px,${(endY - startY) * 0.4 - 60}px) rotate(4deg) scale(${scale})`, offset: 0.5 },
      { transform: `translate(${vw + 120}px,${endY - startY}px) rotate(10deg) scale(${scale})`, offset: 1 },
    ], { duration, delay: i * 55, easing: 'cubic-bezier(.4,.1,.3,1)', fill: 'forwards' }).onfinish = () => el.remove();
  }
  setTimeout(swap, duration * 0.55);
}

export function useFlyTo() {
  const router = useRouter();
  const pathname = usePathname();
  return (href) => {
    // Same page (e.g. switching a ?tab=) just navigates, like the old router did.
    if (href.split('?')[0] === pathname) return router.push(href, { scroll: false });
    playButterflyTransition(() => router.push(href));
  };
}

export default function FlyLink({ href, onClick, ...props }) {
  const flyTo = useFlyTo();
  return (
    <Link
      href={href}
      {...props}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        flyTo(href);
      }}
    />
  );
}
