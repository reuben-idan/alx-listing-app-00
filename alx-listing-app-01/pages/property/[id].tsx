import { useRouter } from "next/router";
import { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";
import { PROPERTYLISTINGSAMPLE } from "@/constants";
import PropertyDetail from "@/components/property/PropertyDetail";
import { PropertyProps } from "@/interfaces";

interface PropertyPageProps {
  property: PropertyProps | null;
}

const PropertyPage: React.FC<PropertyPageProps> = ({ property }) => {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg">Loading...</div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h1>
          <p className="text-gray-600 mb-6">
            The property you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{`${property.name} | Vacation Rental`}</title>
        <meta
          name="description"
          content={`Book your stay at ${property.name} in ${property.address.city}, ${property.address.country}. ${property.offers.bed} bedrooms, ${property.offers.shower} bathrooms.`}
        />
        <meta property="og:title" content={`${property.name} | Vacation Rental`} />
        <meta
          property="og:description"
          content={`Book your stay at ${property.name} in ${property.address.city}, ${property.address.country}`}
        />
        <meta property="og:image" content={property.image} />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="bg-white">
        <PropertyDetail property={property} />
      </main>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Generate paths at build time
  const paths = PROPERTYLISTINGSAMPLE.map((property) => ({
    params: { 
      id: property.name.toLowerCase().replace(/\s+/g, '-') 
    },
  }));

  return {
    paths,
    fallback: true, // Enable fallback for non-generated paths
  };
};

export const getStaticProps: GetStaticProps<PropertyPageProps> = async ({ params }) => {
  try {
    // In a real app, you would fetch the property data from an API
    const propertyId = params?.id as string;
    const property = PROPERTYLISTINGSAMPLE.find(
      (item) => item.name.toLowerCase().replace(/\s+/g, '-') === propertyId
    ) || null;

    return {
      props: {
        property,
      },
      // Revalidate at most once every hour
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Error fetching property:', error);
    return {
      props: {
        property: null,
      },
      revalidate: 60, // Retry after 1 minute on error
    };
  }
};

export default PropertyPage;
