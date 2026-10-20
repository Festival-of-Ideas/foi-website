import PageHead from '../../components/PageHead';
import PhotoGallery from '../../components/PhotoGallery';
import { memories, pastEditions } from '../../data/photos';
import { staticPageMetadata } from '../../lib/seo';

export const metadata = staticPageMetadata('/gallery');

export default function GalleryPage() {
  return (
    <section className="page" id="page-gallery">
      <div className="wrap">
        <PageHead eyebrow="MOMENTS" title="Gallery" desc="Glimpses of past editions" />
        <PhotoGallery sections={[
          { title: 'Memories From The Festival', photos: memories },
          { title: 'More From Past Editions', photos: pastEditions },
        ]} />
      </div>
    </section>
  );
}
