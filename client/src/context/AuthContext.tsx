import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { User } from '../types';

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = 'http://localhost:3000/api';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    // Initialize from localStorage if possible, or just null
    const [user, setUser] = useState<User | null>(() => {
        const saved = localStorage.getItem('user');
        return saved ? JSON.parse(saved) : null;
    });
    const [isLoading, setIsLoading] = useState(false);

    const login = async (email: string, _password: string) => {
        setIsLoading(true);
        try {
            // Fetch users from backend to verify validity
            const res = await fetch(`${API_URL}/users`);
            if (res.ok) {
                const users: User[] = await res.json();
                const foundUser = users.find(u => u.email === email);

                if (foundUser) {
                    setUser(foundUser);
                    localStorage.setItem('user', JSON.stringify(foundUser));
                } else {
                    alert('User not found! Try "admin@example.com" or "john@example.com"');
                }
            } else {
                console.error("Failed to fetch users");
            }
        } catch (error) {
            console.error("Login error", error);
        }
        setIsLoading(false);
    };

    const register = async (name: string, email: string, _password: string) => {
        setIsLoading(true);
        // Create user via API
        try {
            // In a real app we would POST to /register endpoint which handles checking existence + hashing password
            // For now, we will just Create the user via the User CRUD
            const newUserPayload = {
                name,
                email,
                role: 'user',
                status: 'active',
                avatar: `https://ui-avatars.com/api/?name=${name}`
            };

            const res = await fetch(`${API_URL}/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUserPayload)
            });

            if (res.ok) {
                const newUser = await res.json();
                setUser(newUser);
                localStorage.setItem('user', JSON.stringify(newUser));
            }
        } catch (error) {
            console.error("Register error", error);
        }
        setIsLoading(false);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
