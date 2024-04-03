"use client"
import React, { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import { useCart } from "../contexts/CartContext";
import { save_cart } from "../services";
import Link from "next/link";

export default function NavBar() {

    const { user, logout } = useUser();
    const { cart } = useCart();

    const handle_logout = (user_id: number) => {
        save_cart(user_id, cart);
        logout();
    }

    return (
        <div className="flex justify-between items-center">
            <Link href="/">
                <div>Home</div>
            </Link>
            <Link href="/cart">
                <div>Cart</div>
            </Link>
            {user ? (
                <Link href="/">
                    <div onClick={() => handle_logout(user.id)}>Logout</div>
                </Link>
            ) : (
                <div>
                    <Link href="/login">
                        <div>Login</div>
                    </Link>
                    <Link href="/signup">
                        <div>Signup</div>
                    </Link>
                </div> 
            )}
        </div>
    )

}