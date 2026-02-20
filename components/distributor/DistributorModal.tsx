'use client';

import React, { useEffect, useState } from 'react';
import { SITE_CONTENT } from '@/configs/content';

interface DistributorModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function DistributorModal({ isOpen, onClose }: DistributorModalProps) {
    const { distributor } = SITE_CONTENT;
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically handle the form submission
        alert('Solicitud enviada con éxito. Pronto nos pondremos en contacto contigo.');
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
            <div className={`relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}>
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-full transition-all z-10"
                >
                    <span className="material-symbols-outlined">close</span>
                </button>

                <div className="grid grid-cols-1 md:grid-cols-5 h-full">
                    {/* Sidebar / Info */}
                    <div className="md:col-span-2 bg-zinc-900/50 p-8 flex flex-col justify-center border-b md:border-b-0 md:border-r border-zinc-800">
                        <div className="mb-8">
                            <span className="text-primary font-display font-black text-4xl italic leading-none">BLACH</span>
                            <br />
                            <span className="text-white font-display font-black text-4xl italic leading-none">BLACH</span>
                        </div>
                        <h3 className="text-xl font-bold uppercase tracking-tight text-white mb-4">
                            {distributor.title}
                        </h3>
                        <p className="text-sm text-zinc-400 font-light leading-relaxed">
                            {distributor.subtitle}
                        </p>

                        <div className="mt-8 space-y-4">
                            <div className="flex items-center gap-3 text-zinc-300">
                                <span className="material-symbols-outlined text-primary">local_shipping</span>
                                <span className="text-xs font-bold tracking-widest uppercase">Envío Nacional</span>
                            </div>
                            <div className="flex items-center gap-3 text-zinc-300">
                                <span className="material-symbols-outlined text-primary">support_agent</span>
                                <span className="text-xs font-bold tracking-widest uppercase">Soporte 24/7</span>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="md:col-span-3 p-8 md:p-10 bg-zinc-950">
                        <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">{distributor.fields.name}</label>
                                    <input required className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg p-3 text-sm text-white focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" type="text" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">{distributor.fields.lastName}</label>
                                    <input required className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg p-3 text-sm text-white focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" type="text" />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">{distributor.fields.email}</label>
                                <input required className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg p-3 text-sm text-white focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" type="email" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">{distributor.fields.phone}</label>
                                    <input required className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg p-3 text-sm text-white focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" type="tel" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">{distributor.fields.city}</label>
                                    <input required className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg p-3 text-sm text-white focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" type="text" />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">{distributor.fields.message}</label>
                                <textarea required rows={3} className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg p-3 text-sm text-white focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all resize-none"></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-primary hover:bg-secondary text-white font-display font-black py-4 px-8 rounded-lg uppercase tracking-[0.2em] text-sm shadow-xl shadow-primary/20 transition-all hover:-translate-y-0.5 mt-4 italic"
                            >
                                {distributor.cta}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
