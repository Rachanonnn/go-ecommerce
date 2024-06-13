"use client";

import { useUserAuth } from "@/libs/context/UserAuthContext";
import addProductTocart from "@/libs/product/addProductTocart";
import { IconStack, IconRefresh, IconUpload } from "@tabler/icons-react";
import React from "react";

interface ModalAddCartProps {
  productId: string;
  index: number;
}

const ModalAddCart: React.FC<ModalAddCartProps> = ({ productId, index }) => {
  // console.log("Product ID in ModalAddCart:", productId);

  const [formData, setFormData] = React.useState({
    product_id: productId,
    quantity: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      product_id: productId,
      quantity: Number(e.target.value),
    });
  };

  const handlerClear = () => {
    setFormData({
      product_id: productId,
      quantity: 0,
    });
  };

  const { user } = useUserAuth();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!user) return;

    const newItemtoCart = {
      user_id: user.uid,
      product_id: productId,
      quantity: Number(event.currentTarget.quantity.value),
    };

    try {
      await addProductTocart(newItemtoCart);
      const event = new CustomEvent("cartUpdated");
      window.dispatchEvent(event);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }

    const modalId = `modalAddCart${index}`;
    const modalElement = document.getElementById(
      modalId
    ) as HTMLFormElement | null;
    if (modalElement) {
      (modalElement as any).close();
    } else {
      console.error(`Element with ID ${modalId} not found.`);
    }
  }

  return (
    <>
      <dialog id={`modalAddCart${index}`} className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Add To Cart</h3>
          <form onSubmit={onSubmit} className="flex flex-col gap-4 mt-4">
            <label className="input input-bordered flex items-center gap-2">
              <p className="p-2">
                <IconStack stroke={1.4} size={32} />
              </p>
              <input
                type="number"
                className="grow"
                placeholder="Quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </label>
            <div className="gap-2 flex flex-col">
              <button
                type="submit"
                className="btn btn-primary mt-4 w-full text-white"
              >
                <span className="flex justify-center gap-2 items-center">
                  <IconUpload size={20} />
                  <p className="text-sm">Add To Cart</p>
                </span>
              </button>
              <div
                className="btn btn-primary w-full text-white"
                onClick={handlerClear}
              >
                <span className="flex justify-center gap-2 items-center">
                  <IconRefresh size={20} />
                  <p className="text-sm">Clear</p>
                </span>
              </div>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default ModalAddCart;
