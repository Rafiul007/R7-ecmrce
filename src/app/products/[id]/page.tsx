"use client";

import { useState } from "react";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import p2 from "../../../assets/product3.jpg";
import p3 from "../../../assets/product2.jpg";
// Dummy product data
const product = {
  id: 1,
  name: "Premium Cotton T-Shirt",
  description:
    "A stylish and comfortable premium cotton t-shirt, perfect for everyday wear. Designed with high-quality fabric for durability and breathability.",
  price: 49.99,
  colors: ["Black", "White", "Navy Blue", "Gray"],
  sizes: ["S", "M", "L", "XL", "XXL"],
  images: [p2, p3],
};

const ProductDetails = () => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Images with Carousel */}
        <div>
          <Carousel showArrows={true} infiniteLoop={true} showThumbs={false}>
            {product.images.map((img, index) => (
              <div
                key={index}
                className="h-[400px] flex items-center justify-center"
              >
                <Image
                  src={img}
                  alt={product.name}
                  layout="fill"
                  objectFit="contain"
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </Carousel>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
          <p className="mt-2 text-gray-600 text-sm">{product.description}</p>
          <p className="mt-4 text-xl font-semibold text-primary">
            ${product.price}
          </p>

          {/* Color Selection */}
          <div className="mt-4">
            <p className="font-semibold">Color:</p>
            <div className="flex gap-2 mt-2">
              {product.colors.map((color, index) => (
                <button
                  key={index}
                  className={`px-2 py-1 text-sm ${
                    selectedColor === color
                      ? "bg-primary text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="mt-4">
            <p className="font-semibold">Size:</p>
            <div className="flex gap-2 mt-2">
              {product.sizes.map((size, index) => (
                <button
                  key={index}
                  className={`px-2 py-1 text-sm ${
                    selectedSize === size
                      ? "bg-primary text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selection */}
          <div className="mt-4">
            <p className="font-semibold">Quantity:</p>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border p-1 w-16 mt-2 text-sm"
            />
          </div>

          <div className="mt-6 flex gap-4">
            <button className="btn btn-primary btn-sm text-white">
              Add to Cart
            </button>
            <button className="btn btn-outline btn-secondary  btn-sm hover:!bg-secondary hover:!text-white transition-all ">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
