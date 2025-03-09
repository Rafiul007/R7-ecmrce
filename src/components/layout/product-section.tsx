import ProductCard from "../ui/ProductCard";
import product1 from "../../assets/product1.jpg";
import product2 from "../../assets/product2.jpg";
import product3 from "../../assets/product3.jpg";

export const ProductSection = () => {
  const products = [
    {
      id: 1,
      title: "Shoes",
      image: product1,
      description: "If a dog chews shoes whose shoes does he choose?",
      price: "$49.99",
    },
    {
      id: 2,
      title: "Hat",
      image: product2,
      description: "A stylish hat for every occasion.",
      price: "$19.99",
    },
    {
      id: 3,
      title: "Hat",
      image: product3,
      description: "A stylish hat for every occasion.",
      price: "$19.99",
    },
    // More products...
  ];

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Top Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-20 w-full max-w-6xl mx-auto justify-items-center">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            id={product.id}
            title={product.title}
            image={product.image}
            description={product.description}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductSection;
