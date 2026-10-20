'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

const icon = (d) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
);

// Full-screen photo viewer. `index` null = closed; arrow keys / buttons step through `images`.
export default function Lightbox({ images, index, onChange }) {
  const ref = useRef(null);
  const img = index == null ? null : images[index];
  const go = (step) => onChange((index + step + images.length) % images.length);

  useEffect(() => {
    const d = ref.current;
    if (index == null) { if (d.open) d.close(); return; }
    if (!d.open) { d.showModal(); document.documentElement.style.overflow = 'hidden'; }
  }, [index]);

  return (
    <dialog
      ref={ref}
      className="mm-lightbox"
      aria-label="Festival photo viewer"
      onClose={() => { document.documentElement.style.overflow = ''; onChange(null); }}
      onClick={(e) => { if (e.target === e.currentTarget || e.target.tagName === 'FIGURE') ref.current.close(); }}
      onKeyDown={(e) => { if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1); }}
    >
      {img && (
        <figure>
          <Image key={img.src} src={img.src} alt={img.alt} width={img.width} height={img.height} sizes="(max-width: 1100px) 100vw, 1100px" />
          <figcaption><span style={{ margin: 0, opacity: 1 }}>{img.alt}</span><span>{index + 1} / {images.length}</span></figcaption>
        </figure>
      )}
      <button type="button" className="mm-lb-btn mm-lb-close" aria-label="Close viewer" onClick={() => ref.current.close()}>{icon('M18 6 6 18M6 6l12 12')}</button>
      <button type="button" className="mm-lb-btn mm-lb-prev" aria-label="Previous photo" onClick={() => go(-1)}>{icon('m15 18-6-6 6-6')}</button>
      <button type="button" className="mm-lb-btn mm-lb-next" aria-label="Next photo" onClick={() => go(1)}>{icon('m9 18 6-6-6-6')}</button>
    </dialog>
  );
}
