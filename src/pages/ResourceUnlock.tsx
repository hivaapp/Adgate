import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Download, File, UserCircle2, Clock, CheckCircle2, Play, SkipForward } from 'lucide-react';

export const ResourceUnlock = () => {
    const { slug } = useParams();

    // Mock data for the resource based on the slug
    const resource = {
        title: slug === 'freeresource' ? 'freeresource.pdf' : 'Exclusive Content Pack',
        creator: 'Alex Creator',
        description: 'Get instant access to this comprehensive guide directly from the creator.',
        fileType: 'PDF',
        size: '12.4 MB',
        totalAds: 2,
        donateEnabled: true,
    };

    // State
    const [adsWatched, setAdsWatched] = useState(0);
    const [isAdPlaying, setIsAdPlaying] = useState(false);
    const [adTimeLeft, setAdTimeLeft] = useState(15);
    const [canSkip, setCanSkip] = useState(false);

    const isUnlocked = adsWatched >= resource.totalAds;
    const remainingAds = resource.totalAds - adsWatched;

    // Ad player simulation hook
    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        if (isAdPlaying && adTimeLeft > 0) {
            timer = setTimeout(() => {
                setAdTimeLeft(prev => prev - 1);
                if (15 - adTimeLeft >= 5) {
                    setCanSkip(true);
                }
            }, 1000);
        } else if (isAdPlaying && adTimeLeft === 0) {
            handleAdComplete();
        }
        return () => clearTimeout(timer);
    }, [isAdPlaying, adTimeLeft]);

    const startAd = () => {
        setIsAdPlaying(true);
        setAdTimeLeft(15);
        setCanSkip(false);
    };

    const handleAdComplete = () => {
        setIsAdPlaying(false);
        setAdsWatched(prev => prev + 1);
    };

    const skipAd = () => {
        if (!canSkip) return;
        handleAdComplete();
    };

    const handleDownload = () => {
        // Fake download action
        alert('File download begins...');
    };

    return (
        <div className="flex flex-col items-center w-full min-h-screen bg-surfaceAlt sm:bg-bg sm:py-12">
            <div className="w-full max-w-[500px] bg-surface sm:rounded-2xl sm:shadow-hover sm:border border-border min-h-screen sm:min-h-0 flex flex-col p-4 sm:p-6 sm:pb-8 relative overflow-hidden">

                {/* Creator Identity & Trust */}
                <div className="flex items-center gap-3 mb-6 animate-fade-in relative z-10 w-full pl-2">
                    <UserCircle2 className="w-6 h-6 text-textLight" />
                    <span className="font-bold text-sm text-textMid flex-1">{resource.creator} shared an item</span>

                    {resource.donateEnabled && (
                        <div className="bg-eco-tint text-eco font-bold text-[10px] px-2 py-1 rounded-badge uppercase tracking-wider flex items-center gap-1 border border-eco/20">
                            🌱 5% plants trees
                        </div>
                    )}
                </div>

                {/* Resource Preview Header */}
                <div className="flex flex-col mb-8 w-full z-10 relative px-2">
                    <h1 className="text-2xl sm:text-[28px] font-black text-text leading-tight tracking-tight break-words mb-2">
                        {resource.title}
                    </h1>
                    <p className="text-textMid font-bold text-sm leading-snug mb-4">
                        {resource.description}
                    </p>

                    <div className={`w-full aspect-video rounded-xl bg-surfaceAlt border border-border mt-2 relative overflow-hidden flex items-center justify-center transition-all duration-1000 ${isUnlocked ? 'bg-eco-tint/30' : ''}`}>
                        {/* blurred secret content */}
                        <div className={`absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542382257-80dedb725088?q=80&w=600')] bg-cover bg-center transition-all duration-1000 ${isUnlocked ? 'filter-none' : 'blur-xl scale-110 opacity-60'}`} />
                        <div className="relative z-10 p-6 bg-surface/80 backdrop-blur-md rounded-2xl shadow-sm border border-border flex flex-col items-center gap-2">
                            <File className={`w-12 h-12 ${isUnlocked ? 'text-eco' : 'text-text'}`} />
                            <span className="font-black text-text tracking-tight uppercase">{resource.fileType} • {resource.size}</span>
                        </div>
                    </div>
                </div>

                {/* Unlock Action Area */}
                <div className="flex flex-col flex-1 w-full px-2 z-10 bg-surface">

                    {!isUnlocked ? (
                        <div className="flex flex-col gap-6 animate-fade-in w-full pb-8">
                            <div className="flex flex-col gap-2">
                                <h2 className="font-black text-xl text-text tracking-tight">Watch to unlock</h2>
                                <p className="font-bold text-sm text-textMid flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    ~{remainingAds * 15} seconds remaining
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                {Array.from({ length: resource.totalAds }).map((_, i) => {
                                    const isWatched = i < adsWatched;
                                    return (
                                        <div key={i} className="flex flex-col items-center gap-2">
                                            <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-black text-sm transition-all duration-500 ${isWatched ? 'bg-eco border-eco text-white shadow-[0_0_12px_rgba(30,158,94,0.4)]' : 'bg-surface border-border text-textLight'}`}>
                                                {i + 1}
                                            </div>
                                            <span className={`text-[10px] font-bold text-center uppercase tracking-wider ${isWatched ? 'text-eco' : 'text-textLight'}`}>
                                                Ad {i + 1}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>

                            <button
                                onClick={startAd}
                                className="btn-primary w-full h-14 text-lg mt-4 group"
                            >
                                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" fill="currentColor" />
                                Watch Ad {adsWatched + 1}
                            </button>

                            <p className="text-center text-xs font-bold text-textLight px-6">
                                By continuing, you help support {resource.creator} creating more content.
                            </p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4 animate-slide-up w-full flex-1 pb-8">
                            <div className="bg-eco-tint border-eco text-eco p-4 rounded-xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(30,158,94,0.1)] mb-4 animate-pop-in">
                                <CheckCircle2 className="w-6 h-6" />
                                <span className="font-black">Successfully Unlocked!</span>
                            </div>

                            <button
                                onClick={handleDownload}
                                className="w-full h-[56px] text-lg font-black bg-eco text-white rounded-button hover:-translate-y-[2px] hover:bg-eco-hover transition-all duration-200 ease-out shadow-[0_4px_14px_rgba(30,158,94,0.3)] hover:shadow-[0_6px_20px_rgba(30,158,94,0.4)] flex items-center justify-center gap-3"
                            >
                                <Download className="w-6 h-6" />
                                Download {resource.fileType}
                            </button>
                            <p className="text-center text-xs font-bold text-textLight mt-2">
                                Your download should begin automatically.
                            </p>
                        </div>
                    )}
                </div>

                {/* Fullscreen Video Ad Overlay (Simulated) */}
                {isAdPlaying && (
                    <div className="fixed inset-0 z-50 bg-black flex flex-col animate-fade-in transition-all">
                        {/* Ad Header */}
                        <div className="w-full h-16 px-4 flex items-center justify-between absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/80 to-transparent">
                            <div className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-pill flex items-center gap-2 border border-white/10">
                                <span className="text-xs font-black text-white/90">Ad</span>
                                <span className="text-xs font-bold text-white/60">•</span>
                                <span className="text-xs font-bold text-white/90">{adTimeLeft}s</span>
                            </div>

                            {/* Skip Button */}
                            <button
                                onClick={skipAd}
                                disabled={!canSkip}
                                className={`px-4 py-2 rounded-pill font-bold text-sm flex items-center gap-2 transition-all ${canSkip
                                    ? 'bg-white text-black hover:bg-gray-200 cursor-pointer shadow-lg scale-100'
                                    : 'bg-black/40 text-white/40 cursor-not-allowed border border-white/10 scale-95'
                                    }`}
                            >
                                {canSkip ? (
                                    <>
                                        Skip Ad <SkipForward className="w-4 h-4" />
                                    </>
                                ) : (
                                    `Skip in ${15 - (15 - adTimeLeft)}s`
                                )}
                            </button>
                        </div>

                        {/* Simulated Video Content */}
                        <div className="flex-1 w-full bg-[#111] flex items-center justify-center relative overflow-hidden">
                            <div className="w-64 h-64 bg-brand/20 rounded-full blur-[100px] absolute animate-pulse" />
                            <div className="relative z-10 flex flex-col items-center text-center px-6">
                                <span className="text-5xl mb-6 shadow-2xl">📱</span>
                                <h3 className="text-white font-black text-2xl mb-2">Fake Mobile Game 3D</h3>
                                <p className="text-white/60 font-bold max-w-xs">The most addictive puzzle game of 2026. Can you reach level 100?</p>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full h-1.5 bg-white/10 absolute bottom-0">
                            <div
                                className="h-full bg-brand transition-all duration-1000 ease-linear"
                                style={{ width: `${((15 - adTimeLeft) / 15) * 100}%` }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
