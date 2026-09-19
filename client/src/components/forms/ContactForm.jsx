import { useState } from 'react';
import toast from 'react-hot-toast';
import api from '../../api/axios';

const initialState = { name: '', email: '', phone: '', subject: '', message: '' };

const ContactForm = () => {
  const [form, setForm] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { data } = await api.post('/contact', form);
      toast.success(data.message || 'Message sent successfully!');
      setForm(initialState);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    'w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100';
  const labelClass = 'mb-1.5 block text-sm font-medium text-gray-700';

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
      <div>
        <label className={labelClass}>Full Name *</label>
        <input type="text" name="name" required value={form.name} onChange={handleChange} placeholder="Your name" className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>Email Address *</label>
        <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder="you@example.com" className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>Phone Number</label>
        <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 87916 01241" className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>Subject</label>
        <input type="text" name="subject" value={form.subject} onChange={handleChange} placeholder="How can we help?" className={inputClass} />
      </div>
      <div className="sm:col-span-2">
        <label className={labelClass}>Message *</label>
        <textarea name="message" rows={5} required value={form.message} onChange={handleChange} placeholder="Write your message here..." className={inputClass} />
      </div>
      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {submitting ? 'Sending...' : 'Send Message'}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
