import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, Calendar, Clock, Activity, ArrowUp, ArrowDown,
  ArrowRight, CheckCircle, XCircle, AlertCircle, TrendingUp,
  DollarSign, UserCheck
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

  // Calculate real-time statistics
  const totalDoctors = doctors.length;
  const totalAppointments = appointments.length;
  const confirmedAppointments = appointments.filter(a => a.status === 'confirmed').length;
  const cancelledAppointments = appointments.filter(a => a.status === 'cancelled').length;
  const pendingAppointments = appointments.filter(a => a.status === 'pending').length;
  const completedAppointments = appointments.filter(a => a.status === 'completed').length;
  
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

  // Calculate revenue (mock calculation)
  const totalRevenue = appointments
    .filter(a => a.status === 'completed')
    .reduce((sum, appointment) => {
      const doctor = doctors.find(d => d.id === appointment.doctorId);
      return sum + (doctor?.consultationFee || 0);
    }, 0);

  // Calculate average rating
  const averageRating = doctors.length > 0 
    ? (doctors.reduce((sum, doctor) => sum + doctor.rating, 0) / doctors.length).toFixed(1)
    : '0.0';

  // Get top performing doctors
  const topDoctors = doctors
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>
      
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
              <p className="text-sm text-gray-500 mb-1">Revenue</p>
              <h3 className="text-2xl font-bold text-gray-800">${totalRevenue.toLocaleString()}</h3>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <DollarSign size={20} className="text-orange-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowUp size={14} className="text-green-500 mr-1" />
            <span className="text-green-500 font-medium">15%</span>
            <span className="text-gray-500 ml-1">from last month</span>
          </div>
        </div>
      </div>

      {/* Additional Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 mb-1">Confirmed</p>
              <h3 className="text-2xl font-bold text-green-600">{confirmedAppointments}</h3>
            </div>
            <CheckCircle size={24} className="text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 mb-1">Pending</p>
              <h3 className="text-2xl font-bold text-yellow-600">{pendingAppointments}</h3>
            </div>
            <AlertCircle size={24} className="text-yellow-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 mb-1">Completed</p>
              <h3 className="text-2xl font-bold text-blue-600">{completedAppointments}</h3>
            </div>
            <UserCheck size={24} className="text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 mb-1">Average Rating</p>
              <h3 className="text-2xl font-bold text-purple-600">{averageRating}</h3>
            </div>
            <TrendingUp size={24} className="text-purple-500" />
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
        
        {/* Top Performing Doctors */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-800">Top Performing Doctors</h2>
            <Link to="/admin/doctors" className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
              View All
              <ArrowRight size={14} className="ml-1" />
            </Link>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {topDoctors.map((doctor, index) => (
                <div key={doctor.id} className="flex items-center p-3 hover:bg-gray-50 rounded-md">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-semibold text-sm">#{index + 1}</span>
                  </div>
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                    <img 
                      src={doctor.image} 
                      alt={doctor.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-medium text-gray-800">{doctor.name}</h4>
                    <p className="text-gray-500 text-sm">{doctor.specialization.name}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center">
                      <span className="text-yellow-400 mr-1">★</span>
                      <span className="font-medium">{doctor.rating}</span>
                    </div>
                    <p className="text-sm text-gray-500">({doctor.reviewCount} reviews)</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;