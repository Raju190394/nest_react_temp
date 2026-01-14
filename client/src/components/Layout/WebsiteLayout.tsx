import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { LogIn, ShoppingBag } from 'lucide-react';
import { CartDrawer } from '../Website/CartDrawer';

export const WebsiteLayout = () => {
    const { isAuthenticated, user } = useAuth();
    const { cart, setIsCartOpen } = useCart();

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex flex-col relative">
            <CartDrawer />

            <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-30">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                        EduPlatform
                    </span>
                </div>

                <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
                    <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
                    <Link to="/courses" className="hover:text-indigo-600 transition-colors">All Courses</Link>
                    <Link to="/about" className="hover:text-indigo-600 transition-colors">About Us</Link>
                </nav>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                    >
                        <ShoppingBag size={20} />
                        {cart.length > 0 && (
                            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                        )}
                    </button>

                    {isAuthenticated ? (
                        <Link to="/admin" className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-sm font-medium hover:bg-indigo-100 transition-colors">
                            Dashboard
                        </Link>
                    ) : (
                        <Link to="/login" className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 flex items-center gap-2">
                            <LogIn size={16} />
                            Sign In
                        </Link>
                    )}
                </div>
            </header>

            <main className="flex-1 w-full max-w-7xl mx-auto p-8">
                <Outlet />
            </main>

            <footer className="bg-white border-t border-gray-200 py-8 text-center text-sm text-gray-500">
                <div className="max-w-7xl mx-auto px-8">
                    <p>© 2024 EduPlatform. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};
