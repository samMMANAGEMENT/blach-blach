import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import Link from 'next/link';
import prisma from "@/lib/prisma";

export default async function AdminDashboardPage() {
    const session = await auth();

    if (!session) {
        redirect("/admin/login");
    }

    // Fetch counts for stats
    const [productsCount, distributorsCount] = await Promise.all([
        prisma.product.count(),
        prisma.distributorRequest.count(),
    ]);

    return (
        <div className="min-h-screen bg-zinc-950 text-white p-8">
            <div className="max-w-7xl mx-auto">
                <header className="flex justify-between items-center mb-12 animate-fade-in">
                    <div>
                        <h1 className="text-3xl font-display font-black italic uppercase text-primary">Panel de Control</h1>
                        <p className="text-zinc-500 mt-1">Bienvenido, {session.user?.name}</p>
                    </div>

                    <form action={async () => {
                        "use server";
                        await signOut({ redirectTo: "/admin/login" });
                    }}>
                        <button className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 px-6 py-2 rounded-lg text-sm font-bold transition-all">
                            Cerrar Sesión
                        </button>
                    </form>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 animate-fade-in-up">
                    <Link href="/admin/dashboard/products">
                        <StatCard title="Productos" value={productsCount.toString()} icon="inventory_2" />
                    </Link>
                    <StatCard title="Pedidos" value="0" icon="shopping_bag" />
                    <StatCard title="Distribudores" value={distributorsCount.toString()} icon="person_add" />
                    <StatCard title="Newsletter" value="0" icon="mail" />
                </div>

                <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                    <h2 className="text-xl font-bold mb-6 uppercase tracking-widest text-zinc-400">Próximos Pasos</h2>
                    <div className="space-y-4">
                        <div className="flex gap-4 p-4 bg-zinc-950 border border-zinc-800 rounded-xl">
                            <span className="material-symbols-outlined text-primary">database</span>
                            <div>
                                <h3 className="font-bold">Configurar Base de Datos</h3>
                                <p className="text-sm text-zinc-500">Asegúrate de tener una instancia de PostgreSQL y ejecuta las migraciones de Prisma.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, icon }: { title: string, value: string, icon: string }) {
    return (
        <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl hover:border-primary/50 transition-all group">
            <div className="flex justify-between items-start mb-4">
                <span className="material-symbols-outlined text-zinc-600 group-hover:text-primary transition-colors">{icon}</span>
                <span className="text-primary text-xs font-black italic">+0%</span>
            </div>
            <h3 className="text-zinc-500 text-xs font-bold uppercase tracking-widest">{title}</h3>
            <p className="text-3xl font-display font-black italic mt-1">{value}</p>
        </div>
    );
}
