import prisma from "@/lib/prisma";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductTabs from "@/components/product/ProductTabs";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
    const products = await prisma.product.findMany({
        select: { id: true }
    });
    return products.map((product: { id: string }) => ({
        id: product.id,
    }));
}

export default async function ProductPage({ params }: PageProps) {
    const { id } = await params;
    const product = await prisma.product.findUnique({
        where: { id }
    });

    if (!product) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-black text-white selection:bg-primary selection:text-white">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
                {/* Navigation Breadcrumb (Optional but nice) */}
                <div className="flex items-center gap-2 mb-12 text-[10px] font-black uppercase tracking-widest text-zinc-600">
                    <a href="/" className="hover:text-white transition-colors">Inicio</a>
                    <span className="material-symbols-outlined text-[10px]">chevron_right</span>
                    <a href="/#productos" className="hover:text-white transition-colors">Productos</a>
                    <span className="material-symbols-outlined text-[10px]">chevron_right</span>
                    <span className="text-primary italic">{product.name}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24">
                    <ProductGallery
                        mainImage={product.image || ""}
                        gallery={product.gallery || []}
                        name={product.name}
                    />

                    <ProductInfo
                        product={{
                            id: product.id,
                            image: product.image || "",
                            category: product.category || "General",
                            name: product.name,
                            price: product.price,
                            options: product.options,
                            rating: product.rating || 5,
                            reviewsCount: product.reviewsCount || 0
                        }}
                    />
                </div>

                <ProductTabs
                    description={product.fullDescription || product.description}
                    applicationSteps={product.applicationSteps || []}
                    surfaces={product.surfaces || []}
                    specs={product.specs as any}
                />
            </div>

            <Footer />
        </main>
    );
}
