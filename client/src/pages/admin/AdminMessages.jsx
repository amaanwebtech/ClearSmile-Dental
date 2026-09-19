import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { HiOutlineTrash, HiOutlineMail, HiOutlineMailOpen } from 'react-icons/hi';
import api from '../../api/axios';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = () => {
    setLoading(true);
    api
      .get('/contact')
      .then((res) => setMessages(res.data.messages))
      .catch(() => toast.error('Failed to load messages'))
      .finally(() => setLoading(false));
  };

  useEffect(fetchMessages, []);

  const handleMarkRead = async (id) => {
    try {
      await api.put(`/contact/${id}/read`);
      setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, is_read: true } : m)));
    } catch {
      toast.error('Failed to mark as read');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await api.delete(`/contact/${id}`);
      setMessages((prev) => prev.filter((m) => m.id !== id));
      toast.success('Message deleted');
    } catch {
      toast.error('Failed to delete message');
    }
  };

  if (loading) return <LoadingSpinner full />;

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-gray-900">Messages</h1>
      <p className="mt-1 text-sm text-gray-500">Messages submitted through the contact form.</p>

      <div className="mt-6 space-y-3">
        {messages.length === 0 ? (
          <p className="rounded-2xl border border-gray-100 bg-white p-8 text-center text-gray-400">No messages yet.</p>
        ) : (
          messages.map((m) => (
            <div
              key={m.id}
              className={`rounded-2xl border p-5 shadow-sm ${m.is_read ? 'border-gray-100 bg-white' : 'border-primary-200 bg-primary-50/40'}`}
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-heading font-semibold text-gray-900">{m.subject || 'No Subject'}</p>
                  <p className="text-xs text-gray-500">
                    {m.name} &middot; {m.email} {m.phone && `· ${m.phone}`}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400">{new Date(m.created_at).toLocaleString()}</span>
                  {!m.is_read && (
                    <button onClick={() => handleMarkRead(m.id)} className="text-gray-400 hover:text-primary-600" title="Mark as read">
                      <HiOutlineMail size={18} />
                    </button>
                  )}
                  {m.is_read && <HiOutlineMailOpen className="text-primary-400" size={18} />}
                  <button onClick={() => handleDelete(m.id)} className="text-gray-400 hover:text-red-600" title="Delete">
                    <HiOutlineTrash size={18} />
                  </button>
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-700">{m.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminMessages;
