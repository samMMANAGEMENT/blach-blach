"use client";

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { BRAND_CONFIG } from '@/configs/brand';

export default function AdminLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError('Credenciales incorrectas');
            } else {
                router.push('/admin/dashboard');
            }
        } catch (err) {
            setError('Ocurrió un error inesperado');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
            {/* Background Decorative */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full"></div>
                <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full"></div>
            </div>

            <div className="w-full max-w-md relative z-10 animate-fade-in">
                <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-2xl p-8 md:p-10 shadow-2xl">
                    {/* Logo */}
                    <div className="text-center mb-10">
                        <div className="mb-6 flex flex-col items-center">
                            <span className="text-primary font-display font-black text-4xl italic tracking-tighter leading-none">BLACH</span>
                            <div className="h-0.5 w-16 bg-primary my-1"></div>
                            <span className="text-white font-display font-black text-4xl italic tracking-tighter leading-none">BLACH</span>
                        </div>
                        <h1 className="text-xl font-bold text-white uppercase tracking-widest italic">Panel Administrativo</h1>
                        <p className="text-zinc-500 text-sm mt-2">Ingrese sus credenciales para continuar</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-primary/10 border border-primary/20 text-primary text-xs font-bold py-3 px-4 rounded-lg text-center animate-pulse">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] ml-1">Correo Electrónico</label>
                            <input
                                required
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl p-4 text-sm text-white focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all placeholder:text-zinc-700"
                                placeholder="admin@blach.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Contraseña</label>
                                <button type="button" className="text-[10px] font-bold text-zinc-600 hover:text-primary transition-colors uppercase tracking-widest">¿Olvidó su contraseña?</button>
                            </div>
                            <input
                                required
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl p-4 text-sm text-white focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all placeholder:text-zinc-800"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            disabled={isLoading}
                            type="submit"
                            className="w-full bg-primary hover:bg-secondary text-white font-display font-black py-4 rounded-xl uppercase tracking-[0.2em] text-sm shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed italic"
                        >
                            {isLoading ? 'Autenticando...' : 'Iniciar Sesión'}
                        </button>
                    </form>

                    <div className="mt-10 text-center">
                        <Link href="/" className="text-[10px] font-bold text-zinc-600 hover:text-white transition-colors uppercase tracking-[0.2em]">
                            ← Volver al sitio principal
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

import Link from 'next/link';
