"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import getAllProducts from "@/libs/product/getProduct";
import ProductCard from "@/Components/ProductCard";
import ProductCardSkeleton from "@/Components/ProductCardSkeleton";
import AboutSection from "@/Components/AboutSections";
import { motion, useInView } from "framer-motion";

interface Product {
  product_id: string;
  product_name: string;
  quantity: number;
  price: number;
  image: string;
}

const Page = () => {
  const router = useRouter();
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
    <div>
      <div className="relative min-h-[90vh]">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/homepage/homepage.jpg"
            alt="wallpaper"
            layout="fill"
            className="brightness-[0.6] object-cover"
          />
        </div>
        <div className="absolute text-white w-[50rem] top-[33%] left-[10%]">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-bold mb-2">NEW ARRIVALS</h3>
            <h1 className="text-6xl font-bold mb-6">SNEAKERS</h1>
            <p className="mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
              nulla mi, feugiat nec pulvinar non, pulvinar a sem. Nulla ut arcu
              egestas, aliquam mi et, venenatis quam. Cras facilisis turpis a
              lorem rutrum ullamcorper. In vitae vehicula purus, vitae porttitor
              nibh. Duis in nulla eros. Orci varius natoque penatibus et magnis
              dis parturient montes
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              <button
                className="text-white font-bold px-10 py-3 border-2 border-white rounded-full hover:bg-fuchsia-100 hover:text-black duration-300"
                onClick={() => router.push("/website/products")}
              >
                DISCOVER
              </button>
              <button className="bg-white text-black font-bold rounded-full px-10 py-[0.7rem] border-2 border-white">
                ADD TO CART
              </button>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="mt-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl md:text-3xl font-bold justify-center text-center mx-auto mt-6">
            Top Products
          </h1>
        </motion.div>
        <div
          ref={ref}
          className="flex flex-wrap gap-5 justify-center items-center mx-auto mt-10 m-4"
        >
          {loading
            ? Array.from({ length: 3 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            : productData.slice(0, 3).map((product, index) => (
                <motion.div
                  key={product.product_id}
                  variants={cardVariants}
                  initial="initial"
                  animate={isInView ? "animate" : "initial"}
                  transition={{ duration: 0.3, delay: 0.2 * index }}
                >
                  <ProductCard
                    key={product.product_id}
                    name={product.product_name}
                    price={product.price}
                    productId={product.product_id}
                    index={index}
                    image={product.image}
                  />
                </motion.div>
              ))}
        </div>
      </div>
      <div className="container mx-auto px-11 py-4">
        <AboutSection />
      </div>
    </div>
  );
};

export default Page;
