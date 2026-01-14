import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = () => {
    const { isAuthenticated, isLoading } = useAuth(); // Assume isLoading helps prevent flash

    // Simple check - in real app might show loader while checking session
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    return <Outlet />;
};
