export interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
}

export interface ButtonProps {
  label: string;
  onClick: () => void;
}

export interface PropertyAddress {
  city: string;
  country: string;
}

export interface PropertyReview {
  name: string;
  avatar: string; // URL to user's profile picture
  rating: number; 
  comment: string;
}

export interface PropertyProps {
  id: string;
  name: string;
  rating: number; 
  address: PropertyAddress;
  description: string;
  image: string; // main image URL
  images?: string[]; // optional gallery images
  category: string[]; // amenities or services
  price: number; // nightly rate
  reviews: PropertyReview[];
  hostBio: string;
}

