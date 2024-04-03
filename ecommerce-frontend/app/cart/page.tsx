"use client";
import React, { useState, useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import { fetch_cart_data } from "../services";
import { ProductInfo } from "../types";

export default function Cart() {

    const [items, setItems] = useState<ProductInfo[]>(); // has info about each product
    const [total, setTotal] = useState<number>(0);

    const { cart, loading } = useCart(); // only contains product_id and quantity

    useEffect(() => {
        if(!loading) {
            const load_cart = async () => {
                const fetched_cart = await fetch_cart_data(cart);
                console.log(fetched_cart);
                setItems(fetched_cart.products);
                setTotal(fetched_cart.total);
            }
            load_cart();
        }
    }, [loading, cart]);

    return (
        <div className="flex flex-col">
            {items?.map((item) => (
                <div key={item.id} className="flex justify-between">
                    <p>Name: {item.title}</p>
                    <p>Price: {item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                </div>
            ))}
        </div>
    );
}