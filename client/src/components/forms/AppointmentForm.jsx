import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../../api/axios';

const initialState = {
  patient_name: '',
  email: '',
  phone: '',
  service_id: '',
  doctor_id: '',
  appointment_date: '',
  appointment_time: '',
  message: '',
};

const AppointmentForm = ({ compact = false }) => {
  const [form, setForm] = useState(initialState);
  const [services, setServices] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api.get('/services').then((res) => setServices(res.data.services)).catch(() => {});
    api.get('/doctors').then((res) => setDoctors(res.data.doctors)).catch(() => {});
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { data } = await api.post('/appointments', form);
      toast.success(data.message || 'Appointment booked successfully!');
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

  const today = new Date().toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit} className={`grid gap-4 ${compact ? '' : 'sm:grid-cols-2'}`}>
      <div>
        <label className={labelClass}>Full Name *</label>
        <input
          type="text"
          name="patient_name"
          required
          value={form.patient_name}
          onChange={handleChange}
          placeholder="John Doe"
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass}>Email Address *</label>
        <input
          type="email"
          name="email"
          required
          value={form.email}
          onChange={handleChange}
          placeholder="john@example.com"
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass}>Phone Number *</label>
        <input
          type="tel"
          name="phone"
          required
          value={form.phone}
          onChange={handleChange}
          placeholder="+91 87916 01241"
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass}>Preferred Service</label>
        <select name="service_id" value={form.service_id} onChange={handleChange} className={inputClass}>
          <option value="">Select a service</option>
          {services.map((s) => (
            <option key={s.id} value={s.id}>
              {s.title}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className={labelClass}>Preferred Doctor</label>
        <select name="doctor_id" value={form.doctor_id} onChange={handleChange} className={inputClass}>
          <option value="">No preference</option>
          {doctors.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className={labelClass}>Preferred Date *</label>
        <input
          type="date"
          name="appointment_date"
          required
          min={today}
          value={form.appointment_date}
          onChange={handleChange}
          className={inputClass}
        />
      </div>
      <div className={compact ? '' : 'sm:col-span-2'}>
        <label className={labelClass}>Preferred Time *</label>
        <input
          type="time"
          name="appointment_time"
          required
          value={form.appointment_time}
          onChange={handleChange}
          className={inputClass}
        />
      </div>
      <div className={compact ? '' : 'sm:col-span-2'}>
        <label className={labelClass}>Additional Message</label>
        <textarea
          name="message"
          rows={3}
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us more about your dental concern..."
          className={inputClass}
        />
      </div>
      <div className={compact ? '' : 'sm:col-span-2'}>
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-premium transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-700 hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {submitting ? 'Booking...' : 'Book Appointment'}
        </button>
      </div>
    </form>
  );
};

export default AppointmentForm;
