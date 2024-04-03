"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import { signup } from "./services";

export default function Signup() {

    const { login } = useUser();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const [error, setError] = useState<string | null>(null);

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const handleSignup = async () => {

        console.log("Signing up");

        const data = await signup(username, password);

        if (data) {
            if (data == "Username already exists") {
                setError(data);
                console.error(error);
            }
            else {
                console.log("Signed up successfully");
                login(data);
            }
        }
        else {
            console.error("Failed to signup");
        }
    }

    return (
        <div className="flex flex-col">
            <input type="text" placeholder="Username" value={username} onChange={handleUsernameChange} />
            <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
            <button type="button" onClick={handleSignup}>Signup</button>
        </div>
    )

}