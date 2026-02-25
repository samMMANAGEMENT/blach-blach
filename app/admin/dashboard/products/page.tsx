"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { deleteProduct } from '@/lib/actions/products';
import { formatPrice, getGoogleDriveDirectLink } from '@/lib/utils';

interface Product {
    id: string;
    name: string;
    price: number;
    stock: number;
    category: string;
    image: string;
}

export default function AdminProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/admin/products');
            if (res.ok) {
                const data = await res.json();
                setProducts(data);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!productToDelete) return;

        try {
            const result = await deleteProduct(productToDelete);
            if (result.success) {
                setProducts(products.filter(p => p.id !== productToDelete));
                setIsDeleteModalOpen(false);
                setProductToDelete(null);
            }
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-white p-4 sm:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-8 sm:mb-12">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <button
                                onClick={() => router.push('/admin/dashboard')}
                                className="p-2 hover:bg-zinc-900 rounded-full transition-colors"
                            >
                                <span className="material-symbols-outlined text-sm">arrow_back</span>
                            </button>
                            <span className="text-zinc-600 text-[10px] sm:text-xs font-bold uppercase tracking-widest">Gestión de Inventario</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-display font-black italic uppercase text-white tracking-tighter">
                            Productos <span className="text-primary">Blach</span>
                        </h1>
                    </div>

                    <button
                        onClick={() => router.push('/admin/dashboard/products/new')}
                        className="w-full sm:w-auto bg-primary hover:bg-secondary text-white font-display font-black py-4 px-8 rounded-xl uppercase tracking-[0.2em] text-sm shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95 italic flex items-center justify-center gap-2"
                    >
                        <span className="material-symbols-outlined">add</span>
                        Nuevo Producto
                    </button>
                </header>

                {/* Content Area */}
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden backdrop-blur-xl">
                    {/* Desktop Table View */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-zinc-800 bg-zinc-900/50">
                                    <th className="p-6 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Producto</th>
                                    <th className="p-6 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Categoría</th>
                                    <th className="p-6 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Stock</th>
                                    <th className="p-6 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Precio</th>
                                    <th className="p-6 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading ? (
                                    <tr>
                                        <td colSpan={5} className="p-12 text-center text-zinc-500 animate-pulse uppercase tracking-widest font-bold text-xs">
                                            Cargando inventario...
                                        </td>
                                    </tr>
                                ) : products.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="p-12 text-center text-zinc-500">
                                            No hay productos registrados.
                                        </td>
                                    </tr>
                                ) : (
                                    products.map((product) => (
                                        <tr key={product.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/20 transition-colors">
                                            <td className="p-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 shrink-0 rounded-lg bg-zinc-800 overflow-hidden border border-zinc-700">
                                                        <img src={getGoogleDriveDirectLink(product.image)} alt={product.name} className="w-full h-full object-cover" />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-white text-sm uppercase">{product.name}</p>
                                                        <p className="text-[10px] text-zinc-500 font-mono">{product.id}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <span className="text-xs font-bold text-zinc-400 uppercase tracking-tight">{product.category}</span>
                                            </td>
                                            <td className="p-6">
                                                <div className="flex items-center gap-2">
                                                    <span className={`w-1.5 h-1.5 rounded-full ${product.stock > 10 ? 'bg-green-500' : 'bg-primary animate-pulse'}`}></span>
                                                    <span className="text-sm font-bold">{product.stock} unds</span>
                                                </div>
                                            </td>
                                            <td className="p-6 text-sm font-mono text-primary font-bold">
                                                {formatPrice(product.price)}
                                            </td>
                                            <td className="p-6">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => router.push(`/admin/dashboard/products/${product.id}`)}
                                                        className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-all"
                                                    >
                                                        <span className="material-symbols-outlined text-sm">edit</span>
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setProductToDelete(product.id);
                                                            setIsDeleteModalOpen(true);
                                                        }}
                                                        className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-primary transition-all"
                                                    >
                                                        <span className="material-symbols-outlined text-sm">delete</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Card View */}
                    <div className="md:hidden space-y-px">
                        {isLoading ? (
                            <div className="p-12 text-center text-zinc-500 animate-pulse uppercase tracking-widest font-bold text-xs">
                                Cargando inventario...
                            </div>
                        ) : products.length === 0 ? (
                            <div className="p-12 text-center text-zinc-500">
                                No hay productos registrados.
                            </div>
                        ) : (
                            products.map((product) => (
                                <div key={product.id} className="p-4 border-b border-zinc-800/50 hover:bg-zinc-800/20 active:bg-zinc-800/40 transition-colors">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-16 h-16 shrink-0 rounded-xl bg-zinc-800 overflow-hidden border border-zinc-700">
                                            <img src={getGoogleDriveDirectLink(product.image)} alt={product.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start">
                                                <p className="font-bold text-white text-base uppercase truncate pr-2">{product.name}</p>
                                                <span className="text-primary font-mono font-bold whitespace-nowrap text-sm">{formatPrice(product.price)}</span>
                                            </div>
                                            <p className="text-[10px] text-zinc-500 font-mono truncate">{product.id}</p>
                                            <div className="flex items-center gap-3 mt-1">
                                                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-tighter px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded-md">
                                                    {product.category}
                                                </span>
                                                <div className="flex items-center gap-1.5">
                                                    <span className={`w-1.5 h-1.5 rounded-full ${product.stock > 10 ? 'bg-green-500' : 'bg-primary animate-pulse'}`}></span>
                                                    <span className="text-xs font-bold text-zinc-300">{product.stock} unds</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => router.push(`/admin/dashboard/products/${product.id}`)}
                                            className="flex-1 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-white font-bold py-3 rounded-lg text-xs uppercase tracking-widest flex items-center justify-center gap-2"
                                        >
                                            <span className="material-symbols-outlined text-xs">edit</span>
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => {
                                                setProductToDelete(product.id);
                                                setIsDeleteModalOpen(true);
                                            }}
                                            className="flex-1 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-primary font-bold py-3 rounded-lg text-xs uppercase tracking-widest flex items-center justify-center gap-2"
                                        >
                                            <span className="material-symbols-outlined text-xs">delete</span>
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Info Footer */}
                <p className="mt-8 text-[10px] text-zinc-600 font-bold uppercase tracking-[0.3em] text-center">
                    Sistema de Gestión Blach Blach v1.0 • Acceso Autorizado
                </p>
            </div>

            {/* Delete Modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsDeleteModalOpen(false)}></div>
                    <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-8 max-w-sm w-full shadow-2xl animate-scale-in">
                        <h3 className="text-xl font-bold text-white mb-2 uppercase italic tracking-tighter">Eliminar Producto</h3>
                        <p className="text-zinc-500 text-sm mb-8">Esta acción es permanente y no se puede deshacer. ¿Está seguro?</p>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 rounded-lg text-xs uppercase tracking-widest transition-all"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleDelete}
                                className="flex-1 bg-primary hover:bg-secondary text-white font-bold py-3 rounded-lg text-xs uppercase tracking-widest shadow-lg shadow-primary/20 transition-all"
                            >
                                Sí, Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
