import React, { useState } from "react";
import {
  IconStack,
  IconPackage,
  IconCash,
  IconRefresh,
  IconUpload,
} from "@tabler/icons-react";
import addProduct from "@/libs/product/addProduct";
import updateProductImage from "@/libs/product/updateProductPic";
import getAllProducts from "@/libs/product/getProduct";

interface ModalAddProductProps {
  onProductAdded: () => void;
}

interface PostProductData {
  product_name: string;
  quantity: number;
  price: number;
}

const ModalAddProduct: React.FC<ModalAddProductProps> = ({
  onProductAdded,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string>("");
  const [formData, setFormData] = useState<PostProductData>({
    product_name: "",
    quantity: 0,
    price: 0,
  });

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
      [name]: name === "quantity" || name === "price" ? Number(value) : value,
    });
  };

  const handlerClear = () => {
    setFormData({
      product_name: "",
      quantity: 0,
      price: 0,
    });
    setFile(null);
    if (filePreview) {
      URL.revokeObjectURL(filePreview);
      setFilePreview("");
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!file) return;

    const newProduct: PostProductData = {
      product_name: formData.product_name,
      quantity: formData.quantity,
      price: formData.price,
    };

    try {
      await addProduct(newProduct);
      const products = await getAllProducts();
      const latestProduct = products.data.length;
      const index = latestProduct.toString();

      await updateProductImage(index, file);
      handlerClear();
      onProductAdded();
      (document.getElementById("modalAddProduct") as HTMLDialogElement).close();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <dialog id="modalAddProduct" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 id="add-product-modal" className="font-bold text-lg">
          Add Product
        </h3>
        <div className="mt-2 w-full flex flex-col items-center">
          <img
            src={
              filePreview ||
              "https://images.surferseo.art/2936ab41-6f6f-47eb-b605-815590aac413.png"
            }
            className="shadow-3xl mb-2 rounded-2xl"
            alt="Product Preview"
          />
          <input
            type="file"
            className="file-input file-input-bordered max-w-xs"
            onChange={handleFileChange}
            accept="image/*"
            required
          />
        </div>
        <form onSubmit={onSubmit} className="flex flex-col gap-4 mt-4">
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
              aria-label="Product Name"
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
              aria-label="Quantity"
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
              aria-label="Price"
            />
          </label>
          <div className="gap-2 flex flex-col">
            <button
              type="submit"
              className="btn btn-primary mt-4 w-full text-white"
              aria-label="Add Product"
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
              aria-label="Clear Form"
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
