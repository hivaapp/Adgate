import { useState, useEffect } from 'react';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { HomeTab } from '../components/dashboard/tabs/HomeTab';
import { LinksTab } from '../components/dashboard/tabs/LinksTab';
import { EarningsTab } from '../components/dashboard/tabs/EarningsTab';
import { ReferralsTab } from '../components/dashboard/tabs/ReferralsTab';
import { AccountTab } from '../components/dashboard/tabs/AccountTab';
import { OnboardingCarousel } from '../components/dashboard/OnboardingCarousel';
import { useToast } from '../context/ToastContext';

type Tab = 'home' | 'links' | 'earnings' | 'referrals' | 'account';

export const Dashboard = () => {
    const [currentTab, setCurrentTab] = useState<Tab>('home');
    const [showOnboarding, setShowOnboarding] = useState(false);

    useEffect(() => {
        // Mock check for first time user
        const hasSeenOnboarding = localStorage.getItem('adgate_onboarding');
        if (!hasSeenOnboarding) {
            setShowOnboarding(true);
        }
    }, []);

    const { showToast } = useToast();

    useEffect(() => {
        // Simulate referral activity toasts
        const interval = setInterval(() => {
            const isJoin = Math.random() > 0.5;
            if (isJoin) {
                showToast({
                    message: "A new creator joined using your referral code!",
                    type: "referral_join"
                });
            } else {
                const amount = (Math.random() * 5 + 0.5).toFixed(2);
                showToast({
                    message: `You earned $${amount} from your referrals!`,
                    type: "referral_earn"
                });
            }
        }, 120000); // Every 2 minutes
        return () => clearInterval(interval);
    }, [showToast]);

    const handleOnboardingComplete = () => {
        localStorage.setItem('adgate_onboarding', 'true');
        setShowOnboarding(false);
    };

    return (
        <>
            <DashboardLayout currentTab={currentTab} onTabChange={setCurrentTab}>
                {currentTab === 'home' && <HomeTab onTabChange={setCurrentTab} />}
                {currentTab === 'links' && <LinksTab />}
                {currentTab === 'earnings' && <EarningsTab />}
                {currentTab === 'referrals' && <ReferralsTab />}
                {currentTab === 'account' && <AccountTab />}
            </DashboardLayout>

            {showOnboarding && <OnboardingCarousel onComplete={handleOnboardingComplete} />}
        </>
    );
};
