import React, { FC } from "react";

interface CategoryCardProps {
  icon: React.ReactNode;
  title: string;
  bgColor: string;
}

export const CategoryCard: FC<CategoryCardProps> = ({ icon, title, bgColor }) => {
  return (
    <div className={` card card-compact flex flex-col items-center justify-center p-4 ${bgColor}`}	>
      <div className="text-4xl">{icon}</div>
      <h3 className="mt-2 text-lg font-semibold uppercase">{title}</h3>
    </div>
  );
};

export default CategoryCard;
