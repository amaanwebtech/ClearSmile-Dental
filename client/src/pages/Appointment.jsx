import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa';
import PageHeader from '../components/common/PageHeader';
import AppointmentForm from '../components/forms/AppointmentForm';
import Reveal from '../components/common/Reveal';

const Appointment = () => {
  return (
    <>
      <PageHeader title="Book an Appointment" subtitle="Fill out the form below and our team will confirm your slot shortly." />

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          <Reveal className="lg:col-span-2 rounded-3xl border border-gray-100 bg-white p-6 shadow-premium sm:p-10">
            <h2 className="font-heading text-2xl font-semibold tracking-tight text-gray-900">Appointment Details</h2>
            <p className="mt-2 text-sm text-gray-600">
              All fields marked with * are required. We'll reach out via phone or email to confirm your visit.
            </p>
            <div className="mt-8">
              <AppointmentForm />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="space-y-6">
            <div className="rounded-3xl bg-primary-950 p-8 text-white shadow-premium-lg">
              <h3 className="font-heading text-lg font-semibold">Clinic Information</h3>
              <ul className="mt-5 space-y-4 text-sm text-primary-100">
                <li className="flex items-start gap-3">
                  <FaMapMarkerAlt className="mt-1 shrink-0" /> Baraut, Uttar Pradesh, India
                </li>
                <li className="flex items-start gap-3">
                  <FaPhoneAlt className="mt-1 shrink-0" /> +91 87916 01241
                </li>
                <li className="flex items-start gap-3">
                  <FaEnvelope className="mt-1 shrink-0" /> amaan.web.developer.8791@gmail.com
                </li>
                <li className="flex items-start gap-3">
                  <FaClock className="mt-1 shrink-0" /> Mon–Fri: 9AM–8PM · Sat: 10AM–6PM
                </li>
              </ul>
            </div>

            <div className="rounded-3xl border border-primary-100 bg-primary-50 p-8">
              <h3 className="font-heading text-lg font-semibold text-primary-900">Need Immediate Help?</h3>
              <p className="mt-2 text-sm text-primary-800">
                For dental emergencies, please call us directly for the fastest response.
              </p>
              <a
                href="tel:+918791601241"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-premium transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-700 hover:shadow-glow"
              >
                <FaPhoneAlt size={12} /> Call Now
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default Appointment;
