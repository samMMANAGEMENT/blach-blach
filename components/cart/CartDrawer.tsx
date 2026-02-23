'use client';

import React, { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const { cart, removeFromCart, updateQuantity, subtotal } = useCart();
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true);
            document.body.style.overflow = 'hidden';
        } else {
            setTimeout(() => setIsAnimating(false), 300);
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    if (!isOpen && !isAnimating) return null;

    return (
        <div className={`fixed inset-0 z-100 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Drawer */}
            <div className={`absolute right-0 top-0 h-full w-full max-w-md bg-zinc-950 border-l border-zinc-800 shadow-2xl transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
                        <h2 className="font-display text-xl font-bold tracking-tight uppercase flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">shopping_bag</span>
                            Tu Carrito
                        </h2>
                        <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-full transition-colors">
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>

                    {/* Body */}
                    <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                        {cart.length > 0 ? (
                            <div className="space-y-6">
                                {cart.map((item, idx) => (
                                    <div
                                        key={`${item.id}-${idx}`}
                                        className={`flex gap-4 ${isOpen ? 'animate-fade-in-up' : 'opacity-0'}`}
                                        style={{ animationDelay: `${idx * 100}ms` }}
                                    >
                                        <div className="w-20 h-20 bg-zinc-900 border border-zinc-800 rounded flex items-center justify-center p-2">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-1">
                                                <h3 className="text-sm font-bold uppercase tracking-tight">{item.name}</h3>
                                                <button
                                                    onClick={() => removeFromCart(item.id, item.option)}
                                                    className="text-zinc-500 hover:text-primary transition-colors"
                                                >
                                                    <span className="material-symbols-outlined text-sm">delete</span>
                                                </button>
                                            </div>
                                            <p className="text-xs text-zinc-500 mb-3">{item.option}</p>
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center border border-zinc-800 rounded overflow-hidden">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1, item.option)}
                                                        className="px-2 py-1 hover:bg-zinc-800 transition-colors text-xs"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="px-3 text-xs font-bold">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1, item.option)}
                                                        className="px-2 py-1 hover:bg-zinc-800 transition-colors text-xs"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                <span className="text-sm font-bold text-primary">{formatPrice(item.price * item.quantity)}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-zinc-500 space-y-4">
                                <span className="material-symbols-outlined text-6xl opacity-20">shopping_cart_off</span>
                                <p className="text-sm uppercase tracking-widest font-light">Tu carrito está vacío</p>
                                <button
                                    onClick={onClose}
                                    className="text-primary text-xs font-bold hover:underline"
                                >
                                    VOLVER A LA TIENDA
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {cart.length > 0 && (
                        <div className="p-6 border-t border-zinc-800 bg-zinc-900/50 space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-zinc-400 text-sm uppercase tracking-widest">Subtotal</span>
                                <span className="text-2xl font-display font-bold text-primary">{formatPrice(subtotal)}</span>
                            </div>
                            <p className="text-[10px] text-zinc-500 uppercase tracking-tighter">Impuestos y envío calculados al finalizar la compra.</p>
                            <Link
                                href="/checkout"
                                onClick={onClose}
                                className="block w-full bg-primary text-center text-white py-4 font-bold uppercase tracking-widest text-sm hover:brightness-110 transition-all shadow-lg shadow-primary/20"
                            >
                                Finalizar Compra
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
