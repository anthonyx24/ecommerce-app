"use client";
import React, { useState, useEffect } from "react";
// import { useUser } from "../UserContext";
import { get_cart, add_item, remove_item } from "../services";

export default function Cart() {

    // const [items, setItems] = useState<any>();
    // const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        const cart = get_cart(parseInt(sessionStorage.getItem("cart_id") ?? ""));
        console.log(cart);
    }, []);

    return (
        <div className="flex">
            <h1>Cart Page</h1>
        </div>
    );
}