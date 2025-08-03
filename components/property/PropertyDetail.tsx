import { PropertyProps } from "@/interfaces";
import { useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import BookingSection from "./BookingSection";
import ReviewSection from "./ReviewSection";

const PropertyDetail: React.FC<{ property: PropertyProps }> = ({ property }) => {
  const [activeTab, setActiveTab] = useState("description");
  const [selectedDates, setSelectedDates] = useState({
    checkIn: "",
    checkOut: "",
  });

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSelectedDates(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Mock reviews data
  const reviews = [
    {
      id: 1,
      name: "Alex Johnson",
      rating: 5,
      comment: "Amazing place with a great view! The host was very responsive and helpful.",
      date: "March 2023",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 2,
      name: "Sarah Miller",
      rating: 4,
      comment: "Lovely property, would definitely stay here again. The location was perfect!",
      date: "February 2023",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    }
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold">{property.name}</h1>
      <div className="flex items-center space-x-2 mt-2">
        <span className="text-yellow-500">{property.rating} stars</span>
        <span>{property.address.city}, {property.address.country}</span>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <img 
          src={property.image || "/placeholder-property.jpg"} 
          alt={property.name} 
          className="col-span-2 w-full h-96 object-cover rounded-lg" 
        />
        {/* Additional images can be added here */}
      </div>

      <div className="flex flex-col md:flex-row gap-8 mt-6">
        {/* Left Column - Property Info */}
        <div className="md:w-2/3">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {['description', 'reviews', 'host'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                    activeTab === tab
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="mt-6">
            {activeTab === 'description' && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">About this place</h2>
                <p className="text-gray-700">
                  {property.name} is a beautiful property located in the heart of {property.address.city}. 
                  This {property.offers.bed} bedroom, {property.offers.shower} bathroom property can 
                  comfortably accommodate {property.offers.occupants} guests.
                </p>
                
                <h2 className="text-2xl font-semibold mt-8 mb-4">What this place offers</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {property.category.map((amenity, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <span className="text-green-500">✓</span>
                      <span>{amenity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'reviews' && (
              <ReviewSection 
                reviews={reviews} 
                averageRating={property.rating} 
                totalReviews={reviews.length} 
              />
            )}

            {activeTab === 'host' && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">About the host</h2>
                <p>Host information will be displayed here.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Booking Section */}
        <div className="md:w-1/3">
          <BookingSection 
            price={property.price} 
            selectedDates={selectedDates} 
            onDateChange={handleDateChange} 
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
