import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import api from '../../api/axios';
import SectionHeading from '../common/SectionHeading';
import DoctorCard from '../common/DoctorCard';
import LoadingSpinner from '../common/LoadingSpinner';
import Reveal, { RevealGroup, RevealItem } from '../common/Reveal';

const DoctorsPreview = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/doctors')
      .then((res) => setDoctors(res.data.doctors.slice(0, 4)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Meet Our Team"
          title="Experienced & Caring Specialists"
          description="Our board-certified dentists bring decades of combined experience to every treatment."
          light
        />

        {loading ? (
          <LoadingSpinner />
        ) : (
          <RevealGroup className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {doctors.map((doctor) => (
              <RevealItem key={doctor.id} className="h-full">
                <DoctorCard doctor={doctor} />
              </RevealItem>
            ))}
          </RevealGroup>
        )}

        <Reveal className="mt-12 text-center" delay={0.1}>
          <Link
            to="/doctors"
            className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white px-6 py-3 text-sm font-semibold text-primary-700 shadow-premium transition-all hover:-translate-y-0.5 hover:bg-primary-600 hover:text-white hover:shadow-glow"
          >
            Meet The Full Team <FaArrowRight size={12} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
};

export default DoctorsPreview;
