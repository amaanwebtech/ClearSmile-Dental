import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import api from '../../api/axios';
import SectionHeading from '../common/SectionHeading';
import DoctorCard from '../common/DoctorCard';
import LoadingSpinner from '../common/LoadingSpinner';

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
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Meet Our Team"
          title="Experienced & Caring Specialists"
          description="Our board-certified dentists bring decades of combined experience to every treatment."
        />

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            to="/doctors"
            className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white px-6 py-3 text-sm font-semibold text-primary-700 transition-colors hover:bg-primary-600 hover:text-white"
          >
            Meet The Full Team <FaArrowRight size={12} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DoctorsPreview;
