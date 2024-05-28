import React from "react";

interface Props {
  name: string;
  price: number;
}

const ProductCard: React.FC<Props> = ({ name, price }) => {
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
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
