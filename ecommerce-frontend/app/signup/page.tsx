"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useUser } from "../contexts/UserContext";
import { signup } from "./services";

export default function Signup() {

    const router = useRouter();

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

        if (!username.trim() || !password.trim()) {
            setError("Username and password cannot be empty");
            return;
        }

        const data = await signup(username, password);

        if (data) {
            if (data == "Username already exists") {
                setError(data);
                console.error(error);
            }
            else {
                console.log("Signed up successfully");
                login(data);
                router.push("/");
            }
        }
        else {
            console.error("Failed to signup");
        }
    }

    return (
        <div className="flex flex-col gap-[40px] w-[40%] self-center pt-[10vh]">
            <input 
                type="text" 
                placeholder="Username" 
                value={username}
                onChange={handleUsernameChange}
                className="flex w-full py-[12px] px-[16px] justify-between items-center rounded-[8px] border-[1px] border-[#ccc] font-jakarta text-[20px] font-normal"
            />
            <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={handlePasswordChange}
                className="flex w-full py-[12px] px-[16px] justify-between items-center rounded-[8px] border-[1px] border-[#ccc] font-jakarta text-[20px] font-normal"
            />
            <button onClick={handleSignup} className="flex flex-grow py-[12px] px-[16px] justify-center items-center rounded-[8px] bg-black text-[#fff] font-jakarta text-[20px] font-[500]">Sign Up</button>
            {error && <div className="text-[#EE4B2B] text-[18px] font-jakarta font-normal">{error}</div>}
        </div>
    )

}