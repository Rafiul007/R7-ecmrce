import { categories } from "../../data/category";
import CategoryCard from "../ui/CategoryCard";

export const CategorySection = () => {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <CategoryCard 
            key={category.id} 
            icon={<category.icon />} 
            title={category.title} 
            bgColor={category.bgColor} 
          />
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
