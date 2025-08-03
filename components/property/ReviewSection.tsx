import { PropertyReview } from "@/interfaces/index";
import Image from "next/image";


interface ReviewSectionProps {
  reviews: PropertyReview[];
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-2">Reviews</h3>
        <p className="text-gray-500">No reviews available yet.</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold mb-4">Reviews</h3>

      {reviews.map((review, index) => (
        <div key={index} className="border-b pb-4 mb-6">
          <div className="flex items-center mb-2">
            <Image
              src={review.avatar}
              alt={review.name}
              className="w-12 h-12 rounded-full mr-4 object-cover"
            />
            <div>
              <p className="font-bold text-lg">{review.name}</p>
              <div className="text-yellow-500 text-sm">
                {"★".repeat(Math.floor(review.rating))}
                <span className="text-gray-500 ml-1">({review.rating.toFixed(1)})</span>
              </div>
            </div>
          </div>
          <p className="text-gray-700">{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewSection;
