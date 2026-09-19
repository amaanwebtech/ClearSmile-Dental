import { Link } from 'react-router-dom';
import { HiChevronRight } from 'react-icons/hi';

const PageHeader = ({ title, subtitle }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-950 to-primary-800 py-16 sm:py-20">
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary-600/30 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h1 className="font-heading text-3xl font-bold text-white sm:text-4xl">{title}</h1>
        {subtitle && <p className="mx-auto mt-3 max-w-xl text-sm text-primary-100 sm:text-base">{subtitle}</p>}
        <div className="mt-4 flex items-center justify-center gap-2 text-xs font-medium text-primary-200">
          <Link to="/" className="hover:text-white">Home</Link>
          <HiChevronRight />
          <span className="text-white">{title}</span>
        </div>
      </div>
    </section>
  );
};

export default PageHeader;
