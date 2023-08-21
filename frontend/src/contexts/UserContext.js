import React, { createContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState('');

    const userToken = localStorage.getItem('accessToken');
    useEffect(() => {
        if (userToken) {
            const user_ = jwtDecode(userToken);
            setUser(user_);
        } else { console.log('hatali islem') }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};