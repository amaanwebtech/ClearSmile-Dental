import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { getServiceIcon } from '../../utils/iconMap';
import ImagePlaceholder from './ImagePlaceholder';

const ServiceCard = ({ service }) => {
  const Icon = getServiceIcon(service.icon);

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-premium transition-all duration-500 hover:-translate-y-1.5 hover:shadow-premium-lg">
      <div className="relative aspect-[16/10] overflow-hidden">
        <ImagePlaceholder
          src={service.image_url}
          alt={service.title}
          icon={Icon}
          className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute -bottom-5 left-5 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-primary-600 shadow-premium ring-4 ring-white transition-colors duration-500 group-hover:bg-primary-600 group-hover:text-white">
          <Icon size={20} />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-7 pt-8">
        <h3 className="font-heading text-lg font-semibold text-gray-900">{service.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">{service.short_description}</p>
        <Link
          to={`/services/${service.slug}`}
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary-600 transition-all duration-300 hover:gap-3 hover:text-primary-800"
        >
          Learn More <FaArrowRight size={12} />
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
