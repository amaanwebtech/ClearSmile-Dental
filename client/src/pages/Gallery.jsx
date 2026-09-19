import { GiTooth, GiToothbrush, GiMedicines } from 'react-icons/gi';
import { FaTeethOpen, FaUserMd, FaHospitalAlt, FaSmile, FaXRay } from 'react-icons/fa';
import PageHeader from '../components/common/PageHeader';
import ImagePlaceholder from '../components/common/ImagePlaceholder';

const galleryItems = [
  { label: 'Reception & Lounge', icon: FaHospitalAlt },
  { label: 'Treatment Room', icon: GiTooth },
  { label: 'Digital X-Ray Suite', icon: FaXRay },
  { label: 'Sterilization Area', icon: GiMedicines },
  { label: 'Consultation Room', icon: FaUserMd },
  { label: 'Pediatric Corner', icon: FaSmile },
  { label: 'Orthodontic Station', icon: GiToothbrush },
  { label: 'Recovery Lounge', icon: FaTeethOpen },
];

const Gallery = () => {
  return (
    <>
      <PageHeader title="Clinic Gallery" subtitle="Take a look inside our modern, welcoming dental facility." />

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {galleryItems.map((item) => (
              <div key={item.label} className="group overflow-hidden rounded-2xl">
                <ImagePlaceholder
                  icon={item.icon}
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
