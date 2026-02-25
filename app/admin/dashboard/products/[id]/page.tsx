"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { createProduct, updateProduct } from '@/lib/actions/products';

export default function ProductEditorPage() {
    const { id } = useParams();
    const router = useRouter();
    const isNew = id === 'new';

    const [isLoading, setIsLoading] = useState(!isNew);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        stock: '0',
        description: '',
        fullDescription: '',
        category: '',
        badge: '',
        image: '',
        gallery: [] as string[],
        options: [] as string[],
        surfaces: [] as string[],
        specs: {} as any,
        applicationSteps: [] as any[],
    });

    useEffect(() => {
        if (!isNew) {
            fetchProduct();
        }
    }, [id]);

    const fetchProduct = async () => {
        try {
            const res = await fetch(`/api/admin/products/${id}`);
            if (res.ok) {
                const data = await res.json();
                setFormData({
                    ...data,
                    price: data.price.toString(),
                    stock: data.stock.toString(),
                    gallery: data.gallery || [],
                    options: data.options || [],
                    surfaces: data.surfaces || [],
                    specs: data.specs || {},
                    applicationSteps: data.applicationSteps || [],
                });
            }
        } catch (error) {
            console.error("Error fetching product:", error);
            setError('Error al cargar el producto');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setError('');

        try {
            const result = isNew
                ? await createProduct(formData)
                : await updateProduct(id as string, formData);

            if (result.success) {
                router.push('/admin/dashboard/products');
            } else {
                setError(result.error || 'Error al guardar');
            }
        } catch (error) {
            setError('Error de conexión');
        } finally {
            setIsSaving(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    if (isLoading) return <div className="min-h-screen bg-zinc-950 flex items-center justify-center font-display italic text-primary animate-pulse">CARGANDO EDITOR...</div>;

    return (
        <div className="min-h-screen bg-zinc-950 text-white p-4 sm:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <header className="flex justify-between items-center mb-12">
                    <div>
                        <button
                            onClick={() => router.push('/admin/dashboard/products')}
                            className="text-zinc-500 hover:text-white flex items-center gap-1 text-xs font-bold uppercase tracking-widest mb-2 transition-all"
                        >
                            <span className="material-symbols-outlined text-sm">arrow_back</span>
                            Volver al listado
                        </button>
                        <h1 className="text-3xl font-display font-black italic uppercase text-white">
                            {isNew ? 'Nuevo' : 'Editar'} <span className="text-primary">Producto</span>
                        </h1>
                    </div>
                </header>

                <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in-up">
                    {error && (
                        <div className="bg-primary/10 border border-primary/20 text-primary p-4 rounded-xl text-center text-xs font-bold uppercase tracking-widest animate-pulse">
                            {error}
                        </div>
                    )}

                    {/* Basic Info Container */}
                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6">
                        <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-500 mb-6 border-b border-zinc-800 pb-4">Información General</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Nombre del Producto</label>
                                <input required name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-sm focus:border-primary transition-all outline-none" placeholder="Ej: BLACH BLACH PRO" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Categoría</label>
                                <input name="category" value={formData.category} onChange={handleInputChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-sm focus:border-primary transition-all outline-none" placeholder="Ej: Cuidado Exterior" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Precio ($)</label>
                                <input required type="number" step="0.01" name="price" value={formData.price} onChange={handleInputChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-sm focus:border-primary transition-all outline-none" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Stock Inicial</label>
                                <input required type="number" name="stock" value={formData.stock} onChange={handleInputChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-sm focus:border-primary transition-all outline-none" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Cinta / Badge</label>
                                <input name="badge" value={formData.badge} onChange={handleInputChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-sm focus:border-primary transition-all outline-none" placeholder="Ej: PREMIUM, NUEVO" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Imagen Principal (URL)</label>
                            <input required name="image" value={formData.image} onChange={handleInputChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-sm focus:border-primary transition-all outline-none" placeholder="https://..." />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Resumen / Descripción Corta</label>
                            <textarea name="description" value={formData.description} onChange={handleInputChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-sm focus:border-primary transition-all outline-none h-24 resize-none" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Descripción Detallada</label>
                            <textarea name="fullDescription" value={formData.fullDescription} onChange={handleInputChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-sm focus:border-primary transition-all outline-none h-40 resize-none" />
                        </div>
                    </div>

                    {/* Options and Surfaces */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">Presentaciones (Ej: 120ml)</h2>
                                <button type="button" onClick={() => setFormData(prev => ({ ...prev, options: [...prev.options, ""] }))} className="text-primary text-[10px] font-black uppercase flex items-center gap-1"><span className="material-symbols-outlined text-sm">add</span> Añadir</button>
                            </div>
                            <div className="space-y-3">
                                {formData.options.map((opt, i) => (
                                    <div key={i} className="flex gap-2">
                                        <input value={opt} onChange={(e) => {
                                            const newOpts = [...formData.options];
                                            newOpts[i] = e.target.value;
                                            setFormData(prev => ({ ...prev, options: newOpts }));
                                        }} className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs focus:border-primary outline-none" placeholder="120ml" />
                                        <button type="button" onClick={() => setFormData(prev => ({ ...prev, options: prev.options.filter((_, idx) => idx !== i) }))} className="p-3 text-zinc-600 hover:text-primary"><span className="material-symbols-outlined text-sm">delete</span></button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">Superficies (Ej: Tableros)</h2>
                                <button type="button" onClick={() => setFormData(prev => ({ ...prev, surfaces: [...prev.surfaces, ""] }))} className="text-primary text-[10px] font-black uppercase flex items-center gap-1"><span className="material-symbols-outlined text-sm">add</span> Añadir</button>
                            </div>
                            <div className="space-y-3">
                                {formData.surfaces.map((surf, i) => (
                                    <div key={i} className="flex gap-2">
                                        <input value={surf} onChange={(e) => {
                                            const newSurf = [...formData.surfaces];
                                            newSurf[i] = e.target.value;
                                            setFormData(prev => ({ ...prev, surfaces: newSurf }));
                                        }} className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs focus:border-primary outline-none" placeholder="Tableros" />
                                        <button type="button" onClick={() => setFormData(prev => ({ ...prev, surfaces: prev.surfaces.filter((_, idx) => idx !== i) }))} className="p-3 text-zinc-600 hover:text-primary"><span className="material-symbols-outlined text-sm">delete</span></button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Application Steps */}
                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6">
                        <div className="flex justify-between items-center mb-6 border-b border-zinc-800 pb-4">
                            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-500">Pasos de Aplicación</h2>
                            <button type="button" onClick={() => setFormData(prev => ({ ...prev, applicationSteps: [...prev.applicationSteps, { title: "", desc: "" }] }))} className="text-primary text-[10px] font-black uppercase flex items-center gap-1"><span className="material-symbols-outlined text-sm">add</span> Añadir Paso</button>
                        </div>
                        <div className="space-y-6">
                            {formData.applicationSteps.map((step, i) => (
                                <div key={i} className="bg-zinc-950 p-4 sm:p-6 rounded-xl border border-zinc-800 space-y-4 relative group">
                                    <button type="button" onClick={() => setFormData(prev => ({ ...prev, applicationSteps: prev.applicationSteps.filter((_, idx) => idx !== i) }))} className="absolute top-4 right-4 text-zinc-600 hover:text-primary opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all"><span className="material-symbols-outlined text-sm">delete</span></button>
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">Título del Paso {i + 1}</label>
                                        <input value={step.title} onChange={(e) => {
                                            const newSteps = [...formData.applicationSteps];
                                            newSteps[i] = { ...newSteps[i], title: e.target.value };
                                            setFormData(prev => ({ ...prev, applicationSteps: newSteps }));
                                        }} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-xs focus:border-primary outline-none" placeholder="Ej: Limpieza" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">Instrucción</label>
                                        <textarea value={step.desc} onChange={(e) => {
                                            const newSteps = [...formData.applicationSteps];
                                            newSteps[i] = { ...newSteps[i], desc: e.target.value };
                                            setFormData(prev => ({ ...prev, applicationSteps: newSteps }));
                                        }} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-xs focus:border-primary outline-none h-20 resize-none" placeholder="Describa el proceso..." />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Technical Specs & Gallery */}
                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6">
                        <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-500 mb-6 border-b border-zinc-800 pb-4">Detalles Técnicos y Galería</h2>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Galería de Imágenes (URLs separadas por comas)</label>
                            <textarea
                                value={(formData.gallery || []).join(', ')}
                                onChange={(e) => setFormData(prev => ({ ...prev, gallery: e.target.value.split(',').map(s => s.trim()).filter(s => s) }))}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-sm focus:border-primary transition-all outline-none h-24 resize-none"
                                placeholder="https://image1.jpg, https://image2.jpg"
                            />
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Especificaciones Técnicas</label>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setFormData(prev => ({
                                            ...prev,
                                            specs: { ...prev.specs, "": "" }
                                        }));
                                    }}
                                    className="text-primary text-[10px] font-black uppercase tracking-widest hover:text-secondary transition-colors flex items-center gap-1"
                                >
                                    <span className="material-symbols-outlined text-sm">add</span>
                                    Añadir Fila
                                </button>
                            </div>

                            <div className="space-y-3">
                                {Object.entries(formData.specs || {}).map(([key, value], index) => (
                                    <div key={index} className="flex gap-3 animate-fade-in">
                                        <input
                                            placeholder="Propiedad (Ej: Uso)"
                                            value={key}
                                            onChange={(e) => {
                                                const newSpecs = { ...formData.specs };
                                                const val = newSpecs[key];
                                                delete newSpecs[key];
                                                newSpecs[e.target.value] = val;
                                                setFormData(prev => ({ ...prev, specs: newSpecs }));
                                            }}
                                            className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs focus:border-primary outline-none transition-all"
                                        />
                                        <input
                                            placeholder="Valor (Ej: Exterior)"
                                            value={value as string}
                                            onChange={(e) => {
                                                setFormData(prev => ({
                                                    ...prev,
                                                    specs: { ...prev.specs, [key]: e.target.value }
                                                }));
                                            }}
                                            className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs focus:border-primary outline-none transition-all"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const newSpecs = { ...formData.specs };
                                                delete newSpecs[key];
                                                setFormData(prev => ({ ...prev, specs: newSpecs }));
                                            }}
                                            className="p-3 hover:bg-zinc-800 rounded-xl text-zinc-600 hover:text-primary transition-all"
                                        >
                                            <span className="material-symbols-outlined text-sm">delete</span>
                                        </button>
                                    </div>
                                ))}
                                {Object.keys(formData.specs || {}).length === 0 && (
                                    <p className="text-zinc-600 text-[10px] italic text-center py-4 uppercase tracking-widest">No hay especificaciones añadidas</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Form Controls */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <button
                            type="button"
                            onClick={() => router.push('/admin/dashboard/products')}
                            className="w-full sm:flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-5 rounded-2xl text-xs uppercase tracking-[0.2em] transition-all"
                        >
                            Descartar Cambios
                        </button>
                        <button
                            disabled={isSaving}
                            type="submit"
                            className="w-full sm:flex-2 bg-primary hover:bg-secondary text-white font-display font-black py-5 rounded-2xl uppercase tracking-[0.2em] text-sm shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 italic"
                        >
                            {isSaving ? 'GUARDANDO...' : isNew ? 'CREAR PRODUCTO' : 'ACTUALIZAR PRODUCTO'}
                        </button>
                    </div>
                </form>

                <p className="mt-12 text-[10px] text-zinc-700 font-bold uppercase tracking-[0.5em] text-center border-t border-zinc-900 pt-8">
                    Blach Blach Management Tool • 2024
                </p>
            </div>
        </div>
    );
}
