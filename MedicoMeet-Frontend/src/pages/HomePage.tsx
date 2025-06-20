import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, CheckCircle, ArrowRight } from 'lucide-react';
import { getSpecializations, getDoctors } from '../services/api';
import { Specialization, Doctor } from '../types';
import SpecializationCard from '../components/SpecializationCard';
import DoctorCard from '../components/DoctorCard';
import TestimonialCard from '../components/TestimonialCard';

const HomePage = () => {
  const [specializations, setSpecializations] = useState<Specialization[]>([]);
  const [featuredDoctors, setFeaturedDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [specializationsData, doctorsData] = await Promise.all([
          getSpecializations(),
          getDoctors()
        ]);
        
        setSpecializations(specializationsData);
        // Get featured doctors (first 4)
        setFeaturedDoctors(doctorsData.slice(0, 4));
      } catch (error) {
        console.error('Error fetching home page data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Testimonial data
  const testimonials = [
    {
      id: '1',
      name: 'Jennifer Smith',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      text: 'MedicoMeet made finding the right specialist so easy! I got an appointment with a top cardiologist within 24 hours. The whole process was smooth and the reminder system is fantastic.',
      rating: 5,
    },
    {
      id: '2',
      name: 'David Rodriguez',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      text: 'As someone with a busy schedule, being able to book appointments online has been a game-changer. The interface is intuitive and I love that I can see doctor reviews before booking.',
      rating: 4,
    },
    {
      id: '3',
      name: 'Michelle Johnson',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      text: 'I was able to find a pediatrician for my son within minutes. The doctor profiles are detailed and helped me make an informed decision. Highly recommend this service!',
      rating: 5,
    },
  ];

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would navigate to the doctors page with the search query
    window.location.href = `/doctors?search=${searchQuery}`;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Find and Book the Best Doctors Near You
              </h1>
              <p className="text-lg mb-8 text-blue-100">
                Schedule appointments with top-rated doctors for in-person or virtual consultations with just a few clicks.
              </p>
              
              {/* Search Form */}
              <form onSubmit={handleSearch} className="bg-white p-2 rounded-full shadow-md flex items-center mb-8">
                <div className="relative flex-grow">
                  <Search size={20} className="absolute left-3 top-2.5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search doctors, specialties..."
                    className="w-full pl-10 pr-4 py-2 rounded-full focus:outline-none text-gray-800"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button 
                  type="submit" 
                  className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-200 flex items-center"
                >
                  <span className="hidden sm:inline mr-2">Search</span>
                  <ArrowRight size={16} />
                </button>
              </form>
              
              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <div className="bg-blue-400 bg-opacity-20 p-2 rounded-full mr-3">
                    <CheckCircle size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Verified Doctors</h3>
                    <p className="text-sm text-blue-100">All doctors are verified professionals</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-400 bg-opacity-20 p-2 rounded-full mr-3">
                    <Calendar size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Instant Booking</h3>
                    <p className="text-sm text-blue-100">Book appointments in seconds</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Hero Image */}
            <div className="hidden md:block">
              <img 
                src="https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Doctor with patient" 
                className="rounded-lg shadow-xl w-full object-cover h-[400px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Specializations Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Medical Specialties</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find the right specialist to address your health concerns from our wide range of medical specialties.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {specializations.map((specialization) => (
              <SpecializationCard key={specialization.id} specialization={specialization} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Doctors Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Featured Doctors</h2>
              <p className="text-gray-600">
                Book appointments with top-rated healthcare professionals
              </p>
            </div>
            <Link 
              to="/doctors" 
              className="btn-secondary flex items-center"
            >
              <span>View All</span>
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Book an appointment in just a few simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center slide-up">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={24} className="text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Find a Doctor</h3>
              <p className="text-gray-600">
                Search for specialists by name, specialty, location, or availability to find the right match for your needs.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar size={24} className="text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Book Appointment</h3>
              <p className="text-gray-600">
                Select a convenient date and time from the doctor's available slots and confirm your appointment.
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center slide-up" style={{ animationDelay: '0.4s' }}>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={24} className="text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Get Care</h3>
              <p className="text-gray-600">
                Receive a confirmation for your appointment and visit the doctor at the scheduled time for your consultation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Patients Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Read about the experiences of patients who have used our service to find and book appointments with doctors.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-blue-600 text-white">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Book Your Appointment?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied patients who found the right doctors for their healthcare needs.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/doctors" className="btn-primary bg-white text-blue-600 hover:bg-blue-50">
              Find a Doctor
            </Link>
            <Link to="/register" className="btn-secondary border-white text-white hover:bg-blue-700">
              Sign Up Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;