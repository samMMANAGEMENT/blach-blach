"use client";

import { BRAND_CONFIG } from "@/configs/brand";
import Link from "next/link";
import { useState } from "react";

export default function Footer() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus("loading");
        try {
            const res = await fetch("/api/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus("success");
                setMessage("¡Gracias por suscribirte!");
                setEmail("");
            } else {
                setStatus("error");
                setMessage(data.error || "Algo salió mal");
            }
        } catch (error) {
            setStatus("error");
            setMessage("Error de conexión");
        }
    };

    return (
        <footer className="bg-zinc-950 pt-24 pb-12 border-t border-zinc-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
                    {/* Brand Info */}
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex flex-col items-start mb-8">
                            <span className="font-display text-2xl font-black tracking-widest text-white italic">
                                {BRAND_CONFIG.name.split(" ")[0]}{" "}
                                <span className="text-primary">{BRAND_CONFIG.name.split(" ")[1]}</span>
                            </span>
                            <div className="w-20 h-1 bg-primary mt-2"></div>
                        </div>
                        <p className="text-sm text-gray-500 mb-8 leading-relaxed font-light">
                            Líderes en restauración de partes negras y grises en todo tipo de transporte.
                            Producto 100% Colombiano.
                        </p>
                        <div className="flex space-x-5">
                            {/* Simple Social placeholders */}
                            {['facebook', 'instagram', 'youtube'].map((social) => (
                                <Link
                                    key={social}
                                    href="#"
                                    className="h-10 w-10 bg-zinc-900 rounded-sm flex items-center justify-center hover:bg-primary transition-all text-white"
                                >
                                    <span className="material-symbols-outlined text-lg">
                                        {social === 'facebook' ? 'groups' : social === 'instagram' ? 'photo_camera' : 'smart_display'}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Menú Links */}
                    <div>
                        <h4 className="font-display font-black mb-8 uppercase tracking-[0.2em] text-xs text-white">Menú</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            {["Productos", "Nuestra Historia", "Preguntas Frecuentes"].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="hover:text-primary transition-colors inline-block">{item}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Soporte Links */}
                    <div>
                        <h4 className="font-display font-black mb-8 uppercase tracking-[0.2em] text-xs text-white">Soporte</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            {["Envíos", "Devoluciones", "Privacidad", "Términos"].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="hover:text-primary transition-colors inline-block">{item}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-display font-black mb-8 uppercase tracking-[0.2em] text-xs text-white">Boletín</h4>
                        <p className="text-xs text-gray-500 mb-6 leading-relaxed">Recibe consejos de detallado y ofertas exclusivas.</p>
                        <form onSubmit={handleSubmit} className="flex bg-zinc-900 p-1 border border-zinc-800 focus-within:border-primary transition-colors">
                            <input
                                type="email"
                                placeholder="Tu email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-transparent border-none px-4 py-3 text-sm grow outline-none text-white w-full"
                                required
                            />
                            <button
                                type="submit"
                                disabled={status === "loading"}
                                className="bg-primary px-5 py-3 hover:bg-secondary transition-colors text-white disabled:opacity-50"
                            >
                                {status === "loading" ? (
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <span className="material-symbols-outlined text-sm">send</span>
                                )}
                            </button>
                        </form>
                        {message && (
                            <p className={`mt-2 text-[10px] uppercase font-bold tracking-widest ${status === "success" ? "text-green-500" : "text-red-500"}`}>
                                {message}
                            </p>
                        )}
                    </div>
                </div>

                {/* Bottom Area */}
                <div className="pt-10 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-bold">
                        © 2024 {BRAND_CONFIG.name}. Todos los derechos reservados.
                    </p>
                    <div className="flex items-center space-x-8">
                        {/* Simple Text Placeholders for Payments for cleaner Look */}
                        <span className="text-[10px] text-zinc-600 font-black tracking-widest uppercase">VISA</span>
                        <span className="text-[10px] text-zinc-600 font-black tracking-widest uppercase">MASTERCARD</span>
                        <span className="text-[10px] text-zinc-600 font-black tracking-widest uppercase">PAYPAL</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
