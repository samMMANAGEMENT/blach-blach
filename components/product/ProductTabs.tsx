"use client";

import { useState } from "react";

interface ProductTabsProps {
    description: string;
    applicationSteps: { title: string; desc: string }[];
    surfaces: string[];
    specs: Record<string, string>;
}

export default function ProductTabs({ description, applicationSteps, surfaces, specs }: ProductTabsProps) {
    const [activeTab, setActiveTab] = useState("desc");

    const tabs = [
        { id: "desc", label: "Descripción" },
        { id: "app", label: "Aplicación" },
        { id: "specs", label: "Especificaciones" },
        { id: "reviews", label: "Opiniones" },
    ];

    return (
        <section className="mt-24">
            {/* Tab Headers */}
            <div className="border-b border-zinc-800 flex gap-8 md:gap-12 overflow-x-auto pb-px scrollbar-hide">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`pb-4 font-black uppercase text-[10px] tracking-[0.3em] whitespace-nowrap transition-all border-b-2 ${activeTab === tab.id
                            ? "border-primary text-primary"
                            : "border-transparent text-zinc-500 hover:text-white"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 py-16">
                <div className="lg:col-span-2 space-y-12">
                    {activeTab === "desc" && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h3 className="font-display text-2xl font-black uppercase mb-8 text-white italic">
                                Poder de Restauración <span className="text-primary">Extrema</span>
                            </h3>
                            <p className="text-zinc-400 mb-10 leading-relaxed font-light text-lg">
                                {description}
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {[
                                    { title: "Restauración Total", desc: "Devuelve el color negro intenso a plásticos opacos." },
                                    { title: "Protección UV", desc: "Bloquea rayos solares evitando el envejecimiento prematuro." },
                                    { title: "Efecto Seco", desc: "No deja sensación grasosa ni atrae el polvo." },
                                    { title: "Hidrofóbico", desc: "Repele el agua y la suciedad del camino." },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-4 p-5 bg-zinc-900 border border-zinc-800 rounded-sm group hover:border-primary/30 transition-colors">
                                        <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">check_circle</span>
                                        <div>
                                            <p className="text-white font-black text-xs uppercase tracking-widest mb-1">{item.title}</p>
                                            <p className="text-[10px] text-zinc-500 uppercase font-bold">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-16">
                                <h3 className="font-display text-xl font-black uppercase mb-8 text-white italic">
                                    Superficies <span className="text-primary">Recomendadas</span>
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {surfaces.map((s) => (
                                        <span key={s} className="px-5 py-2 bg-zinc-900 border border-zinc-800 rounded-sm text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-primary transition-colors">
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "app" && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h3 className="font-display text-2xl font-black uppercase mb-10 text-white italic">
                                Modo de <span className="text-primary">Aplicación</span>
                            </h3>
                            <div className="space-y-10">
                                {applicationSteps.map((step, idx) => (
                                    <div key={idx} className="flex gap-8 group">
                                        <div className="shrink-0 w-12 h-12 bg-primary text-white flex items-center justify-center font-black font-display italic text-xl skew-x-12-neg group-hover:scale-110 transition-transform">
                                            <span className="transform skew-x-12">{idx + 1}</span>
                                        </div>
                                        <div>
                                            <p className="font-black text-white uppercase text-sm mb-2 tracking-widest italic">{step.title}</p>
                                            <p className="text-zinc-400 text-sm font-light leading-relaxed">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === "specs" && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h3 className="font-display text-2xl font-black uppercase mb-10 text-white italic">
                                Ficha <span className="text-primary">Técnica</span>
                            </h3>
                            <div className="space-y-6 max-w-xl">
                                {Object.entries(specs).map(([key, value]) => (
                                    <div key={key} className="flex justify-between py-4 border-b border-zinc-800 group hover:border-primary/50 transition-colors">
                                        <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest">{key}</span>
                                        <span className="font-black text-white text-xs uppercase tracking-widest">{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === "reviews" && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col items-center justify-center py-20 text-center">
                            <span className="material-symbols-outlined text-zinc-800 text-6xl mb-6">rate_review</span>
                            <p className="text-zinc-500 uppercase font-black tracking-widest">Sección de reseñas en mantenimiento</p>
                        </div>
                    )}
                </div>

                <aside className="space-y-8">
                    <div className="bg-zinc-900 p-8 border border-zinc-800">
                        <h4 className="font-black uppercase tracking-[0.3em] text-[10px] mb-8 text-primary italic">Especificaciones Rápidas</h4>
                        <div className="space-y-6">
                            {Object.entries(specs).slice(0, 4).map(([key, value]) => (
                                <div key={key} className="flex flex-col gap-1">
                                    <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">{key}</span>
                                    <span className="text-xs font-black text-white uppercase tracking-wider">{value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-primary/5 p-8 border border-primary/20">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="material-symbols-outlined text-primary text-sm">info</span>
                            <span className="text-white font-black uppercase text-[10px] tracking-widest">Nota de Seguridad</span>
                        </div>
                        <p className="text-[10px] text-zinc-500 leading-relaxed italic uppercase font-bold">
                            No aplicar en pedales, bandas de rodadura de neumáticos ni superficies donde el deslizamiento sea peligroso. Manténgase fuera del alcance de los niños.
                        </p>
                    </div>
                </aside>
            </div>
        </section>
    );
}
