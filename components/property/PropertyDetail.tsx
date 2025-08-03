import { useState } from "react";
import BookingSection from "./BookingSection";
import ReviewSection from "./ReviewSection";
import { PropertyProps } from "@/interfaces/index";
import Image from "next/image";


const TABS = ["What We Offer", "Reviews", "About Host"];

const PropertyDetail: React.FC<{ property: PropertyProps }> = ({ property }) => {
  const [activeTab, setActiveTab] = useState("What We Offer");

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <h1 className="text-4xl font-bold mb-2">{property.name}</h1>
      <div className="flex items-center text-sm text-gray-600 mb-6 space-x-4">
        <span className="text-yellow-500 font-semibold">{property.rating}★</span>
        <span>{property.address.city}, {property.address.country}</span>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <Image
          src={property.image}
          alt={property.name}
          className="col-span-2 w-full h-96 object-cover rounded-lg"
        />
        {/* Optional thumbnails */}
        <Image src={property.image} alt="" className="w-full h-48 object-cover rounded-lg" />
        <Image src={property.image} alt="" className="w-full h-48 object-cover rounded-lg" />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section */}
        <div className="lg:col-span-2">
          {/* Tab Navigation */}
          <div className="flex space-x-4 border-b mb-4">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 border-b-2 transition ${
                  activeTab === tab
                    ? "border-black font-semibold"
                    : "border-transparent text-gray-500"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="mb-6">
            {activeTab === "What We Offer" && (
              <div>
                <h2 className="text-2xl font-semibold mb-2">What this place offers</h2>
                <ul className="flex flex-wrap gap-2">
                  {property.category.map((amenity, index) => (
                    <li key={index} className="bg-gray-100 px-3 py-1 rounded-md text-sm">
                      {amenity}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === "Reviews" && (
              <ReviewSection reviews={property.reviews} />
            )}

            {activeTab === "About Host" && (
              <div>
                <h2 className="text-2xl font-semibold mb-2">About the Host</h2>
                <p className="text-gray-700">{property.hostBio}</p>
              </div>
            )}
          </div>
        </div>

        {/* Booking Section */}
        <div className="lg:col-span-1">
          <BookingSection price={property.price} />
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
