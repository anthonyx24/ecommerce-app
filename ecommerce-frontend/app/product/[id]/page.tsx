"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

import { fetch_product_info } from "./services";
import { ProductInfo } from "../../types";
import { useCart } from "../../contexts/CartContext";
import ProductCard from "@/app/components/ProductCard";

const display_map: { [key: string]: string} = {
    "all": "All Products",
    "smartphones": "Smartphones",
    "laptops": "Laptops",
    "fragrances": "Fragrances",
    "skincare": "Skincare",
    "groceries": "Groceries",
    "home-decoration": "Home Decoration",
    "furniture": "Furniture",
    "tops": "Tops",
    "womens-dresses": "Women's Dresses",
    "womens-shoes": "Women's Shoes",
    "mens-shirts": "Men's Shirts",
    "mens-shoes": "Men's Shoes",
    "mens-watches": "Men's Watches",
    "womens-watches": "Women's Watches",
    "womens-bags": "Women's Bags",
    "womens-jewellery": "Women's Jewellery",
    "sunglasses": "Sunglasses",
    "automotive": "Automotive",
    "motorcycle": "Motorcycle",
    "lighting": "Lighting",
}

export default function Product({ params }: { params: { id: string } }) {

    const { add_item } = useCart();
    
    const [product, setProduct] = useState<ProductInfo>();
    const [quantity, setQuantity] = useState<number>(1);

    useEffect(() => {
        const load_product = async () => {
            const info = await fetch_product_info(params.id);
            console.log("Product: ", info);
            setProduct(info);
        }
        load_product();
    }, []);

    return (
        <div className="flex flex-col gap-[20px]">
            <Link href="/" className="flex flex-row gap-[8px] items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="27" height="20" viewBox="0 0 27 24" fill="none">
                    <path d="M25 13.5C25.8284 13.5 26.5 12.8284 26.5 12C26.5 11.1716 25.8284 10.5 25 10.5V13.5ZM0.93934 10.9393C0.353553 11.5251 0.353553 12.4749 0.93934 13.0607L10.4853 22.6066C11.0711 23.1924 12.0208 23.1924 12.6066 22.6066C13.1924 22.0208 13.1924 21.0711 12.6066 20.4853L4.12132 12L12.6066 3.51472C13.1924 2.92893 13.1924 1.97918 12.6066 1.3934C12.0208 0.807612 11.0711 0.807612 10.4853 1.3934L0.93934 10.9393ZM25 10.5L2 10.5V13.5L25 13.5V10.5Z" fill="black"/>
                </svg>
                <div className="text-black text-[18px] font-jakarta font-[500]">Back to Products</div>
            </Link>
            {product &&
                <div className="flex flex-row w-full gap-[40px]">
                <img src={product.thumbnail} alt={product.title} className="h-[60vh] w-[40vw] object-contain rounded-[9px] border-[1px] border-[#c3c3c3]" />
                <div className="flex flex-grow flex-col self-start gap-[40px] justify-center">
                    <div className="flex flex-row justify-between items-center">
                        <div className="text-[40px] text-black font-jakarta font-[700]">{product.title}</div>
                        <div className="text-[24px] text-black font-jakarta font-[500]">${product.price}</div>
                    </div>
                    <div className="text-[24px] text-[#818181] font-jakarta font-[500]">{display_map[product.category]}</div>
                    <div className="text-[18px] text-black font-jakarta font-[500]">{product.description}</div>
                    <div className="flex flex-row gap-[20px] items-center justify-between w-full">
                        <button onClick={() => add_item(product.id, quantity)} className="bg-[#000000] w-[70%] text-white text-[18px] font-jakarta font-[500] py-[10px] px-[20px] rounded-[9px]">Add to Cart</button>
                        <input type="number" min="1" max="10" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} className="flex-grow bg-[#f5f5f5] text-black text-[18px] font-jakarta font-[500] py-[10px] px-[20px] rounded-[9px]" />
                    </div>
                </div>
                </div>
            }
            
            
        </div>
    );
}