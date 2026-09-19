import { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import { FaTooth, FaPhoneAlt } from 'react-icons/fa';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/doctors', label: 'Doctors' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur shadow-md' : 'bg-white'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600 text-white shadow-sm transition-transform group-hover:scale-105">
            <FaTooth size={20} />
          </span>
          <span className="font-heading text-xl font-bold text-primary-900">
            ClearSmile <span className="text-primary-500">Dental</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-primary-600 ${
                  isActive ? 'text-primary-600' : 'text-gray-700'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <a
            href="tel:+11234567890"
            className="flex items-center gap-2 text-sm font-semibold text-primary-700"
          >
            <FaPhoneAlt /> +1 (123) 456-7890
          </a>
          <Link
            to="/appointment"
            className="rounded-full bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-700 hover:shadow-md"
          >
            Book Appointment
          </Link>
        </div>

        <button
          className="lg:hidden text-2xl text-primary-800"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-4 pb-6 pt-2 shadow-lg">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/appointment"
              onClick={() => setOpen(false)}
              className="mt-3 rounded-full bg-primary-600 px-5 py-2.5 text-center text-sm font-semibold text-white shadow-sm"
            >
              Book Appointment
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
