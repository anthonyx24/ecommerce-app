"use client"
import React, { createContext, useContext, useEffect, useState } from "react";
import { Cart } from "../types";
import { useUser } from "./UserContext";
import { authenticated_get_items } from "../services";

const CartContext = createContext<{
    cart: Cart,
    add_item: (product_id: number, quantity: number) => void,
    remove_item: (product_id: number) => void,
    loading: boolean
}> ({
    cart: {
        products: []
    },
    add_item: () => {},
    remove_item: () => {},
    loading: true
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<Cart>({
        products: [],
    });

    const [loading, setLoading] = useState<boolean>(true);

    const { user } = useUser();

    // If the user is logged in, create a cart with info from backend
    useEffect(() => {
        setLoading(true);
        const load_cart = async () => {
            const existing_cart_string = sessionStorage.getItem("cart");
            if (existing_cart_string) {
                const existing_cart = JSON.parse(existing_cart_string);
                console.log("Existing cart: ", existing_cart);
                setCart({ products: existing_cart.products });
            }
            else if (user) {
                try {
                    const items = await authenticated_get_items(user.id);
                    setCart({
                        products: items
                    });
                } catch (error) {
                    console.error("Error loading cart: ", error);
                }
            }
            setLoading(false);
        }
        load_cart();
    }, []); // Refetches if user changes

    // Set the sessionStorage to the updated cart
    useEffect(() => {
        sessionStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]); // updates sessionStorage if cart changes

    const add_item = (product_id: number, quantity: number) => {
        console.log("Adding item to cart: ", product_id, quantity)
        // Get the index of this product
        const index = cart.products.findIndex((product) => product.id === product_id);
        // If the product is already in the cart, update the quantity
        if (index !== -1){
            const newCart = [...cart.products];
            newCart[index].quantity += quantity;
            setCart({
                products: newCart
            });
        } else {
            // If the product is not in the cart, add it
            setCart({
                products: [...cart.products, { id: product_id, quantity }]
            });
        }
    }

    const remove_item = (product_id: number) => {
        const index = cart.products.findIndex((product) => product.id === product_id);
        const new_products = [...cart.products]
        new_products.splice(index, 1); // gets rid of item at the index with product_id
        setCart({
            products: new_products
        });
    }
    
    return (
        <CartContext.Provider value={{ cart, add_item, remove_item, loading }}>
            {children}
        </CartContext.Provider>
    );

}

export const useCart = () => useContext(CartContext);

