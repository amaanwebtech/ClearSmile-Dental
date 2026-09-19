import { Link } from 'react-router-dom';
import { FaTooth, FaFacebookF, FaInstagram, FaTwitter, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="relative z-10 bg-primary-950 text-primary-100">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600 text-white">
                <FaTooth size={18} />
              </span>
              <span className="font-heading text-lg font-bold text-white">ClearSmile Dental</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-primary-200">
              Premium, gentle dental care for the whole family — combining modern technology with a warm,
              patient-first approach.
            </p>
            <div className="mt-5 flex gap-3">
              {[FaFacebookF, FaInstagram, FaTwitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-900 text-primary-200 transition-colors hover:bg-primary-600 hover:text-white"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wide text-white">Quick Links</h4>
            <ul className="mt-4 space-y-2 text-sm">
              {[
                ['About Us', '/about'],
                ['Our Services', '/services'],
                ['Our Doctors', '/doctors'],
                ['Gallery', '/gallery'],
                ['Book Appointment', '/appointment'],
              ].map(([label, to]) => (
                <li key={to}>
                  <Link to={to} className="text-primary-200 transition-colors hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wide text-white">Working Hours</h4>
            <ul className="mt-4 space-y-2 text-sm text-primary-200">
              <li className="flex items-center gap-2"><FaClock className="shrink-0" /> Mon – Fri: 9:00 AM – 8:00 PM</li>
              <li className="flex items-center gap-2"><FaClock className="shrink-0" /> Saturday: 10:00 AM – 6:00 PM</li>
              <li className="flex items-center gap-2"><FaClock className="shrink-0" /> Sunday: Closed</li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wide text-white">Contact Us</h4>
            <ul className="mt-4 space-y-3 text-sm text-primary-200">
              <li className="flex items-start gap-2">
                <FaMapMarkerAlt className="mt-0.5 shrink-0" /> 123 Smile Avenue, Downtown, City 45678
              </li>
              <li className="flex items-center gap-2">
                <FaPhoneAlt className="shrink-0" /> +1 (123) 456-7890
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope className="shrink-0" /> hello@clearsmiledental.com
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-primary-900 pt-6 text-xs text-primary-300 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} ClearSmile Dental. All rights reserved.</p>
          <Link to="/admin/login" className="hover:text-white">
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
