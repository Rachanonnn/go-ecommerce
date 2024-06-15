"use client";

import getAllProducts from "@/libs/product/getProduct";
import React, { useRef } from "react";
import ProductCard from "@/Components/ProductCard";
import ModalAddProduct from "@/Components/ModalAddProduct";
import ProductCardSkeleton from "@/Components/ProductCardSkeleton";
import { motion, useInView } from "framer-motion";

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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

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

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <div className="min-h-screen">
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
      <div
        ref={ref}
        className="flex flex-wrap gap-5 justify-center items-center mx-auto mt-10 m-4"
      >
        {loading
          ? Array.from({ length: 8 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))
          : productData.map((product, index) => (
              <motion.div
                key={product.product_id}
                variants={cardVariants}
                initial="initial"
                animate={isInView ? "animate" : "initial"}
                transition={{ duration: 0.2, delay: 0.1 * index }}
              >
                <ProductCard
                  key={index}
                  name={product.product_name}
                  price={product.price}
                  productId={product.product_id}
                  index={index}
                />
              </motion.div>
            ))}
      </div>
    </div>
  );
};

export default Page;
