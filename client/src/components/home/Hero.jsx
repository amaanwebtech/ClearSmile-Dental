import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCalendarCheck, FaPlay, FaStar } from 'react-icons/fa';
import { GiTooth } from 'react-icons/gi';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 via-white to-white">
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-primary-100 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 top-1/2 h-96 w-96 rounded-full bg-accent-100 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-700">
            <GiTooth /> Trusted Dental Care Since 2010
          </span>
          <h1 className="mt-6 font-heading text-4xl font-extrabold leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Your Smile Deserves <span className="text-primary-600">Expert Care</span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-gray-600 sm:text-lg">
            At ClearSmile Dental, we combine advanced technology with a gentle touch to deliver
            comfortable, premium dental care for every member of your family.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              to="/appointment"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary-600/20 transition-all hover:-translate-y-0.5 hover:bg-primary-700"
            >
              <FaCalendarCheck /> Book an Appointment
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-7 py-3.5 text-sm font-semibold text-gray-700 transition-all hover:border-primary-300 hover:text-primary-700"
            >
              <FaPlay size={12} /> Explore Services
            </Link>
          </div>

          <div className="mt-10 flex items-center gap-6">
            <div className="flex -space-x-3">
              {['A', 'B', 'C', 'D'].map((letter, i) => (
                <div
                  key={letter}
                  className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-primary-400 to-primary-600 text-xs font-bold text-white"
                  style={{ zIndex: 10 - i }}
                >
                  {letter}
                </div>
              ))}
            </div>
            <div>
              <div className="flex gap-0.5 text-accent-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar key={i} size={13} />
                ))}
              </div>
              <p className="mt-1 text-sm text-gray-600">
                <span className="font-semibold text-gray-900">4,000+</span> happy patients
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative"
        >
          <div className="aspect-square w-full overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary-100 via-primary-50 to-accent-50 shadow-2xl">
            <div className="flex h-full w-full items-center justify-center">
              <GiTooth className="text-primary-300" size={180} />
            </div>
          </div>
          <div className="absolute -bottom-6 -left-6 rounded-2xl bg-white p-5 shadow-xl">
            <p className="font-heading text-2xl font-bold text-primary-600">15+</p>
            <p className="text-xs font-medium text-gray-500">Years of Experience</p>
          </div>
          <div className="absolute -top-6 -right-4 rounded-2xl bg-white p-5 shadow-xl">
            <p className="font-heading text-2xl font-bold text-accent-500">98%</p>
            <p className="text-xs font-medium text-gray-500">Patient Satisfaction</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
