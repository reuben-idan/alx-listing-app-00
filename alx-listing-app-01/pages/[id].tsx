import React, { useState } from "react";
import { PROPERTYLISTINGSAMPLE } from "../constants";
import type { PropertyProps } from "../interfaces";

// Pill component
const Pill: React.FC<{
  label: string;
  selected: boolean;
  onClick: () => void;
}> = ({ label, selected, onClick }) => (
  <button
    className={`px-4 py-2 rounded-full border text-sm font-medium mr-2 mb-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 ${
      selected
        ? "bg-blue-600 text-white border-blue-600"
        : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
    }`}
    onClick={onClick}
    aria-pressed={selected}
  >
    {label}
  </button>
);

const FILTERS = [
  "All",
  "Top Villa",
  "Self Checkin",
  "Beachfront",
  "Mountain View",
  "Free Parking",
  "Pet Friendly",
  "City Center",
  "Private Pool",
  "Fireplace",
  "Free WiFi",
  "Historical",
  "Safari",
  "Riverfront",
  "Countryside",
];

const HERO_BG =
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80";

const Home: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filteredProperties =
    selectedFilter === "All"
      ? PROPERTYLISTINGSAMPLE
      : PROPERTYLISTINGSAMPLE.filter((property) =>
          property.category.includes(selectedFilter)
        );

  return (
    <div>
      {/* Hero Section */}
      <section
        className="w-full h-72 md:h-96 flex items-center justify-center bg-cover bg-center relative rounded-b-3xl"
        style={{ backgroundImage: `url(${HERO_BG})` }}
        aria-label="Hero section"
      >
        <div className="absolute inset-0 bg-black bg-opacity-40 rounded-b-3xl" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
            Find your favorite place here!
          </h1>
          <p className="text-lg md:text-2xl font-medium drop-shadow-lg">
            The best prices for over 2 million properties worldwide.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-wrap items-center gap-2">
          {FILTERS.map((filter) => (
            <Pill
              key={filter}
              label={filter}
              selected={selectedFilter === filter}
              onClick={() => setSelectedFilter(filter)}
            />
          ))}
        </div>
      </section>

      {/* Listing Section */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProperties.map((property, idx) => (
            <div
              key={property.name + idx}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden flex flex-col"
            >
              <div className="relative h-48 w-full">
                <img
                  src={property.image}
                  alt={property.name}
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
                {property.discount && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {property.discount}% OFF
                  </span>
                )}
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h2
                    className="text-lg font-semibold mb-1 truncate"
                    title={property.name}
                  >
                    {property.name}
                  </h2>
                  <div className="text-gray-500 text-xs mb-2">
                    {property.address.city}, {property.address.country}
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {property.category.map((cat) => (
                      <span
                        key={cat}
                        className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-blue-600 font-bold text-lg">
                    ${property.price.toLocaleString()}
                  </span>
                  <span className="flex items-center text-yellow-500 font-medium text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      className="w-4 h-4 mr-1"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.045 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z" />
                    </svg>
                    {property.rating}
                  </span>
                </div>
                <div className="flex gap-4 text-xs text-gray-500 mt-2">
                  <span>{property.offers.bed} beds</span>
                  <span>{property.offers.shower} showers</span>
                  <span>{property.offers.occupants} guests</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {filteredProperties.length === 0 && (
          <div className="text-center text-gray-500 py-12 text-lg">
            No properties found for this filter.
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
