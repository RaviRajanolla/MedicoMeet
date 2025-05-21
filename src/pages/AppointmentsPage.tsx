import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserAppointments, getDoctorById, cancelAppointment } from '../services/api';
import { Appointment, Doctor } from '../types';
import { Calendar, Clock, User, MapPin, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const AppointmentsPage = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [doctorsMap, setDoctorsMap] = useState<Record<string, Doctor>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        
        // Fetch all user appointments
        const appointmentsData = await getUserAppointments(user.id);
        setAppointments(appointmentsData);
        
        // Fetch doctors data for all appointments
        const doctorIds = [...new Set(appointmentsData.map(a => a.doctorId))];
        const doctorsData: Record<string, Doctor> = {};
        
        for (const id of doctorIds) {
          const doctor = await getDoctorById(id);
          if (doctor) {
            doctorsData[id] = doctor;
          }
        }
        
        setDoctorsMap(doctorsData);
      } catch (err) {
        console.error('Error fetching appointments:', err);
        setError('Failed to load your appointments. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [user]);

  // Filter appointments by upcoming or past
  const filteredAppointments = appointments.filter(appointment => {
    const appointmentDate = new Date(`${appointment.appointmentDate}T${appointment.appointmentTime}`);
    const now = new Date();
    
    if (activeTab === 'upcoming') {
      return appointmentDate >= now && appointment.status !== 'cancelled';
    } else {
      return appointmentDate < now || appointment.status === 'cancelled';
    }
  });

  // Handle appointment cancellation
  const handleCancelAppointment = async (appointmentId: string) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) {
      return;
    }
    
    try {
      setCancellingId(appointmentId);
      const success = await cancelAppointment(appointmentId);
      
      if (success) {
        // Update the local state
        setAppointments(prevAppointments => 
          prevAppointments.map(apt => 
            apt.id === appointmentId ? { ...apt, status: 'cancelled' } : apt
          )
        );
      }
    } catch (err) {
      console.error('Error cancelling appointment:', err);
      setError('Failed to cancel appointment. Please try again later.');
    } finally {
      setCancellingId(null);
    }
  };

  // Get status badge component
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle size={12} className="mr-1" />
            Confirmed
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle size={12} className="mr-1" />
            Cancelled
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <AlertCircle size={12} className="mr-1" />
            Pending
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <CheckCircle size={12} className="mr-1" />
            Completed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Appointments</h1>
          <p className="text-gray-600">
            Manage and track all your healthcare appointments
          </p>
        </div>
        
        {/* Tabs */}
        <div className="mb-8 border-b">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`py-3 font-medium text-sm border-b-2 ${
                activeTab === 'upcoming'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Upcoming Appointments
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`py-3 font-medium text-sm border-b-2 ${
                activeTab === 'past'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Past Appointments
            </button>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6">
            {error}
          </div>
        ) : filteredAppointments.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-xl font-medium text-gray-800 mb-2">
              {activeTab === 'upcoming' ? 'No upcoming appointments' : 'No past appointments'}
            </p>
            <p className="text-gray-600 mb-6">
              {activeTab === 'upcoming'
                ? "You don't have any upcoming appointments scheduled. Book a consultation with a doctor."
                : "You don't have any past appointments yet."}
            </p>
            {activeTab === 'upcoming' && (
              <a
                href="/doctors"
                className="btn-primary inline-block"
              >
                Find a Doctor
              </a>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredAppointments.map(appointment => {
              const doctor = doctorsMap[appointment.doctorId];
              return (
                <div key={appointment.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row justify-between">
                      {/* Doctor Info */}
                      <div className="flex mb-4 md:mb-0">
                        <div className="w-16 h-16 rounded-full overflow-hidden mr-4 flex-shrink-0">
                          {doctor ? (
                            <img 
                              src={doctor.image} 
                              alt={doctor.name} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                              <User size={24} className="text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            {doctor ? doctor.name : 'Unknown Doctor'}
                          </h3>
                          <p className="text-blue-600 mb-1">
                            {doctor ? doctor.specialization.name : 'Specialist'}
                          </p>
                          <div className="mt-2">
                            {getStatusBadge(appointment.status)}
                          </div>
                        </div>
                      </div>
                      
                      {/* Appointment Details */}
                      <div className="flex flex-col items-start md:items-end">
                        <div className="flex items-center text-gray-600 mb-1">
                          <Calendar size={16} className="mr-2" />
                          <span>{formatDate(appointment.appointmentDate)}</span>
                        </div>
                        <div className="flex items-center text-gray-600 mb-1">
                          <Clock size={16} className="mr-2" />
                          <span>{appointment.appointmentTime}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <MapPin size={16} className="mr-2" />
                          <span>123 Medical Center, New York</span>
                        </div>
                      </div>
                    </div>
                    
                    {appointment.reason && (
                      <div className="mt-4 pt-4 border-t">
                        <h4 className="font-medium text-gray-800 mb-1">Reason for Visit</h4>
                        <p className="text-gray-600">{appointment.reason}</p>
                      </div>
                    )}
                    
                    {/* Actions */}
                    {activeTab === 'upcoming' && appointment.status === 'confirmed' && (
                      <div className="mt-6 flex justify-end space-x-4">
                        <button
                          onClick={() => handleCancelAppointment(appointment.id)}
                          disabled={cancellingId === appointment.id}
                          className={`btn-secondary text-sm ${
                            cancellingId === appointment.id ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                        >
                          {cancellingId === appointment.id ? 'Cancelling...' : 'Cancel Appointment'}
                        </button>
                        <a
                          href={`/doctors/${appointment.doctorId}`}
                          className="btn-primary text-sm"
                        >
                          View Doctor
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentsPage;