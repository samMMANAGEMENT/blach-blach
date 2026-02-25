import { SITE_CONTENT } from "@/configs/content";

export default function Applications() {
    return (
        <section className="py-12 bg-black border-b border-zinc-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
                    <div className="shrink-0">
                        <h2 className="font-display text-2xl md:text-3xl font-black italic uppercase text-white tracking-widest">
                            Aplicaciones
                        </h2>
                    </div>

                    <div className="flex flex-wrap justify-center md:flex-nowrap items-end gap-8 md:gap-12 lg:gap-16">
                        {SITE_CONTENT.applications.map((app, idx) => (
                            <div key={idx} className="flex flex-col items-center group">
                                <span className="material-symbols-outlined text-white text-4xl mb-3 group-hover:text-primary transition-colors duration-300">
                                    {app.icon}
                                </span>
                                <span className="font-display font-black text-xs md:text-sm uppercase tracking-widest text-white group-hover:text-primary transition-colors">
                                    {app.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
