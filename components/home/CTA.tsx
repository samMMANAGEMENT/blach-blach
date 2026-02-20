import { SITE_CONTENT } from "@/configs/content";

export default function CTA() {
    const { contact } = SITE_CONTENT;

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
                <button className="bg-white text-primary hover:bg-zinc-100 font-display font-black py-5 px-14 transition-all transform hover:scale-105 skew-x-12-neg group">
                    <span className="inline-block transform skew-x-12 uppercase tracking-widest">
                        COMPRAR AHORA
                    </span>
                </button>
            </div>
        </section>
    );
}
