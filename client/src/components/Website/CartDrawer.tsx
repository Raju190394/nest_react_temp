import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

export const CartDrawer = () => {
    const { cart, removeFromCart, total, isCartOpen, setIsCartOpen } = useCart();

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
                    >
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                            <div className="flex items-center gap-3">
                                <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
                                    <ShoppingBag size={20} />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900">Your Cart</h2>
                                <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                    {cart.length}
                                </span>
                            </div>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                                        <ShoppingBag size={40} className="text-gray-300" />
                                    </div>
                                    <div>
                                        <p className="text-lg font-medium text-gray-900">Your cart is empty</p>
                                        <p className="text-sm text-gray-500">Looks like you haven't added any courses yet.</p>
                                    </div>
                                    <button
                                        onClick={() => setIsCartOpen(false)}
                                        className="text-indigo-600 font-medium hover:underline"
                                    >
                                        Browse Courses
                                    </button>
                                </div>
                            ) : (
                                cart.map(item => (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        key={item.id}
                                        className="flex gap-4 p-4 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow group"
                                    >
                                        <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                                            <img src={item.thumbnail} alt="" className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <h4 className="font-semibold text-gray-900 line-clamp-1">{item.title}</h4>
                                                <p className="text-xs text-gray-500 line-clamp-1">{item.instructor}</p>
                                            </div>
                                            <div className="flex items-center justify-between mt-2">
                                                <span className="font-bold text-indigo-600">${item.price}</span>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {cart.length > 0 && (
                            <div className="p-6 border-t border-gray-100 bg-white mt-auto">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-gray-500">Subtotal</span>
                                    <span className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</span>
                                </div>
                                <button className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 group">
                                    Proceed to Checkout
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                                <p className="text-xs text-center text-gray-400 mt-4">
                                    Safe and secure payments via Stripe
                                </p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
