import PageHeader from '../components/common/PageHeader';
import ImagePlaceholder from '../components/common/ImagePlaceholder';

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
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {galleryItems.map((item) => (
              <div key={item.label} className="group overflow-hidden rounded-2xl shadow-sm">
                <ImagePlaceholder
                  src={item.src}
                  alt={item.label}
                  className="aspect-square w-full transition-transform duration-500 group-hover:scale-105"
                />
                <p className="mt-2 text-center text-sm font-medium text-gray-700">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Gallery;
