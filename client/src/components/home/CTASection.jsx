import { Link } from 'react-router-dom';
import { FaCalendarCheck, FaPhoneAlt } from 'react-icons/fa';
import Reveal from '../common/Reveal';

const CTASection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 py-20">
      <div className="dot-grid pointer-events-none absolute inset-0 text-white/[0.05]" />
      <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-10 bottom-0 h-56 w-56 rounded-full bg-accent-400/15 blur-3xl" />

      <Reveal as="scale" className="relative mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Ready to Transform Your Smile?
        </h2>
        <p className="max-w-xl text-primary-100">
          Schedule your visit today and take the first step toward a healthier, more confident smile.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            to="/appointment"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-primary-700 shadow-premium-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-50"
          >
            <FaCalendarCheck /> Book an Appointment
          </Link>
          <a
            href="tel:+918791601241"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/70 hover:bg-white/10"
          >
            <FaPhoneAlt /> Call Us Now
          </a>
        </div>
      </Reveal>
    </section>
  );
};

export default CTASection;
