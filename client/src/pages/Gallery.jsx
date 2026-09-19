import { FaExpand } from 'react-icons/fa';
import PageHeader from '../components/common/PageHeader';
import ImagePlaceholder from '../components/common/ImagePlaceholder';
import { RevealGroup, RevealItem } from '../components/common/Reveal';

const galleryItems = [
  { label: 'Reception & Lounge', src: '/images/gallery/reception.jpg' },
  { label: 'Treatment Room', src: '/images/gallery/treatment-room.jpg' },
  { label: 'Digital X-Ray Suite', src: '/images/gallery/xray-suite.jpg' },
  { label: 'Sterilization Area', src: '/images/gallery/sterilization.jpg' },
  { label: 'Consultation Room', src: '/images/gallery/consultation.jpg' },
  { label: 'Pediatric Corner', src: '/images/gallery/pediatric-corner.jpg' },
  { label: 'Orthodontic Station', src: '/images/gallery/orthodontic-station.jpg' },
  { label: 'Recovery Lounge', src: '/images/gallery/recovery-lounge.jpg' },
];

const Gallery = () => {
  return (
    <>
      <PageHeader title="Clinic Gallery" subtitle="Take a look inside our modern, welcoming dental facility." />

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealGroup className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {galleryItems.map((item) => (
              <RevealItem key={item.label} as="scale">
                <div className="group relative aspect-square overflow-hidden rounded-2xl shadow-premium transition-shadow duration-500 hover:shadow-premium-lg">
                  <ImagePlaceholder
                    src={item.src}
                    alt={item.label}
                    className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-950/85 via-primary-950/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 flex translate-y-3 items-center justify-between p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="font-heading text-sm font-semibold text-white">{item.label}</p>
                    <FaExpand className="text-white/80" size={14} />
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </>
  );
};

export default Gallery;
