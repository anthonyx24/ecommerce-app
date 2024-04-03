"use client";
import React, { useEffect, useState } from "react";

import { Product, ProductInfo } from "./types";
import { useUser } from "./contexts/UserContext";
import { useCart } from "./contexts/CartContext";
import { get_products } from "./services";


export default function Home() {

    const { user } = useUser();
    const { add_item } = useCart();

    const [products, setProducts] = useState<ProductInfo[] | undefined>();

    useEffect(() => {
        
        const load_products = async () => {
            try {
                const products = await get_products();
                setProducts(products);
            }
            catch (error) {
                console.error("Error loading products: ", error);
            }
        };

        load_products();
    }, []);

    // useEffect(() => {
    //     // Creates a cart as soon as the user is loaded in, will recreate if user changes
    //     const create_cart = async () => {
    //         if (user) {
    //             console.log("Creating cart for user: ", user.id);
    //             const cart = await authenticated_create_cart(user.id);
    //             console.log("Cart created: ", cart);
    //             sessionStorage.setItem("cart_id", cart.id);
    //         }
    //         else {
    //             console.log("Creating cart for guest");
    //             const cart = await guest_create_cart();
    //             console.log("Cart created: ", cart);
    //             sessionStorage.setItem("cart_id", cart.id);
    //         }
    //     }

    //     // if cart does not exist from previous initialization, create a cart
    //     if (!sessionStorage.getItem("cart_id")) {
    //         create_cart();
    //     } 
    // }, [user]); // detects when user changes

    // Test for now, will be handled in product page
    const handleAdd = ( product_id: number ) => {
        add_item(product_id, 1);
    }

    return (
      <div className="flex flex-col">
        <h1 className="text-3xl font-inter">Products</h1>
        {products?.map((product) => (
            <div key={product.id} className="flex flex-col h-[100px] rounded-[10px] border-[1px]">
                <div className="text-black font-inter">{product.title}</div>
                <button type="button" onClick={() => handleAdd(product.id)}>Add to cart</button>
            </div>
        ))}
      </div>
    );
  }
  