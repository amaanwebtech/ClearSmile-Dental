import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import Avatar from './Avatar';

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="flex h-full flex-col rounded-2xl bg-white p-7 shadow-sm ring-1 ring-gray-100">
      <FaQuoteLeft className="text-2xl text-primary-200" />
      <p className="mt-4 flex-1 text-sm leading-relaxed text-gray-700">"{testimonial.message}"</p>
      <div className="mt-5 flex items-center gap-3 border-t border-gray-100 pt-4">
        <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full">
          <Avatar src={testimonial.image_url} name={testimonial.patient_name} />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">{testimonial.patient_name}</p>
          <div className="mt-0.5 flex gap-0.5 text-accent-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar key={i} size={12} className={i < testimonial.rating ? '' : 'text-gray-200'} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
