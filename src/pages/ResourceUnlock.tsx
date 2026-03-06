import { useState, useEffect } from 'react';
import { ShieldAlert, FileIcon, X, CheckCircle2 } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';

export const ResourceUnlock = () => {
    const [status, setStatus] = useState<'initial' | 'ad_loading' | 'ad_playing' | 'success'>('initial');
    const [currentAdIndex, setCurrentAdIndex] = useState(0);
    const [canSkip, setCanSkip] = useState(false);
    const [timeLeft, setTimeLeft] = useState(5);

    // Mock data based on slug
    const targetAds = 2;
    const resourceName = 'Figma UI Kit - 2026 Edition';

    const { startProgress, stopProgress } = useProgress();

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        if (status === 'ad_playing' && timeLeft > 0) {
            timer = setTimeout(() => setTimeLeft((prev: number) => prev - 1), 1000);
        } else if (status === 'ad_playing' && timeLeft === 0) {
            setCanSkip(true);
        }
        return () => clearTimeout(timer);
    }, [status, timeLeft]);

    const handleStartUnlock = () => {
        setStatus('ad_loading');
        startProgress();
        setTimeout(() => {
            stopProgress();
            setStatus('ad_playing');
            setTimeLeft(5);
            setCanSkip(false);
        }, 1500);
    };

    const handleSkipAd = () => {
        if (currentAdIndex + 1 < targetAds) {
            setCurrentAdIndex((prev: number) => prev + 1);
            setStatus('ad_loading');
            startProgress();
            setTimeout(() => {
                stopProgress();
                setStatus('ad_playing');
                setTimeLeft(5);
                setCanSkip(false);
            }, 1500);
        } else {
            setStatus('success');
        }
    };

    if (status === 'success') {
        return (
            <div className="w-full min-h-screen bg-bg flex flex-col items-center justify-center p-6 text-center animate-fade-in relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-success/10 rounded-full blur-[60px] pointer-events-none" />

                <div className="w-24 h-24 bg-success rounded-full flex items-center justify-center text-white mb-6 shadow-[0_4px_24px_rgba(65,122,85,0.4)] animate-pop-in relative z-10 border-4 border-white">
                    <CheckCircle2 size={48} strokeWidth={2.5} />
                </div>
                <h1 className="text-[28px] font-black text-text mb-2 animate-slide-up relative z-10">Unlocked Successfully!</h1>
                <p className="text-[16px] font-bold text-textMid mb-10 max-w-[300px] animate-slide-up relative z-10" style={{ animationDelay: '50ms' }}>
                    Thank you for supporting the creator. Your resource is ready to download.
                </p>
                <button
                    onClick={() => {
                        window.location.href = 'https://example.com/download';
                    }}
                    className="btn-primary bg-success hover:bg-success/90 w-full max-w-[340px] h-[56px] text-[18px] animate-slide-up relative z-10 shadow-[0_4px_16px_rgba(65,122,85,0.2)]"
                    style={{ animationDelay: '100ms' }}
                >
                    Continue to File
                </button>
            </div>
        );
    }

    // Ad fullscreen overlay
    if (status === 'ad_loading' || status === 'ad_playing') {
        return (
            <div className="fixed inset-0 z-50 bg-[#111] flex flex-col text-white animate-fade-in">
                <div className="h-16 flex items-center justify-between px-4 pt-[env(safe-area-inset-top)] border-b border-white/10 shrink-0">
                    <span className="text-[13px] font-bold text-white/50 uppercase tracking-widest pl-2">
                        Ad {currentAdIndex + 1} of {targetAds}
                    </span>
                    {status === 'ad_playing' && (
                        <button
                            onClick={handleSkipAd}
                            disabled={!canSkip}
                            className={`h-[36px] px-4 rounded-full font-bold text-[13px] flex items-center gap-1.5 transition-all
                                ${canSkip ? 'bg-white text-[#111] hover:bg-white/90 scale-100' : 'bg-transparent text-white/40 border border-white/20'}`}
                        >
                            {canSkip ? (
                                <>Skip Ad <X size={14} strokeWidth={3} /></>
                            ) : (
                                `Skip in ${timeLeft}s`
                            )}
                        </button>
                    )}
                </div>

                <div className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden">
                    {status === 'ad_loading' ? (
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-10 h-10 border-4 border-white/10 border-t-brand rounded-full animate-spin" />
                            <span className="text-[14px] font-bold text-white/60">Loading Sponsor...</span>
                        </div>
                    ) : (
                        <div className="w-full max-w-[400px] aspect-[3/4] sm:aspect-video bg-[#222] rounded-[24px] flex flex-col items-center justify-center border border-white/10 relative overflow-hidden shadow-2xl">
                            <span className="text-[24px] font-black opacity-20 text-white">Ad Video Placeholder</span>
                            <div className="absolute inset-0 bg-gradient-to-tr from-brand/20 to-transparent mix-blend-overlay pointer-events-none" />

                            {/* Mock Ad Content */}
                            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent pt-20">
                                <h3 className="text-xl font-bold text-white mb-1">Buy this amazing product</h3>
                                <p className="text-sm font-bold text-white/60">Limited time offer just for you.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-bg flex flex-col p-6 animate-fade-in relative overflow-hidden">
            {/* Background blur */}
            <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-brand/5 rounded-full blur-[80px] pointer-events-none" />

            {/* Header */}
            <header className="flex items-center justify-center h-16 shrink-0 pt-[env(safe-area-inset-top)] relative z-10">
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-[8px] bg-brand flex items-center justify-center text-white font-black text-[11px] leading-none shadow-sm">
                        AG
                    </div>
                    <span className="font-black text-[18px] tracking-tight text-text">AdGate</span>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-center text-center max-w-[440px] mx-auto w-full relative z-10">
                <div className="w-20 h-20 bg-white border border-border shadow-[0_4px_20px_rgba(0,0,0,0.06)] rounded-[24px] flex items-center justify-center text-text mb-8 rotate-3">
                    <FileIcon size={36} strokeWidth={2} className="text-brand -rotate-3" />
                </div>

                <h1 className="text-[26px] sm:text-[32px] font-black text-text mb-4 leading-[1.15]">{resourceName}</h1>
                <p className="text-[16px] font-bold text-textMid mb-10 px-4 leading-relaxed">
                    High quality Figma UI kit for modern mobile applications. Includes 100+ screens and components perfectly organized.
                </p>

                <div className="w-full bg-white border border-border rounded-[20px] p-6 mb-8 flex flex-col gap-3 shadow-[0_2px_12px_rgba(0,0,0,0.03)] relative overflow-hidden text-left">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brandTint rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl opacity-60 pointer-events-none" />

                    <div className="flex items-center gap-3 text-text mb-1 relative z-10">
                        <div className="w-8 h-8 rounded-full bg-surfaceAlt flex items-center justify-center text-brand shrink-0">
                            <ShieldAlert size={16} strokeWidth={3} />
                        </div>
                        <span className="text-[15px] font-black">Creator Supported Link</span>
                    </div>
                    <p className="text-[14px] font-bold text-textMid relative z-10 pl-11">
                        This creator is using AdGate. Watch <span className="text-text font-black">{targetAds} short ads</span> to instantly unlock this link.
                    </p>
                </div>

                <button
                    onClick={handleStartUnlock}
                    className="btn-primary w-full h-[60px] text-[18px] rounded-[16px] shadow-[0_4px_16px_rgba(217,119,87,0.25)] hover:shadow-[0_6px_20px_rgba(217,119,87,0.3)] transition-all"
                >
                    Unlock Link
                </button>
                <div className="mt-4 text-[12px] font-extrabold text-textLight uppercase tracking-widest flex items-center gap-2">
                    <span className="w-10 h-[1px] bg-border" />
                    Takes less than 30s
                    <span className="w-10 h-[1px] bg-border" />
                </div>
            </main>
        </div>
    );
};
