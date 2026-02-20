'use client';

import React, { useEffect, useState } from 'react';
import { SITE_CONTENT } from '@/configs/content';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
    const { auth } = SITE_CONTENT;
    const [isLogin, setIsLogin] = useState(true);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true);
            document.body.style.overflow = 'hidden';
        } else {
            const timer = setTimeout(() => setIsAnimating(false), 300);
            document.body.style.overflow = 'unset';
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isOpen && !isAnimating) return null;

    const content = isLogin ? auth.login : auth.register;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`${isLogin ? 'Inicio de sesión' : 'Registro'} exitoso (Demo)`);
        onClose();
    };

    return (
        <div className={`fixed inset-0 z-100 flex items-center justify-center p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className={`relative w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}>
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-full transition-all z-10"
                >
                    <span className="material-symbols-outlined">close</span>
                </button>

                <div className="p-8 md:p-10">
                    {/* Header */}
                    <div className="text-center mb-10 animate-fade-in">
                        <div className="mb-6 flex flex-col items-center">
                            <span className="text-primary font-display font-black text-3xl italic tracking-tighter leading-none">BLACH</span>
                            <div className="h-px w-12 bg-primary my-1"></div>
                            <span className="text-white font-display font-black text-3xl italic tracking-tighter leading-none">BLACH</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-tight">
                            {content.title}
                        </h3>
                        <p className="text-sm text-zinc-500 font-light">
                            {content.subtitle}
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5 animate-fade-in-up">
                        {!isLogin && (
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">{auth.register.fields.name}</label>
                                <input required className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-sm text-white focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-zinc-700" type="text" placeholder="John Doe" />
                            </div>
                        )}

                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">{auth.login.fields.email}</label>
                            <input required className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-sm text-white focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-zinc-700" type="email" placeholder="example@email.com" />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">{auth.login.fields.password}</label>
                            <input required className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-sm text-white focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-zinc-700" type="password" placeholder="••••••••" />
                        </div>

                        {!isLogin && (
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">{auth.register.fields.confirmPassword}</label>
                                <input required className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-sm text-white focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-zinc-700" type="password" placeholder="••••••••" />
                            </div>
                        )}

                        {isLogin && (
                            <div className="flex justify-end">
                                <button type="button" className="text-[10px] font-bold text-zinc-500 hover:text-primary uppercase tracking-widest transition-colors">
                                    ¿Olvidaste tu contraseña?
                                </button>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-primary hover:bg-secondary text-white font-display font-black py-5 rounded-lg uppercase tracking-[0.2em] text-sm shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95 mt-6 italic"
                        >
                            {content.cta}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-10 text-center border-t border-zinc-900 pt-8 animate-fade-in">
                        <p className="text-xs text-zinc-500">
                            {content.footer}{' '}
                            <button
                                onClick={() => setIsLogin(!isLogin)}
                                className="text-primary font-bold hover:underline ml-1"
                            >
                                {content.link}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
