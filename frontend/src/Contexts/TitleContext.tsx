// TitleContext.tsx
import React, { createContext, useState, ReactNode, useContext } from 'react';

// Define the shape of the context value
interface TitleContextType {
    title: string;
    setTitle: (title: string) => void;
}

// Create the context with a default value
const TitleContext = createContext<TitleContextType | undefined>(undefined);

// Provider component
interface TitleProviderProps {
    children: ReactNode;
}

const TitleProvider: React.FC<TitleProviderProps> = ({ children }) => {
    const [title, setTitle] = useState<string>("");

    const contextValue: TitleContextType = {
        title,
        setTitle,
    };

    return (
        <TitleContext.Provider value={contextValue}>
            {children}
            </TitleContext.Provider>
    );
};

export { TitleProvider, TitleContext, useTitleContext };

// Custom hook to use the context
function useTitleContext() {
    const context = useContext(TitleContext);
    if (!context) {
        throw new Error('useTitleContext must be used within a TitleProvider');
    }
    return context;
}