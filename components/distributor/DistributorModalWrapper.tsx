'use client';

import { useUI } from "@/context/UIContext";
import DistributorModal from "./DistributorModal";

export default function DistributorModalWrapper() {
    const { isDistributorModalOpen, setDistributorModalOpen } = useUI();

    return (
        <DistributorModal
            isOpen={isDistributorModalOpen}
            onClose={() => setDistributorModalOpen(false)}
        />
    );
}
