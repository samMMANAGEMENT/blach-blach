import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const GET = auth(async (req) => {
    if (!req.auth || (req.auth.user as any)?.role !== "ADMIN") {
        return NextResponse.json({ message: "No autorizado" }, { status: 401 });
    }

    const segments = req.nextUrl.pathname.split("/");
    const id = segments[segments.length - 1];

    try {
        const product = await prisma.product.findUnique({
            where: { id },
        });

        if (!product) {
            return NextResponse.json({ message: "Producto no encontrado" }, { status: 404 });
        }

        return NextResponse.json(product);
    } catch (error) {
        return NextResponse.json({ message: "Error interno" }, { status: 500 });
    }
});

export const DELETE = auth(async (req) => {
    if (!req.auth || (req.auth.user as any)?.role !== "ADMIN") {
        return NextResponse.json({ message: "No autorizado" }, { status: 401 });
    }

    const segments = req.nextUrl.pathname.split("/");
    const id = segments[segments.length - 1];

    try {
        await prisma.product.delete({
            where: { id },
        });
        return NextResponse.json({ message: "Producto eliminado" });
    } catch (error) {
        return NextResponse.json({ message: "Error al eliminar el producto" }, { status: 500 });
    }
});
