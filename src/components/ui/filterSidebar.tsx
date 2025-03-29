import React, { FC } from "react";

interface FilterSidebarProps {
  category: string;
  setCategory: (value: string) => void;
  priceRange: number;
  setPriceRange: (value: number) => void;
  inStock: boolean;
  setInStock: (value: boolean) => void;
}

const FilterSidebar: FC<FilterSidebarProps> = ({
  category,
  setCategory,
  priceRange,
  setPriceRange,
  inStock,
  setInStock,
}) => {
  return (
    <div className="w-full md:w-1/4 p-4 bg-gray-100 rounded-lg shadow-md">
      <h3 className="text-sm font-semibold mb-4">Filter Products</h3>

      {/* Category Filter */}
      <div className="mb-4">
        <label className="block font-medium text-sm">Category</label>
        <select
          className="w-full p-2 border rounded-md text-sm"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>All Categories</option>
          <option>Clothing</option>
          <option>Electronics</option>
        </select>
      </div>

      {/* Price Range Filter */}
      <div className="mb-4">
        <label className="block font-medium text-sm">Price Range</label>
        <input
          type="range"
          className="w-full"
          min="0"
          max="500"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
        />
        <p className="text-sm text-gray-600">Max Price: ${priceRange}</p>
      </div>

      {/* In Stock Filter */}
      <div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={inStock}
            onChange={() => setInStock(!inStock)}
          />
          <span className="text-sm">In Stock Only</span>
        </label>
      </div>
    </div>
  );
};

export default FilterSidebar;
