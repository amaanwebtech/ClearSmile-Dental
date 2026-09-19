import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaCalendarCheck } from 'react-icons/fa';
import api from '../api/axios';
import PageHeader from '../components/common/PageHeader';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ImagePlaceholder from '../components/common/ImagePlaceholder';
import { getServiceIcon } from '../utils/iconMap';
import Reveal from '../components/common/Reveal';
import NotFound from './NotFound';

const ServiceDetail = () => {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    api
      .get(`/services/${slug}`)
      .then((res) => setService(res.data.service))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <LoadingSpinner full />;
  if (notFound || !service) return <NotFound />;

  const Icon = getServiceIcon(service.icon);

  return (
    <>
      <PageHeader title={service.title} subtitle={service.short_description} />

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Reveal as="scale">
            <ImagePlaceholder src={service.image_url} alt={service.title} icon={Icon} className="aspect-[4/3] w-full rounded-3xl shadow-premium-lg" />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
              <Icon size={26} />
            </div>
            <h2 className="mt-5 font-heading text-2xl font-semibold tracking-tight text-gray-900">{service.title}</h2>
            <p className="mt-4 text-base leading-relaxed text-gray-600">{service.description}</p>

            {Number(service.price) > 0 && (
              <p className="mt-5 text-lg font-semibold text-primary-700">
                Starting from ${Number(service.price).toLocaleString()}
              </p>
            )}

            <Link
              to="/appointment"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary-600 px-7 py-3.5 text-sm font-semibold text-white shadow-premium transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-700 hover:shadow-glow"
            >
              <FaCalendarCheck /> Book This Service
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default ServiceDetail;
