import { Link } from 'react-router-dom';
import { 
  Heart, Brain, Sparkles, Baby, Bone, Smile, Eye, UserPlus, 
  PillIcon 
} from 'lucide-react';
import { Specialization } from '../types';

interface SpecializationCardProps {
  specialization: Specialization;
}

const SpecializationCard = ({ specialization }: SpecializationCardProps) => {
  // Map specialization icon names to components
  const getIcon = (iconName: string) => {
    const props = { size: 28, className: "text-blue-500 mb-2" };
    
    switch (iconName) {
      case 'Heart':
        return <Heart {...props} />;
      case 'Brain':
        return <Brain {...props} />;
      case 'Sparkles':
        return <Sparkles {...props} />;
      case 'Baby':
        return <Baby {...props} />;
      case 'Bone':
        return <Bone {...props} />;
      case 'Smile':
        return <Smile {...props} />;
      case 'Eye':
        return <Eye {...props} />;
      case 'UserPlus':
        return <UserPlus {...props} />;
      default:
        return <PillIcon {...props} />;
    }
  };

  return (
    <Link 
      to={`/doctors?specialty=${specialization.id}`}
      className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col items-center text-center group"
    >
      <div className="p-3 bg-blue-50 rounded-full mb-3 group-hover:bg-blue-100 transition-colors duration-200">
        {getIcon(specialization.icon)}
      </div>
      <h3 className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
        {specialization.name}
      </h3>
    </Link>
  );
};

export default SpecializationCard;