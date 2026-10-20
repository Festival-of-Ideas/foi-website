import Image from 'next/image';
import PageHead from '../../components/PageHead';
import { staticPageMetadata } from '../../lib/seo';

export const metadata = staticPageMetadata('/partners');

// Order follows the "Past Partners" page of the festival-of-ideas-2026 Figma file (node 1299:10739),
// row by row; w x h are the Figma sizes. Logos were cropped exactly as Figma frames them.
const ROWS = [
  [['ds-group.svg', 'DS Group', 38.1, 45.1], ['ministry-of-culture', 'Ministry of Culture', 84.8, 41.6], ['sbi', 'State Bank of India', 90.1, 30.9], ['g20', 'G20 India 2023', 78.7, 42.4], ['asi', 'Archaeological Survey of India', 43.7, 48.7]],
  [['coca-cola', 'Coca-Cola', 78.2, 24.8], ['republic', 'Republic', 124.5, 24.8], ['ongc', 'ONGC', 76.3, 30.8], ['isb', 'ISB', 65.4, 24.8]],
  [['hdfc-bank', 'HDFC Bank', 79, 63], ['partner-emblem', 'Embassy of Russia in India', 48.7, 48.7], ['isro', 'ISRO', 54.9, 53.1], ['times-now', 'Times Now', 96.4, 42.4], ['rites', 'RITES', 98.7, 41.6]],
  [['full-circle', 'Full Circle Bookstore', 54.7, 48.7], ['hp', 'HP Delivering Happiness', 110.6, 50.8], ['khul-ke', 'Khul Ke', 43.7, 48.7], ['indianoil', 'IndianOil', 44.3, 54.4]],
  [['nbt-india', 'National Book Trust India', 56.8, 56.7], ['ishan-international', 'Ishan International', 104, 41.7], ['icsi', 'ICSI', 44.4, 44.3], ['giga', 'GIGA by HDFC Bank', 73.3, 35.5], ['oil-india', 'Oil India', 30.8, 43.8]],
  [['piyaau', 'Piyaau', 80, 36], ['rishihood', 'Rishihood University', 96.6, 36.5], ['span', 'SPAN', 70.9, 51.7], ['partner-g', 'Chelvies Coffee Company', 49.9, 49.9], ['full-circle-2', 'Full Circle Bookstore', 60.7, 60.7]],
  [['farmley', 'Farmley', 92.6, 34.6], ['iche', 'ICHR', 49.8, 48.7], ['dominos', "Domino's Pizza", 40.4, 50.1], ['harpercollins', 'HarperCollins', 27.8, 48.7], ['national-museum', 'National Museum, New Delhi', 34.3, 48.7]],
  [['kunzum', 'Kunzum Book Club', 48.7, 48.7], ['rupa', 'Rupa Publications India', 68, 48.7], ['dcop', 'Delhi College of Photography', 72.7, 36.6], ['belgian-waffle', 'The Belgian Waffle Co.', 44, 41.9], ['chintamanis', 'Chintamanis', 97, 30]],
];

export default function PartnersPage() {
  return (
    <section className="page" id="page-partners">
      <div className="wrap">
        <PageHead title="Past Partners" />
        <ul className="partners-grid">
          {ROWS.flat().map(([file, name, w, h]) => (
            <li key={file} className="partner-tile">
              <Image src={`/assets/partners/${file.includes('.') ? file : `${file}.png`}`} alt={name} title={name} width={Math.round(w * 4)} height={Math.round(h * 4)} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
