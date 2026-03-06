import { useState, useEffect } from 'react';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { HomeTab } from '../components/dashboard/tabs/HomeTab';
import { LinksTab } from '../components/dashboard/tabs/LinksTab';
import { EarningsTab } from '../components/dashboard/tabs/EarningsTab';
import { AccountTab } from '../components/dashboard/tabs/AccountTab';
import { OnboardingCarousel } from '../components/dashboard/OnboardingCarousel';

type Tab = 'home' | 'links' | 'earnings' | 'account';

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
                {currentTab === 'account' && <AccountTab />}
            </DashboardLayout>

            {showOnboarding && <OnboardingCarousel onComplete={handleOnboardingComplete} />}
        </>
    );
};
