import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [loggingIn, setLoggingIn] = useState(false);
    const [user, setUser] = useState({
        username: '',
        email: '',
        profilePicture: ''
    });

    const logIn = async (loginData) => {
        const res = await fetch('http://localhost:5000/api/auth/signin', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });

        const result = await res.json();

        if (res.status === 200) {
            setIsLoggedIn(true);
            setUser({ ...result.data });
        } else {
            setIsLoggedIn(false);
            
        }
    }

    const fetchIsLoggedIn = async () => {
        const res = await fetch('http://localhost:5000/api/auth/check/signedin', {
            credentials: 'include'
        });

        const result = await res.json();

        if (res.status === 200) {
            setIsLoggedIn(true);
            setUser({ ...result.data });
            setIsLoading(false);
        } else {
            setIsLoggedIn(false);
            setIsLoading(false);
            setUser({ username: '', email: '', profilePicture: '' });
        }
    }

    const logOut = async () => {
        const res = await fetch('http://localhost:5000/api/auth/signout', {
            credentials: 'include'
        });
        const result = await res.json();
        if (res.status === 200) {
            setIsLoggedIn(false);
            setUser({ username: '', email: '', profilePicture: '' });
        } else {
            console.log(result.msg);
        }
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, logIn, isLoading, fetchIsLoggedIn, logOut, user }}>
            {children}
        </AuthContext.Provider>
    );
}