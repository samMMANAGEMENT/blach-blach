import prisma from "@/lib/prisma";
import ProductCard from "./ProductCard";

export default async function ProductGrid() {
    const products = await prisma.product.findMany({
        orderBy: { createdAt: 'asc' }
    });

    return (
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="productos">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                <div className="reveal-on-scroll">
                    <h2 className="font-display text-4xl md:text-5xl font-black italic mb-4 text-white">
                        NUESTROS <span className="text-primary">PRODUCTOS</span>
                    </h2>
                    <div className="h-2 w-32 bg-primary"></div>
                </div>
                <p className="text-gray-400 max-w-md font-light">
                    Selecciona la presentación que mejor se adapte a tus necesidades de restauración y detallado automotriz.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map((product: any) => (
                    <ProductCard key={product.id} product={product as any} />
                ))}
            </div>
        </section>
    );
}
