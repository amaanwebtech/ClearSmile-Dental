import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { HiOutlinePencil, HiOutlineTrash, HiOutlinePlus, HiX } from 'react-icons/hi';
import api from '../../api/axios';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const emptyForm = { title: '', slug: '', short_description: '', description: '', icon: 'tooth', price: '', image_url: '' };

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchServices = () => {
    setLoading(true);
    api
      .get('/services')
      .then((res) => setServices(res.data.services))
      .catch(() => toast.error('Failed to load services'))
      .finally(() => setLoading(false));
  };

  useEffect(fetchServices, []);

  const openNewForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };

  const openEditForm = (service) => {
    setForm({
      title: service.title,
      slug: service.slug,
      short_description: service.short_description || '',
      description: service.description || '',
      icon: service.icon || 'tooth',
      price: service.price || '',
      image_url: service.image_url || '',
    });
    setEditingId(service.id);
    setShowForm(true);
  };

  const handleSlugify = (title) =>
    title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        await api.put(`/services/${editingId}`, form);
        toast.success('Service updated');
      } else {
        await api.post('/services', { ...form, slug: form.slug || handleSlugify(form.title) });
        toast.success('Service created');
      }
      setShowForm(false);
      fetchServices();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save service');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this service?')) return;
    try {
      await api.delete(`/services/${id}`);
      setServices((prev) => prev.filter((s) => s.id !== id));
      toast.success('Service deleted');
    } catch {
      toast.error('Failed to delete service');
    }
  };

  const inputClass = 'w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100';

  if (loading) return <LoadingSpinner full />;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-gray-900">Services</h1>
          <p className="mt-1 text-sm text-gray-500">Manage the services offered at your clinic.</p>
        </div>
        <button
          onClick={openNewForm}
          className="flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-700"
        >
          <HiOutlinePlus /> Add Service
        </button>
      </div>

      {showForm && (
        <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-lg font-semibold text-gray-900">
              {editingId ? 'Edit Service' : 'New Service'}
            </h2>
            <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">
              <HiX size={20} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Title *</label>
              <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Slug</label>
              <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="auto-generated if empty" className={inputClass} />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">Short Description</label>
              <input value={form.short_description} onChange={(e) => setForm({ ...form, short_description: e.target.value })} className={inputClass} />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">Full Description</label>
              <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Icon Key</label>
              <select value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} className={inputClass}>
                {['tooth', 'sparkles', 'implant', 'braces', 'clean', 'child'].map((k) => (
                  <option key={k} value={k}>{k}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Price ($)</label>
              <input type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className={inputClass} />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">Image URL</label>
              <input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} placeholder="/images/services/example.jpg" className={inputClass} />
            </div>
            <div className="sm:col-span-2 flex justify-end gap-3">
              <button type="button" onClick={() => setShowForm(false)} className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700">
                Cancel
              </button>
              <button type="submit" disabled={saving} className="rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-60">
                {saving ? 'Saving...' : 'Save Service'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <div key={service.id} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <h3 className="font-heading font-semibold text-gray-900">{service.title}</h3>
              <div className="flex gap-2">
                <button onClick={() => openEditForm(service)} className="text-gray-400 hover:text-primary-600">
                  <HiOutlinePencil size={16} />
                </button>
                <button onClick={() => handleDelete(service.id)} className="text-gray-400 hover:text-red-600">
                  <HiOutlineTrash size={16} />
                </button>
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-600">{service.short_description}</p>
            {Number(service.price) > 0 && (
              <p className="mt-3 text-sm font-semibold text-primary-700">${Number(service.price).toLocaleString()}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminServices;
