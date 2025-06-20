import { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Calendar, FileText, Settings, LogOut, Menu, 
  X, ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import AdminOverview from './AdminOverview';
import AdminDoctors from './AdminDoctors';
import AdminAppointments from './AdminAppointments';
import AdminPatients from './AdminPatients';
import AdminSettings from './AdminSettings';

const AdminDashboardPage = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // Close sidebar on route change (mobile)
    setIsSidebarOpen(false);
  }, [location.pathname]);

  // Determine active route
  const isRouteActive = (path: string) => {
    if (path === '/admin' && location.pathname === '/admin') {
      return true;
    }
    if (path !== '/admin' && location.pathname.startsWith(path)) {
      return true;
    }
    return false;
  };

  // Handle logout
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      logout();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden bg-white p-4 shadow-sm fixed top-16 left-0 right-0 z-10">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="flex items-center text-gray-600"
        >
          {isSidebarOpen ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
          <span className="ml-2 font-medium">Admin Dashboard</span>
        </button>
      </div>

      <div className="flex pt-16 md:pt-16">
        {/* Sidebar */}
        <aside 
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-md transform transition-transform duration-300 ease-in-out pt-16 md:translate-x-0 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="p-4 border-b">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
              <div className="ml-3">
                <p className="font-medium text-gray-800">{user?.name}</p>
                <p className="text-sm text-gray-500">Administrator</p>
              </div>
            </div>
          </div>
          
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <Link
                  to="/admin"
                  className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                    isRouteActive('/admin') && location.pathname === '/admin'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <LayoutDashboard size={20} className="mr-3" />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/doctors"
                  className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                    isRouteActive('/admin/doctors')
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Users size={20} className="mr-3" />
                  <span>Doctors</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/appointments"
                  className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                    isRouteActive('/admin/appointments')
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Calendar size={20} className="mr-3" />
                  <span>Appointments</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/patients"
                  className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                    isRouteActive('/admin/patients')
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <FileText size={20} className="mr-3" />
                  <span>Patients</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/settings"
                  className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                    isRouteActive('/admin/settings')
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Settings size={20} className="mr-3" />
                  <span>Settings</span>
                </Link>
              </li>
            </ul>
            
            <div className="border-t mt-6 pt-4">
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-3 text-red-600 rounded-md hover:bg-red-50 w-full"
              >
                <LogOut size={20} className="mr-3" />
                <span>Logout</span>
              </button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className={`flex-1 p-4 pt-24 md:pt-20 md:ml-64`}>
          <div className="mb-6">
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <Link to="/" className="hover:text-blue-600">Home</Link>
              <ChevronRight size={14} className="mx-1" />
              <Link to="/admin" className="hover:text-blue-600">Admin</Link>
              {location.pathname !== '/admin' && (
                <>
                  <ChevronRight size={14} className="mx-1" />
                  <span className="text-gray-900">
                    {location.pathname.split('/').pop()?.charAt(0).toUpperCase() + location.pathname.split('/').pop()?.slice(1)}
                  </span>
                </>
              )}
            </div>
          </div>
          
          <Routes>
            <Route index element={<AdminOverview />} />
            <Route path="doctors" element={<AdminDoctors />} />
            <Route path="appointments" element={<AdminAppointments />} />
            <Route path="patients" element={<AdminPatients />} />
            <Route path="settings" element={<AdminSettings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardPage;