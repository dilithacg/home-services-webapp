"use client";

import GlobalApi from "@/app/_services/GlobalApi";
import Image from "next/image"; // Use the Next.js Image component
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";

function CategorySideBar() {
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);

  const params = usePathname();
  params.split("/")[2];
  useEffect(() => {
    getCategoryList();
  }, []);

  useEffect(() => {
    params && setSelectedCategory(params.split("/")[2]);
  }, [params]);

  const getCategoryList = () => {
    GlobalApi.getCategory().then((resp) => {
      setCategoryList(resp.categories);
    });
  };

  return (
    <div>
      <h2 className="font-bold mb-3 text-lg text-primary">Categories</h2>
      <div>
        {categoryList.map((category, index) => (
          <Link
            href={"/search/" + category.name}
            key={index}
            className={`flex gap-2 p-3 border rounded-lg mb-3
          md:mr-10 cursor-pointer hover:bg-red-100 hover:text-primary
          hover:border-primary hover:shadow-md items-center
          ${
            selectedCategory == category.name &&
            "border-primary text-primary shadow-md bg-red-100"
          }
          
          `}
          >
            <Image src={category.icon.url} alt="icon" width={30} height={30} />
            <h2>{category.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategorySideBar;
