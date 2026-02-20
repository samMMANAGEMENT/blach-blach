"use client";

import { BRAND_CONFIG } from "@/configs/brand";
import Link from "next/link";
import { useState, useEffect } from "react";

import { useCart } from "@/context/CartContext";
import { useUI } from "@/context/UIContext";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { itemCount, setIsDrawerOpen } = useCart();
    const { setDistributorModalOpen, setLoginModalOpen } = useUI();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Prevent scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMenuOpen]);

    const navItems = ["Inicio", "Productos", "¿Quieres ser distribuidor?"];

    return (
        <>
            <nav
                className={`fixed top-0 z-50 w-full transition-all duration-300 ${isScrolled || isMenuOpen ? "bg-black/95 backdrop-blur-md border-b border-zinc-800 h-16" : "bg-transparent h-20"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                    <div className="flex justify-between items-center h-full">
                        {/* Hamburger - Mobile Only */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="p-2 text-white hover:text-primary transition-colors"
                            >
                                <span className="material-symbols-outlined text-3xl">
                                    {isMenuOpen ? 'close' : 'menu'}
                                </span>
                            </button>
                        </div>

                        {/* Logo */}
                        <Link href="/" className="flex flex-col items-center group cursor-pointer absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
                            <span className="font-display text-xl font-black tracking-widest text-white leading-none">
                                {BRAND_CONFIG.name.split(" ")[0]}
                            </span>
                            <div className="h-4 w-16 relative overflow-hidden">
                                <img
                                    alt="logo placeholder"
                                    className="absolute -top-10 opacity-20 grayscale group-hover:opacity-40 transition-opacity"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCn-a6uybB12SKruc2q5dAHgxA-G8Tn-eP5bYi2wGvOLx1o1Iezfr-73GWyE27N9iiOO6aV5jeHTmtqDRbwdzbwCYAt9OGsJDUhr4vlNFDSvzynVR4T5M-3bIgsekd5kqnMEzVVwH16kX0dsPAKDxRf79mRFykMgpoE6vDEtfChy4niN3IyAWCgnFtjJGMn02pG-Wvvbq0PFX4V0LfWcsldbwd5pSkDWUn-9ALcmajY4r_5jW4XO3-MRPhb0S990aQLGphRcfeMBQL6"
                                />
                                <div className="absolute inset-0 border-t-2 border-primary mt-2"></div>
                            </div>
                            <span className="font-display text-xl font-black tracking-widest text-white leading-none">
                                {BRAND_CONFIG.name.split(" ")[1]}
                            </span>
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex space-x-8">
                            {navItems.map((item) => (
                                <button
                                    key={item}
                                    onClick={() => {
                                        if (item === "¿Quieres ser distribuidor?") {
                                            setDistributorModalOpen(true);
                                        }
                                    }}
                                    className="text-sm font-bold uppercase tracking-tighter hover:text-primary transition-colors text-white"
                                >
                                    {item === "Productos" ? (
                                        <Link href="#productos">{item}</Link>
                                    ) : item === "Inicio" ? (
                                        <Link href="/">{item}</Link>
                                    ) : (
                                        item
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-1 sm:space-x-4">
                            <button className="p-2 hover:bg-zinc-800 rounded-full transition-colors text-white hidden sm:block">
                                <span className="material-symbols-outlined">search</span>
                            </button>
                            <button
                                onClick={() => setIsDrawerOpen(true)}
                                className="p-2 hover:bg-zinc-800 rounded-full transition-colors relative text-white"
                            >
                                <span className="material-symbols-outlined">shopping_cart</span>
                                {itemCount > 0 && (
                                    <span className="absolute top-1 right-1 bg-primary text-[10px] font-bold text-white px-1.5 py-0.5 rounded-full">
                                        {itemCount}
                                    </span>
                                )}
                            </button>
                            <button
                                onClick={() => setLoginModalOpen(true)}
                                className="p-2 hover:bg-zinc-800 rounded-full transition-colors text-white"
                            >
                                <span className="material-symbols-outlined">person</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-xl transition-transform duration-500 md:hidden pt-24 px-8 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="flex flex-col space-y-8">
                    {navItems.map((item, idx) => (
                        <button
                            key={item}
                            onClick={() => {
                                setIsMenuOpen(false);
                                if (item === "¿Quieres ser distribuidor?") {
                                    setDistributorModalOpen(true);
                                }
                            }}
                            className={`text-3xl font-display font-black text-left uppercase italic tracking-tighter transition-all duration-300 ${isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
                                }`}
                            style={{ transitionDelay: `${idx * 100}ms` }}
                        >
                            {item === "Productos" ? (
                                <Link href="#productos" className="text-white hover:text-primary">{item}</Link>
                            ) : item === "Inicio" ? (
                                <Link href="/" className="text-white hover:text-primary">{item}</Link>
                            ) : (
                                <span className="text-white hover:text-primary">{item}</span>
                            )}
                        </button>
                    ))}

                    <div className={`pt-8 border-t border-zinc-800 flex flex-col space-y-6 transition-all duration-500 delay-300 ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}>
                        <button className="flex items-center gap-4 text-zinc-400 group">
                            <span className="material-symbols-outlined text-primary">search</span>
                            <span className="font-bold uppercase tracking-widest text-sm group-hover:text-white">Buscar Productos</span>
                        </button>
                        <button
                            onClick={() => {
                                setIsMenuOpen(false);
                                setLoginModalOpen(true);
                            }}
                            className="flex items-center gap-4 text-zinc-400 group"
                        >
                            <span className="material-symbols-outlined text-primary">person</span>
                            <span className="font-bold uppercase tracking-widest text-sm group-hover:text-white">Mi Cuenta</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
