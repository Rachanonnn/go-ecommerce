import addProduct from '@/libs/product/addProduct';
import { IconStack, IconPackage, IconCash, IconRefresh, IconUpload } from '@tabler/icons-react';
import React from 'react'

interface ModalAddProductProps {
    onProductAdded: () => void;
}



const ModalAddProduct: React.FC<ModalAddProductProps> = ({ onProductAdded }) => {

    const [formData, setFormData] = React.useState({
        product_name: '',
        quantity: 0,
        price: 0
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handlerClear = () => {
        setFormData({
            product_name: '',
            quantity: 0,
            price: 0
        })

    }

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
                            <p className="p-2"><IconPackage stroke={1.4} size={32} /></p>
                            <input
                                type="text"
                                className="grow"
                                placeholder="Product Name" name='product_name'
                                value={formData.product_name}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            <p className="p-2"><IconStack stroke={1.4} size={32} /></p>
                            <input
                                type="number"
                                className="grow"
                                placeholder="Quantity"
                                name='quantity'
                                value={formData.quantity}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            <p className="p-2"><IconCash stroke={1.4} size={30} /></p>
                            <input
                                type="number"
                                className="grow"
                                placeholder="Price"
                                name='price'
                                value={formData.price}
                                onChange={handleChange}
                                required />
                        </label>
                        <div className='gap-2 flex flex-col'>
                            <button type="submit" className='btn btn-primary mt-4 w-full text-white'>
                                <span className='flex justify-center gap-2 items-center'>
                                    <IconUpload size={20} />
                                    <p className='text-sm'>Add Product</p>
                                </span>
                            </button>
                            <div className='btn btn-primary w-full text-white' onClick={handlerClear}>
                                <span className='flex justify-center gap-2 items-center'>
                                    <IconRefresh size={20} />
                                    <p className='text-sm'>Clear</p>
                                </span>
                            </div>
                        </div>
                    </form>
                </div>
            </dialog>
        </>
    )
}

export default ModalAddProduct