import { Link } from 'react-router-dom';
import { Star, Calendar } from 'lucide-react';
import { Doctor } from '../types';

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={doctor.image} 
          alt={doctor.name} 
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-4">
          <div className="flex items-center space-x-1">
            <Star size={16} className="text-yellow-400 fill-yellow-400" />
            <span className="text-white font-medium">{doctor.rating}</span>
            <span className="text-gray-300 text-sm">({doctor.reviewCount})</span>
          </div>
        </div>
      </div>
      
      <div className="p-4 flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{doctor.name}</h3>
        <p className="text-blue-500 text-sm mb-2">{doctor.specialization.name}</p>
        <p className="text-gray-600 text-sm mb-3">{doctor.experience} experience</p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div>
            <p className="font-medium text-gray-700">Consultation Fee</p>
            <p className="text-blue-600 font-semibold">${doctor.consultationFee}</p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Available</p>
            <p>{doctor.availableDays[0]}, {doctor.availableDays[1]}...</p>
          </div>
        </div>
      </div>
      
      <div className="px-4 pb-4 mt-auto">
        <div className="flex space-x-2">
          <Link 
            to={`/doctors/${doctor.id}`}
            className="btn-secondary text-sm flex-1 text-center"
          >
            View Profile
          </Link>
          <Link 
            to={`/doctors/${doctor.id}?action=book`}
            className="btn-primary text-sm flex-1 flex justify-center items-center"
          >
            <Calendar size={16} className="mr-1" />
            Book
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;