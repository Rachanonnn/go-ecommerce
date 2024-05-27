"use client";

import getAllProducts from "@/libs/product/getProduct";
import React from "react";
import ProductCard from "@/Components/ProductCard";

// Define the Product interface
interface Product {
  product_id: string;
  product_name: string;
  quantity: number;
  price: number;
}

const page = () => {
  // Use the Product interface to type the state
  const [productData, setProductData] = React.useState<Product[]>([]);

  React.useEffect(() => {
    getAllProducts().then((response) => {
      const { data } = response;
      setProductData(data);
    });
  }, []);

  return (
    <>
      <h1 className="text-2xl md:text-3xl font-bold justify-center text-center mx-auto mt-6">
        Products
      </h1>
      <div className="flex flex-wrap gap-5 justify-center items-center mx-auto mt-10">
        {productData.map((product) => (
          <ProductCard name={product.product_name} price={product.price} />
        ))}
      </div>
    </>
  );
};

export default page;
