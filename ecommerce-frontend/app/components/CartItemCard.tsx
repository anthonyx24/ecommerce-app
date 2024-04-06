import React, { useState } from "react";
import { ProductInfo } from "../types";
// import { useCart } from "../contexts/CartContext";

export default function CartItemCard({ product, update_item, remove_item }: { product: ProductInfo, update_item: (id: number, quantity: number) => void, remove_item: (id: number) => void }) {

    const [quantity, setQuantity] = useState<number>(product.quantity);

    // const { update_item } = useCart();

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(parseInt(e.target.value));
        update_item(product.id, parseInt(e.target.value));
    }

    return (
        <div className="flex justify-between items-center gap-[20px] p-[20px] border-[1px] border-[#c3c3c3] rounded-[9px]">
            <div className="flex gap-[20px] items-center">
                <img src={product.thumbnail} alt={product.title} className="h-[100px] w-[100px] object-cover rounded-[7px]" />
                <div className="flex flex-col gap-[10px]">
                    <div className="text-black font-jakarta text-[18px] font-[700]">{product.title}</div>
                    <div className="text-black font-jakarta text-[18px] font-normal">${product.price}</div>
                </div>
            </div>
            <div className="flex items-center gap-[10px]">
                    <label htmlFor="quantity" className="text-black font-jakarta text-[18px] font-normal">Quantity:</label>
                    <input type="number" min="1" value={quantity} onChange={handleQuantityChange} className="border-[1px] border-[#c3c3c3] rounded-[7px] p-[5px] w-[50px]" />
                    <button onClick={() => remove_item(product.id)} className="flex gap-[5px] items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                            <path d="M14.7802 13.719C14.8499 13.7887 14.9052 13.8714 14.9429 13.9625C14.9806 14.0535 15 14.1511 15 14.2496C15 14.3482 14.9806 14.4457 14.9429 14.5368C14.9052 14.6278 14.8499 14.7105 14.7802 14.7802C14.7105 14.8499 14.6278 14.9052 14.5368 14.9429C14.4457 14.9806 14.3482 15 14.2496 15C14.1511 15 14.0535 14.9806 13.9625 14.9429C13.8714 14.9052 13.7887 14.8499 13.719 14.7802L7.5 8.56025L1.28097 14.7802C1.14025 14.9209 0.949387 15 0.750375 15C0.551363 15 0.360502 14.9209 0.21978 14.7802C0.0790571 14.6395 3.923e-09 14.4486 0 14.2496C-3.923e-09 14.0506 0.0790571 13.8598 0.21978 13.719L6.43975 7.5L0.21978 1.28097C0.0790571 1.14025 -1.48275e-09 0.949387 0 0.750375C1.48275e-09 0.551363 0.0790571 0.360502 0.21978 0.21978C0.360502 0.0790571 0.551363 1.48275e-09 0.750375 0C0.949387 -1.48275e-09 1.14025 0.0790571 1.28097 0.21978L7.5 6.43975L13.719 0.21978C13.8598 0.0790571 14.0506 -3.923e-09 14.2496 0C14.4486 3.923e-09 14.6395 0.0790571 14.7802 0.21978C14.9209 0.360502 15 0.551363 15 0.750375C15 0.949387 14.9209 1.14025 14.7802 1.28097L8.56025 7.5L14.7802 13.719Z" fill="#EE4B2B"/>
                        </svg>
                        <div className="text-[#EE4B2B] font-jakarta font-[500]"> Remove </div>
                    </button>
                </div>
        </div>
    )
}

