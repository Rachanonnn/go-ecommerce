import React from "react";


const ProductCardSkeleton = () => {
  return (
    <div>
      <div className="card card-compact gap-4 w-96 border-1 border-gray-200 bg-base-100 shadow-xl">
        <div className="skeleton h-72 w-full rounded-3xl"></div>
        <div className="skeleton h-4 w-28 ml-4"></div>
        <div className="skeleton h-4 w-36 ml-4"></div>
        <div className="flex justify-end">
          <div className="skeleton h-12 w-28 rounded-3xl m-4"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
