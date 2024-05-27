"use client";

import getAllProducts from "@/libs/product/getProduct";
import React from "react";
import ProductCard from "@/Components/ProductCard";
import ModalAddProduct from "@/Components/ModalAddProduct";

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
  const fetchProducts = React.useCallback(() => {
    getAllProducts().then((response) => {
      const { data } = response;
      setProductData(data);
    });
  }, []);

  React.useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <>
      <h1 className="text-2xl md:text-3xl font-bold justify-center text-center mx-auto mt-6">
        Products
      </h1>
      <ModalAddProduct onProductAdded={fetchProducts} />
      <div className="flex justify-end mr-6">
        <button
          className="btn"
          onClick={() => {
            if (document) {
              (document.getElementById('modalAddProduct') as HTMLFormElement).showModal();
            }
          }}
        >Add Product</button>
      </div>
      <div className="flex flex-wrap gap-5 justify-center items-center mx-auto mt-10">
        {productData.map((product, index) => (
          <ProductCard key={index} name={product.product_name} price={product.price} />
        ))}
      </div>
    </>
  );
};

export default page;
