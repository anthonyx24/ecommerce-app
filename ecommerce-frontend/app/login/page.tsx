"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useUser } from "../UserContext";
import { authenticate } from "./services"

export default function Login() {

    const router = useRouter();

    const { login } = useUser();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState<string | null>(null);

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const handleLogin = async () => {
        const data = await authenticate(username, password);

        if (data) {
            if (data == "User not found" || data == "Password incorrect") {
                setError(data);
                console.error(error);
            }
            else {
                console.log("Logged in successfully")
                login(data);
                router.push("/");
            }
        }
        else {
            console.error("Failed to login")
        }
    }

    return (
        <div className="flex flex-col">
            <input type="text" placeholder="Username" value={username} onChange={handleUsernameChange} />
            <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
            <button type="button" onClick={handleLogin}>Login</button>
        </div>
    );
}