import { Link } from 'react-router-dom';
import { FaCalendarCheck, FaPhoneAlt } from 'react-icons/fa';

const CTASection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-primary-600 to-primary-800 py-16">
      <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
          Ready to Transform Your Smile?
        </h2>
        <p className="max-w-xl text-primary-100">
          Schedule your visit today and take the first step toward a healthier, more confident smile.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            to="/appointment"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-primary-700 shadow-lg transition-transform hover:-translate-y-0.5"
          >
            <FaCalendarCheck /> Book an Appointment
          </Link>
          <a
            href="tel:+918791601241"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            <FaPhoneAlt /> Call Us Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
