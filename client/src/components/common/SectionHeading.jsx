const SectionHeading = ({ eyebrow, title, description, center = true, light = false }) => {
  return (
    <div className={`max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <span
          className={`inline-block rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wider ${
            light ? 'bg-white/10 text-primary-200' : 'bg-primary-50 text-primary-600'
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2 className={`mt-4 font-heading text-3xl font-bold sm:text-4xl ${light ? 'text-white' : 'text-gray-900'}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-base leading-relaxed ${light ? 'text-primary-100' : 'text-gray-600'}`}>
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
