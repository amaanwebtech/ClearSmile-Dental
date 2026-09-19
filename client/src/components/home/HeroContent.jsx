import { Link } from 'react-router-dom';
import { FaCalendarCheck, FaStar, FaChevronDown } from 'react-icons/fa';

const HeroContent = () => {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
        Trusted Dental Care Since 2010
      </span>
      <h1 className="mt-6 max-w-3xl font-heading text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
        Your Smile Deserves <span className="text-accent-300">Expert Care</span>
      </h1>
      <p className="mt-6 max-w-lg text-base leading-relaxed text-primary-50 sm:text-lg">
        Advanced technology, a gentle touch, and a team that genuinely cares — welcome to
        comfortable, premium dental care.
      </p>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <Link
          to="/appointment"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-primary-800 shadow-lg transition-all hover:-translate-y-0.5 hover:bg-primary-50"
        >
          <FaCalendarCheck /> Book an Appointment
        </Link>
        <Link
          to="/services"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
        >
          Explore Services
        </Link>
      </div>

      <div className="mt-9 flex items-center gap-3 text-white">
        <div className="flex gap-0.5 text-accent-300">
          {Array.from({ length: 5 }).map((_, i) => (
            <FaStar key={i} size={13} />
          ))}
        </div>
        <p className="text-sm text-primary-50">
          <span className="font-semibold text-white">4,000+</span> happy patients
        </p>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80">
        <div className="flex flex-col items-center gap-1 text-xs font-medium uppercase tracking-widest">
          Scroll
          <FaChevronDown className="animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroContent;
