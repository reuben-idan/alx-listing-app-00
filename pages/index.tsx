import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { PROPERTYLISTINGSAMPLE } from '@/constants';
import { PropertyProps } from '@/interfaces';

const Home: NextPage = () => {
  const router = useRouter();

  const handlePropertyClick = (id: number) => {
    router.push(`/property/${id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Featured Properties</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROPERTYLISTINGSAMPLE.map((property: PropertyProps, index: number) => (
          <div 
            key={index} 
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handlePropertyClick(index)}
          >
            <div className="h-48 bg-gray-200">
              {property.image && (
                <img 
                  src={property.image} 
                  alt={property.name} 
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{property.name}</h2>
              <p className="text-gray-600 mb-2">
                {property.address.city}, {property.address.country}
              </p>
              <div className="flex items-center">
                <span className="text-yellow-500 mr-1">★</span>
                <span className="text-gray-700">{property.rating}</span>
              </div>
              <p className="text-lg font-bold mt-2">${property.price} <span className="text-sm font-normal text-gray-500">night</span></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
