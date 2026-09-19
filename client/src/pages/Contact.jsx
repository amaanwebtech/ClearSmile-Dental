import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa';
import PageHeader from '../components/common/PageHeader';
import ContactForm from '../components/forms/ContactForm';
import Reveal, { RevealGroup, RevealItem } from '../components/common/Reveal';

const infoCards = [
  { icon: FaMapMarkerAlt, title: 'Our Location', text: 'Baraut, Uttar Pradesh, India' },
  { icon: FaPhoneAlt, title: 'Phone Number', text: '+91 87916 01241' },
  { icon: FaEnvelope, title: 'Email Address', text: 'amaan.web.developer.8791@gmail.com' },
  { icon: FaClock, title: 'Working Hours', text: 'Mon–Fri: 9AM–8PM · Sat: 10AM–6PM' },
];

const Contact = () => {
  return (
    <>
      <PageHeader title="Get in Touch" subtitle="Have a question or need help? We're here for you." />

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {infoCards.map((card) => (
              <RevealItem key={card.title}>
                <div className="h-full rounded-2xl border border-gray-100 p-6 text-center shadow-premium transition-all duration-500 hover:-translate-y-1 hover:shadow-premium-lg">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
                    <card.icon size={22} />
                  </div>
                  <h3 className="mt-4 font-heading text-sm font-semibold text-gray-900">{card.title}</h3>
                  <p className="mt-1 text-sm text-gray-600">{card.text}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.1} className="mx-auto mt-16 max-w-3xl rounded-3xl border border-gray-100 bg-white p-6 shadow-premium sm:p-10">
            <h2 className="font-heading text-2xl font-semibold tracking-tight text-gray-900">Send Us a Message</h2>
            <p className="mt-2 text-sm text-gray-600">We usually respond within one business day.</p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </Reveal>

          <Reveal delay={0.15} className="mx-auto mt-16 max-w-5xl overflow-hidden rounded-3xl shadow-premium">
            <iframe
              title="Clinic Location Map"
              src="https://maps.google.com/maps?q=Baraut%2C%20Uttar%20Pradesh&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="h-80 w-full border-0"
              loading="lazy"
            />
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default Contact;
