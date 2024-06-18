import React from "react";
import ModalAddCart from "./ModalAddtoCart";

interface Props {
  name: string;
  price: number;
  quantity: number;
  productId: string;
  index: number;
  image: string;
}

const ProductCard: React.FC<Props> = ({
  index,
  name,
  price,
  quantity,
  productId,
  image,
}) => {
  return (
    <div>
      <div className="card card-compact w-96 bg-base-100 shadow-xl hover:scale-[1.02] duration-300">
        <figure>
          <img className="h-56 w-96 object-fill" src={image} />
        </figure>
        <div className="card-body">
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold mb-[3px]">{name}</h2>
            <p className="text-slate-500">Price: {price} Baht</p>
            <p className="text-slate-500 text-sm">Quantity: {quantity}</p>
          </div>
          <ModalAddCart index={index} productId={productId} image={image} />
          <div className="card-actions justify-end">
            <button
              className="btn"
              onClick={() => {
                if (document) {
                  (
                    document.getElementById(
                      `modalAddCart${index}`
                    ) as HTMLFormElement
                  ).showModal();
                }
              }}
            >
              Buy now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
