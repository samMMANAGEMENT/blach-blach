import { NextResponse } from "next/server";
import crypto from "node:crypto";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { data, timestamp, signature } = body;

        // 1. Validar la firma de Wompi (Webhook Security)
        // La firma se genera concatenando data.transaction.id + data.transaction.status + data.transaction.amount_in_cents + timestamp + WOMPI_EVENTS_SECRET
        const transaction = data.transaction;
        const eventsSecret = process.env.WOMPI_EVENTS_SECRET;

        if (!eventsSecret) {
            console.error("WOMPI_EVENTS_SECRET not configured");
            return NextResponse.json({ error: "Config error" }, { status: 500 });
        }

        const chain = `${transaction.id}${transaction.status}${transaction.amount_in_cents}${timestamp}${eventsSecret}`;
        const checksum = crypto.createHash('sha256').update(chain).digest('hex');

        if (checksum !== signature.checksum) {
            console.warn("Invalid Wompi webhook signature");
            return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
        }

        // 2. Actualizar el estado de la orden en nuestra DB
        // La referencia (reference) es nuestro Order ID (posiblemente con un sufijo de unicidad separado por "-")
        const reference = transaction.reference;
        const orderId = reference.split('-')[0];

        let newStatus = "PENDING";
        if (transaction.status === "APPROVED") newStatus = "PAID";
        if (transaction.status === "DECLINED") newStatus = "CANCELLED";
        if (transaction.status === "VOIDED") newStatus = "CANCELLED";

        await prisma.order.update({
            where: { id: orderId },
            data: {
                status: newStatus,
                wompiId: transaction.id // Guardamos el ID de Wompi para referencia
            }
        });

        console.log(`✅ Orden ${orderId} actualizada a ${newStatus} vía Wompi Webhook`);

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Wompi Webhook Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
