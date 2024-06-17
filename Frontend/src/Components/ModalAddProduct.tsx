import addProduct from "@/libs/product/addProduct";
import React, { useState, useRef } from "react";
import {
  IconStack,
  IconPackage,
  IconCash,
  IconRefresh,
  IconUpload,
} from "@tabler/icons-react";

interface ModalAddProductProps {
  onProductAdded: () => void;
}

interface PostProductData {
  product_name: string;
  quantity: number;
  price: number;
  file: File;
}

const ModalAddProduct: React.FC<ModalAddProductProps> = ({
  onProductAdded,
}) => {
  const [file, setFile] = useState<File | undefined>(undefined);
  const [filePreview, setFilePreview] = useState<string>("");

  const [formData, setFormData] = useState({
    product_name: "",
    quantity: 0,
    price: 0,
  });

  const modalRef = useRef<HTMLDialogElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      setFilePreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlerClear = () => {
    setFormData({
      product_name: "",
      quantity: 0,
      price: 0,
    });
    setFile(undefined);
    setFilePreview("");
  };

  const handleClose = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!file) {
      console.error("File is required");
      return;
    }

    const newProduct: PostProductData = {
      product_name: formData.product_name,
      quantity: formData.quantity,
      price: formData.price,
      file: file,
    };

    try {
      await addProduct(newProduct);
      handleClose();
      onProductAdded();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <dialog ref={modalRef} id="modalAddProduct" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={handleClose}
          >
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Add Product</h3>
        <form onSubmit={onSubmit} className="flex flex-col gap-4 mt-4">
          <img
            src={
              filePreview ||
              "https://images3.alphacoders.com/133/thumbbig-1331510.webp"
            }
            className="shadow-3xl mb-2"
            alt="Product Preview"
          />
          <input
            type="file"
            className="file-input file-input-bordered w-full max-w-xs mx-auto"
            onChange={handleFileChange}
            accept="image/*"
          />
          <label className="input input-bordered flex items-center gap-2">
            <p className="p-2">
              <IconPackage stroke={1.4} size={32} />
            </p>
            <input
              type="text"
              className="grow"
              placeholder="Product Name"
              name="product_name"
              value={formData.product_name}
              onChange={handleChange}
              required
            />
          </label>
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
          <label className="input input-bordered flex items-center gap-2">
            <p className="p-2">
              <IconCash stroke={1.4} size={30} />
            </p>
            <input
              type="number"
              className="grow"
              placeholder="Price"
              name="price"
              value={formData.price}
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
                <p className="text-sm">Add Product</p>
              </span>
            </button>
            <button
              type="button"
              className="btn btn-primary w-full text-white"
              onClick={handlerClear}
            >
              <span className="flex justify-center gap-2 items-center">
                <IconRefresh size={20} />
                <p className="text-sm">Clear</p>
              </span>
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default ModalAddProduct;
