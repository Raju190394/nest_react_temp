import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useCart } from '../context/CartContext';
import { Search, Clock, DollarSign, User, Star } from 'lucide-react';

export const CoursesPage = () => {
    const { courses } = useData();
    const { addToCart, isInCart } = useCart();
    const [search, setSearch] = useState('');

    const filteredCourses = courses.filter(c =>
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.description.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Available Courses</h1>
                    <p className="text-gray-500 text-sm">Explore our premium curriculum</p>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search courses..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full sm:w-64 pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCourses.map(course => (
                    <div key={course.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all group">
                        <div className="relative h-48 overflow-hidden">
                            <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                            <span className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold shadow-sm flex items-center gap-1">
                                <Star size={12} className="text-yellow-500 fill-yellow-500" /> 4.9
                            </span>
                        </div>
                        <div className="p-5">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded-md text-xs font-semibold uppercase tracking-wider">
                                    Development
                                </span>
                            </div>
                            <h3 className="font-bold text-lg text-gray-900 mb-2 leading-tight group-hover:text-indigo-600 transition-colors">{course.title}</h3>
                            <p className="text-gray-500 text-sm mb-4 line-clamp-2">{course.description}</p>

                            <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 border-b border-gray-100 pb-4">
                                <div className="flex items-center gap-1">
                                    <Clock size={14} />
                                    {course.duration}
                                </div>
                                <div className="flex items-center gap-1">
                                    <User size={14} />
                                    {course.instructor}
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-xl font-bold text-gray-900">${course.price}</span>
                                <button
                                    onClick={() => addToCart(course)}
                                    disabled={isInCart(course.id)}
                                    className={`px-4 py-2 text-sm font-medium rounded-xl transition-colors ${isInCart(course.id)
                                        ? 'bg-green-100 text-green-700 cursor-default'
                                        : 'bg-gray-900 text-white hover:bg-indigo-600'
                                        }`}
                                >
                                    {isInCart(course.id) ? 'Added to Cart' : 'Add to Cart'}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
