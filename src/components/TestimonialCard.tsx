import { Star } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  image: string;
  text: string;
  rating: number;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  // Generate stars based on rating
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i}
        size={16} 
        className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
      />
    ));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center space-x-3 mb-4">
        <img 
          src={testimonial.image} 
          alt={testimonial.name} 
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
          <div className="flex items-center mt-1">
            {renderStars(testimonial.rating)}
          </div>
        </div>
      </div>
      <p className="text-gray-600 italic">"{testimonial.text}"</p>
    </div>
  );
};

export default TestimonialCard;