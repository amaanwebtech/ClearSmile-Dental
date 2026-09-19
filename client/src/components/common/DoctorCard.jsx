import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import Avatar from './Avatar';

const DoctorCard = ({ doctor }) => {
  return (
    <div className="group h-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-premium transition-all duration-500 hover:-translate-y-1.5 hover:shadow-premium-lg">
      <div className="aspect-[4/3] overflow-hidden">
        <Avatar src={doctor.image_url} name={doctor.name} className="transition-transform duration-700 ease-out group-hover:scale-110" />
      </div>
      <div className="p-6">
        <h3 className="font-heading text-lg font-semibold text-gray-900">{doctor.name}</h3>
        <p className="mt-1 text-sm font-medium text-primary-600">{doctor.specialization}</p>
        {doctor.qualification && <p className="mt-1 text-xs text-gray-500">{doctor.qualification}</p>}
        {doctor.bio && <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-gray-600">{doctor.bio}</p>}
        <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
          <span className="text-xs font-medium text-gray-500">{doctor.experience_years}+ yrs experience</span>
          <div className="flex gap-2">
            {[FaFacebookF, FaTwitter, FaLinkedinIn].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-50 text-gray-500 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-600 hover:text-white"
              >
                <Icon size={12} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
