import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { HiOutlinePencil, HiOutlineTrash, HiOutlinePlus, HiX } from 'react-icons/hi';
import api from '../../api/axios';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Avatar from '../../components/common/Avatar';

const emptyForm = { name: '', specialization: '', qualification: '', bio: '', image_url: '', experience_years: '' };

const AdminDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchDoctors = () => {
    setLoading(true);
    api
      .get('/doctors')
      .then((res) => setDoctors(res.data.doctors))
      .catch(() => toast.error('Failed to load doctors'))
      .finally(() => setLoading(false));
  };

  useEffect(fetchDoctors, []);

  const openNewForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };

  const openEditForm = (doctor) => {
    setForm({
      name: doctor.name,
      specialization: doctor.specialization,
      qualification: doctor.qualification || '',
      bio: doctor.bio || '',
      image_url: doctor.image_url || '',
      experience_years: doctor.experience_years || '',
    });
    setEditingId(doctor.id);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        await api.put(`/doctors/${editingId}`, form);
        toast.success('Doctor updated');
      } else {
        await api.post('/doctors', form);
        toast.success('Doctor added');
      }
      setShowForm(false);
      fetchDoctors();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save doctor');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this doctor?')) return;
    try {
      await api.delete(`/doctors/${id}`);
      setDoctors((prev) => prev.filter((d) => d.id !== id));
      toast.success('Doctor deleted');
    } catch {
      toast.error('Failed to delete doctor');
    }
  };

  const inputClass = 'w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100';

  if (loading) return <LoadingSpinner full />;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-gray-900">Doctors</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your clinic's medical staff.</p>
        </div>
        <button
          onClick={openNewForm}
          className="flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-700"
        >
          <HiOutlinePlus /> Add Doctor
        </button>
      </div>

      {showForm && (
        <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-lg font-semibold text-gray-900">{editingId ? 'Edit Doctor' : 'New Doctor'}</h2>
            <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">
              <HiX size={20} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Full Name *</label>
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Specialization *</label>
              <input required value={form.specialization} onChange={(e) => setForm({ ...form, specialization: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Qualification</label>
              <input value={form.qualification} onChange={(e) => setForm({ ...form, qualification: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Experience (years)</label>
              <input type="number" value={form.experience_years} onChange={(e) => setForm({ ...form, experience_years: e.target.value })} className={inputClass} />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">Bio</label>
              <textarea rows={3} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} className={inputClass} />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">Image URL</label>
              <input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} placeholder="/images/doctors/example.jpg" className={inputClass} />
            </div>
            <div className="sm:col-span-2 flex justify-end gap-3">
              <button type="button" onClick={() => setShowForm(false)} className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700">
                Cancel
              </button>
              <button type="submit" disabled={saving} className="rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-60">
                {saving ? 'Saving...' : 'Save Doctor'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full">
              <Avatar src={doctor.image_url} name={doctor.name} />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="truncate font-heading font-semibold text-gray-900">{doctor.name}</h3>
              <p className="truncate text-xs text-primary-600">{doctor.specialization}</p>
            </div>
            <div className="flex shrink-0 gap-2">
              <button onClick={() => openEditForm(doctor)} className="text-gray-400 hover:text-primary-600">
                <HiOutlinePencil size={16} />
              </button>
              <button onClick={() => handleDelete(doctor.id)} className="text-gray-400 hover:text-red-600">
                <HiOutlineTrash size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDoctors;
