import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    setLogin: (username: string, password: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        // Initialize isAuthenticated state from localStorage
        const storedAuth = localStorage.getItem('auth');
        return storedAuth ? JSON.parse(storedAuth) : false;
    });

    useEffect(() => {
        // Save isAuthenticated state to localStorage whenever it changes
        localStorage.setItem('auth', JSON.stringify(isAuthenticated));
    }, [isAuthenticated]);

    const setLogin = (username: string, password: string) => {
        // Simulate authentication logic (replace with actual logic)
        const success = username === 'user123' && password === 'pass123';
        if (success) {
            setIsAuthenticated(true);
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
    };

    // Wrap the value in useMemo to avoid unnecessary re-renders
    const authContextValue = useMemo(
        () => ({
            isAuthenticated,
            setLogin,
            logout,
        }),
        [isAuthenticated]
    );

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
}
