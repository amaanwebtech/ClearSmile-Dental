import { useEffect, useState } from 'react';
import api from '../api/axios';
import PageHeader from '../components/common/PageHeader';
import DoctorCard from '../components/common/DoctorCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import CTASection from '../components/home/CTASection';
import { RevealGroup, RevealItem } from '../components/common/Reveal';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/doctors')
      .then((res) => setDoctors(res.data.doctors))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <PageHeader title="Meet Our Doctors" subtitle="A dedicated team of specialists committed to your dental health." />

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {loading ? (
            <LoadingSpinner full />
          ) : doctors.length === 0 ? (
            <p className="text-center text-gray-500">No doctors available right now.</p>
          ) : (
            <RevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {doctors.map((doctor) => (
                <RevealItem key={doctor.id} className="h-full">
                  <DoctorCard doctor={doctor} />
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

export default Doctors;
