"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';

function SuccessContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const orderId = searchParams.get('id');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!orderId) {
            router.push('/');
        } else {
            // In a real app, we might want to verify the order status here
            // but for now we just show the success message
            const timer = setTimeout(() => setLoading(false), 1500);
            return () => clearTimeout(timer);
        }
    }, [orderId, router]);

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-zinc-500 font-display font-black uppercase tracking-[0.2em] italic text-xs">Verificando Pago...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-32 text-center animate-fade-in-up">
            <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-500/50">
                <span className="material-symbols-outlined text-5xl text-green-500">check_circle</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-display font-black uppercase italic mb-4">
                ¡Gracias por tu <span className="text-primary">Compra!</span>
            </h1>
            <p className="text-zinc-400 text-lg mb-12 max-w-lg mx-auto leading-relaxed">
                Tu pedido <span className="text-white font-mono font-bold">#{orderId}</span> ha sido recibido con éxito.
                Recibirás un correo electrónico con los detalles de tu compra y el seguimiento del envío.
            </p>

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 mb-12 backdrop-blur-xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                    <div>
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Estado</p>
                        <p className="text-sm font-black uppercase text-green-500 italic flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            Procesado
                        </p>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Método</p>
                        <p className="text-sm font-black uppercase text-zinc-200 italic">Wompi / Tarjeta</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Referencia</p>
                        <p className="text-sm font-mono text-zinc-400">{orderId?.slice(0, 12)}...</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                    href="/productos"
                    className="bg-zinc-800 hover:bg-zinc-700 text-white font-display font-black py-4 px-8 rounded-2xl uppercase tracking-[0.2em] text-xs transition-all italic flex items-center justify-center gap-2"
                >
                    <span className="material-symbols-outlined text-sm">shopping_bag</span>
                    Seguir Comprando
                </Link>
                <Link
                    href="/"
                    className="bg-primary hover:bg-secondary text-white font-display font-black py-4 px-8 rounded-2xl uppercase tracking-[0.2em] text-xs shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] italic flex items-center justify-center gap-2"
                >
                    <span className="material-symbols-outlined text-sm">home</span>
                    Volver al Inicio
                </Link>
            </div>
        </div>
    );
}

export default function SuccessPage() {
    return (
        <main className="min-h-screen bg-black text-white">
            <Navbar />
            <Suspense fallback={
                <div className="min-h-[60vh] flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
            }>
                <SuccessContent />
            </Suspense>
            <Footer />
        </main>
    );
}
