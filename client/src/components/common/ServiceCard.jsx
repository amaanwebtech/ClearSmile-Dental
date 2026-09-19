import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { getServiceIcon } from '../../utils/iconMap';

const ServiceCard = ({ service }) => {
  const Icon = getServiceIcon(service.icon);

  return (
    <div className="group flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-600 group-hover:text-white">
        <Icon size={26} />
      </div>
      <h3 className="mt-5 font-heading text-lg font-semibold text-gray-900">{service.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">{service.short_description}</p>
      <Link
        to={`/services/${service.slug}`}
        className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary-600 transition-colors hover:text-primary-800"
      >
        Learn More <FaArrowRight size={12} />
      </Link>
    </div>
  );
};

export default ServiceCard;
