import { useState } from 'react';

const palette = [
  'from-primary-400 to-primary-700',
  'from-accent-300 to-accent-600',
  'from-primary-300 to-primary-600',
  'from-accent-400 to-primary-600',
];

const getInitials = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

const Avatar = ({ src, name, className = '', size = 'h-full w-full' }) => {
  const [errored, setErrored] = useState(false);
  const colorIndex = (name?.length || 0) % palette.length;

  if (!src || errored) {
    return (
      <div
        className={`flex ${size} items-center justify-center rounded-[inherit] bg-gradient-to-br ${palette[colorIndex]} font-heading font-bold text-white ${className}`}
      >
        <span className="text-2xl">{getInitials(name) || '?'}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      onError={() => setErrored(true)}
      className={`${size} rounded-[inherit] object-cover ${className}`}
    />
  );
};

export default Avatar;
