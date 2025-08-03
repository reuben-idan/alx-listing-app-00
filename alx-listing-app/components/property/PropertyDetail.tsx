import { PropertyProps } from "@/interfaces";
import { useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import BookingSection from "./BookingSection";

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

  // Mock reviews data - in a real app, this would come from an API
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
    <div className="container mx-auto px-4 py-8">
      {/* Property Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{property.name}</h1>
        <div className="flex items-center mt-2">
          <div className="flex items-center">
            <StarIcon className="h-5 w-5 text-yellow-400" />
            <span className="ml-1 text-gray-700">{property.rating}</span>
          </div>
          <span className="mx-2 text-gray-400">·</span>
          <span className="text-gray-600">
            {property.address.city}, {property.address.state}, {property.address.country}
          </span>
        </div>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="md:col-span-2 row-span-2">
          <img 
            src={property.image || "/placeholder-property.jpg"} 
            alt={property.name}
            className="w-full h-full object-cover rounded-l-2xl"
          />
        </div>
        <div className="md:col-span-1">
          <img 
            src="https://source.unsplash.com/random/300x200?interior" 
            alt="Property interior"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="md:col-span-1">
          <img 
            src="https://source.unsplash.com/random/300x200?bathroom" 
            alt="Property bathroom"
            className="w-full h-full object-cover rounded-tr-2xl"
          />
        </div>
        <div className="md:col-span-1">
          <img 
            src="https://source.unsplash.com/random/300x200?bedroom" 
            alt="Property bedroom"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="md:col-span-1">
          <img 
            src="https://source.unsplash.com/random/300x200?kitchen" 
            alt="Property kitchen"
            className="w-full h-full object-cover rounded-br-2xl"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Main Content */}
        <div className="md:w-2/3">
          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab("description")}
                className={`${
                  activeTab === "description"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab("amenities")}
                className={`${
                  activeTab === "amenities"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Amenities
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`${
                  activeTab === "reviews"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Reviews
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="mb-8">
            {activeTab === "description" && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">About this place</h2>
                <p className="text-gray-700 mb-4">
                  {property.name} is a beautiful property located in the heart of {property.address.city}. 
                  This {property.offers.bed} bedroom, {property.offers.shower} bathroom property can 
                  comfortably accommodate {property.offers.occupants} guests.
                </p>
                <p className="text-gray-700">
                  Enjoy the modern amenities and stunning views that this property has to offer. 
                  Perfect for families, couples, or business travelers looking for a comfortable 
                  and convenient stay.
                </p>
              </div>
            )}

            {activeTab === "amenities" && (
              <div>
                <h2 className="text-2xl font-semibold mb-6">What this place offers</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {property.category.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      <svg 
                        className="h-5 w-5 text-green-500 mr-2" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M5 13l4 4L19 7" 
                        />
                      </svg>
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">
                    <StarIcon className="inline h-5 w-5 text-yellow-400" />
                    <span className="ml-1">{property.rating} · 24 reviews</span>
                  </h2>
                </div>
                
                <div className="space-y-8">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6">
                      <div className="flex items-center mb-2">
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
                      <div className="flex mt-1">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon 
                            key={i} 
                            className={`h-5 w-5 ${
                              i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="mt-2 text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Booking Section */}
        <div className="md:w-1/3">
          <BookingSection 
            price={property.price} 
            onDateChange={handleDateChange}
            selectedDates={selectedDates}
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
