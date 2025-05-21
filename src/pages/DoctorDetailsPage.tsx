import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { 
  Clock, Calendar, Star, MapPin, Phone, Mail, Languages, Award, 
  CheckCircle, X, ArrowLeft 
} from 'lucide-react';
import { getDoctorById } from '../services/api';
import { Doctor } from '../types';
import AppointmentForm from '../components/AppointmentForm';
import { useAuth } from '../context/AuthContext';

const DoctorDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [showBooking, setShowBooking] = useState(searchParams.get('action') === 'book');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  // Fetch doctor data
  useEffect(() => {
    const fetchDoctor = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const doctorData = await getDoctorById(id);
        setDoctor(doctorData);
      } catch (error) {
        console.error('Error fetching doctor:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);

  // Generate available dates (next 14 days)
  const getAvailableDates = () => {
    if (!doctor) return [];
    
    const dates = [];
    const today = new Date();
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const dayName = dayNames[date.getDay()];
      const isAvailable = doctor.availableDays.includes(dayName);
      
      dates.push({
        date: date.toISOString().split('T')[0],
        dayName,
        isAvailable,
      });
    }
    
    return dates;
  };

  // Handle back button click
  const handleBack = () => {
    navigate(-1);
  };

  // Handle book appointment button click
  const handleBookAppointment = () => {
    if (!isAuthenticated) {
      navigate('/login?redirect=doctors/' + id + '?action=book');
      return;
    }
    
    setShowBooking(true);
  };

  // Handle booking form close
  const handleCloseBooking = () => {
    setShowBooking(false);
    setSelectedDate(null);
    setSelectedTimeSlot(null);
  };

  // Handle date selection
  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedTimeSlot(null);
  };

  // Handle time slot selection
  const handleTimeSlotSelect = (timeSlot: string) => {
    setSelectedTimeSlot(timeSlot);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Doctor Not Found</h2>
        <p className="mb-6">The doctor you're looking for doesn't exist or has been removed.</p>
        <button 
          onClick={handleBack}
          className="btn-primary"
        >
          Go Back
        </button>
      </div>
    );
  }

  const availableDates = getAvailableDates();

  return (
    <div className="pt-20 pb-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <button 
          onClick={handleBack}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Doctors
        </button>
        
        {/* Doctor Profile Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          {/* Header */}
          <div className="relative">
            <div className="h-40 bg-gradient-to-r from-blue-500 to-blue-600"></div>
            <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 px-8 flex justify-between items-end">
              <div className="flex items-end">
                <img 
                  src={doctor.image} 
                  alt={doctor.name} 
                  className="w-32 h-32 rounded-full border-4 border-white object-cover"
                />
                <div className="ml-6 pb-4">
                  <h1 className="text-xl md:text-2xl font-bold text-gray-800">{doctor.name}</h1>
                  <p className="text-blue-500">{doctor.specialization.name}</p>
                </div>
              </div>
              <div className="hidden md:flex items-center bg-white rounded-full px-4 py-2 shadow-sm mb-4">
                <Star size={18} className="text-yellow-400 fill-yellow-400 mr-1" />
                <span className="font-medium">{doctor.rating}</span>
                <span className="text-gray-500 ml-1">({doctor.reviewCount} reviews)</span>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="mt-20 p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Doctor Info */}
              <div className="md:col-span-2">
                <div className="flex md:hidden items-center mb-4">
                  <Star size={18} className="text-yellow-400 fill-yellow-400 mr-1" />
                  <span className="font-medium">{doctor.rating}</span>
                  <span className="text-gray-500 ml-1">({doctor.reviewCount} reviews)</span>
                </div>
                
                <h2 className="text-xl font-semibold mb-4">About Doctor</h2>
                <p className="text-gray-600 mb-6">{doctor.bio}</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <div className="flex items-start">
                    <Award size={20} className="text-blue-500 mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium text-gray-800">Education</h3>
                      <p className="text-gray-600">{doctor.education}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle size={20} className="text-blue-500 mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium text-gray-800">Experience</h3>
                      <p className="text-gray-600">{doctor.experience}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Languages size={20} className="text-blue-500 mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium text-gray-800">Languages</h3>
                      <p className="text-gray-600">{doctor.languages.join(', ')}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin size={20} className="text-blue-500 mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium text-gray-800">Location</h3>
                      <p className="text-gray-600">123 Medical Center, New York</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone size={20} className="text-blue-500 mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium text-gray-800">Phone</h3>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Mail size={20} className="text-blue-500 mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium text-gray-800">Email</h3>
                      <p className="text-gray-600">{doctor.name.toLowerCase().replace(' ', '.')}@medicomeet.com</p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Availability</h2>
                  <div className="flex flex-wrap gap-2">
                    {doctor.availableDays.map(day => (
                      <span key={day} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                        {day}s
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-4">Working Hours</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {doctor.availableDays.map(day => (
                      <div key={day} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                        <span className="font-medium">{day}</span>
                        <span className="text-gray-600">9:00 AM - 5:00 PM</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Booking Card */}
              <div>
                <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                  <h3 className="font-semibold text-lg mb-4">Book an Appointment</h3>
                  
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Consultation Fee</span>
                      <span className="text-blue-600 font-semibold">${doctor.consultationFee}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Available Slots</span>
                      <div className="flex items-center text-green-600">
                        <Clock size={16} className="mr-1" />
                        <span>{doctor.availableTimeSlots.length} time slots</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between bg-blue-50 p-3 rounded-md mb-6">
                    <div className="flex items-center">
                      <Calendar size={18} className="text-blue-500 mr-2" />
                      <span className="text-blue-800 font-medium">Next Available</span>
                    </div>
                    <span className="text-blue-800">Tomorrow, 9:00 AM</span>
                  </div>
                  
                  <button
                    onClick={handleBookAppointment}
                    className="btn-primary w-full"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Booking Modal */}
      {showBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-90vh overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold">Book an Appointment</h2>
              <button 
                onClick={handleCloseBooking}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Calendar and Time Selection */}
                <div>
                  <h3 className="font-medium text-lg mb-4">Select Date & Time</h3>
                  
                  {/* Date Selection */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Available Dates</h4>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {availableDates.map(dateObj => (
                        <button
                          key={dateObj.date}
                          onClick={() => dateObj.isAvailable && handleDateSelect(dateObj.date)}
                          disabled={!dateObj.isAvailable}
                          className={`p-2 rounded-md text-center ${
                            dateObj.isAvailable 
                              ? selectedDate === dateObj.date
                                ? 'bg-blue-500 text-white'
                                : 'bg-white border hover:border-blue-500'
                              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          <div className="text-xs">{dateObj.dayName.slice(0, 3)}</div>
                          <div className="font-medium">{new Date(dateObj.date).getDate()}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Time Selection */}
                  {selectedDate && (
                    <div>
                      <h4 className="font-medium mb-3">Available Time Slots</h4>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {doctor.availableTimeSlots.map(timeSlot => (
                          <button
                            key={timeSlot}
                            onClick={() => handleTimeSlotSelect(timeSlot)}
                            className={`p-2 rounded-md text-center border ${
                              selectedTimeSlot === timeSlot
                                ? 'bg-blue-500 text-white border-blue-500'
                                : 'hover:border-blue-500'
                            }`}
                          >
                            {timeSlot}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Appointment Form */}
                <div>
                  <AppointmentForm 
                    doctor={doctor}
                    selectedDate={selectedDate}
                    selectedTime={selectedTimeSlot}
                    onClose={handleCloseBooking}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorDetailsPage;