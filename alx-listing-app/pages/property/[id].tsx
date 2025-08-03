import { useRouter } from "next/router";
import { PROPERTYLISTINGSAMPLE } from "@/constants";
import PropertyDetail from "@/components/property/PropertyDetail";
import { PropertyProps } from "@/interfaces";
import Head from "next/head";

export default function PropertyPage() {
  const router = useRouter();
  const { id } = router.query;
  
  // Find the property by name (in a real app, this would be an ID)
  const property = PROPERTYLISTINGSAMPLE.find((item) => 
    item.name.toLowerCase().split(' ').join('-') === id
  );

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Property not found</h1>
          <p className="text-gray-600">The property you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => router.push('/')}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Go back home
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{property.name} | Vacation Rental</title>
        <meta name="description" content={`Book your stay at ${property.name} in ${property.address.city}, ${property.address.country}. ${property.offers.bed} bedrooms, ${property.offers.shower} bathrooms.`} />
        <meta property="og:title" content={`${property.name} | Vacation Rental`} />
        <meta property="og:description" content={`Book your stay at ${property.name} in ${property.address.city}, ${property.address.country}`} />
        <meta property="og:image" content={property.image} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <main>
        <PropertyDetail property={property} />
      </main>
    </>
  );
}

export async function getStaticPaths() {
  // In a real app, you would fetch this from an API
  const paths = PROPERTYLISTINGSAMPLE.map((property) => ({
    params: { id: property.name.toLowerCase().split(' ').join('-') },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the property data here
  return {
    props: {},
  };
}
