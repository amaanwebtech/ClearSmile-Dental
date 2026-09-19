import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiChevronRight } from 'react-icons/hi';

const PageHeader = ({ title, subtitle }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-950 via-primary-900 to-primary-800 py-20 sm:py-24">
      <div className="dot-grid pointer-events-none absolute inset-0 text-white/[0.06]" />
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-primary-500/25 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-accent-400/10 blur-3xl" />

      <motion.div
        className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        <h1 className="font-heading text-4xl font-semibold tracking-tight text-white sm:text-5xl">{title}</h1>
        {subtitle && <p className="mx-auto mt-4 max-w-xl text-sm text-primary-100 sm:text-base">{subtitle}</p>}
        <div className="mt-5 flex items-center justify-center gap-2 text-xs font-medium text-primary-200">
          <Link to="/" className="transition-colors hover:text-white">Home</Link>
          <HiChevronRight />
          <span className="text-white">{title}</span>
        </div>
      </motion.div>
    </section>
  );
};

export default PageHeader;
