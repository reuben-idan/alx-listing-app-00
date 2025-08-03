import { StarIcon } from "@heroicons/react/24/solid";
import { useState } from 'react';

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
  location?: string;
  response?: {
    text: string;
    date: string;
  };
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
  const [visibleReviews, setVisibleReviews] = useState(4);
  const [expandedReviews, setExpandedReviews] = useState<Record<number, boolean>>({});

  // Rating breakdown data with realistic distribution
  const ratingBreakdown = [
    { stars: 5, percentage: Math.round((reviews.filter(r => r.rating === 5).length / reviews.length) * 100) || 0 },
    { stars: 4, percentage: Math.round((reviews.filter(r => r.rating === 4).length / reviews.length) * 100) || 0 },
    { stars: 3, percentage: Math.round((reviews.filter(r => r.rating === 3).length / reviews.length) * 100) || 0 },
    { stars: 2, percentage: Math.round((reviews.filter(r => r.rating === 2).length / reviews.length) * 100) || 0 },
    { stars: 1, percentage: Math.round((reviews.filter(r => r.rating === 1).length / reviews.length) * 100) || 0 },
  ].sort((a, b) => b.stars - a.stars);

  const toggleReviewExpanded = (reviewId: number) => {
    setExpandedReviews(prev => ({
      ...prev,
      [reviewId]: !prev[reviewId]
    }));
  };

  const loadMoreReviews = () => {
    setVisibleReviews(prev => Math.min(prev + 4, reviews.length));
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <section className="py-8 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start mb-12">
          <div className="mb-8 md:mb-0 md:sticky top-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              <span className="text-4xl">{averageRating.toFixed(1)}</span>
              <span className="text-gray-500"> / 5</span>
            </h2>
            <div className="flex items-center mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                  key={star}
                  className={`h-5 w-5 ${
                    star <= Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="ml-2 text-gray-600">{totalReviews} reviews</span>
            </div>

            <div className="space-y-3 w-full md:w-80">
              {ratingBreakdown.map((item) => (
                <div key={item.stars} className="flex items-center">
                  <div className="w-12 text-sm font-medium text-gray-700">
                    {item.stars} {item.stars === 1 ? 'star' : 'stars'}
                  </div>
                  <div className="flex-1 mx-2">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                      <div 
                        className="bg-yellow-400 h-full rounded-full transition-all duration-500" 
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

          <div className="w-full md:w-2/3 space-y-8">
            {reviews.slice(0, visibleReviews).map((review) => (
              <div key={review.id} className="border-b border-gray-200 pb-8">
                <div className="flex items-start">
                  <img 
                    src={review.avatar} 
                    alt={review.name}
                    className="h-12 w-12 rounded-full mr-4 flex-shrink-0"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=random`;
                    }}
                  />
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{review.name}</h3>
                        {review.location && (
                          <p className="text-sm text-gray-500">{review.location}</p>
                        )}
                      </div>
                      <div className="text-sm text-gray-500 mt-1 sm:mt-0">
                        {formatDate(review.date)}
                      </div>
                    </div>
                    
                    <div className="flex items-center mt-1 mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <StarIcon
                          key={star}
                          className={`h-4 w-4 ${
                            star <= review.rating ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    
                    <p className="text-gray-700 mb-3">
                      {expandedReviews[review.id] 
                        ? review.comment 
                        : `${review.comment.substring(0, 200)}${review.comment.length > 200 ? '...' : ''}`
                      }
                    </p>
                    
                    {review.comment.length > 200 && (
                      <button
                        onClick={() => toggleReviewExpanded(review.id)}
                        className="text-sm font-medium text-rose-600 hover:text-rose-700 focus:outline-none"
                      >
                        {expandedReviews[review.id] ? 'Show less' : 'Read more'}
                      </button>
                    )}
                    
                    {review.response && (
                      <div className="mt-4 pl-4 border-l-2 border-gray-200">
                        <div className="text-sm font-medium text-gray-900 mb-1">Response from the host</div>
                        <p className="text-gray-600 text-sm">{review.response.text}</p>
                        <div className="text-xs text-gray-500 mt-1">
                          {formatDate(review.response.date)}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {visibleReviews < reviews.length && (
              <div className="text-center pt-4">
                <button
                  onClick={loadMoreReviews}
                  className="px-6 py-3 border border-gray-800 rounded-lg font-medium text-gray-800 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                >
                  Show more reviews
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
