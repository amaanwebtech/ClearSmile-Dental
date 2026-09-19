import { Link, useLocation } from 'react-router-dom';
import { FaCalendarCheck } from 'react-icons/fa';

const FloatingBookButton = () => {
  const location = useLocation();
  if (location.pathname.startsWith('/admin') || location.pathname === '/appointment') return null;

  return (
    <Link
      to="/appointment"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-accent-400 px-5 py-3 text-sm font-semibold text-primary-950 shadow-premium-lg transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:bg-accent-300 sm:bottom-8 sm:right-8"
    >
      <FaCalendarCheck /> Book Now
    </Link>
  );
};

export default FloatingBookButton;
