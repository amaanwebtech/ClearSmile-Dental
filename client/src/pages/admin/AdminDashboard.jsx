import { useEffect, useState } from 'react';
import { HiOutlineCalendar, HiOutlineClock, HiOutlineUserGroup, HiOutlineSparkles, HiOutlineChatAlt2 } from 'react-icons/hi';
import api from '../../api/axios';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const statusColors = {
  pending: 'bg-amber-100 text-amber-700',
  confirmed: 'bg-primary-100 text-primary-700',
  completed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/dashboard/stats')
      .then((res) => setData(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner full />;
  if (!data) return <p className="text-gray-500">Failed to load dashboard data.</p>;

  const cards = [
    { label: 'Total Appointments', value: data.stats.totalAppointments, icon: HiOutlineCalendar, color: 'bg-primary-50 text-primary-600' },
    { label: 'Pending Appointments', value: data.stats.pendingAppointments, icon: HiOutlineClock, color: 'bg-amber-50 text-amber-600' },
    { label: 'Active Doctors', value: data.stats.totalDoctors, icon: HiOutlineUserGroup, color: 'bg-blue-50 text-blue-600' },
    { label: 'Active Services', value: data.stats.totalServices, icon: HiOutlineSparkles, color: 'bg-purple-50 text-purple-600' },
    { label: 'Unread Messages', value: data.stats.unreadMessages, icon: HiOutlineChatAlt2, color: 'bg-rose-50 text-rose-600' },
  ];

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-gray-900">Dashboard</h1>
      <p className="mt-1 text-sm text-gray-500">Welcome back! Here's what's happening at your clinic.</p>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {cards.map((card) => (
          <div key={card.label} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${card.color}`}>
              <card.icon size={22} />
            </div>
            <p className="mt-4 text-2xl font-bold text-gray-900">{card.value}</p>
            <p className="mt-1 text-xs font-medium text-gray-500">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="font-heading text-lg font-semibold text-gray-900">Recent Appointments</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-xs uppercase tracking-wide text-gray-500">
                <th className="pb-3 pr-4">Patient</th>
                <th className="pb-3 pr-4">Service</th>
                <th className="pb-3 pr-4">Date</th>
                <th className="pb-3 pr-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.recentAppointments.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-gray-400">No appointments yet.</td>
                </tr>
              ) : (
                data.recentAppointments.map((a) => (
                  <tr key={a.id} className="border-b border-gray-50">
                    <td className="py-3 pr-4 font-medium text-gray-900">{a.patient_name}</td>
                    <td className="py-3 pr-4 text-gray-600">{a.service_title || '—'}</td>
                    <td className="py-3 pr-4 text-gray-600">{a.appointment_date}</td>
                    <td className="py-3 pr-4">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${statusColors[a.status]}`}>
                        {a.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
