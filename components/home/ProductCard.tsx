"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { useCart } from "@/context/CartContext";

interface ProductProps {
    product: {
        id: string;
        badge: string;
        name: string;
        description: string;
        price: number;
        image: string;
        options: string[];
    };
}

export default function ProductCard({ product }: ProductProps) {
    const { addToCart } = useCart();
    const [selectedOption, setSelectedOption] = useState(product.options[0]);

    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            option: selectedOption,
            quantity: 1
        });
        // Optional: Trigger a cart drawer or notification here
    };

    return (
        <div className="group bg-zinc-900 border border-zinc-800 p-6 flex flex-col hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 animate-fade-in-up">
            <Link href={`/productos/${product.id}`} className="block">
                <div className="aspect-square w-full bg-zinc-800 relative mb-6 flex items-center justify-center overflow-hidden">
                    <span className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold px-2 py-1 italic z-10">
                        {product.badge}
                    </span>
                    <div className="relative w-full h-full flex items-center justify-center">
                        <span className="absolute block font-display text-4xl text-zinc-700 select-none opacity-20 transform -rotate-12">
                            BLACH
                        </span>
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-3/4 h-3/4 object-contain group-hover:scale-110 transition-transform duration-500 relative z-10"
                        />
                    </div>
                </div>

                <h3 className="font-display text-xl font-black mb-2 tracking-tight text-white uppercase italic">
                    {product.name}
                </h3>
            </Link>
            <p className="text-gray-400 text-sm mb-6 grow font-light">
                {product.description}
            </p>

            <div className="mb-6">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                    {product.options.length > 1 ? "Presentación" : "Contenido"}
                </p>
                <div className="flex flex-wrap gap-2">
                    {product.options.map((option) => (
                        <button
                            key={option}
                            onClick={() => setSelectedOption(option)}
                            className={`flex-1 py-2 text-[10px] font-black border transition-all ${selectedOption === option
                                ? "border-primary bg-primary/10 text-primary"
                                : "border-zinc-800 hover:border-primary/40 text-gray-400"
                                }`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-between mt-auto">
                <span className="text-2xl font-black text-primary">${product.price.toLocaleString()}</span>
                <button
                    onClick={handleAddToCart}
                    className="bg-zinc-800 text-white p-3 hover:bg-primary transition-colors flex items-center justify-center"
                >
                    <span className="material-symbols-outlined text-xl">add_shopping_cart</span>
                </button>
            </div>
        </div>
    );
}
