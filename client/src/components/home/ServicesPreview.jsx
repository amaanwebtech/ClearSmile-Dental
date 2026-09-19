import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import api from '../../api/axios';
import SectionHeading from '../common/SectionHeading';
import ServiceCard from '../common/ServiceCard';
import LoadingSpinner from '../common/LoadingSpinner';
import Reveal, { RevealGroup, RevealItem } from '../common/Reveal';

const ServicesPreview = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/services')
      .then((res) => setServices(res.data.services.slice(0, 6)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Services"
          title="Comprehensive Dental Treatments"
          description="From routine checkups to advanced cosmetic procedures, we offer complete dental care under one roof."
          light
        />

        {loading ? (
          <LoadingSpinner />
        ) : (
          <RevealGroup className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <RevealItem key={service.id} className="h-full">
                <ServiceCard service={service} />
              </RevealItem>
            ))}
          </RevealGroup>
        )}

        <Reveal className="mt-12 text-center" delay={0.1}>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white px-6 py-3 text-sm font-semibold text-primary-700 shadow-premium transition-all hover:-translate-y-0.5 hover:bg-primary-600 hover:text-white hover:shadow-glow"
          >
            View All Services <FaArrowRight size={12} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
};

export default ServicesPreview;
