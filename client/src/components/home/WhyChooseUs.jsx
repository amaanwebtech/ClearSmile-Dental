import { FaUserMd, FaShieldAlt, FaMicroscope, FaHandHoldingHeart } from 'react-icons/fa';
import SectionHeading from '../common/SectionHeading';
import { RevealGroup, RevealItem } from '../common/Reveal';

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
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Dental Care Built Around You"
          description="From your first visit to your brightest smile, we make every step comfortable, transparent, and tailored to your needs."
          light
        />

        <RevealGroup className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {points.map((point) => (
            <RevealItem key={point.title} className="h-full">
              <div className="group h-full rounded-2xl border border-white/15 bg-white/10 p-7 text-center backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-white/25 hover:bg-white/15 hover:shadow-glow">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white ring-1 ring-white/10 transition-transform duration-500 group-hover:scale-110 group-hover:bg-accent-400 group-hover:text-primary-950">
                  <point.icon size={24} />
                </div>
                <h3 className="mt-5 font-heading text-lg font-semibold text-white">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-primary-100">{point.description}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
};

export default WhyChooseUs;
