'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Lightbox from './Lightbox';
import { memories } from '../data/photos';

// Decorative shapes around the tiles (positions live in styles/mosaic.css).
const back = ['mm-block-a', 'mm-block-b', 'mm-block-c', 'mm-block-d', 'mm-ledge', 'mm-ledge-curve', 'mm-arc-top'].map((c) => `mm-desk ${c}`);
const front = [
  'mm-desk mm-wing-a shape-wing-a', 'mm-desk mm-dot', 'mm-desk mm-wing-b shape-wing-b', 'mm-desk mm-quarter-a',
  'mm-desk mm-quarter-b', 'mm-desk mm-quarter-c', 'mm-desk mm-wing-c shape-wing-c', 'mm-desk mm-underline',
  'mm-desk mm-petal-a shape-petal-a', 'mm-desk mm-petal-b shape-petal-b', 'mm-desk mm-petal-c shape-petal-c',
  'mm-desk mm-petal-d shape-petal-d', 'mm-desk mm-petal-e shape-petal-e', 'mm-desk mm-petal-f shape-petal-f',
  'mm-desk mm-petal-g shape-petal-g', 'mm-desk mm-arc-right', 'mm-desk mm-sparkle shape-sparkle',
  'mm-mob mm-m-sparkle shape-sparkle', 'mm-mob mm-m-dot',
];
const FEATURE = 16; // Dr. S. Jaishankar tile gets the slow "breathe" zoom

const zoomIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>
);

export default function MemoriesMosaic() {
  const stage = useRef(null);
  const [open, setOpen] = useState(null);

  // Entrance, in three beats so the whole collage visibly assembles:
  // back shapes grow in, tiles pop in random order, front petals land last.
  // Starts once ~30% of the stage is on screen so the build isn't spent below the fold.
  useEffect(() => {
    const el = stage.current;
    if (!('IntersectionObserver' in window)) return;
    el.querySelectorAll('.mm-acc:not(.mm-front)').forEach((a, i) => a.style.setProperty('--d', i * 0.07 + 's'));
    const tiles = el.querySelectorAll('.mm-tile');
    tiles.forEach((t) => t.style.setProperty('--d', (0.3 + Math.random() * tiles.length * 0.045).toFixed(2) + 's'));
    el.querySelectorAll('.mm-front').forEach((a, i) => a.style.setProperty('--d', 1.2 + i * 0.04 + 's'));
    el.classList.add('mm-anim');
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) { el.classList.add('mm-in'); io.disconnect(); }
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div className="mm-stage" ref={stage} role="group" aria-label="Photo collage from past editions">
        {back.map((c) => <span key={c} className={`mm-acc ${c}`} aria-hidden="true" />)}
        {memories.map((m, i) => {
          const n = String(i + 1).padStart(2, '0');
          return (
            <button key={m.src} type="button" className={`mm-tile mm-t${n}${i === FEATURE ? ' mm-feature' : ''}`} aria-label={`View photo: ${m.alt}`} onClick={() => setOpen(i)}>
              <span className="mm-img"><Image src={m.src} alt={m.alt} fill sizes="(min-width: 1024px) 400px, 100vw" /></span>
              <span className="mm-hover" aria-hidden="true">{zoomIcon}</span>
            </button>
          );
        })}
        {front.map((c) => <span key={c} className={`mm-acc mm-front ${c}`} aria-hidden="true" />)}
      </div>
      <Lightbox images={memories} index={open} onChange={setOpen} />
    </>
  );
}
