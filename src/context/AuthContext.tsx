import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { currentUser as mockUser, mockLinks, mockActivity } from '../lib/mockData';
import type { User } from '../lib/mockData';
import { useToast } from './ToastContext';

type LinkData = any; // We can type this strictly later if needed, but let's use `any` for now
type ActivityData = any;

type Earnings = {
    total: number;
    thisMonth: number;
    available: number;
};

type AuthContextType = {
    isLoggedIn: boolean;
    currentUser: User | null;
    links: LinkData[];
    activity: ActivityData[];
    earnings: Earnings;
    hasSeenOnboarding: boolean;
    activeTab: string;
    login: (provider?: string) => Promise<void>;
    logout: () => void;
    createLink: (linkData: Partial<LinkData>) => Promise<void>;
    updateLink: (id: string, data: Partial<LinkData>) => Promise<void>;
    deleteLink: (id: string) => Promise<void>;
    disableLink: (id: string) => Promise<void>;
    requestPayout: (amount: number) => Promise<void>;
    updateProfile: (data: Partial<User>) => Promise<void>;
    markOnboardingSeen: () => void;
    setActiveTab: (tab: string) => void;
    isLoggingIn: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const { addToast } = useToast();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    const [links, setLinks] = useState<LinkData[]>(mockLinks);
    const [activity, setActivity] = useState<ActivityData[]>(mockActivity);

    const [earnings, setEarnings] = useState<Earnings>({
        total: mockUser.totalEarned,
        thisMonth: mockUser.thisMonth,
        available: mockUser.availableToWithdraw,
    });

    const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
    const [activeTab, setActiveTab] = useState('home');

    // Utility to simulate network delay & random failure
    const simulateNetwork = async <T,>(successCallback: () => T): Promise<T> => {
        return new Promise((resolve, reject) => {
            const delay = Math.floor(Math.random() * 300) + 700; // 700-1000ms
            setTimeout(() => {
                if (Math.random() < 0.1) {
                    addToast("Network error. Please try again.", "error");
                    reject(new Error("Network error"));
                } else {
                    resolve(successCallback());
                }
            }, delay);
        });
    };

    const login = async (): Promise<void> => {
        setIsLoggingIn(true);
        try {
            await simulateNetwork(() => {
                setIsLoggedIn(true);
                setCurrentUser({ ...mockUser, hasSeenOnboarding });
            });
            addToast("Successfully signed in", "success");
        } finally {
            setIsLoggingIn(false);
        }
    };

    const logout = () => {
        setIsLoggedIn(false);
        setCurrentUser(null);
    };

    const createLink = async (linkData: Partial<LinkData>) => {
        await simulateNetwork(() => {
            const finalLinkData = { ...linkData };

            if (finalLinkData.adSource === "custom" && finalLinkData.customAd) {
                if (!finalLinkData.customAd.redirectUrl || (!finalLinkData.customAd.brandName && !finalLinkData.customAd.fileName)) {
                    throw new Error("Validation failed for custom ad");
                }
            } else {
                finalLinkData.adSource = "platform";
            }

            const newLink: any = {
                id: `link_${Date.now()}`,
                isActive: true,
                viewCount: 0,
                unlockCount: 0,
                earned: 0,
                conversionRate: "0%",
                createdAt: new Date().toISOString(),
                geography: [],
                deviceSplit: { mobile: 0, desktop: 0, tablet: 0 },
                ...finalLinkData,
            };
            if (!newLink.adType) newLink.adType = "click";
            if (!newLink.adSource) newLink.adSource = "platform";
            setLinks([newLink, ...links]);

            const newActivity = {
                id: `act_${Date.now()}`,
                type: 'creation',
                description: 'Created new link',
                timestamp: 'Just now',
                earned: 0,
                resourceTitle: linkData.title || 'Untitled Resource',
            };
            setActivity([newActivity, ...activity]);
        });
    };

    const updateLink = async (id: string, data: Partial<LinkData>) => {
        await simulateNetwork(() => {
            const finalData = { ...data };
            if (finalData.adSource === "custom" && finalData.customAd) {
                if (!finalData.customAd.redirectUrl || (!finalData.customAd.brandName && !finalData.customAd.fileName)) {
                    throw new Error("Validation failed for custom ad");
                }
            }
            setLinks(links.map(l => l.id === id ? { ...l, ...finalData } : l));
        });
    };

    const deleteLink = async (id: string) => {
        await simulateNetwork(() => {
            setLinks(links.filter(l => l.id !== id));
        });
    };

    const disableLink = async (id: string) => {
        await simulateNetwork(() => {
            setLinks(links.map(l => l.id === id ? { ...l, isActive: false } : l));
        });
    };

    const requestPayout = async (amount: number) => {
        await simulateNetwork(() => {
            if (amount > earnings.available) throw new Error("Insufficient funds");
            setEarnings(prev => ({
                ...prev,
                available: prev.available - amount
            }));

            const newActivity = {
                id: `act_${Date.now()}`,
                type: 'payout',
                description: 'Payout to Stripe initiated',
                timestamp: 'Just now',
                earned: -amount,
                resourceTitle: '',
            };
            setActivity([newActivity, ...activity]);
        });
    };

    const updateProfile = async (data: Partial<User>) => {
        await simulateNetwork(() => {
            if (currentUser) {
                setCurrentUser({ ...currentUser, ...data });
            }
        });
    };

    const markOnboardingSeen = () => {
        setHasSeenOnboarding(true);
        if (currentUser) {
            setCurrentUser({ ...currentUser, hasSeenOnboarding: true });
        }
    };

    return (
        <AuthContext.Provider value={{
            isLoggedIn,
            currentUser,
            links,
            activity,
            earnings,
            hasSeenOnboarding,
            activeTab,
            login,
            logout,
            createLink,
            updateLink,
            deleteLink,
            disableLink,
            requestPayout,
            updateProfile,
            markOnboardingSeen,
            setActiveTab,
            isLoggingIn
        }}>
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
