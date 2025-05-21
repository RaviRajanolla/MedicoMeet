import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, Calendar, Clock, Activity, ArrowUp, ArrowDown,
  ArrowRight, CheckCircle, XCircle, AlertCircle
} from 'lucide-react';
import { getDoctors, getAllAppointments } from '../../services/api';
import { Doctor, Appointment } from '../../types';

const AdminOverview = () => {
  const [loading, setLoading] = useState(true);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [doctorsData, appointmentsData] = await Promise.all([
          getDoctors(),
          getAllAppointments()
        ]);
        
        setDoctors(doctorsData);
        setAppointments(appointmentsData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate statistics
  const totalDoctors = doctors.length;
  const totalAppointments = appointments.length;
  const confirmedAppointments = appointments.filter(a => a.status === 'confirmed').length;
  const cancelledAppointments = appointments.filter(a => a.status === 'cancelled').length;
  
  // Calculate today's appointments
  const today = new Date().toISOString().split('T')[0];
  const todayAppointments = appointments.filter(a => a.appointmentDate === today);
  
  // Calculate upcoming appointments (next 7 days)
  const next7Days = new Date();
  next7Days.setDate(next7Days.getDate() + 7);
  const upcomingAppointments = appointments.filter(a => {
    const appointmentDate = new Date(a.appointmentDate);
    const now = new Date();
    return appointmentDate >= now && appointmentDate <= next7Days && a.status === 'confirmed';
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Doctors</p>
              <h3 className="text-2xl font-bold text-gray-800">{totalDoctors}</h3>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Users size={20} className="text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowUp size={14} className="text-green-500 mr-1" />
            <span className="text-green-500 font-medium">12%</span>
            <span className="text-gray-500 ml-1">from last month</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Appointments</p>
              <h3 className="text-2xl font-bold text-gray-800">{totalAppointments}</h3>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Calendar size={20} className="text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowUp size={14} className="text-green-500 mr-1" />
            <span className="text-green-500 font-medium">8%</span>
            <span className="text-gray-500 ml-1">from last month</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 mb-1">Today's Appointments</p>
              <h3 className="text-2xl font-bold text-gray-800">{todayAppointments.length}</h3>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Clock size={20} className="text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowDown size={14} className="text-red-500 mr-1" />
            <span className="text-red-500 font-medium">3%</span>
            <span className="text-gray-500 ml-1">from yesterday</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 mb-1">Cancellation Rate</p>
              <h3 className="text-2xl font-bold text-gray-800">
                {totalAppointments ? Math.round((cancelledAppointments / totalAppointments) * 100) : 0}%
              </h3>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <Activity size={20} className="text-orange-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowDown size={14} className="text-green-500 mr-1" />
            <span className="text-green-500 font-medium">2%</span>
            <span className="text-gray-500 ml-1">from last month</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Appointments */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-800">Upcoming Appointments</h2>
            <Link to="/admin/appointments" className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
              View All
              <ArrowRight size={14} className="ml-1" />
            </Link>
          </div>
          
          <div className="p-6">
            {upcomingAppointments.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No upcoming appointments</p>
            ) : (
              <div className="space-y-4">
                {upcomingAppointments.slice(0, 5).map(appointment => {
                  const doctor = doctors.find(d => d.id === appointment.doctorId);
                  
                  // Format date
                  const appointmentDate = new Date(appointment.appointmentDate);
                  const formattedDate = appointmentDate.toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric'
                  });
                  
                  return (
                    <div key={appointment.id} className="flex items-center p-3 hover:bg-gray-50 rounded-md">
                      <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                        {doctor ? (
                          <img 
                            src={doctor.image} 
                            alt={doctor.name} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <Users size={16} className="text-gray-500" />
                          </div>
                        )}
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-medium text-gray-800">
                          {appointment.patientName}
                        </h4>
                        <p className="text-gray-500 text-sm">
                          with {doctor ? doctor.name : 'Unknown Doctor'}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{formattedDate}</p>
                        <p className="text-sm text-gray-500">{appointment.appointmentTime}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        
        {/* Recent Appointments Status */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-800">Recent Appointment Status</h2>
            <Link to="/admin/appointments" className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
              View All
              <ArrowRight size={14} className="ml-1" />
            </Link>
          </div>
          
          <div className="p-6">
            {appointments.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No appointments found</p>
            ) : (
              <div className="space-y-4">
                {appointments.slice(0, 5).map(appointment => {
                  const statusIcon = () => {
                    switch (appointment.status) {
                      case 'confirmed':
                        return <CheckCircle size={16} className="text-green-500" />;
                      case 'cancelled':
                        return <XCircle size={16} className="text-red-500" />;
                      case 'pending':
                        return <AlertCircle size={16} className="text-yellow-500" />;
                      default:
                        return null;
                    }
                  };
                  
                  const statusClass = () => {
                    switch (appointment.status) {
                      case 'confirmed':
                        return 'text-green-600 bg-green-50';
                      case 'cancelled':
                        return 'text-red-600 bg-red-50';
                      case 'pending':
                        return 'text-yellow-600 bg-yellow-50';
                      default:
                        return 'text-gray-600 bg-gray-50';
                    }
                  };
                  
                  // Format date
                  const createdDate = new Date(appointment.createdAt);
                  const formattedDate = createdDate.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                  });
                  const formattedTime = createdDate.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                  });
                  
                  return (
                    <div key={appointment.id} className="flex items-center p-3 hover:bg-gray-50 rounded-md">
                      <div className="flex-grow">
                        <h4 className="font-medium text-gray-800">
                          {appointment.patientName}
                        </h4>
                        <p className="text-gray-500 text-sm">
                          {formattedDate} at {appointment.appointmentTime}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClass()}`}>
                          {statusIcon()}
                          <span className="ml-1 capitalize">{appointment.status}</span>
                        </span>
                        <p className="text-xs text-gray-500 mt-1">Created {formattedTime}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;