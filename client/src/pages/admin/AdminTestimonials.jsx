import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { HiOutlineTrash, HiOutlinePlus, HiX } from 'react-icons/hi';
import { FaStar } from 'react-icons/fa';
import api from '../../api/axios';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Avatar from '../../components/common/Avatar';

const emptyForm = { patient_name: '', rating: 5, message: '', image_url: '' };

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchTestimonials = () => {
    setLoading(true);
    api
      .get('/testimonials')
      .then((res) => setTestimonials(res.data.testimonials))
      .catch(() => toast.error('Failed to load testimonials'))
      .finally(() => setLoading(false));
  };

  useEffect(fetchTestimonials, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post('/testimonials', form);
      toast.success('Testimonial added');
      setShowForm(false);
      setForm(emptyForm);
      fetchTestimonials();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save testimonial');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this testimonial?')) return;
    try {
      await api.delete(`/testimonials/${id}`);
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
      toast.success('Testimonial deleted');
    } catch {
      toast.error('Failed to delete testimonial');
    }
  };

  const inputClass = 'w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100';

  if (loading) return <LoadingSpinner full />;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-gray-900">Testimonials</h1>
          <p className="mt-1 text-sm text-gray-500">Manage patient reviews shown on your website.</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-700"
        >
          <HiOutlinePlus /> Add Testimonial
        </button>
      </div>

      {showForm && (
        <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-lg font-semibold text-gray-900">New Testimonial</h2>
            <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">
              <HiX size={20} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Patient Name *</label>
              <input required value={form.patient_name} onChange={(e) => setForm({ ...form, patient_name: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Rating (1-5)</label>
              <input type="number" min="1" max="5" value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })} className={inputClass} />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">Message *</label>
              <textarea required rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={inputClass} />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">Image URL</label>
              <input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} placeholder="/images/testimonials/example.jpg" className={inputClass} />
            </div>
            <div className="sm:col-span-2 flex justify-end gap-3">
              <button type="button" onClick={() => setShowForm(false)} className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700">
                Cancel
              </button>
              <button type="submit" disabled={saving} className="rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-60">
                {saving ? 'Saving...' : 'Save Testimonial'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t) => (
          <div key={t.id} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full">
                  <Avatar src={t.image_url} name={t.patient_name} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{t.patient_name}</p>
                  <div className="flex gap-0.5 text-accent-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar key={i} size={10} className={i < t.rating ? '' : 'text-gray-200'} />
                    ))}
                  </div>
                </div>
              </div>
              <button onClick={() => handleDelete(t.id)} className="text-gray-400 hover:text-red-600">
                <HiOutlineTrash size={16} />
              </button>
            </div>
            <p className="mt-3 text-sm text-gray-600">{t.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTestimonials;
