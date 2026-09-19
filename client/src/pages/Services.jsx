import { useEffect, useState } from 'react';
import api from '../api/axios';
import PageHeader from '../components/common/PageHeader';
import ServiceCard from '../components/common/ServiceCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import CTASection from '../components/home/CTASection';
import { RevealGroup, RevealItem } from '../components/common/Reveal';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/services')
      .then((res) => setServices(res.data.services))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <PageHeader title="Our Services" subtitle="Comprehensive dental treatments tailored to every stage of life." />

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {loading ? (
            <LoadingSpinner full />
          ) : services.length === 0 ? (
            <p className="text-center text-gray-500">No services available right now.</p>
          ) : (
            <RevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <RevealItem key={service.id} className="h-full">
                  <ServiceCard service={service} />
                </RevealItem>
              ))}
            </RevealGroup>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
};

export default Services;
