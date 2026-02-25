"use client";

import Link from "next/link";
import { useUI } from "@/context/UIContext";
import { SITE_CONTENT } from "@/configs/content";

export default function CTA() {
    const { contact } = SITE_CONTENT;
    const { setDistributorModalOpen } = useUI();

    return (
        <section className="bg-primary py-24 overflow-hidden relative">
            {/* Background Icon Decor */}
            <div className="absolute -right-20 -top-20 opacity-10 pointer-events-none">
                <span className="material-symbols-outlined text-[24rem] text-white">
                    speed
                </span>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <h2 className="font-display text-4xl md:text-5xl font-black italic text-white mb-6 uppercase tracking-tighter">
                    {contact.description}
                </h2>
                <p className="text-white/80 text-lg mb-12 max-w-2xl mx-auto font-light">
                    {contact.sub}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="#productos"
                        className="w-full sm:w-auto bg-white text-black hover:bg-zinc-100 font-display font-black py-4 px-10 transition-all transform hover:scale-105 skew-x-12-neg group"
                    >
                        <span className="inline-block transform skew-x-12 uppercase tracking-widest text-sm">
                            {contact.buttons?.car}
                        </span>
                    </Link>

                    <Link
                        href="#productos"
                        className="w-full sm:w-auto bg-white text-black hover:bg-zinc-100 font-display font-black py-4 px-10 transition-all transform hover:scale-105 skew-x-12-neg group"
                    >
                        <span className="inline-block transform skew-x-12 uppercase tracking-widest text-sm">
                            {contact.buttons?.moto}
                        </span>
                    </Link>

                    <button
                        onClick={() => setDistributorModalOpen(true)}
                        className="w-full sm:w-auto bg-zinc-950 text-white hover:bg-black font-display font-black py-4 px-10 transition-all transform hover:scale-105 skew-x-12-neg group border border-white/20"
                    >
                        <span className="inline-block transform skew-x-12 uppercase tracking-widest text-sm">
                            {contact.buttons?.distributor}
                        </span>
                    </button>
                </div>
            </div>
        </section>
    );
}
