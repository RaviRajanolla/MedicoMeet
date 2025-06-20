import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, MapPin, Stethoscope } from 'lucide-react';
import { getDoctors, getSpecializations } from '../services/api';
import { Doctor, Specialization } from '../types';

const DoctorSearch = () => {
  const [query, setQuery] = useState('');
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [specializations, setSpecializations] = useState<Specialization[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [doctorsData, specializationsData] = await Promise.all([
          getDoctors(),
          getSpecializations()
        ]);
        setDoctors(doctorsData);
        setSpecializations(specializationsData);
      } catch (error) {
        console.error('Error fetching search data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setShowResults(true);
    setIsLoading(true);
    
    // Simulate search delay
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  const clearSearch = () => {
    setQuery('');
    setShowResults(false);
  };

  const handleDoctorClick = (doctorId: string) => {
    navigate(`/doctors/${doctorId}`);
    setShowResults(false);
    setQuery('');
  };

  const handleSpecializationClick = (specializationId: string) => {
    navigate(`/doctors?specialty=${specializationId}`);
    setShowResults(false);
    setQuery('');
  };

  const filteredResults = query.trim() === '' ? [] : {
    doctors: doctors.filter(doctor =>
      doctor.name.toLowerCase().includes(query.toLowerCase()) ||
      doctor.specialization.name.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5),
    specializations: specializations.filter(spec =>
      spec.name.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 3)
  };

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <Search 
          size={20} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
        />
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search doctors, specialties..."
          className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {showResults && (query.trim() !== '' || isLoading) && (
        <div className="absolute z-50 top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto"></div>
            </div>
          ) : (
            <>
              {filteredResults.doctors.length === 0 && filteredResults.specializations.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  No results found for "{query}"
                </div>
              ) : (
                <>
                  {filteredResults.doctors.length > 0 && (
                    <div className="p-2">
                      <h3 className="text-xs font-semibold text-gray-500 px-3 py-2">DOCTORS</h3>
                      {filteredResults.doctors.map(doctor => (
                        <button
                          key={doctor.id}
                          onClick={() => handleDoctorClick(doctor.id)}
                          className="w-full px-3 py-2 hover:bg-gray-50 flex items-center rounded-md"
                        >
                          <img
                            src={doctor.image}
                            alt={doctor.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="ml-3 text-left">
                            <div className="font-medium text-gray-900">{doctor.name}</div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <Stethoscope size={14} className="mr-1" />
                              {doctor.specialization.name}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {filteredResults.specializations.length > 0 && (
                    <div className="p-2 border-t">
                      <h3 className="text-xs font-semibold text-gray-500 px-3 py-2">SPECIALIZATIONS</h3>
                      {filteredResults.specializations.map(spec => (
                        <button
                          key={spec.id}
                          onClick={() => handleSpecializationClick(spec.id)}
                          className="w-full px-3 py-2 hover:bg-gray-50 flex items-center rounded-md"
                        >
                          <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                            <MapPin size={20} className="text-blue-500" />
                          </div>
                          <div className="ml-3 text-left">
                            <div className="font-medium text-gray-900">{spec.name}</div>
                            <div className="text-sm text-gray-500">View all doctors</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default DoctorSearch;