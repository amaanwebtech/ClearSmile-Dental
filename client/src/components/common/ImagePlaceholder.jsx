import { useState } from 'react';
import { FaTooth } from 'react-icons/fa';

const ImagePlaceholder = ({ src, alt = '', className = '', icon: Icon = FaTooth }) => {
  const [errored, setErrored] = useState(false);

  if (!src || errored) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-primary-100 via-primary-50 to-accent-50 ${className}`}>
        <Icon className="text-primary-300" size={48} />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setErrored(true)}
      className={`object-cover ${className}`}
    />
  );
};

export default ImagePlaceholder;
