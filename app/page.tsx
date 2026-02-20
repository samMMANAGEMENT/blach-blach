import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import ProductGrid from "@/components/home/ProductGrid";
import CTA from "@/components/home/CTA";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background-dark text-white selection:bg-primary selection:text-white">
      <Navbar />
      <Hero />
      <Features />
      <ProductGrid />
      <CTA />
      <Footer />
    </main>
  );
}
