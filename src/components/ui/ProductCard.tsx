import Image, { StaticImageData } from "next/image";
import { FC } from "react";

interface ProductCardProps {
  title: string;
  image: string | StaticImageData;
  description: string;
  price: string;
}

export const ProductCard: FC<ProductCardProps> = ({
  title,
  image,
  description,
  price,
}) => {
  return (
    <div className="card card-compact bg-base-200 w-full sm:w-96 shadow-sm hover:shadow-md transition-all">
      <figure className="relative w-full h-64">
        <Image
          src={image}
          alt={title}
          layout="fill" 
          objectFit="contain" 
          className="w-full h-full object-contain"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <div className="card-actions justify-between">
          <span className="text-lg font-semibold">{price}</span>
          <div className="flex space-x-2">
            <button className="btn btn-primary btn-sm hover:bg-primary-600 transition-all">
              Buy Now
            </button>
            <button className="btn btn-secondary btn-outline btn-sm hover:bg-secondary transition-all">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
