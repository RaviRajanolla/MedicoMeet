import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Doctor } from '../types';
import { bookAppointment } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { CheckCircle } from 'lucide-react';

interface AppointmentFormProps {
  doctor: Doctor;
  selectedDate: string | null;
  selectedTime: string | null;
  onClose: () => void;
}

const AppointmentForm = ({ doctor, selectedDate, selectedTime, onClose }: AppointmentFormProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    patientName: user?.name || '',
    patientEmail: user?.email || '',
    patientPhone: '',
    reason: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime || !user) {
      setError('Please select a date and time for your appointment.');
      return;
    }
    
    // Validate form
    if (!formData.patientName || !formData.patientEmail || !formData.patientPhone) {
      setError('Please fill in all required fields.');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      await bookAppointment({
        doctorId: doctor.id,
        userId: user.id,
        patientName: formData.patientName,
        patientEmail: formData.patientEmail,
        patientPhone: formData.patientPhone,
        appointmentDate: selectedDate,
        appointmentTime: selectedTime,
        reason: formData.reason,
      });
      
      setSuccess(true);
      
      // Redirect to appointments page after a delay
      setTimeout(() => {
        onClose();
        navigate('/appointments');
      }, 2000);
      
    } catch (err) {
      console.error('Error booking appointment:', err);
      setError('Failed to book appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Show success message if booking is successful
  if (success) {
    return (
      <div className="text-center py-8">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle size={32} className="text-green-500" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Appointment Booked!</h3>
        <p className="text-gray-600 mb-6">
          Your appointment with {doctor.name} on {selectedDate} at {selectedTime} has been confirmed.
        </p>
        <p className="text-sm text-gray-500">Redirecting to your appointments...</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="font-medium text-lg mb-4">Patient Information</h3>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="patientName">
            Full Name *
          </label>
          <input
            type="text"
            id="patientName"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="patientEmail">
            Email Address *
          </label>
          <input
            type="email"
            id="patientEmail"
            name="patientEmail"
            value={formData.patientEmail}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="patientPhone">
            Phone Number *
          </label>
          <input
            type="tel"
            id="patientPhone"
            name="patientPhone"
            value={formData.patientPhone}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="reason">
            Reason for Visit
          </label>
          <textarea
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            className="input-field resize-none h-24"
            placeholder="Please briefly describe your symptoms or reason for consultation"
          />
        </div>
        
        <div className="border-t pt-4 mb-4">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Consultation Fee</span>
            <span className="font-semibold">${doctor.consultationFee}</span>
          </div>
          {selectedDate && selectedTime && (
            <div className="bg-blue-50 p-3 rounded-md text-sm text-blue-800 mb-4">
              You're booking an appointment with <span className="font-medium">{doctor.name}</span> on <span className="font-medium">{new Date(selectedDate).toLocaleDateString()}</span> at <span className="font-medium">{selectedTime}</span>
            </div>
          )}
        </div>
        
        <button
          type="submit"
          disabled={loading || !selectedDate || !selectedTime}
          className={`btn-primary w-full ${
            (loading || !selectedDate || !selectedTime) ? 'opacity-60 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Booking...' : 'Confirm Appointment'}
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;