import { useEffect, useState } from "react";
import { IProduct } from "@/types/product";

const itemsPerPage = 6;

const useProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [sortOption, setSortOption] = useState<string>("default");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [category, setCategory] = useState<string>("All Categories");
  const [priceRange, setPriceRange] = useState<number>(500);
  const [inStock, setInStock] = useState<boolean>(false);

  // Fetch products from API (dummy API call)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Handle sorting and filtering
  useEffect(() => {
    let result = [...products];

    // Apply sorting
    if (sortOption === "priceLowHigh") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "priceHighLow") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === "newest") {
      result.sort((a, b) => Date.parse(b.dateAdded) - Date.parse(a.dateAdded));
    }

    // Apply filtering
    if (category !== "All Categories") {
      result = result.filter((product) => product.category === category);
    }

    if (priceRange) {
      result = result.filter((product) => product.price <= priceRange);
    }

    if (inStock) {
      result = result.filter((product) => product.inStock);
    }

    setFilteredProducts(result);
  }, [products, sortOption, category, priceRange, inStock]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return {
    products,
    filteredProducts,
    sortOption,
    setSortOption,
    currentPage,
    setCurrentPage,
    paginatedProducts,
    totalPages,
    setCategory,
    setPriceRange,
    setInStock,
  };
};

export default useProducts;
