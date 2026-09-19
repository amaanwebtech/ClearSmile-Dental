import { FaUserMd, FaShieldAlt, FaMicroscope, FaHandHoldingHeart } from 'react-icons/fa';
import SectionHeading from '../common/SectionHeading';

const points = [
  {
    icon: FaUserMd,
    title: 'Expert Dental Team',
    description: 'Highly qualified specialists with years of experience across every dental discipline.',
  },
  {
    icon: FaMicroscope,
    title: 'Modern Technology',
    description: 'State-of-the-art equipment for accurate diagnosis and comfortable treatment.',
  },
  {
    icon: FaShieldAlt,
    title: 'Safe & Hygienic',
    description: 'Strict sterilization protocols to ensure a safe environment for every visit.',
  },
  {
    icon: FaHandHoldingHeart,
    title: 'Patient-First Care',
    description: 'Personalized treatment plans designed around your comfort and goals.',
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Dental Care Built Around You"
          description="From your first visit to your brightest smile, we make every step comfortable, transparent, and tailored to your needs."
        />

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {points.map((point) => (
            <div key={point.title} className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
                <point.icon size={28} />
              </div>
              <h3 className="mt-5 font-heading text-lg font-semibold text-gray-900">{point.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
