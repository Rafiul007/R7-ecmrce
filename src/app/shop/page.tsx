"use client";
import FilterSidebar from "@/components/ui/filterSidebar";
import ProductCard from "@/components/ui/ProductCard";
import useProducts from "@/hooks/useProducts";
import { IProduct } from "@/types/product";
import React, { FC, useState } from "react";

const Shop: FC = () => {
  const {
    products,
    sortOption,
    setSortOption,
    currentPage,
    setCurrentPage,
    paginatedProducts,
    totalPages,
  } = useProducts();

  // State for filter options
  const [category, setCategory] = useState<string>("All Categories");
  const [priceRange, setPriceRange] = useState<number>(500);
  const [inStock, setInStock] = useState<boolean>(false);

  // Filter products based on selected category, price range, and stock status
  const filteredProducts = paginatedProducts.filter(
    (product: IProduct) =>
      (category === "All Categories" || product.category === category) &&
      product.price <= priceRange &&
      (!inStock || product.inStock)
  );

  return (
    <div className="container mx-auto p-4 flex flex-col md:flex-row gap-6">
      {/* Filter Sidebar */}
      <FilterSidebar
        category={category}
        setCategory={setCategory}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        inStock={inStock}
        setInStock={setInStock}
      />

      {/* Main Content (Products and Sorting) */}
      <div className="flex-1">
        {/* Heading & Sorting Dropdown */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-md">
            Showing {filteredProducts.length} of {products.length} products
          </h1>
          <select
            className="p-2 border rounded-md text-xs"
            onChange={(e) => setSortOption(e.target.value)}
            value={sortOption}
          >
            <option value="default">Default Sorting</option>
            <option value="priceLowHigh">Price: Low to High</option>
            <option value="priceHighLow">Price: High to Low</option>
            <option value="newest">Newest</option>
          </select>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredProducts.map((product: IProduct) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <span
              key={i}
              className={`px-2.5 py-1 rounded-md border cursor-pointer text-sm ${
                currentPage === i + 1
                  ? "bg-primary text-white font-semibold"
                  : "bg-white border-gray-300 hover:bg-gray-200"
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
