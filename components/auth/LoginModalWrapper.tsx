'use client';

import { useUI } from "@/context/UIContext";
import AuthModal from "./AuthModal";

export default function LoginModalWrapper() {
    const { isLoginModalOpen, setLoginModalOpen } = useUI();

    return (
        <AuthModal
            isOpen={isLoginModalOpen}
            onClose={() => setLoginModalOpen(false)}
        />
    );
}
