"use client";

import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { Hero } from "@/components/layout/Hero";
import Marquee from "react-fast-marquee";
import {CategorySection} from "@/components/layout/category-section";
import ProductSection from "@/components/layout/product-section";

export default function Home() {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    return <div>Loading...</div>;
  }


  return (
    <>
      <section>
        <Hero />
      </section>
      <section className="flex justify-center items-center bg-primary py-2 my-2">
        <Marquee>
          <h1 className="text-2xl font-bold underline">Mega sale</h1>
        </Marquee>
      </section>
      <CategorySection />
      <ProductSection />
    </>
  );
}
