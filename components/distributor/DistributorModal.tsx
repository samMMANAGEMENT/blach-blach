'use client';

import React, { useEffect, useState } from 'react';
import { SITE_CONTENT } from '@/configs/content';

interface DistributorModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function DistributorModal({ isOpen, onClose }: DistributorModalProps) {
    const { distributor } = SITE_CONTENT;
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        email: '',
        phone: '',
        city: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMsg('');

        try {
            const res = await fetch('/api/distributors', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus('success');
                setTimeout(() => {
                    onClose();
                    setTimeout(() => {
                        setStatus('idle');
                        setFormData({ name: '', lastName: '', email: '', phone: '', city: '', message: '' });
                    }, 500);
                }, 2000);
            } else {
                setStatus('error');
                setErrorMsg(data.error || 'Error al enviar la solicitud');
            }
        } catch (error) {
            console.error("Distributor form error:", error);
            setStatus('error');
            setErrorMsg('Error de conexión');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className={`fixed inset-0 z-100 flex items-start sm:items-center justify-center p-4 overflow-y-auto transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className={`relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh] transition-all duration-300 ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}>
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-full transition-all z-10"
                >
                    <span className="material-symbols-outlined">close</span>
                </button>

                <div className="grid grid-cols-1 md:grid-cols-5">
                    {/* Sidebar / Info */}
                    <div className="md:col-span-2 bg-zinc-900/50 p-6 md:p-8 flex flex-col justify-center border-b md:border-b-0 md:border-r border-zinc-800">
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
                    <div className="md:col-span-3 p-6 md:p-10 bg-zinc-950">
                        {status === 'success' ? (
                            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 animate-fade-in">
                                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                                    <span className="material-symbols-outlined text-primary text-4xl">check_circle</span>
                                </div>
                                <h4 className="text-xl font-display font-black uppercase text-white tracking-widest">¡Solicitud Enviada!</h4>
                                <p className="text-sm text-zinc-400">Pronto un asesor de Blach Blach se pondrá en contacto contigo.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">{distributor.fields.name}</label>
                                        <input required name="name" value={formData.name} onChange={handleChange} className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg p-3 text-sm text-white focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" type="text" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">{distributor.fields.lastName}</label>
                                        <input required name="lastName" value={formData.lastName} onChange={handleChange} className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg p-3 text-sm text-white focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" type="text" />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">{distributor.fields.email}</label>
                                    <input required name="email" value={formData.email} onChange={handleChange} className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg p-3 text-sm text-white focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" type="email" />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">{distributor.fields.phone}</label>
                                        <input required name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg p-3 text-sm text-white focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" type="tel" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">{distributor.fields.city}</label>
                                        <input required name="city" value={formData.city} onChange={handleChange} className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg p-3 text-sm text-white focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" type="text" />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">{distributor.fields.message}</label>
                                    <textarea required name="message" value={formData.message} onChange={handleChange} rows={3} className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg p-3 text-sm text-white focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all resize-none"></textarea>
                                </div>

                                {status === 'error' && (
                                    <p className="text-[10px] text-red-500 uppercase font-bold tracking-widest text-center">{errorMsg}</p>
                                )}

                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="w-full bg-primary hover:bg-secondary text-white font-display font-black py-4 px-8 rounded-lg uppercase tracking-[0.2em] text-sm shadow-xl shadow-primary/20 transition-all hover:-translate-y-0.5 mt-4 italic flex items-center justify-center"
                                >
                                    {status === 'loading' ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        distributor.cta
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
