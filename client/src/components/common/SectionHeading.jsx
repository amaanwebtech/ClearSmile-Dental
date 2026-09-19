import Reveal from './Reveal';

const SectionHeading = ({ eyebrow, title, description, center = true, light = false }) => {
  return (
    <Reveal className={`max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <span
          className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] ${
            light ? 'bg-white/10 text-primary-200 ring-1 ring-white/15' : 'bg-primary-50 text-primary-700 ring-1 ring-primary-100'
          }`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${light ? 'bg-accent-300' : 'bg-primary-500'}`} />
          {eyebrow}
        </span>
      )}
      <h2
        className={`mt-5 font-heading text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.75rem] ${
          light ? 'text-white' : 'text-gray-900'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-base leading-relaxed ${light ? 'text-primary-100' : 'text-gray-600'}`}>
          {description}
        </p>
      )}
    </Reveal>
  );
};

export default SectionHeading;
