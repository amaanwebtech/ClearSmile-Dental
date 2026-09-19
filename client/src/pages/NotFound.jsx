import { Link } from 'react-router-dom';
import { GiTooth } from 'react-icons/gi';

const NotFound = () => {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <GiTooth className="text-primary-200" size={80} />
      <h1 className="mt-6 font-heading text-4xl font-bold text-gray-900">404</h1>
      <p className="mt-2 text-gray-600">Oops! The page you're looking for doesn't exist.</p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white hover:bg-primary-700"
      >
        Back to Home
      </Link>
    </section>
  );
};

export default NotFound;
