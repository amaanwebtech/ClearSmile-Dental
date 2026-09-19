import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa';
import PageHeader from '../components/common/PageHeader';
import ContactForm from '../components/forms/ContactForm';

const infoCards = [
  { icon: FaMapMarkerAlt, title: 'Our Location', text: '123 Smile Avenue, Downtown, City 45678' },
  { icon: FaPhoneAlt, title: 'Phone Number', text: '+1 (123) 456-7890' },
  { icon: FaEnvelope, title: 'Email Address', text: 'hello@clearsmiledental.com' },
  { icon: FaClock, title: 'Working Hours', text: 'Mon–Fri: 9AM–8PM · Sat: 10AM–6PM' },
];

const Contact = () => {
  return (
    <>
      <PageHeader title="Get in Touch" subtitle="Have a question or need help? We're here for you." />

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {infoCards.map((card) => (
              <div key={card.title} className="rounded-2xl border border-gray-100 p-6 text-center shadow-sm">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
                  <card.icon size={22} />
                </div>
                <h3 className="mt-4 font-heading text-sm font-semibold text-gray-900">{card.title}</h3>
                <p className="mt-1 text-sm text-gray-600">{card.text}</p>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-16 max-w-3xl rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-10">
            <h2 className="font-heading text-2xl font-bold text-gray-900">Send Us a Message</h2>
            <p className="mt-2 text-sm text-gray-600">We usually respond within one business day.</p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          <div className="mx-auto mt-16 max-w-5xl overflow-hidden rounded-3xl">
            <iframe
              title="Clinic Location Map"
              src="https://maps.google.com/maps?q=New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="h-80 w-full border-0"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
