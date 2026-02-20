'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CheckoutPage() {
    const { cart, subtotal } = useCart();

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen font-sans animate-fade-in">
            <header className="py-8 border-b border-gray-200 dark:border-border-dark bg-white dark:bg-background-dark sticky top-0 z-50 animate-fade-in">
                <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
                    <Link href="/" className="flex flex-col items-center">
                        <span className="font-display text-2xl tracking-widest font-bold text-slate-900 dark:text-white uppercase">BLACH BLACH</span>
                        <span className="text-[10px] font-display text-primary tracking-[0.3em] -mt-1">RESTAURADOR</span>
                    </Link>
                    <Link href="/" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">shopping_bag</span>
                        Volver a la tienda
                    </Link>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Form Section */}
                    <div className="lg:col-span-7 space-y-10 animate-fade-in-up">
                        <nav className="flex text-xs space-x-2 text-gray-500 dark:text-zinc-500 uppercase tracking-widest">
                            <Link href="/" className="hover:text-primary transition-colors">Carrito</Link>
                            <span className="opacity-30">/</span>
                            <span className="text-slate-900 dark:text-white font-bold">Información</span>
                            <span className="opacity-30">/</span>
                            <span>Envío</span>
                            <span className="opacity-30">/</span>
                            <span>Pago</span>
                        </nav>

                        {/* Contact Section */}
                        <section className="space-y-4">
                            <div className="flex justify-between items-baseline">
                                <h2 className="text-xl font-bold uppercase tracking-tight">Contacto</h2>
                                <p className="text-xs text-zinc-500">
                                    ¿Ya tienes una cuenta? <a className="text-primary hover:underline font-bold" href="#">Iniciar sesión</a>
                                </p>
                            </div>
                            <div className="space-y-3">
                                <input
                                    className="w-full bg-white dark:bg-card-dark border border-gray-300 dark:border-border-dark rounded p-4 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                                    placeholder="Correo electrónico"
                                    type="email"
                                />
                                <div className="flex items-center gap-3 px-1">
                                    <input
                                        className="w-4 h-4 rounded border-gray-300 dark:border-border-dark text-primary focus:ring-primary bg-transparent transition-all cursor-pointer"
                                        id="news"
                                        type="checkbox"
                                    />
                                    <label className="text-xs text-zinc-500 dark:text-zinc-400 cursor-pointer select-none" htmlFor="news">
                                        Enviarme novedades y ofertas por correo electrónico
                                    </label>
                                </div>
                            </div>
                        </section>

                        {/* Shipping Address Section */}
                        <section className="space-y-6">
                            <h2 className="text-xl font-bold uppercase tracking-tight">Dirección de envío</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input className="w-full bg-white dark:bg-card-dark border border-gray-300 dark:border-border-dark rounded p-4 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-600" placeholder="Nombre" type="text" />
                                <input className="w-full bg-white dark:bg-card-dark border border-gray-300 dark:border-border-dark rounded p-4 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-600" placeholder="Apellidos" type="text" />
                            </div>
                            <input className="w-full bg-white dark:bg-card-dark border border-gray-300 dark:border-border-dark rounded p-4 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-600" placeholder="Dirección" type="text" />
                            <input className="w-full bg-white dark:bg-card-dark border border-gray-300 dark:border-border-dark rounded p-4 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-600" placeholder="Apartamento, local, etc. (opcional)" type="text" />
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <input className="w-full bg-white dark:bg-card-dark border border-gray-300 dark:border-border-dark rounded p-4 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-600" placeholder="Ciudad" type="text" />
                                <div className="relative">
                                    <select className="w-full bg-white dark:bg-card-dark border border-gray-300 dark:border-border-dark rounded p-4 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all appearance-none text-zinc-500 cursor-pointer">
                                        <option>Provincia / Estado</option>
                                        <option>Bogotá D.C.</option>
                                        <option>Antioquia</option>
                                        <option>Valle del Cauca</option>
                                    </select>
                                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-sm opacity-50">keyboard_arrow_down</span>
                                </div>
                                <input className="w-full bg-white dark:bg-card-dark border border-gray-300 dark:border-border-dark rounded p-4 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-600" placeholder="Código postal" type="text" />
                            </div>
                            <input className="w-full bg-white dark:bg-card-dark border border-gray-300 dark:border-border-dark rounded p-4 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-600" placeholder="Teléfono" type="tel" />
                        </section>

                        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-8 border-t border-gray-200 dark:border-border-dark">
                            <Link className="text-primary text-sm font-bold flex items-center gap-2 hover:opacity-80 transition-all group" href="/">
                                <span className="material-symbols-outlined text-sm transition-transform group-hover:-translate-x-1">arrow_back</span>
                                Volver al carrito
                            </Link>
                            <button className="bg-primary text-white font-black py-5 px-10 rounded uppercase tracking-[0.2em] text-sm hover:brightness-110 active:scale-95 transition-all w-full sm:w-auto shadow-2xl shadow-primary/30">
                                Continuar con el envío
                            </button>
                        </div>

                        <footer className="pt-12 border-t border-zinc-100 dark:border-zinc-900 flex flex-wrap gap-x-8 gap-y-2">
                            {['Política de reembolso', 'Política de envío', 'Términos de servicio'].map(item => (
                                <a key={item} className="text-[10px] text-zinc-400 hover:text-primary uppercase tracking-widest transition-colors" href="#">{item}</a>
                            ))}
                        </footer>
                    </div>

                    {/* Order Summary Section */}
                    <div className="lg:col-span-5 relative animate-fade-in-up">
                        <div className="bg-zinc-50 dark:bg-card-dark p-8 rounded-xl border border-gray-200 dark:border-border-dark h-fit sticky top-32 shadow-xl">
                            <h3 className="text-lg font-bold uppercase tracking-tight mb-8">Resumen del pedido</h3>

                            <div className="space-y-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                                {cart.length > 0 ? (
                                    cart.map((item, idx) => (
                                        <div key={`${item.id}-${idx}`} className="flex items-center gap-5">
                                            <div className="relative flex-shrink-0">
                                                <div className="w-20 h-20 bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-border-dark flex items-center justify-center p-3 overflow-hidden shadow-sm">
                                                    <img
                                                        alt={item.name}
                                                        className="object-contain w-full h-full"
                                                        src={item.image}
                                                    />
                                                </div>
                                                <span className="absolute -top-2 -right-2 bg-zinc-800 dark:bg-primary text-white text-[10px] font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-white dark:border-card-dark shadow-md">
                                                    {item.quantity}
                                                </span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-bold truncate uppercase tracking-tight">{item.name}</h4>
                                                {item.option && <p className="text-xs text-zinc-500 font-medium">{item.option}</p>}
                                            </div>
                                            <span className="text-sm font-bold">${(item.price * item.quantity).toLocaleString()}</span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="py-8 text-center">
                                        <p className="text-sm text-zinc-500 italic">Tu carrito está vacío</p>
                                    </div>
                                )}
                            </div>

                            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-border-dark space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-zinc-500 dark:text-zinc-400 font-medium font-display tracking-wider uppercase text-xs">Subtotal</span>
                                    <span className="font-bold">${subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm items-center">
                                    <span className="text-zinc-500 dark:text-zinc-400 font-medium font-display tracking-wider uppercase text-xs">Envío</span>
                                    <span className="text-[10px] text-zinc-400 italic">Calculado en el siguiente paso</span>
                                </div>
                            </div>

                            <div className="mt-8 pt-8 border-t-2 border-zinc-100 dark:border-zinc-900">
                                <div className="flex justify-between items-end">
                                    <span className="text-sm font-black uppercase tracking-[0.2em] text-zinc-400">Total</span>
                                    <div className="text-right">
                                        <span className="text-xs text-zinc-400 font-bold mr-2">COP</span>
                                        <span className="text-3xl font-black font-display text-primary leading-none tracking-tighter">${subtotal.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 bg-white dark:bg-background-dark/50 p-5 rounded-lg border border-gray-100 dark:border-zinc-800 flex items-center gap-4 transition-all hover:border-primary/30 group">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-primary text-xl">verified</span>
                                </div>
                                <p className="text-[11px] text-zinc-500 leading-snug font-medium">
                                    Garantía de restauración total. Sin grasas, apto para plásticos negros y grises.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <div className="max-w-6xl mx-auto px-4 py-12 flex flex-col items-center border-t border-zinc-100 dark:border-border-dark mt-12 mb-12">
                <div className="flex items-center gap-6 opacity-20 grayscale hover:opacity-50 transition-all duration-700 cursor-default">
                    <span className="material-symbols-outlined text-4xl">flag</span>
                    <div className="w-px h-10 bg-zinc-400"></div>
                    <span className="material-symbols-outlined text-4xl">directions_car</span>
                </div>
                <p className="mt-6 text-[10px] tracking-[0.6em] font-display text-zinc-400 uppercase">SIN GRASAS • ALTA CALIDAD</p>
            </div>
        </div>
    );
}
