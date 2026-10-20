import Image from 'next/image';
import { initials } from '../data/speakers';

// Speaker photo (optimised by next/image; the source PNGs are 1–4 MB each) or gradient initials.
// `size` = largest CSS px the avatar renders at; next/image serves 1x/2x of it.
export default function SpeakerAvatar({ sp, size }) {
  return sp.image ? <Image src={sp.image} alt={sp.name} width={size} height={size} /> : initials(sp.name);
}

export const avatarBg = (sp) => ({ background: `linear-gradient(135deg,${sp.color[0]},${sp.color[1]})` });
