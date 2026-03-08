import { useState, useEffect } from 'react';
import type { MockAd } from '../lib/mockAds';

interface AdInterstitialProps {
    ad: MockAd;
    onClose: () => void;
    onClick: () => void;
    isCustom?: boolean;
    customAd?: {
        brandName?: string;
        redirectUrl?: string;
        ctaText?: string;
    };
}

export function AdInterstitial({ ad, onClose, onClick, isCustom, customAd }: AdInterstitialProps) {
    const [countdown, setCountdown] = useState(5);
    const [canDismiss, setCanDismiss] = useState(false);

    if (countdown === 0 && !canDismiss) {
        setCanDismiss(true);
    }

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    const handleCtaClick = () => {
        // Open in new tab
        const urlToOpen = isCustom ? customAd?.redirectUrl : ad.url;
        if (urlToOpen) window.open(urlToOpen, '_blank');
        // Register click after delay
        setTimeout(() => {
            onClick();
        }, 400);
    };

    const brand = isCustom ? customAd?.brandName || 'Sponsor' : ad.brand;
    const cta = isCustom ? customAd?.ctaText || 'Learn More' : ad.cta;
    const bgColor = isCustom ? '#FAF9F7' : ad.bgColor;
    const textColor = isCustom ? '#111111' : ad.textColor;
    const logo = isCustom ? '✨' : ad.logo;
    const tagline = isCustom ? 'Sponsored content brought to you by ' + brand : ad.tagline;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 animate-fadeIn" role="dialog" aria-modal="true">
            <div className="relative w-full h-full sm:h-auto sm:w-[440px] sm:rounded-[18px] overflow-hidden flex flex-col" style={{ backgroundColor: bgColor }}>

                {/* Top Bar */}
                <div className="h-12 w-full flex items-center justify-between px-4 bg-black/20 shrink-0">
                    <span className="text-[11px] text-white font-bold opacity-80">{isCustom ? 'Sponsor Ad' : 'Sponsored'}</span>
                    {canDismiss ? (
                        <button
                            onClick={onClose}
                            className="w-8 h-8 flex items-center justify-center text-white rounded-full hover:bg-white/10 animate-fadeIn text-lg font-bold"
                            aria-label="Close ad"
                        >
                            ×
                        </button>
                    ) : (
                        <span className="text-[11px] text-white font-bold w-12 text-right">
                            {countdown}s
                        </span>
                    )}
                </div>

                {/* Countdown Bar */}
                {!canDismiss && (
                    <div className="h-[2px] w-full bg-black/20 shrink-0">
                        <div className="h-full bg-white animate-progressFill"></div>
                    </div>
                )}

                {/* Ad Body */}
                <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center" style={{ color: textColor }}>
                    <div className="text-[72px] leading-none mb-6 animate-popIn">{logo}</div>
                    <h2 className="text-[22px] font-black mb-2 tracking-tight">{brand}</h2>
                    <p className="text-[16px] font-[800] opacity-85 mb-10 max-w-[280px]">
                        {tagline}
                    </p>

                    <button
                        onClick={handleCtaClick}
                        className="w-full sm:w-[calc(100%-80px)] h-[56px] bg-white rounded-[18px] font-bold text-[16px] shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-transform"
                        style={{ color: isCustom ? '#D97757' : bgColor, backgroundColor: isCustom ? '#111111' : '#ffffff' }}
                    >
                        {cta}
                    </button>

                    <p className="text-[12px] opacity-70 mt-4 font-semibold">
                        Clicking opens the advertiser's site in a new tab
                    </p>
                </div>

                {/* Bottom footer strip */}
                <div className="h-10 w-full bg-black/40 shrink-0 flex items-center px-4 justify-between">
                    <div className="flex items-center gap-2">
                        {isCustom ? (
                            <span className="text-[11px] text-white/50 font-bold tracking-tight">Powered by AdGate</span>
                        ) : (
                            <>
                                <span className="text-brand text-sm bg-white rounded-[14px] px-1 font-black">A</span>
                                <span className="text-[11px] text-white/50 font-bold tracking-tight">Free content powered by AdGate</span>
                            </>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
