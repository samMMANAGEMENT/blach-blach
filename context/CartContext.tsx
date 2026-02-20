'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    option?: string;
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string, option?: string) => void;
    updateQuantity: (id: string, quantity: number, option?: string) => void;
    clearCart: () => void;
    subtotal: number;
    itemCount: number;
    isDrawerOpen: boolean;
    setIsDrawerOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Load cart from localStorage
    useEffect(() => {
        const savedCart = localStorage.getItem('blach_cart');
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (e) {
                console.error('Failed to parse cart', e);
            }
        }
    }, []);

    // Save cart to localStorage
    useEffect(() => {
        localStorage.setItem('blach_cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (item: CartItem) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(
                (i) => i.id === item.id && i.option === item.option
            );
            if (existingItem) {
                return prevCart.map((i) =>
                    i.id === item.id && i.option === item.option
                        ? { ...i, quantity: i.quantity + item.quantity }
                        : i
                );
            }
            return [...prevCart, item];
        });
        // Automatically open drawer when adding item
        setIsDrawerOpen(true);
    };

    const removeFromCart = (id: string, option?: string) => {
        setCart((prevCart) => prevCart.filter((i) => !(i.id === id && i.option === option)));
    };

    const updateQuantity = (id: string, quantity: number, option?: string) => {
        if (quantity <= 0) {
            removeFromCart(id, option);
            return;
        }
        setCart((prevCart) =>
            prevCart.map((i) => (i.id === id && i.option === option ? { ...i, quantity } : i))
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                subtotal,
                itemCount,
                isDrawerOpen,
                setIsDrawerOpen,
            }}
        >
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
