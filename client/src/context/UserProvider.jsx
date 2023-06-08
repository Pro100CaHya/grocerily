import React, { useState } from "react";
import { UserContext } from "./UserContext";

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        id: parseInt(localStorage.getItem("id")) || null,
        username: localStorage.getItem("username") || null,
        role: localStorage.getItem("role") || null 
    });

    return (
        <UserContext.Provider value={{
            user,
            setUser
        }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;