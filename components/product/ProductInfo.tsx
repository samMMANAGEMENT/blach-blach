"use client";

import { useState } from "react";

interface ProductInfoProps {
    product: {
        category: string;
        name: string;
        price: number;
        options: string[];
        rating: number;
        reviewsCount: number;
    };
}

export default function ProductInfo({ product }: ProductInfoProps) {
    const [selectedOption, setSelectedOption] = useState(product.options[0]);
    const [quantity, setQuantity] = useState(1);

    return (
        <div className="flex flex-col">
            <div className="mb-2">
                <span className="text-primary font-black tracking-[0.2em] uppercase text-xs italic">
                    {product.category}
                </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tight mb-4 text-white italic">
                <span className="text-primary">{product.name.split(" ")[0]} {product.name.split(" ")[1]}</span><br />
                <span className="not-italic text-3xl md:text-4xl">{product.name.split(" ").slice(2).join(" ")}</span>
            </h1>

            <div className="flex items-center gap-4 mb-8">
                <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                        <span key={i} className="material-symbols-outlined fill-1 text-sm">
                            {i < Math.floor(product.rating) ? "star" : "star_half"}
                        </span>
                    ))}
                </div>
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                    ({product.reviewsCount}+ Reseñas Verificadas)
                </span>
            </div>

            <div className="text-4xl font-black mb-10 text-white flex items-baseline gap-2">
                ${product.price.toLocaleString()}
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em]">USD</span>
            </div>

            <div className="space-y-8 mb-12">
                <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.3em] mb-4 text-zinc-500">
                        {product.options.length > 1 ? "Seleccionar Tamaño" : "Contenido"}
                    </label>
                    <div className="flex flex-wrap gap-3">
                        {product.options.map((opt) => (
                            <button
                                key={opt}
                                onClick={() => setSelectedOption(opt)}
                                className={`px-6 py-3 border-2 font-black text-xs transition-all uppercase tracking-widest ${selectedOption === opt
                                        ? "border-primary bg-primary/10 text-primary"
                                        : "border-zinc-800 text-zinc-400 hover:border-primary/50"
                                    }`}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex items-center border-2 border-zinc-800 bg-zinc-900 overflow-hidden">
                        <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="px-5 py-3 hover:bg-zinc-800 text-white transition-colors font-black"
                        >-</button>
                        <span className="w-12 text-center font-black text-sm text-white">{quantity}</span>
                        <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="px-5 py-3 hover:bg-zinc-800 text-white transition-colors font-black"
                        >+</button>
                    </div>
                    <button className="flex-1 bg-primary hover:bg-secondary text-white font-display font-black uppercase tracking-[0.2em] py-4 px-8 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-3 skew-x-12-neg">
                        <span className="material-symbols-outlined transform skew-x-12">shopping_bag</span>
                        <span className="transform skew-x-12">Añadir al carrito</span>
                    </button>
                </div>
            </div>

            {/* Feature Badges */}
            <div className="grid grid-cols-2 gap-4 py-8 border-y border-zinc-800">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800">
                        <span className="material-symbols-outlined text-primary">texture</span>
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-wider text-white leading-none mb-1">Superficies</p>
                        <p className="text-[9px] text-zinc-500 uppercase tracking-widest">Plásticos y Cauchos</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800">
                        <span className="material-symbols-outlined text-primary">verified</span>
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-wider text-white leading-none mb-1">Calidad</p>
                        <p className="text-[9px] text-zinc-500 uppercase tracking-widest">Premium Detailing</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
