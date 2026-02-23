"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { createOrder, getWompiPaymentData } from '@/lib/actions/orders';
import Image from 'next/image';
import Script from 'next/script';

const STEPS = [
    { id: 'contact', title: 'Contacto', icon: 'person' },
    { id: 'shipping', title: 'Envío', icon: 'local_shipping' },
    { id: 'payment', title: 'Pago', icon: 'payments' },
];

export default function CheckoutPage() {
    const { cart, subtotal, clearCart } = useCart();
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);
    const [orderId, setOrderId] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        customerName: '',
        email: '',
        phone: '',
        city: '',
        address: '',
    });

    useEffect(() => {
        if (cart.length === 0 && !orderId) {
            router.push('/');
        }
    }, [cart, orderId, router]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

    const handleCreateOrder = async () => {
        setIsProcessing(true);
        try {
            const result = await createOrder(formData, cart);
            if (result.success) {
                setOrderId(result.orderId as string);
                setCurrentStep(2); // Go to payment step
            } else {
                alert(result.error);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsProcessing(false);
        }
    };

    const handlePay = async () => {
        if (!orderId) return;
        setIsProcessing(true);
        try {
            const wompiData = await getWompiPaymentData(orderId, subtotal);
            if (wompiData.success) {
                const amountInCents = Math.round(subtotal * 100);
                const checkout = new (window as any).WidgetCheckout({
                    currency: 'COP',
                    amountInCents: amountInCents,
                    reference: orderId,
                    publicKey: wompiData.publicKey,
                    signature: { integrity: wompiData.signature },
                    redirectUrl: `${window.location.origin}/admin/dashboard`, // TODO: Create a success page
                });

                checkout.open((result: any) => {
                    const transaction = result.transaction;
                    if (transaction.status === 'APPROVED') {
                        clearCart();
                        router.push('/admin/dashboard');
                    }
                });
            } else {
                alert("Error preparando el pago: " + wompiData.error);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsProcessing(false);
        }
    };

    if (cart.length === 0 && !orderId) return null;

    return (
        <main className="min-h-screen bg-black text-white">
            <Script src="https://checkout.wompi.co/widget.js" strategy="afterInteractive" />
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Left Column: Wizard */}
                    <div className="lg:col-span-8">
                        {/* Progress Stepper */}
                        <div className="flex justify-between mb-12 relative">
                            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-zinc-800 -translate-y-1/2 z-0"></div>
                            {STEPS.map((step, index) => (
                                <div key={step.id} className="relative z-10 flex flex-col items-center">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${currentStep >= index ? 'bg-primary border-primary' : 'bg-black border-zinc-800 text-zinc-600'
                                        }`}>
                                        <span className="material-symbols-outlined text-sm">{step.icon}</span>
                                    </div>
                                    <span className={`text-[10px] font-black uppercase tracking-widest mt-3 ${currentStep >= index ? 'text-primary' : 'text-zinc-600'
                                        }`}>
                                        {step.title}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Step Content */}
                        <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 md:p-12 backdrop-blur-xl">
                            {currentStep === 0 && (
                                <div className="space-y-8 animate-fade-in-up">
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-2xl font-display font-black uppercase italic">Información de <span className="text-primary">Contacto</span></h2>
                                        <button
                                            onClick={() => setFormData({
                                                customerName: 'Samuel Pineda',
                                                email: 'samuel@test.com',
                                                phone: '3001234567',
                                                city: 'Bogotá',
                                                address: 'Calle Falsa 123'
                                            })}
                                            className="text-[10px] font-bold text-primary border border-primary/30 px-3 py-1 rounded-full hover:bg-primary/10 transition-all uppercase tracking-widest"
                                        >
                                            Rellenar Prueba
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Nombre Completo</label>
                                            <input name="customerName" value={formData.customerName} onChange={handleInputChange} className="w-full bg-black border border-zinc-800 rounded-xl p-4 text-sm focus:border-primary transition-all outline-none" placeholder="Juan Pérez" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Correo Electrónico</label>
                                            <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-black border border-zinc-800 rounded-xl p-4 text-sm focus:border-primary transition-all outline-none" placeholder="juan@ejemplo.com" />
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Teléfono / WhatsApp</label>
                                            <input name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-black border border-zinc-800 rounded-xl p-4 text-sm focus:border-primary transition-all outline-none" placeholder="300 000 0000" />
                                        </div>
                                    </div>
                                    <button onClick={nextStep} disabled={!formData.customerName || !formData.email || !formData.phone} className="w-full bg-primary hover:bg-secondary text-white font-display font-black py-5 rounded-2xl uppercase tracking-[0.2em] text-sm shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] disabled:opacity-50 italic">
                                        Continuar al Envío
                                    </button>
                                </div>
                            )}

                            {currentStep === 1 && (
                                <div className="space-y-8 animate-fade-in-up">
                                    <h2 className="text-2xl font-display font-black uppercase italic">Dirección de <span className="text-primary">Envío</span></h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Ciudad</label>
                                            <input name="city" value={formData.city} onChange={handleInputChange} className="w-full bg-black border border-zinc-800 rounded-xl p-4 text-sm focus:border-primary transition-all outline-none" placeholder="Bogotá, Medellín..." />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Dirección Exacta</label>
                                            <input name="address" value={formData.address} onChange={handleInputChange} className="w-full bg-black border border-zinc-800 rounded-xl p-4 text-sm focus:border-primary transition-all outline-none" placeholder="Calle 123 # 45 - 67" />
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <button onClick={prevStep} className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-5 rounded-2xl uppercase tracking-[0.2em] text-xs transition-all italic">
                                            Atrás
                                        </button>
                                        <button onClick={handleCreateOrder} disabled={isProcessing || !formData.city || !formData.address} className="flex-2 bg-primary hover:bg-secondary text-white font-display font-black py-5 rounded-2xl uppercase tracking-[0.2em] text-sm shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] italic">
                                            {isProcessing ? 'Procesando...' : 'Revisar y Pagar'}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {currentStep === 2 && (
                                <div className="space-y-8 animate-fade-in-up text-center">
                                    <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <span className="material-symbols-outlined text-4xl text-primary animate-bounce">shopping_cart_checkout</span>
                                    </div>
                                    <h2 className="text-2xl font-display font-black uppercase italic">¡Orden <span className="text-primary">Registrada!</span></h2>
                                    <p className="text-zinc-400 text-sm max-w-sm mx-auto">Tu pedido ha sido creado con el ID: <span className="text-white font-mono">{orderId}</span>. Ahora puedes proceder al pago seguro con Wompi.</p>

                                    <div className="bg-black border border-zinc-800 rounded-2xl p-6 space-y-4">
                                        <p className="text-[10px] font-bold text-white uppercase tracking-widest">Método de pago seguro</p>
                                        <div className="flex justify-center gap-4">
                                            <Image src="https://wompi.com/assets/img/plan_tarifas/reglamento-ico.svg" alt="Tarjeta" width={40} height={25} className="object-contain" />
                                            <Image src="https://wompi.com/assets/img/plan_tarifas/bcol-ico.svg" alt="Bancolombia" width={40} height={25} className="object-contain" />
                                            <Image src="https://wompi.com/assets/img/plan_tarifas/pse-ico.svg" alt="PSE" width={40} height={40} className="object-contain" />
                                        </div>
                                        <button
                                            onClick={handlePay}
                                            disabled={isProcessing}
                                            className="w-full bg-[#f9db3d] text-black font-display font-black py-4 rounded-xl uppercase tracking-[0.2em] text-sm shadow-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                                        >
                                            <span className="material-symbols-outlined">security</span>
                                            {isProcessing ? 'Iniciando Wompi...' : 'PAGAR CON WOMPI'}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="lg:col-span-4">
                        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 sticky top-32">
                            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-500 mb-8 border-b border-zinc-800 pb-4">Resumen del Pedido</h3>

                            <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                {cart.map((item) => (
                                    <div key={`${item.id}-${item.option}`} className="flex gap-4">
                                        <div className="w-16 h-16 bg-black border border-zinc-800 rounded-lg flex-shrink-0 relative overflow-hidden">
                                            <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-black uppercase truncate text-zinc-200">{item.name}</p>
                                            <p className="text-[10px] text-zinc-500 uppercase tracking-widest">{item.option}</p>
                                            <div className="flex justify-between items-center mt-1">
                                                <span className="text-[10px] text-zinc-400">Cant: {item.quantity}</span>
                                                <span className="text-xs font-bold text-primary">{formatPrice(item.price * item.quantity)}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4 border-t border-zinc-800 pt-6">
                                <div className="flex justify-between text-zinc-400">
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Subtotal</span>
                                    <span className="text-xs font-bold">{formatPrice(subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-zinc-400">
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Envío</span>
                                    <span className="text-xs font-bold text-green-500 italic">GRATIS</span>
                                </div>
                                <div className="flex justify-between text-white pt-2 border-t border-zinc-900">
                                    <span className="text-xs font-black uppercase tracking-[0.2em]">Total</span>
                                    <span className="text-xl font-black text-primary">{formatPrice(subtotal)}</span>
                                </div>
                            </div>

                            <p className="mt-8 text-[9px] text-zinc-600 text-center leading-relaxed italic uppercase tracking-widest">
                                Los envíos se realizan de 2 a 5 días hábiles después de confirmado el pago.
                            </p>
                        </div>
                    </div>

                </div>
            </div>

            <Footer />
        </main>
    );
}
