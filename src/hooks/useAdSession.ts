import { useState, useCallback } from 'react';
import { getRandomAd } from '../lib/mockAds';
import type { MockAd } from '../lib/mockAds';

export function useAdSession() {
    const [currentResourceSlug, setCurrentResourceSlug] = useState<string | null>(null);
    const [totalAdsRequired, setTotalAdsRequired] = useState(0);
    const [adsClicked, setAdsClicked] = useState(0);
    const [sessionAdHistory, setSessionAdHistory] = useState<string[]>([]);
    const [isComplete, setIsComplete] = useState(false);

    const startSession = useCallback((slug: string, adCount: number) => {
        setCurrentResourceSlug(slug);
        setTotalAdsRequired(adCount);
        setAdsClicked(0);
        setSessionAdHistory([]);
        setIsComplete(false);
    }, []);

    const getNextAd = useCallback((): MockAd => {
        const nextAd = getRandomAd(sessionAdHistory);
        return nextAd;
    }, [sessionAdHistory]);

    const registerClick = useCallback((adId: string) => {
        setAdsClicked(prev => {
            const nextCount = prev + 1;
            if (nextCount >= totalAdsRequired) {
                setIsComplete(true);
            }
            return nextCount;
        });
        setSessionAdHistory(prev => [...prev, adId]);
    }, [totalAdsRequired]);

    const resetSession = useCallback(() => {
        setCurrentResourceSlug(null);
        setTotalAdsRequired(0);
        setAdsClicked(0);
        setSessionAdHistory([]);
        setIsComplete(false);
    }, []);

    return {
        currentResourceSlug,
        totalAdsRequired,
        adsClicked,
        sessionAdHistory,
        isComplete,
        startSession,
        registerClick,
        getNextAd,
        resetSession,
    };
}
