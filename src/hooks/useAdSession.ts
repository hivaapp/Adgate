import { useState, useCallback } from 'react';
import { getRandomAd, getNextVideoAd } from '../lib/mockAds';
import type { MockAd, MockVideoAd } from '../lib/mockAds';

export function useAdSession() {
    const [currentResourceSlug, setCurrentResourceSlug] = useState<string | null>(null);
    const [currentAdType, setCurrentAdType] = useState<"click" | "video">("click");
    const [totalAdsRequired, setTotalAdsRequired] = useState(0);
    const [adsClicked, setAdsClicked] = useState(0);
    const [sessionAdHistory, setSessionAdHistory] = useState<string[]>([]);
    const [isComplete, setIsComplete] = useState(false);

    const startSession = useCallback((slug: string, adType: "click" | "video", adCount: number) => {
        setCurrentResourceSlug(slug);
        setCurrentAdType(adType);
        setTotalAdsRequired(adCount);
        setAdsClicked(0);
        setSessionAdHistory([]);
        setIsComplete(false);
    }, []);

    const getNextAd = useCallback((): MockAd | MockVideoAd => {
        if (currentAdType === 'video') {
            return getNextVideoAd(sessionAdHistory);
        }
        return getRandomAd(sessionAdHistory);
    }, [sessionAdHistory, currentAdType]);

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
        setCurrentAdType("click");
        setTotalAdsRequired(0);
        setAdsClicked(0);
        setSessionAdHistory([]);
        setIsComplete(false);
    }, []);

    return {
        currentResourceSlug,
        currentAdType,
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
