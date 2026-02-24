import React from 'react';
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem("userName");
    
    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return children;
};