'use client';

import React, { createContext, useContext, useState } from 'react';

interface UIContextType {
    isDistributorModalOpen: boolean;
    setDistributorModalOpen: (open: boolean) => void;
    isLoginModalOpen: boolean;
    setLoginModalOpen: (open: boolean) => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isDistributorModalOpen, setDistributorModalOpen] = useState(false);
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);

    return (
        <UIContext.Provider value={{
            isDistributorModalOpen,
            setDistributorModalOpen,
            isLoginModalOpen,
            setLoginModalOpen
        }}>
            {children}
        </UIContext.Provider>
    );
};

export const useUI = () => {
    const context = useContext(UIContext);
    if (context === undefined) {
        throw new Error('useUI must be used within a UIProvider');
    }
    return context;
};
