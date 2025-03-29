import Image from "next/image";
import { FC } from "react";
import { useRouter } from "next/navigation";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { IProduct } from "@/types/product";

interface ProductCardProps {
  product: IProduct;
}

export const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const { id, title, images, description, price } = product;
  const router = useRouter();

  return (
    <div
      className="card card-compact bg-white-200 w-full border shadow-sm hover:shadow-md transition-all cursor-pointer elevate"
      onClick={() => router.push(`/products/${id}`)}
    >
      { images && (
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
      <div className="card-body bg-slate-100">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <div className="card-actions justify-between">
          <span className="text-lg font-semibold">{price}</span>
          <div className="flex space-x-2">
            <button className="btn btn-primary btn-sm hover:bg-primary-600 transition-all text-white">
              Buy Now
            </button>
            <button className="btn btn-secondary btn-outline btn-sm hover:bg-secondary transition-all">
              <AddShoppingCartIcon fontSize="small" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
