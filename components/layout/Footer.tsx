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
                            <a
                                href={BRAND_CONFIG.socials.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="h-10 w-10 bg-zinc-900 rounded-sm flex items-center justify-center hover:bg-primary transition-all text-white"
                                title="Facebook"
                            >
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>
                            <a
                                href={BRAND_CONFIG.socials.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="h-10 w-10 bg-zinc-900 rounded-sm flex items-center justify-center hover:bg-primary transition-all text-white"
                                title="Instagram"
                            >
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </a>
                            <a
                                href={BRAND_CONFIG.socials.maps}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="h-10 w-10 bg-zinc-900 rounded-sm flex items-center justify-center hover:bg-primary transition-all text-white"
                                title="Google Maps"
                            >
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                    <path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" />
                                </svg>
                            </a>
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
                        <span className="text-[10px] text-zinc-600 font-black tracking-widest uppercase">WOMPI</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
