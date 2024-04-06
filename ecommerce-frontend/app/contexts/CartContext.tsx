"use client"
import React, { createContext, useContext, useEffect, useState } from "react";
import { Cart } from "../types";
import { useUser } from "./UserContext";
import { authenticated_get_items } from "../services";

const CartContext = createContext<{
    cart: Cart,
    setCart: React.Dispatch<React.SetStateAction<Cart>>,
    add_item: (product_id: number, quantity: number) => void,
    update_item: (product_id: number, quantity: number) => void,
    remove_item: (product_id: number) => void,
    loading: boolean
}> ({
    cart: {
        items: []
    },
    setCart: () => {},
    add_item: () => {},
    update_item: () => {},
    remove_item: () => {},
    loading: true
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<Cart>({
        items: [],
    });

    const [loading, setLoading] = useState<boolean>(true);

    const { user } = useUser();

    // If the user is logged in, create a cart with info from backend
    useEffect(() => {
        setLoading(true);
        const load_cart = async () => {
            console.log("Current user: ", user?.id)
            if (user) {
                try {
                    const items = await authenticated_get_items(user.id);
                    setCart({
                        items: items
                    });
                    console.log("Loaded cart: ", items)
                } catch (error) {
                    console.error("Error loading cart: ", error);
                }
            }
            // else {
            //     const existing_cart_string = sessionStorage.getItem("cart");
            //     if (existing_cart_string) {
            //         const existing_cart = JSON.parse(existing_cart_string);
            //         console.log("Existing cart: ", existing_cart);
            //         setCart({ items: existing_cart.items });
            //     }
            // }
            setLoading(false);
        }
        load_cart();
    }, [user]); // Refetches if user changes

    // Set the sessionStorage to the updated cart
    useEffect(() => {
        if(!loading) {
            sessionStorage.setItem("cart", JSON.stringify(cart));
        }
    }, [loading, cart]); // updates sessionStorage if cart changes

    const add_item = (product_id: number, quantity: number) => {
        console.log("Adding item to cart: ", product_id, quantity)
        // Get the index of this product
        const index = cart.items.findIndex((item) => item.id === product_id);
        // If the product is already in the cart, update the quantity
        if (index !== -1){
            const newCart = [...cart.items];
            newCart[index].quantity += quantity;
            setCart({
                items: newCart
            });
        } else {
            // If the product is not in the cart, add it
            setCart({
                items: [...cart.items, { id: product_id, quantity }]
            });
        }
    }

    const update_item = (product_id: number, quantity: number) => {
        const index = cart.items.findIndex((item) => item.id === product_id);
        if(index !== -1) {
            const new_items = [...cart.items]
            new_items[index].quantity = quantity;
            setCart({
                items: new_items
            });
        }
    }

    const remove_item = (product_id: number) => {
        const index = cart.items.findIndex((item) => item.id === product_id);
        const new_items = [...cart.items]
        new_items.splice(index, 1); // gets rid of item at the index with product_id
        setCart({
            items: new_items
        });
    }
    
    return (
        <CartContext.Provider value={{ cart, setCart, add_item, update_item, remove_item, loading }}>
            {children}
        </CartContext.Provider>
    );

}

export const useCart = () => useContext(CartContext);

