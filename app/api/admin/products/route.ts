import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const GET = auth(async (req) => {
    if (!req.auth || (req.auth.user as any)?.role !== "ADMIN") {
        return NextResponse.json({ message: "No autorizado" }, { status: 401 });
    }

    try {
        const products = await prisma.product.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json({ message: "Error interno" }, { status: 500 });
    }
});

export const POST = auth(async (req) => {
    if (!req.auth || (req.auth.user as any)?.role !== "ADMIN") {
        return NextResponse.json({ message: "No autorizado" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const product = await prisma.product.create({
            data: {
                ...body,
                price: parseFloat(body.price),
                stock: parseInt(body.stock),
                specs: body.specs || {},
                applicationSteps: body.applicationSteps || [],
            },
        });
        return NextResponse.json(product, { status: 201 });
    } catch (error) {
        console.error("Error creating product:", error);
        return NextResponse.json({ message: "Error al crear el producto" }, { status: 500 });
    }
});
