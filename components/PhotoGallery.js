'use client';

import { useState } from 'react';
import Image from 'next/image';
import Lightbox from './Lightbox';

// Uncropped justified rows (width ∝ aspect ratio --r) split into titled sections; one lightbox steps through every photo.
export default function PhotoGallery({ sections }) {
  const all = sections.flatMap((s) => s.photos);
  const [open, setOpen] = useState(null);
  let offset = 0;

  return (
    <>
      {sections.map((s) => {
        const start = offset;
        offset += s.photos.length;
        return (
          <section key={s.title} className="gallery-section" aria-label={s.title}>
            <h3 className="gallery-sub">{s.title}</h3>
            <div className="gallery-masonry">
              {s.photos.map((p, i) => (
                <button key={p.src} type="button" className="g-item" style={{ '--r': p.width / p.height }} aria-label={`View photo: ${p.alt}`} onClick={() => setOpen(start + i)}>
                  <Image src={p.src} alt={p.alt} width={p.width} height={p.height} sizes="(max-width: 640px) 50vw, (max-width: 1180px) 33vw, 380px" />
                </button>
              ))}
            </div>
          </section>
        );
      })}
      <Lightbox images={all} index={open} onChange={setOpen} />
    </>
  );
}
