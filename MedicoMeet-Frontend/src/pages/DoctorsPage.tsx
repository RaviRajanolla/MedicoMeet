import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, X } from 'lucide-react';
import { getDoctors, getSpecializations } from '../services/api';
import { Doctor, Specialization } from '../types';
import DoctorCard from '../components/DoctorCard';

const DoctorsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [specializations, setSpecializations] = useState<Specialization[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>(searchParams.get('specialty') || '');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [doctorsData, specializationsData] = await Promise.all([
          getDoctors(),
          getSpecializations()
        ]);
        
        setDoctors(doctorsData);
        setSpecializations(specializationsData);
      } catch (error) {
        console.error('Error fetching doctors data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter doctors based on search query and selected specialty
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = searchQuery === '' || 
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      doctor.specialization.name.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesSpecialty = selectedSpecialty === '' || doctor.specialization.id === selectedSpecialty;
    
    return matchesSearch && matchesSpecialty;
  });

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchQuery) {
      searchParams.set('search', searchQuery);
    } else {
      searchParams.delete('search');
    }
    
    setSearchParams(searchParams);
  };

  // Handle specialty filter change
  const handleSpecialtyChange = (specialtyId: string) => {
    setSelectedSpecialty(specialtyId);
    
    if (specialtyId) {
      searchParams.set('specialty', specialtyId);
    } else {
      searchParams.delete('specialty');
    }
    
    setSearchParams(searchParams);
    
    // Close filter sidebar on mobile after selection
    if (window.innerWidth < 768) {
      setIsFilterOpen(false);
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedSpecialty('');
    setSearchParams({});
  };

  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Find Doctors</h1>
          <p className="text-gray-600">
            Browse our network of qualified healthcare professionals and book your appointment
          </p>
        </div>
        
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search size={20} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search doctors, specialties..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button 
              type="submit" 
              className="btn-primary"
            >
              Search
            </button>
            <button 
              type="button"
              className="md:hidden btn-secondary flex items-center justify-center"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter size={18} className="mr-2" />
              Filters
            </button>
          </form>
          
          {/* Mobile Filters Sidebar */}
          <div 
            className={`fixed inset-0 bg-gray-800 bg-opacity-75 z-50 md:hidden transition-opacity duration-300 ${
              isFilterOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onClick={() => setIsFilterOpen(false)}
          >
            <div 
              className={`absolute right-0 top-0 h-full w-3/4 max-w-sm bg-white p-6 overflow-y-auto transition-transform duration-300 ${
                isFilterOpen ? 'translate-x-0' : 'translate-x-full'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Filters</h3>
                <button 
                  onClick={() => setIsFilterOpen(false)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="mb-6">
                <h4 className="font-medium mb-3">Specialization</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="specialty"
                      value=""
                      checked={selectedSpecialty === ''}
                      onChange={() => handleSpecialtyChange('')}
                      className="mr-2"
                    />
                    <span>All Specialties</span>
                  </label>
                  {specializations.map(specialty => (
                    <label key={specialty.id} className="flex items-center">
                      <input
                        type="radio"
                        name="specialty"
                        value={specialty.id}
                        checked={selectedSpecialty === specialty.id}
                        onChange={() => handleSpecialtyChange(specialty.id)}
                        className="mr-2"
                      />
                      <span>{specialty.name}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <button
                onClick={clearFilters}
                className="btn-secondary w-full"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden md:block w-64 bg-white rounded-lg shadow-md p-6 h-fit">
            <h3 className="text-lg font-semibold mb-4">Filters</h3>
            
            <div className="mb-6">
              <h4 className="font-medium mb-3">Specialization</h4>
              <div className="space-y-2">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="specialty"
                    value=""
                    checked={selectedSpecialty === ''}
                    onChange={() => handleSpecialtyChange('')}
                    className="mr-2"
                  />
                  <span>All Specialties</span>
                </label>
                {specializations.map(specialty => (
                  <label key={specialty.id} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="specialty"
                      value={specialty.id}
                      checked={selectedSpecialty === specialty.id}
                      onChange={() => handleSpecialtyChange(specialty.id)}
                      className="mr-2"
                    />
                    <span>{specialty.name}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <button
              onClick={clearFilters}
              className="btn-secondary w-full"
            >
              Clear Filters
            </button>
          </div>
          
          {/* Doctors Grid */}
          <div className="flex-grow">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : filteredDoctors.length > 0 ? (
              <>
                <div className="mb-4 flex justify-between items-center">
                  <p className="text-gray-600">{filteredDoctors.length} doctors found</p>
                  
                  {(searchQuery || selectedSpecialty) && (
                    <button
                      onClick={clearFilters}
                      className="text-blue-500 flex items-center hover:underline"
                    >
                      <X size={16} className="mr-1" />
                      Clear filters
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredDoctors.map(doctor => (
                    <DoctorCard key={doctor.id} doctor={doctor} />
                  ))}
                </div>
              </>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <p className="text-xl font-medium text-gray-800 mb-2">No doctors found</p>
                <p className="text-gray-600 mb-6">
                  We couldn't find any doctors matching your search criteria. Try adjusting your filters.
                </p>
                <button
                  onClick={clearFilters}
                  className="btn-primary"
                >
                  View All Doctors
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorsPage;