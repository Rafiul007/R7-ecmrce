"use client"; // Ensures this component runs in the browser

import Image from "next/image";
import { FC } from "react";
import { useRouter } from "next/navigation";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { IProduct } from "@/types/product";
import { useCartStore } from "@/store/cartStore";
import { toast } from "react-hot-toast";

interface ProductCardProps {
  product: IProduct;
}

export const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const { id, title, images, description, price } = product;
  const router = useRouter();
  const { addToCart } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      id,
      title,
      price,
      image: images[0],
      quantity: 1,
    });

    // Show success toast notification
    toast.success(`${title} added to cart! 🛒`);
  };

  return (
    <div>
      <div className="card card-compact bg-white-200 w-full border shadow-sm hover:shadow-md transition-all cursor-pointer elevate">
        <div onClick={() => router.push(`/products/${id}`)}>
          {images && (
            <figure className="w-full h-48 flex items-center justify-center overflow-hidden bg-white">
              <Image
                src={images[0]}
                alt={title}
                width={200}
                height={200}
                className="max-w-full max-h-full object-contain"
              />
            </figure>
          )}
          {/* Card Body */}
          <div className="card-body bg-slate-100">
            <h2 className="card-title">{title}</h2>
            <p>{description}</p>
          </div>
        </div>
        {/* Card Actions with Price & Buttons */}
        <div className="card-actions bg-slate-100 flex items-center justify-between w-full p-4">
          <span className="text-lg font-semibold">${price}</span>
          <div className="flex space-x-2">
            <button
              className="btn btn-primary btn-xs hover:bg-primary-600 px-4 transition-all text-white text-xs"
              onClick={(e) => e.stopPropagation()}
            >
              Buy Now
            </button>
            <button
              className="btn btn-secondary btn-outline btn-xs  px-4 hover:bg-secondary transition-all"
              onClick={handleAddToCart}
            >
              <AddShoppingCartIcon sx={{ fontSize: 16 }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
