import { useState, useEffect } from 'react';
import type { MockAd } from '../lib/mockAds';

interface AdInterstitialProps {
    ad: MockAd;
    onClose: () => void;
    onClick: () => void;
}

export function AdInterstitial({ ad, onClose, onClick }: AdInterstitialProps) {
    const [countdown, setCountdown] = useState(5);
    const [canDismiss, setCanDismiss] = useState(false);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setCanDismiss(true);
        }
    }, [countdown]);

    const handleCtaClick = () => {
        // Open in new tab
        window.open(ad.url, '_blank');
        // Register click after delay
        setTimeout(() => {
            onClick();
        }, 400);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 animate-fadeIn" role="dialog" aria-modal="true">
            <div className="relative w-full h-full sm:h-auto sm:w-[440px] sm:rounded-2xl overflow-hidden flex flex-col" style={{ backgroundColor: ad.bgColor }}>

                {/* Top Bar */}
                <div className="h-12 w-full flex items-center justify-between px-4 bg-black/20 shrink-0">
                    <span className="text-[11px] text-white font-bold opacity-80">Sponsored</span>
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
                <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center" style={{ color: ad.textColor }}>
                    <div className="text-[72px] leading-none mb-6 animate-popIn">{ad.logo}</div>
                    <h2 className="text-[22px] font-black mb-2 tracking-tight">{ad.brand}</h2>
                    <p className="text-[16px] font-bold opacity-85 mb-10 max-w-[280px]">
                        {ad.tagline}
                    </p>

                    <button
                        onClick={handleCtaClick}
                        className="w-full sm:w-[calc(100%-80px)] h-[56px] bg-white rounded-xl font-bold text-[16px] shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-transform"
                        style={{ color: ad.bgColor }}
                    >
                        {ad.cta}
                    </button>

                    <p className="text-[12px] opacity-70 mt-4 font-semibold">
                        Clicking opens the advertiser's site in a new tab
                    </p>
                </div>

                {/* Bottom footer strip */}
                <div className="h-10 w-full bg-black/40 shrink-0 flex items-center px-4 justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-brand text-sm bg-white rounded-sm px-1 font-black">A</span>
                        <span className="text-[11px] text-white/50 font-bold tracking-tight">Free content powered by AdGate</span>
                    </div>
                </div>

            </div>
        </div>
    );
}
