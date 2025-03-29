"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { IProduct } from "@/types/product"; // Adjust the import path if needed
import { useParams } from "next/navigation";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        const data: IProduct = await response.json();
        console.log("Testing product with id data",data);
        if (data) {
          setProduct(data);
          setSelectedColor(data.colors ? data.colors[0] : "Default");
          setSelectedSize(data.sizes ? data.sizes[0] : "Default");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  // Add default values for the properties
  if (!product) {
    return <p>Loading product...</p>;
  }

  const images = product.images || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Images with Carousel */}
        <div className="border">
          <Carousel showArrows={true} infiniteLoop={true} showThumbs={false}>
            {images.map((img, index) => (
              <div
                key={index}
                className="h-[400px] flex items-center justify-center"
              >
                <Image
                  src={img}
                  alt={product.title}
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
          <h1 className="text-2xl font-bold text-gray-900">{product.title}</h1>
          <p className="mt-2 text-gray-600 text-sm">{product.description}</p>
          <p className="mt-4 text-xl font-semibold text-primary">
            ${product.price}
          </p>

          {/* Color Selection */}
          {product.colors && (
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
          )}

          {/* Size Selection */}
          {product.sizes && (
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
          )}

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
            <button className="btn btn-outline btn-secondary btn-sm hover:!bg-secondary hover:!text-white transition-all">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
