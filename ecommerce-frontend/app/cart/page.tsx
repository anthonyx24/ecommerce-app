"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

import { useCart } from "../contexts/CartContext";
import { useUser } from "../contexts/UserContext";
import { fetch_cart_data, calculate_total } from "./services";
import { save_cart } from "../services";
import { ProductInfo } from "../types";
import CartItemCard from "../components/CartItemCard";

export default function Cart() {

    const [items, setItems] = useState<ProductInfo[]>([]); // has info about each product
    const [total, setTotal] = useState<number>(0);

    const { cart, loading, update_item, remove_item } = useCart(); // only contains product_id and quantity
    const { user } = useUser();

    useEffect(() => {
        if(!loading && cart.items.length > 0) {
            const load_cart = async () => {
                const fetched_cart = await fetch_cart_data(cart);
                console.log(fetched_cart);
                setItems(fetched_cart.products);
                setTotal(fetched_cart.total);
            }
            load_cart();
            console.log("Cart loaded: ", cart);
        } else {
            setItems([]);
        }
        // when the component unmounts
        if (user) {
            return () => {
                save_cart(user.id, cart);
                sessionStorage.setItem("cart", JSON.stringify(cart));
            }
        }
        
    }, [cart, loading]);

    useEffect(() => {
        if(items && cart.items) {
            setTotal(calculate_total(items, cart.items));
        }
    }, [cart]);

    return (
        <div className="flex gap-[40px]">
            <div className="flex flex-col w-[65%] gap-[20px]">
                {(items.length > 0 ) ? (
                    items.map((item) => (
                    <CartItemCard key={item.id} product={item} update_item={update_item} remove_item={remove_item} />
                ))): (
                    <p>No items in cart</p>
                )}
            </div>
            <div className="flex flex-grow flex-col gap-[40px]">
                <div className="text-[40px] text-black font-jakarta font-[700]">Total: ${total} </div>
                <button className="bg-black text-white text-[18px] font-jakarta font-[500] py-[10px] px-[20px] rounded-[9px]">Checkout</button>
                <Link href="/" className="flex flex-row bg-white py-[10px] px-[20px] rounded-[9px] border-[1px] border-[#c3c3c3] justify-center w-full">
                    <div className="text-black text-[18px] font-jakarta font-[500]">Continue Shopping</div>
                </Link>
            </div>
            
        </div>
        
    );
}