"use client"
import React, { useEffect, useState } from "react";
import { useUser } from "../UserContext";
import Link from "next/link";

export default function NavBar() {

    const { user, logout } = useUser();

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
                    <div onClick={logout}>Logout</div>
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