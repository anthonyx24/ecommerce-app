"use client"
import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "../types";

const UserContext = createContext<{
    user: User,
    login: (user_id: string) => void,
    logout: () => void,
}>({
    // if not logged in, user is null
    user: null,
    // placeholder functions
    login: () => {},
    logout: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User>(null);

    // This ensures on reloads, the user is still logged in (sessionStorage)
    useEffect(() => {
        console.log("User changed")
        const user_id = sessionStorage.getItem('user_id');
        if (user_id) {
            setUser({ id: parseInt(user_id) });
        }
    }, []);

    const logout = () => {
        setUser(null);
        sessionStorage.removeItem('cart');
        sessionStorage.removeItem('user_id');
    }

    const login = (user_id: string) => {
        sessionStorage.removeItem('cart'); // makes way for new cart to come in
        sessionStorage.setItem('user_id', user_id);
        setUser({ id: parseInt(user_id) })
    } 

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);

