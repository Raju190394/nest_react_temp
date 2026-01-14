import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { Course } from '../types';

interface CartContextType {
    cart: Course[];
    addToCart: (course: Course) => void;
    removeFromCart: (courseId: string) => void;
    clearCart: () => void;
    isInCart: (courseId: string) => boolean;
    total: number;
    isCartOpen: boolean;
    setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<Course[]>(() => {
        const saved = localStorage.getItem('cart');
        return saved ? JSON.parse(saved) : [];
    });
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (course: Course) => {
        setCart(prev => {
            if (prev.some(item => item.id === course.id)) return prev;
            return [...prev, course];
        });
        setIsCartOpen(true); // Auto open cart when adding
    };

    const removeFromCart = (courseId: string) => {
        setCart(prev => prev.filter(item => item.id !== courseId));
    };

    const clearCart = () => {
        setCart([]);
    };

    const isInCart = (courseId: string) => {
        return cart.some(item => item.id === courseId);
    }

    const total = cart.reduce((sum, item) => sum + item.price, 0);

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            clearCart,
            isInCart,
            total,
            isCartOpen,
            setIsCartOpen
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
