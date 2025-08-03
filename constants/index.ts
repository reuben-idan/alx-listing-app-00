import { PropertyProps } from "@/interfaces/index";

export const PROPERTYLISTINGSAMPLE: PropertyProps[] = [
  {
    id: "modern-villa",
    name: "Modern Villa with Pool",
    rating: 4.9,
    address: {
      city: "Cape Town",
      country: "South Africa",
    },
    description: "A luxurious villa with stunning views and all modern amenities.",
    image: "/images/villa-main.jpg",
    images: [
      "/images/villa1.jpg",
      "/images/villa2.jpg",
      "/images/villa3.jpg",
    ],
    category: ["Wi-Fi", "Pool", "Free parking", "Air conditioning", "Kitchen"],
    price: 200,
    reviews: [
      {
        name: "Alice Johnson",
        avatar: "/images/user1.jpg",
        rating: 5,
        comment: "Amazing place, would definitely stay again!",
      },
      {
        name: "John Smith",
        avatar: "/images/user2.jpg",
        rating: 4,
        comment: "Great location, clean and comfortable.",
      },
    ],
    hostBio: "Your host is a seasoned traveler who loves to welcome guests from all around the world.",
  },
];
