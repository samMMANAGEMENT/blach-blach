"use client";

import React from "react";
import { SITE_CONTENT } from "@/configs/content";
import Link from "next/link";

import Counter from "@/components/ui/Counter";

export default function Hero() {
    const { hero } = SITE_CONTENT;

    // Helper to parse stats like "+5" or "100%"
    const parseStat = (value: string) => {
        const num = parseInt(value.replace(/[^0-9]/g, '')) || 0;
        const prefix = value.startsWith('+') ? '+' : '';
        const suffix = value.endsWith('%') ? '%' : '';
        return { num, prefix, suffix };
    };

    return (
        <header className="relative hero-gradient h-[85vh] flex items-center overflow-hidden md:pt-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
                <div className="max-w-3xl">
                    <h1 className="font-display text-5xl md:text-7xl font-black text-white leading-tight mb-4 italic" style={{ animationDelay: '200ms' }}>
                        {hero.title.accent} <span className="text-primary">{hero.title.main}</span>
                        <span className="block text-3xl md:text-5xl tracking-tighter not-italic leading-[0.8] mt-4">{hero.title.subtitle}</span>
                    </h1>

                    <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-xl font-light" style={{ animationDelay: '400ms' }}>
                        {hero.description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4" style={{ animationDelay: '600ms' }}>
                        <Link
                            href="#productos"
                            className="bg-primary hover:bg-secondary text-white font-display font-black py-4 px-10 text-center transition-all transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/40 skew-x-12-neg"
                        >
                            <span className="inline-block transform skew-x-12">
                                {hero.cta.primary}
                            </span>
                        </Link>
                        <Link
                            href="#"
                            className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-display font-black py-4 px-10 border border-white/30 text-center transition-all skew-x-12-neg"
                        >
                            <span className="inline-block transform skew-x-12">
                                {hero.cta.secondary}
                            </span>
                        </Link>
                    </div>

                    {/* Stats Section */}
                    <div className="mt-16 flex items-center gap-8 md:gap-16" style={{ animationDelay: '800ms' }}>
                        {hero.stats?.map((stat, index) => {
                            const { num, prefix, suffix } = parseStat(stat.value);
                            return (
                                <React.Fragment key={index}>
                                    <div className="flex flex-col">
                                        <span className="font-display text-4xl md:text-5xl font-black text-primary italic leading-none mb-2">
                                            <Counter target={num} prefix={prefix} suffix={suffix} />
                                        </span>
                                        <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-zinc-500 uppercase">
                                            {stat.label}
                                        </span>
                                    </div>
                                    {index < hero.stats.length - 1 && (
                                        <div className="h-12 w-px bg-zinc-800 hidden sm:block"></div>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Decorative Text */}
            <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none select-none hidden lg:block">
                <span className="font-display text-[20rem] font-black italic tracking-tighter leading-none">
                    BLACH
                </span>
            </div>
        </header>
    );
}
