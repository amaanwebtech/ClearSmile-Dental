import { useEffect, useState } from 'react';
import api from '../../api/axios';
import SectionHeading from '../common/SectionHeading';
import TestimonialCard from '../common/TestimonialCard';
import LoadingSpinner from '../common/LoadingSpinner';
import { RevealGroup, RevealItem } from '../common/Reveal';

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/testimonials')
      .then((res) => setTestimonials(res.data.testimonials))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (!loading && testimonials.length === 0) return null;

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Testimonials"
          title="What Our Patients Say"
          description="Real stories from real patients who trusted us with their smiles."
          light
        />

        {loading ? (
          <LoadingSpinner />
        ) : (
          <RevealGroup className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {testimonials.slice(0, 4).map((t) => (
              <RevealItem key={t.id} className="h-full">
                <TestimonialCard testimonial={t} />
              </RevealItem>
            ))}
          </RevealGroup>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
