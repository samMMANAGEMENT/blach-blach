'use client';

import { useCart } from "@/context/CartContext";
import CartDrawer from "./CartDrawer";

export default function CartDrawerWrapper() {
    const { isDrawerOpen, setIsDrawerOpen } = useCart();

    return (
        <CartDrawer
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
        />
    );
}
