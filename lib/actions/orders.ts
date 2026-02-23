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
        const signature = await generateWompiSignature(orderId, amount);
        return {
            success: true,
            signature,
            publicKey: process.env.WOMPI_PUBLIC_KEY
        };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
