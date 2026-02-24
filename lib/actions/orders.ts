"use server";

import prisma from "@/lib/prisma";
import { CartItem } from "@/context/CartContext";
import { generateWompiSignature } from "@/lib/wompi";

export async function createOrder(customerData: {
    customerName: string;
    email: string;
    phone: string;
    city: string;
    address: string;
}, cartItems: CartItem[]) {
    try {
        const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

        // Use a transaction to ensure both order and items are created
        const order = await prisma.$transaction(async (tx: any) => {
            const newOrder = await tx.order.create({
                data: {
                    customerName: customerData.customerName,
                    email: customerData.email,
                    phone: customerData.phone,
                    city: customerData.city,
                    address: customerData.address,
                    total: total,
                    status: "PENDING",
                    items: {
                        create: cartItems.map(item => ({
                            productId: item.id,
                            name: item.name,
                            price: item.price,
                            quantity: item.quantity,
                            option: item.option
                        }))
                    }
                }
            });

            return newOrder;
        });

        return { success: true, orderId: order.id, total };
    } catch (error: any) {
        console.error("Error creating order:", error);
        return { success: false, error: error.message || "Error al crear la orden" };
    }
}

export async function getWompiPaymentData(orderId: string, amount: number) {
    try {
        const amountInCents = Math.round(amount * 100);
        // Generamos una referencia única por cada intento de pago para evitar errores en Wompi
        // conservando el orderId original para el webhook (el separador "-" es preferido por Wompi)
        const uniqueReference = `${orderId}-${Date.now()}`;

        const signature = await generateWompiSignature(uniqueReference, amount);
        const publicKey = process.env.WOMPI_PUBLIC_KEY;

        if (!publicKey) {
            throw new Error("WOMPI_PUBLIC_KEY no está configurada en el servidor");
        }

        console.log("--- WOMPI ACTION DEBUG ---");
        console.log("OrderId:", orderId);
        console.log("UniqueRef:", uniqueReference);
        console.log("Sig:", signature);
        console.log("--------------------------");

        return {
            success: true,
            signature,
            amountInCents,
            publicKey,
            reference: uniqueReference
        };
    } catch (error: any) {
        console.error("getWompiPaymentData Error:", error);
        return { success: false, error: error.message };
    }
}
