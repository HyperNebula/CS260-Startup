import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom"; 

export const ProtectedRoute = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch("api/user/me");
                setIsAuthenticated(res.ok); 
            } catch (error) {
                setIsAuthenticated(false); 
            } finally {
                setIsLoading(false); 
            }
        };

        checkAuth();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>; 
    }

    if (!isAuthenticated) {
        localStorage.clear();
        return <Navigate to="/" replace />;
    }

    return children;
};
