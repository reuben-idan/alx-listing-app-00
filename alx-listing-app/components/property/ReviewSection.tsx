import { StarIcon } from "@heroicons/react/24/solid";

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
}

interface ReviewSectionProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ 
  reviews, 
  averageRating, 
  totalReviews 
}) => {
  // Rating breakdown data
  const ratingBreakdown = [
    { stars: 5, percentage: 85 },
    { stars: 4, percentage: 10 },
    { stars: 3, percentage: 3 },
    { stars: 2, percentage: 1 },
    { stars: 1, percentage: 1 },
  ];

  return (
    <div className="mt-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <StarIcon className="h-6 w-6 text-yellow-400 mr-1" />
            {averageRating.toFixed(1)} · {totalReviews} reviews
          </h2>
        </div>

        <div className="w-full md:w-1/2">
          {ratingBreakdown.map((item) => (
            <div key={item.stars} className="flex items-center mb-2">
              <div className="w-10 text-sm font-medium">
                {item.stars} {item.stars === 1 ? 'star' : 'stars'}
              </div>
              <div className="flex-1 mx-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-yellow-400 h-2 rounded-full" 
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
              <div className="w-10 text-sm text-gray-600 text-right">
                {item.percentage}%
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-gray-200 pb-6">
            <div className="flex items-center mb-4">
              <img 
                src={review.avatar} 
                alt={review.name}
                className="h-12 w-12 rounded-full mr-4"
              />
              <div>
                <h4 className="font-semibold">{review.name}</h4>
                <p className="text-gray-500 text-sm">{review.date}</p>
              </div>
            </div>
            <div className="flex mb-2">
              {[...Array(5)].map((_, i) => (
                <StarIcon 
                  key={i} 
                  className={`h-5 w-5 ${
                    i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <p className="text-gray-700">{review.comment}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button className="px-6 py-2 border border-gray-800 rounded-lg font-medium hover:bg-gray-50 transition-colors">
          Show all {totalReviews} reviews
        </button>
      </div>
    </div>
  );
};

export default ReviewSection;
