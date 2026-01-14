import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export const Layout = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex font-sans text-gray-900">
            <Sidebar />
            <div className="flex-1 ml-64 flex flex-col min-h-screen relative">
                <Header />
                <main className="flex-1 p-8 w-full max-w-7xl mx-auto">
                    <Outlet />
                </main>
                <footer className="p-6 text-center text-sm text-gray-400 border-t border-gray-200 bg-white">
                    © 2024 AdminPro. All rights reserved.
                </footer>
            </div>
        </div>
    );
};
