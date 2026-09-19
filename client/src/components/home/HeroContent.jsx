import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCalendarCheck, FaStar, FaChevronDown } from 'react-icons/fa';
import AnimatedCounter from '../common/AnimatedCounter';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] } },
};

const HeroContent = () => {
  return (
    <motion.section
      className="relative flex min-h-screen flex-col items-center justify-center px-4 text-center"
      initial="hidden"
      animate="show"
      variants={container}
    >
      <motion.span
        variants={item}
        className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-premium backdrop-blur-sm ring-1 ring-white/15"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-accent-300" />
        Trusted Dental Care Since 2010
      </motion.span>
      <motion.h1
        variants={item}
        className="mt-6 max-w-3xl font-heading text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl"
      >
        Your Smile Deserves{' '}
        <span className="italic text-accent-300">Expert Care</span>
      </motion.h1>
      <motion.p variants={item} className="mt-6 max-w-lg text-base leading-relaxed text-primary-50 sm:text-lg">
        Advanced technology, a gentle touch, and a team that genuinely cares — welcome to
        comfortable, premium dental care.
      </motion.p>

      <motion.div variants={item} className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
        <Link
          to="/appointment"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-primary-800 shadow-premium-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-50"
        >
          <FaCalendarCheck /> Book an Appointment
        </Link>
        <Link
          to="/services"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/70 hover:bg-white/10"
        >
          Explore Services
        </Link>
      </motion.div>

      <motion.div variants={item} className="mt-10 flex items-center gap-3 text-white">
        <div className="flex gap-0.5 text-accent-300">
          {Array.from({ length: 5 }).map((_, i) => (
            <FaStar key={i} size={13} />
          ))}
        </div>
        <p className="text-sm text-primary-50">
          <span className="font-semibold text-white">
            <AnimatedCounter to={4000} suffix="+" />
          </span>{' '}
          happy patients
        </p>
      </motion.div>

      <motion.div
        variants={item}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80"
      >
        <div className="flex flex-col items-center gap-1 text-xs font-medium uppercase tracking-widest">
          Scroll
          <FaChevronDown className="animate-bounce" />
        </div>
      </motion.div>
    </motion.section>
  );
};

export default HeroContent;
