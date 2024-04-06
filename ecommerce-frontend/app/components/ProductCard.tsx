"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../contexts/UserContext";

import { ProductInfo } from "../types";


export default function ProductCard( {product, categories }: {product: ProductInfo, categories: {[key: string]: string}} ) {

    const router = useRouter();   

    const { user } = useUser();

    const handleClick = () => {
        router.push(`/product/${product.id}`);
    }

    return (
        <div onClick={handleClick} className="flex flex-col items-start justify-center p-[20px] rounded-[9px] gap-[16px] border-[1px] border-[#c3c3c3] cursor-pointer">
            <img loading="lazy" src={product.thumbnail} alt={product.title} className="h-[30vh] w-full object-cover rounded-[7px]" />
            <div className="flex flex-col items-start self-stretch gap-[9px]">
                <div className="text-[#818181] font-jakarta text-[14px] font-normal">{categories[product.category]}</div>
                <div className="text-[#000000] font-jakarta text-[18px] font-[700]">{product.title}</div>
                <div className="text-[#000000] font-jakarta text-[18px] font-normal">${product.price}</div>
            </div>
        </div>
    )
}