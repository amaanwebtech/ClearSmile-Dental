import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  HiOutlineViewGrid,
  HiOutlineCalendar,
  HiOutlineUserGroup,
  HiOutlineSparkles,
  HiOutlineChatAlt2,
  HiOutlineStar,
  HiOutlineLogout,
  HiMenu,
  HiX,
} from 'react-icons/hi';
import { FaTooth } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: HiOutlineViewGrid },
  { to: '/admin/appointments', label: 'Appointments', icon: HiOutlineCalendar },
  { to: '/admin/doctors', label: 'Doctors', icon: HiOutlineUserGroup },
  { to: '/admin/services', label: 'Services', icon: HiOutlineSparkles },
  { to: '/admin/testimonials', label: 'Testimonials', icon: HiOutlineStar },
  { to: '/admin/messages', label: 'Messages', icon: HiOutlineChatAlt2 },
];

const AdminLayout = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const SidebarContent = (
    <>
      <div className="flex items-center gap-2 px-6 py-5">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600 text-white">
          <FaTooth size={16} />
        </span>
        <span className="font-heading text-base font-bold text-white">ClearSmile Admin</span>
      </div>

      <nav className="mt-4 flex flex-1 flex-col gap-1 px-3">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive ? 'bg-primary-600 text-white' : 'text-primary-200 hover:bg-primary-900'
              }`
            }
          >
            <item.icon size={18} /> {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-primary-900 p-4">
        <p className="px-2 text-xs text-primary-300">Logged in as</p>
        <p className="px-2 text-sm font-semibold text-white">{admin?.name}</p>
        <button
          onClick={handleLogout}
          className="mt-3 flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-primary-200 transition-colors hover:bg-primary-900"
        >
          <HiOutlineLogout size={18} /> Logout
        </button>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="hidden w-64 flex-col bg-primary-950 lg:flex">{SidebarContent}</aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="flex w-64 flex-col bg-primary-950">{SidebarContent}</div>
          <div className="flex-1 bg-black/40" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 lg:hidden">
          <span className="font-heading text-lg font-bold text-primary-900">ClearSmile Admin</span>
          <button onClick={() => setSidebarOpen(true)} className="text-2xl text-primary-800">
            {sidebarOpen ? <HiX /> : <HiMenu />}
          </button>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
