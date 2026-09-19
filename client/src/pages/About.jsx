import { FaCheckCircle } from 'react-icons/fa';
import PageHeader from '../components/common/PageHeader';
import SectionHeading from '../components/common/SectionHeading';
import ImagePlaceholder from '../components/common/ImagePlaceholder';
import AnimatedCounter from '../components/common/AnimatedCounter';
import Reveal, { RevealGroup, RevealItem } from '../components/common/Reveal';
import CTASection from '../components/home/CTASection';

const values = [
  'Board-certified dentists with specialized training',
  'Advanced digital diagnostics & pain-free treatments',
  'Transparent pricing with no hidden costs',
  'Flexible scheduling including weekend slots',
];

const stats = [
  { to: 15000, suffix: '+', label: 'Smiles Treated' },
  { to: 15, suffix: '+', label: 'Years of Excellence' },
  { to: 4, suffix: '', label: 'Specialist Dentists' },
];

const About = () => {
  return (
    <>
      <PageHeader title="About ClearSmile Dental" subtitle="Get to know our story, mission, and the values that drive everything we do." />

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Reveal as="scale">
            <ImagePlaceholder
              src="/images/about-clinic.jpg"
              alt="Inside ClearSmile Dental clinic"
              className="aspect-[4/3] w-full rounded-3xl shadow-premium-lg"
            />
          </Reveal>

          <Reveal delay={0.1}>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-primary-700 ring-1 ring-primary-100">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-500" /> Our Story
            </span>
            <h2 className="mt-5 font-heading text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
              15+ Years of Creating Confident Smiles
            </h2>
            <p className="mt-5 text-base leading-relaxed text-gray-600">
              Founded in 2010, ClearSmile Dental has grown from a small neighborhood practice into a
              trusted, full-service dental clinic serving thousands of patients. Our mission has always
              stayed the same: deliver honest, high-quality dental care in a warm, welcoming environment.
            </p>
            <p className="mt-4 text-base leading-relaxed text-gray-600">
              We invest continuously in the latest dental technology and ongoing training so that every
              patient — from toddlers to grandparents — receives care that's both effective and comfortable.
            </p>

            <ul className="mt-6 space-y-3">
              {values.map((value) => (
                <li key={value} className="flex items-start gap-3 text-sm text-gray-700">
                  <FaCheckCircle className="mt-0.5 shrink-0 text-primary-500" />
                  {value}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="bg-primary-50/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Mission"
            title="Making Dental Care Accessible & Comfortable"
            description="We believe everyone deserves a healthy, confident smile — delivered with compassion, transparency, and clinical excellence."
          />

          <RevealGroup className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {stats.map((item) => (
              <RevealItem key={item.label} as="scale">
                <div className="rounded-2xl bg-white p-8 text-center shadow-premium transition-all duration-500 hover:-translate-y-1 hover:shadow-premium-lg">
                  <p className="font-heading text-4xl font-semibold text-primary-600">
                    <AnimatedCounter to={item.to} suffix={item.suffix} />
                  </p>
                  <p className="mt-2 text-sm font-medium text-gray-600">{item.label}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CTASection />
    </>
  );
};

export default About;
