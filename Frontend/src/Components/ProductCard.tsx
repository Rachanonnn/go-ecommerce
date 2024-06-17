import React from "react";
import ModalAddCart from "./ModalAddtoCart";

interface Props {
  name: string;
  price: number;
  productId: string;
  index: number;
  image: string;
}

const ProductCard: React.FC<Props> = ({
  index,
  name,
  price,
  productId,
  image,
}) => {
  return (
    <div>
      <div className="card card-compact w-96 bg-base-100 shadow-xl hover:scale-[1.02] duration-300">
        <figure>
          <img src={image} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <p>Price: {price} Baht</p>
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
