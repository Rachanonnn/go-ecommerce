"use client";

import getAllProducts from "@/libs/product/getProduct";
import React from "react";
import ProductCard from "@/Components/ProductCard";
import ModalAddProduct from "@/Components/ModalAddProduct";
import ProductCardSkeleton from "@/Components/ProductCardSkeleton";

// Define the Product interface
interface Product {
  product_id: string;
  product_name: string;
  quantity: number;
  price: number;
}

const Page = () => {
  // Use the Product interface to type the state
  const [productData, setProductData] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  const fetchProducts = React.useCallback(() => {
    setLoading(true);
    getAllProducts().then((response) => {
      const { data } = response;
      setProductData(data);
      setLoading(false);
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
              (
                document.getElementById("modalAddProduct") as HTMLFormElement
              ).showModal();
            }
          }}
        >
          Add Product
        </button>
      </div>
      <div className="flex flex-wrap gap-5 justify-center items-center mx-auto mt-10 m-4">
        {loading
          ? Array.from({ length: 8 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))
          : productData.map((product) => (
              <ProductCard
                key={product.product_id}
                product_id={product.product_id}
                name={product.product_name}
                price={product.price}
              />
            ))}
      </div>
    </>
  );
};

export default Page;
