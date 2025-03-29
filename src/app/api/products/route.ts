import { NextResponse } from "next/server";

export async function GET() {
  const products = [
    {
      id: 1,
      title: "Wireless Headphones",
      images: [
        "https://res.cloudinary.com/dmzmohj4i/image/upload/v1739559862/icqnrsptsd9monjch9ce.jpg",
      ],
      description: "High-quality wireless headphones with noise cancellation.",
      price: 120,
      dateAdded: "2024-03-01",
      category: "Electronics", // Add category
      inStock: true, // Add stock status
    },
    {
      id: 2,
      title: "Smart Watch",
      images: [
        "https://res.cloudinary.com/dmzmohj4i/image/upload/v1739559862/icqnrsptsd9monjch9ce.jpg",
      ],
      description: "Waterproof smartwatch with heart rate monitoring.",
      price: 250,
      dateAdded: "2024-02-15",
      category: "Electronics", // Add category
      inStock: true, // Add stock status
    },
    {
      id: 3,
      title: "Bluetooth Speaker",
      images: [
        "https://res.cloudinary.com/dmzmohj4i/image/upload/v1739559862/icqnrsptsd9monjch9ce.jpg",
      ],
      description: "Portable speaker with deep bass and long battery life.",
      price: 75,
      dateAdded: "2024-03-10",
      category: "Electronics", // Add category
      inStock: false, // Add stock status
    },
    {
      id: 4,
      title: "Gaming Mouse",
      images: [
        "https://res.cloudinary.com/dmzmohj4i/image/upload/v1739559862/icqnrsptsd9monjch9ce.jpg",
      ],
      description: "Ergonomic gaming mouse with customizable buttons.",
      price: 45,
      dateAdded: "2024-03-05",
      category: "Electronics", // Add category
      inStock: true, // Add stock status
    },
    {
      id: 5,
      title: "Mechanical Keyboard",
      images: [
        "https://res.cloudinary.com/dmzmohj4i/image/upload/v1739559862/icqnrsptsd9monjch9ce.jpg",
      ],
      description: "RGB mechanical keyboard with blue switches.",
      price: 100,
      dateAdded: "2024-02-25",
      category: "Electronics", // Add category
      inStock: true, // Add stock status
    },
    {
      id: 6,
      title: "USB-C Hub",
      images: [
        "https://res.cloudinary.com/dmzmohj4i/image/upload/v1739559862/icqnrsptsd9monjch9ce.jpg",
      ],
      description: "Multi-port USB-C hub with HDMI and Ethernet support.",
      price: 60,
      dateAdded: "2024-03-12",
      category: "Electronics", // Add category
      inStock: false, // Add stock status
    },
    {
      id: 7,
      title: "Mechanical Keyboard",
      images: [
        "https://res.cloudinary.com/dmzmohj4i/image/upload/v1739559862/icqnrsptsd9monjch9ce.jpg",
      ],
      description: "RGB mechanical keyboard with blue switches.",
      price: 100,
      dateAdded: "2024-02-25",
      category: "Electronics", // Add category
      inStock: true, // Add stock status
    },
    {
      id: 8,
      title: "USB-C Hub",
      images: [
        "https://res.cloudinary.com/dmzmohj4i/image/upload/v1739559862/icqnrsptsd9monjch9ce.jpg",
      ],
      description: "Multi-port USB-C hub with HDMI and Ethernet support.",
      price: 60,
      dateAdded: "2024-03-12",
      category: "Electronics", // Add category
      inStock: false, // Add stock status
    },
  ];

  return NextResponse.json(products);
}
