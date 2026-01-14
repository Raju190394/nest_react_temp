import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Bell, Search } from 'lucide-react';

export const Header = () => {
    const { user } = useAuth();

    return (
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10 w-full transition-all">
            <div className="flex items-center gap-4 w-96">
                <div className="relative w-full group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                    />
                </div>
            </div>

            <div className="flex items-center gap-6">
                <button className="relative p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors">
                    <Bell size={20} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white ring-2 ring-white"></span>
                </button>
                <div className="h-8 w-px bg-gray-200"></div>
                <div className="flex items-center gap-3 pl-2">
                    <img
                        src={user?.avatar}
                        alt="Profile"
                        className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover bg-gray-100"
                    />
                    <div className="hidden md:block">
                        <p className="text-sm font-semibold text-gray-800 leading-none mb-1">{user?.name}</p>
                        <p className="text-xs text-gray-500 capitalize leading-none">{user?.role}</p>
                    </div>
                </div>
            </div>
        </header>
    )
}
