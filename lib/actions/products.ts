"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createProduct(data: any) {
    try {
        // Clean price string for Colombian format (e.g., "35.000" -> 35000)
        const rawPrice = data.price.toString().replace(/[^\d]/g, '');
        const price = parseFloat(rawPrice) || 0;

        const product = await prisma.product.create({
            data: {
                name: data.name,
                price: price,
                stock: parseInt(data.stock) || 0,
                description: data.description,
                fullDescription: data.fullDescription,
                category: data.category,
                badge: data.badge,
                image: data.image,
                gallery: Array.isArray(data.gallery) ? data.gallery : [],
                options: Array.isArray(data.options) ? data.options : [],
                surfaces: Array.isArray(data.surfaces) ? data.surfaces : [],
                specs: data.specs || {},
                rating: parseFloat(data.rating) || 5.0,
                reviewsCount: parseInt(data.reviewsCount) || 0,
                applicationSteps: data.applicationSteps || [],
            },
        });
        revalidatePath("/");
        revalidatePath("/admin/dashboard/products");
        return { success: true, product };
    } catch (error: any) {
        console.error("Error creating product:", error);
        return { success: false, error: error.message || "Error al crear producto" };
    }
}

export async function updateProduct(id: string, data: any) {
    try {
        // Clean price string for Colombian format (e.g., "35.000" -> 35000)
        const rawPrice = data.price.toString().replace(/[^\d]/g, '');
        const price = parseFloat(rawPrice) || 0;

        const product = await prisma.product.update({
            where: { id },
            data: {
                name: data.name,
                price: price,
                stock: parseInt(data.stock) || 0,
                description: data.description,
                fullDescription: data.fullDescription,
                category: data.category,
                badge: data.badge,
                image: data.image,
                gallery: Array.isArray(data.gallery) ? data.gallery : [],
                options: Array.isArray(data.options) ? data.options : [],
                surfaces: Array.isArray(data.surfaces) ? data.surfaces : [],
                specs: data.specs || {},
                rating: parseFloat(data.rating) || 5.0,
                reviewsCount: parseInt(data.reviewsCount) || 0,
                applicationSteps: data.applicationSteps || [],
            },
        });
        revalidatePath("/");
        revalidatePath(`/productos/${id}`);
        revalidatePath("/admin/dashboard/products");
        return { success: true, product };
    } catch (error: any) {
        console.error("Error updating product:", error);
        return { success: false, error: error.message || "Error al actualizar" };
    }
}

export async function deleteProduct(id: string) {
    try {
        await prisma.product.delete({
            where: { id },
        });
        revalidatePath("/");
        revalidatePath("/admin/dashboard/products");
        return { success: true };
    } catch (error) {
        console.error("Error deleting product:", error);
        return { success: false, error: "Error al eliminar" };
    }
}
