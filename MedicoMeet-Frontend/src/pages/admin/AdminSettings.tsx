import { useState } from 'react';
import { Save, RefreshCw } from 'lucide-react';

const AdminSettings = () => {
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'MedicoMeet',
    siteEmail: 'admin@medicomeet.com',
    contactPhone: '+1 (555) 123-4567',
    address: '123 Healthcare Avenue, Medical District, NY 10001',
  });
  
  const [appointmentSettings, setAppointmentSettings] = useState({
    appointmentDuration: '30',
    minAdvanceBooking: '1',
    maxAdvanceBooking: '30',
    startTime: '09:00',
    endTime: '17:00',
    weekendOperations: true,
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    reminderHours: '24',
    adminNotifications: true,
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Handle general settings change
  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setGeneralSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle appointment settings change
  const handleAppointmentChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setAppointmentSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  // Handle notification settings change
  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setNotificationSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  // Save settings
  const saveSettings = async () => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">System Settings</h1>
      
      {success && (
        <div className="bg-green-50 text-green-800 p-4 rounded-md mb-6 flex items-center">
          <span className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 bg-green-100 rounded-full mr-3">
            <svg 
              className="w-4 h-4 text-green-500" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path 
                fillRule="evenodd" 
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                clipRule="evenodd"
              />
            </svg>
          </span>
          Settings saved successfully!
        </div>
      )}
      
      <div className="grid grid-cols-1 gap-8">
        {/* General Settings */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-800">General Settings</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="siteName">
                  Site Name
                </label>
                <input
                  type="text"
                  id="siteName"
                  name="siteName"
                  value={generalSettings.siteName}
                  onChange={handleGeneralChange}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="siteEmail">
                  Admin Email
                </label>
                <input
                  type="email"
                  id="siteEmail"
                  name="siteEmail"
                  value={generalSettings.siteEmail}
                  onChange={handleGeneralChange}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="contactPhone">
                  Contact Phone
                </label>
                <input
                  type="text"
                  id="contactPhone"
                  name="contactPhone"
                  value={generalSettings.contactPhone}
                  onChange={handleGeneralChange}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="address">
                  Office Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  rows={2}
                  value={generalSettings.address}
                  onChange={handleGeneralChange}
                  className="input-field"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Appointment Settings */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-800">Appointment Settings</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="appointmentDuration">
                  Default Appointment Duration (minutes)
                </label>
                <select
                  id="appointmentDuration"
                  name="appointmentDuration"
                  value={appointmentSettings.appointmentDuration}
                  onChange={handleAppointmentChange}
                  className="input-field"
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">60 minutes</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="minAdvanceBooking">
                  Minimum Days for Advance Booking
                </label>
                <input
                  type="number"
                  id="minAdvanceBooking"
                  name="minAdvanceBooking"
                  value={appointmentSettings.minAdvanceBooking}
                  onChange={handleAppointmentChange}
                  min="0"
                  max="30"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="maxAdvanceBooking">
                  Maximum Days for Advance Booking
                </label>
                <input
                  type="number"
                  id="maxAdvanceBooking"
                  name="maxAdvanceBooking"
                  value={appointmentSettings.maxAdvanceBooking}
                  onChange={handleAppointmentChange}
                  min="1"
                  max="90"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Operating Hours
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1" htmlFor="startTime">
                      Start Time
                    </label>
                    <input
                      type="time"
                      id="startTime"
                      name="startTime"
                      value={appointmentSettings.startTime}
                      onChange={handleAppointmentChange}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1" htmlFor="endTime">
                      End Time
                    </label>
                    <input
                      type="time"
                      id="endTime"
                      name="endTime"
                      value={appointmentSettings.endTime}
                      onChange={handleAppointmentChange}
                      className="input-field"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="weekendOperations"
                  name="weekendOperations"
                  checked={appointmentSettings.weekendOperations}
                  onChange={handleAppointmentChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700" htmlFor="weekendOperations">
                  Allow weekend appointments
                </label>
              </div>
            </div>
          </div>
        </div>
        
        {/* Notification Settings */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-800">Notification Settings</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="emailNotifications"
                  name="emailNotifications"
                  checked={notificationSettings.emailNotifications}
                  onChange={handleNotificationChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700" htmlFor="emailNotifications">
                  Send email notifications to patients
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="smsNotifications"
                  name="smsNotifications"
                  checked={notificationSettings.smsNotifications}
                  onChange={handleNotificationChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700" htmlFor="smsNotifications">
                  Send SMS notifications to patients
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="reminderHours">
                  Send Appointment Reminders (hours before)
                </label>
                <select
                  id="reminderHours"
                  name="reminderHours"
                  value={notificationSettings.reminderHours}
                  onChange={handleNotificationChange}
                  className="input-field"
                >
                  <option value="2">2 hours</option>
                  <option value="6">6 hours</option>
                  <option value="12">12 hours</option>
                  <option value="24">24 hours</option>
                  <option value="48">48 hours</option>
                </select>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="adminNotifications"
                  name="adminNotifications"
                  checked={notificationSettings.adminNotifications}
                  onChange={handleNotificationChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700" htmlFor="adminNotifications">
                  Notify admin on new appointments
                </label>
              </div>
            </div>
          </div>
        </div>
        
        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={saveSettings}
            disabled={loading}
            className={`btn-primary flex items-center ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <>
                <RefreshCw size={18} className="mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save size={18} className="mr-2" />
                Save Settings
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;