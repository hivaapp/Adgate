import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type User = {
    name: string;
    email: string;
    avatarInitial: string;
};

type AuthContextType = {
    isLoggedIn: boolean;
    user: User | null;
    login: () => Promise<void>;
    logout: () => void;
    isLoggingIn: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    const login = (): Promise<void> => {
        setIsLoggingIn(true);
        return new Promise((resolve) => {
            setTimeout(() => {
                setIsLoggedIn(true);
                setUser({
                    name: 'Alex Creator',
                    email: 'alex@example.com',
                    avatarInitial: 'A',
                });
                setIsLoggingIn(false);
                resolve();
            }, 800);
        });
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout, isLoggingIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
