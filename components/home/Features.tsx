import { SITE_CONTENT } from "@/configs/content";

export default function Features() {
    return (
        <section className="py-16 bg-zinc-900/50 border-y border-zinc-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {SITE_CONTENT.features.map((feature, idx) => (
                        <div key={idx} className="flex flex-col items-center text-center group">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                                <span className="material-symbols-outlined text-primary text-3xl">
                                    {feature.icon}
                                </span>
                            </div>
                            <h3 className="font-display font-bold mb-2 text-white">
                                {feature.title}
                            </h3>
                            <p className="text-sm text-gray-400">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
