import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { HiOutlineTrash } from 'react-icons/hi';
import api from '../../api/axios';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const statusOptions = ['pending', 'confirmed', 'completed', 'cancelled'];

const statusColors = {
  pending: 'bg-amber-100 text-amber-700',
  confirmed: 'bg-primary-100 text-primary-700',
  completed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const fetchAppointments = () => {
    setLoading(true);
    api
      .get('/appointments')
      .then((res) => setAppointments(res.data.appointments))
      .catch(() => toast.error('Failed to load appointments'))
      .finally(() => setLoading(false));
  };

  useEffect(fetchAppointments, []);

  const handleStatusChange = async (id, status) => {
    try {
      await api.put(`/appointments/${id}/status`, { status });
      setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
      toast.success('Status updated');
    } catch {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this appointment? This cannot be undone.')) return;
    try {
      await api.delete(`/appointments/${id}`);
      setAppointments((prev) => prev.filter((a) => a.id !== id));
      toast.success('Appointment deleted');
    } catch {
      toast.error('Failed to delete appointment');
    }
  };

  const filtered = filter === 'all' ? appointments : appointments.filter((a) => a.status === filter);

  if (loading) return <LoadingSpinner full />;

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-heading text-2xl font-bold text-gray-900">Appointments</h1>
          <p className="mt-1 text-sm text-gray-500">Manage patient appointment requests.</p>
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-lg border border-gray-200 px-4 py-2 text-sm focus:border-primary-500 focus:outline-none"
        >
          <option value="all">All Status</option>
          {statusOptions.map((s) => (
            <option key={s} value={s} className="capitalize">
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-sm">
        <table className="w-full min-w-[800px] text-left text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
              <th className="px-4 py-3">Patient</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Service</th>
              <th className="px-4 py-3">Doctor</th>
              <th className="px-4 py-3">Date & Time</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-gray-400">No appointments found.</td>
              </tr>
            ) : (
              filtered.map((a) => (
                <tr key={a.id} className="border-b border-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{a.patient_name}</td>
                  <td className="px-4 py-3 text-gray-600">
                    <div>{a.email}</div>
                    <div className="text-xs text-gray-400">{a.phone}</div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{a.service_title || '—'}</td>
                  <td className="px-4 py-3 text-gray-600">{a.doctor_name || '—'}</td>
                  <td className="px-4 py-3 text-gray-600">
                    <div>{a.appointment_date}</div>
                    <div className="text-xs text-gray-400">{a.appointment_time}</div>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={a.status}
                      onChange={(e) => handleStatusChange(a.id, e.target.value)}
                      className={`rounded-full border-0 px-2.5 py-1 text-xs font-semibold capitalize focus:outline-none focus:ring-2 focus:ring-primary-200 ${statusColors[a.status]}`}
                    >
                      {statusOptions.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleDelete(a.id)}
                      className="text-gray-400 transition-colors hover:text-red-600"
                      aria-label="Delete appointment"
                    >
                      <HiOutlineTrash size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAppointments;
