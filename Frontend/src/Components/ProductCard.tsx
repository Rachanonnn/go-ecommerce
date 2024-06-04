import React from "react";
import ModalAddCart from "./ModalAddtoCart";

interface Props {
  product_id: string;
  name: string;
  price: number;
}

const ProductCard: React.FC<Props> = ({ product_id, name, price }) => {
  return (
    <div>
      <div className="card card-compact w-96 bg-base-100 shadow-xl hover:scale-[1.02] duration-300">
        <figure>
          <img
            src="https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg"
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <p>Price: {price} Baht</p>
          <ModalAddCart product_id={product_id} />
          <div className="card-actions justify-end">
            <button
              className="btn"
              onClick={() => {
                if (document) {
                  (
                    document.getElementById("modalAddCart") as HTMLFormElement
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
