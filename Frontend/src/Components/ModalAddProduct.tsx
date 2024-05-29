import addProduct from '@/libs/product/addProduct';
import React from 'react'

interface ModalAddProductProps {
    onProductAdded: () => void;
}

const ModalAddProduct: React.FC<ModalAddProductProps> = ({ onProductAdded }) => {
    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const newProduct = {
            product_name: event.currentTarget.product_name.value,
            quantity: Number(event.currentTarget.quantity.value),
            price: Number(event.currentTarget.price.value),
        }
        await addProduct(newProduct);
        (document.getElementById('modalAddProduct') as HTMLFormElement).close()
        onProductAdded()

        // ...
    }
    return (
        <>
            <dialog id="modalAddProduct" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Add Product</h3>
                    <form onSubmit={onSubmit} className="flex flex-col gap-4 mt-4">
                        <label className="input input-bordered flex items-center gap-2">
                            Product Name
                            <input type="text" className="grow" placeholder="Product Name" name='product_name' />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            Quantity
                            <input type="number" className="grow" placeholder="0 - 99" defaultValue={1} name='quantity' />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            Price
                            <input type="number" className="grow" placeholder="0 - 9999" defaultValue={0} name='price' />
                        </label>
                        <button type="submit" className='btn btn-primary mt-4 w-full text-white'>Add Product</button>
                    </form>
                </div>
            </dialog>
        </>
    )
}

export default ModalAddProduct