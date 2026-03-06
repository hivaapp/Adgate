import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FileIcon, FileText, FileArchive, Image as ImageIcon, CheckCircle2, Lock, MousePointer2, Download, Twitter, MessageCircle, Copy, Check, Play } from 'lucide-react';
import { useAdSession } from '../hooks/useAdSession';
import { useToast } from '../context/ToastContext';
import { AdInterstitial } from '../components/AdInterstitial';
import { VideoAdViewer } from '../components/VideoAdViewer';
import { mockExploreResources } from '../lib/mockData';

export const ResourceUnlock = () => {
    const { slug } = useParams();
    const { addToast } = useToast();
    const { startSession, registerClick, getNextAd, totalAdsRequired, adsClicked, isComplete } = useAdSession();

    const [isShowingAd, setIsShowingAd] = useState(false);
    const [currentAd, setCurrentAd] = useState<any>(null);
    const [isRevealing, setIsRevealing] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [nextAdCountdown, setNextAdCountdown] = useState<number | null>(null);

    // Mock resource fetch
    const resource = mockExploreResources.find(r => r.slug === slug) || {
        title: "Pro Design System UI Kit",
        creatorName: "Alex Creator",
        creatorHandle: "alexcreator",
        creatorAvatar: "A",
        verified: true,
        fileType: "ZIP",
        adCount: 3,
        unlockCount: "1.2K",
        category: "Templates",
        description: "A complete professional design system for Figma with 1000+ components. Built for scale.",
        fileSize: "24.5 MB",
        donateEnabled: true,
        adType: "click",
    };

    const isVideo = resource.adType === 'video';

    useEffect(() => {
        // Initialize session on mount or slug change
        startSession(slug || 'default', resource.adType || 'click', resource.adCount);
        // Set open graph tags (mock implementation via DOM)
        document.title = `${resource.title} - AdGate`;
        const setMeta = (property: string, content: string) => {
            let tag = document.querySelector(`meta[property="${property}"]`);
            if (!tag) {
                tag = document.createElement('meta');
                tag.setAttribute('property', property);
                document.head.appendChild(tag);
            }
            tag.setAttribute('content', content);
        };
        setMeta('og:title', resource.title);
        setMeta('og:description', resource.description || 'Unlock this resource for free on AdGate.');
        setMeta('og:image', 'https://example.com/mock-preview.jpg');
    }, [slug, resource.adCount, startSession, resource.title, resource.description]);

    useEffect(() => {
        if (isComplete && !isRevealing) {
            setIsRevealing(true);
            setNextAdCountdown(null);
        }
    }, [isComplete]);

    useEffect(() => {
        if (nextAdCountdown !== null && nextAdCountdown > 0) {
            const timer = setTimeout(() => setNextAdCountdown(c => (c as number) - 1), 1000);
            return () => clearTimeout(timer);
        } else if (nextAdCountdown === 0) {
            setNextAdCountdown(null);
            handleUnlockClick();
        }
    }, [nextAdCountdown]);


    const handleUnlockClick = () => {
        setCurrentAd(getNextAd());
        setIsShowingAd(true);
    };

    const handleAdClose = () => {
        setIsShowingAd(false);
    };

    const handleAdClick = () => {
        registerClick(currentAd.id);
        setIsShowingAd(false);
        const remaining = totalAdsRequired - adsClicked - 1;
        if (remaining > 0) {
            addToast(`Ad clicked! ${remaining} more to go`, 'success');
        } else {
            addToast('Last ad done! Revealing your content...', 'success');
        }
    };

    const handleVideoComplete = () => {
        registerClick(currentAd.id);
        setIsShowingAd(false);
        const remaining = totalAdsRequired - adsClicked - 1;
        if (remaining > 0) {
            addToast(`Video completed! ${remaining} more to go`, 'success');
            setNextAdCountdown(3);
        } else {
            addToast('All videos complete! Revealing your content...', 'success');
        }
    };

    const handleVideoSkip = () => {
        registerClick(currentAd.id);
        setIsShowingAd(false);
        const remaining = totalAdsRequired - adsClicked - 1;
        if (remaining > 0) {
            addToast(`Video skipped! ${remaining} more to go`, 'success');
            setNextAdCountdown(3);
        } else {
            addToast('All videos complete! Revealing your content...', 'success');
        }
    };

    const handleDownload = () => {
        setIsDownloading(true);
        setTimeout(() => {
            setIsDownloading(false);
            addToast('Download started', 'success');
        }, 800);
    };

    const getFileIcon = () => {
        switch (resource.fileType) {
            case 'ZIP': return <FileArchive size={32} className="text-[#8e44ad]" />;
            case 'PDF': return <FileIcon size={32} className="text-[#e74c3c]" />;
            case 'DOC': return <FileText size={32} className="text-[#2980b9]" />;
            case 'IMAGES': return <ImageIcon size={32} className="text-[#27ae60]" />;
            default: return <FileIcon size={32} className="text-[#e74c3c]" />;
        }
    };

    const getFileBgClass = () => {
        switch (resource.fileType) {
            case 'ZIP': return 'bg-[#f4ecf7]';
            case 'PDF': return 'bg-[#fdedec]';
            case 'DOC': return 'bg-[#ebf5fb]';
            case 'IMAGES': return 'bg-[#e9f7ef]';
            default: return 'bg-[#fdedec]';
        }
    };

    // Button text dynamic logic
    const remainingAds = totalAdsRequired - adsClicked;
    let buttonText = isVideo ? "Watch Video to Unlock" : "Click Ad to Unlock";

    if (remainingAds > 1 && remainingAds !== totalAdsRequired) {
        buttonText = isVideo ? `Watch ${remainingAds} Videos to Unlock` : `Click ${remainingAds} Ads to Unlock`;
    } else if (remainingAds === 1 && totalAdsRequired > 1) {
        buttonText = isVideo ? "One More Video — Almost There" : "One More Ad — Almost There";
    } else if (remainingAds > 1) {
        buttonText = isVideo ? `Watch ${remainingAds} Videos to Unlock` : `Click ${remainingAds} Ads to Unlock`;
    }

    return (
        <div className="w-full min-h-screen bg-bg flex flex-col items-center animate-fadeIn pb-24">
            {/* Header */}
            <header className="w-full h-12 flex items-center justify-between px-4 sm:px-6 shrink-0 z-10 sticky top-0 bg-bg/90 backdrop-blur-md">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-brand flex items-center justify-center text-white font-black text-[10px] leading-none">
                        AG
                    </div>
                    <span className="font-black text-[15px] tracking-tight">AdGate</span>
                </div>
                <Link to="/" className="text-[13px] font-bold text-brand hover:underline">
                    Create your own free link
                </Link>
            </header>

            {/* Success Banner */}
            {isComplete && (
                <div className="w-full h-16 bg-success flex flex-col items-center justify-center animate-slide-down shadow-md z-20">
                    <div className="flex items-center gap-2 text-white font-black text-[16px]">
                        <CheckCircle2 size={20} /> {resource.donateEnabled ? 'Unlocked! And you helped plant a tree.' : 'Unlocked!'}
                    </div>
                    <span className="text-white/90 text-[13px] font-bold">Your free resource is ready to download</span>
                </div>
            )}

            <main className="w-full max-w-[800px] px-4 sm:px-8 mt-6 flex flex-col items-center">

                {/* Resource Card */}
                <div className="w-full bg-white rounded-[18px] border border-border p-5 flex flex-col relative overflow-hidden">
                    <div className="flex flex-col items-center text-center">
                        <div className={`w-16 h-16 rounded-[16px] ${getFileBgClass()} flex items-center justify-center mb-4`}>
                            {getFileIcon()}
                        </div>
                        <h1 className="text-[20px] font-black leading-tight mb-3 px-2 line-clamp-1 sm:line-clamp-none">{resource.title}</h1>

                        <div className="flex items-center justify-center gap-2 mb-4">
                            <div className="w-7 h-7 rounded-full bg-brand text-white flex items-center justify-center font-bold text-[12px]">
                                {resource.creatorAvatar}
                            </div>
                            <span className="text-[13px] font-bold text-textMid flex items-center gap-1">
                                by @{resource.creatorHandle}
                                {resource.verified && <CheckCircle2 size={12} className="text-blue-500 fill-blue-500/10" />}
                            </span>
                        </div>

                        <p className="text-[14px] font-semibold text-text leading-[1.6] max-w-[500px] mb-4 line-clamp-3">
                            {resource.description}
                        </p>

                        <div className="flex items-center gap-2 text-[12px] font-bold text-textMid mb-6">
                            <span>{resource.unlockCount} unlocks</span>
                            <span className="w-1 h-1 rounded-full bg-border" />
                            <span>{resource.fileSize}</span>
                            <span className="w-1 h-1 rounded-full bg-border" />
                            <span className="px-2 py-0.5 bg-surfaceAlt rounded-md">{resource.fileType}</span>
                        </div>

                        {/* Locked/Revealed Preview Zone */}
                        <div className={`w-full h-[120px] rounded-[12px] relative overflow-hidden border ${isComplete ? 'border-success' : 'border-border'} transition-colors duration-500`}>
                            <div className={`absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 ${isComplete ? 'animate-blurReveal' : 'animate-shimmer filter blur-md'} transition-all duration-600`}>
                                {/* Mock background texture */}
                                <div className="w-full h-full opacity-10 flex flex-wrap gap-2 p-2 pointer-events-none">
                                    {[...Array(20)].map((_, i) => <div key={i} className="w-8 h-2 bg-black rounded-full" />)}
                                </div>
                            </div>

                            {!isComplete ? (
                                <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                                    <div className="w-12 h-12 bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center mb-2 shadow-lg">
                                        <Lock size={20} className="text-white" />
                                    </div>
                                    <span className="text-white text-[13px] font-black bg-black/80 px-3 py-1 rounded-full shadow-sm">Locked</span>
                                </div>
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center z-10 animate-checkPop">
                                    <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center shadow-lg border-4 border-white opacity-0 animate-[fadeIn_400ms_ease_forwards] delay-300">
                                        <Check size={32} strokeWidth={4} className="text-white" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {resource.donateEnabled && (
                            <div className="mt-5 w-full bg-[#EBF5EE] border border-[#BBF7D0] rounded-[16px] p-4 flex items-start gap-4">
                                <span className="text-[24px] shrink-0 mt-0.5">🌳</span>
                                <div>
                                    <h4 className="text-[14px] font-[900] text-[#166534] leading-tight mb-1">Make an Impact</h4>
                                    <p className="text-[13px] font-[600] text-[#166534]/80 leading-relaxed">
                                        5% of earnings from your unlock go to planting trees in Kenya.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Interaction Section */}
                <div className="w-full mt-5">
                    {!isComplete ? (
                        <>
                            {/* Progress Indicator */}
                            <div className="flex items-center justify-center gap-2 mb-6 pointer-events-none">
                                {[...Array(totalAdsRequired)].map((_, idx) => {
                                    const isActive = idx === adsClicked;
                                    const isDone = idx < adsClicked;
                                    return (
                                        <div key={idx} className="flex flex-col items-center gap-2 relative">
                                            {idx > 0 && (
                                                <div className={`absolute top-[18px] right-[100%] w-6 sm:w-10 h-[2px] -translate-y-1/2 ${isDone ? 'bg-success' : 'bg-border'}`} />
                                            )}
                                            <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 z-10 shadow-sm transition-all duration-300
                                                ${isDone ? 'bg-success border-success text-white animate-checkPop' :
                                                    isActive ? 'bg-white border-brand text-brand animate-pulseRing' :
                                                        'bg-white border-border text-border'}
                                            `}>
                                                {isDone ? <Check size={18} strokeWidth={3} /> : (isVideo ? <Play size={16} fill={isActive ? "currentColor" : "none"} /> : <MousePointer2 size={16} />)}
                                            </div>
                                            <span className={`text-[10px] font-bold ${isDone ? 'text-success' : isActive ? 'text-brand' : 'text-textLight'}`}>
                                                {isVideo ? 'Video' : 'Ad'} {idx + 1}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="text-center mb-5">
                                {isVideo ? (
                                    <>
                                        <p className="text-[14px] font-bold text-text mb-1">Watch short videos below to unlock your free resource.</p>
                                        <p className="text-[12px] font-semibold text-textMid">Enjoy {totalAdsRequired} quick videos.</p>
                                    </>
                                ) : (
                                    <>
                                        <p className="text-[14px] font-bold text-text mb-1">Click on each ad below to unlock your free resource.</p>
                                        <p className="text-[12px] font-semibold text-textMid">Each click opens the ad in a new tab. Come back here after each one.</p>
                                    </>
                                )}
                            </div>

                            {nextAdCountdown !== null ? (
                                <div className="w-full h-[54px] bg-surfaceAlt border border-border text-text font-black text-[15px] rounded-[14px] flex items-center justify-center gap-2">
                                    <div className="w-5 h-5 border-2 border-border border-t-brand rounded-full animate-spin" />
                                    Next video starting in {nextAdCountdown}...
                                </div>
                            ) : (
                                <button
                                    onClick={handleUnlockClick}
                                    className="w-full h-[54px] bg-brand hover:bg-brand-hover text-white font-black text-[15px] rounded-[14px] flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-[0.98]"
                                >
                                    {isVideo ? <Play size={18} fill="currentColor" /> : <MousePointer2 size={18} />}
                                    {buttonText}
                                </button>
                            )}

                            {adsClicked > 0 && adsClicked < totalAdsRequired && nextAdCountdown === null && (
                                <p className="text-center text-[13px] font-bold text-brand mt-4 animate-popIn">
                                    Great! Just {totalAdsRequired - adsClicked} more {isVideo ? 'video' : 'ad'}{totalAdsRequired - adsClicked > 1 ? 's' : ''} to unlock your free resource.
                                </p>
                            )}

                            <div className="flex items-center justify-center gap-3 mt-6 text-[12px] font-bold text-textMid">
                                <span className="flex items-center gap-1"><Check size={14} className="text-success" /> No sign-up needed</span>
                                <span className="w-1 h-1 rounded-full bg-border" />
                                <span className="flex items-center gap-1"><Check size={14} className="text-success" /> Completely free</span>
                                <span className="w-1 h-1 rounded-full bg-border" />
                                <span className="flex items-center gap-1"><Check size={14} className="text-success" /> Instant access</span>
                            </div>
                        </>
                    ) : (
                        <div className="animate-fadeIn">
                            <button
                                onClick={handleDownload}
                                disabled={isDownloading}
                                className="w-full h-[56px] bg-success hover:bg-success/90 text-white font-black text-[16px] rounded-[14px] flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-[0.98] mb-2"
                            >
                                {isDownloading ? (
                                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <Download size={20} strokeWidth={2.5} />
                                        Download {resource.fileType}
                                    </>
                                )}
                            </button>
                            <p className="text-center text-[12px] font-bold text-textMid mb-8">
                                {resource.fileSize} • {resource.fileType} Secure Download
                            </p>

                            <div className="mb-8">
                                <p className="text-[14px] font-black text-center text-text mb-4">Share this free resource with your friends</p>
                                <div className="flex justify-center gap-3">
                                    <button className="flex-1 h-10 bg-[#000000] text-white rounded-full flex items-center justify-center gap-2 font-bold text-[13px] hover:opacity-90">
                                        <Twitter size={16} /> Twitter
                                    </button>
                                    <button className="flex-1 h-10 bg-[#25D366] text-white rounded-full flex items-center justify-center gap-2 font-bold text-[13px] hover:opacity-90">
                                        <MessageCircle size={16} /> WhatsApp
                                    </button>
                                    <button className="flex-1 h-10 bg-surfaceAlt text-text rounded-full flex items-center justify-center gap-2 font-bold text-[13px] hover:bg-border">
                                        <Copy size={16} /> Copy
                                    </button>
                                </div>
                            </div>

                            <div className="w-full bg-white border border-border rounded-[14px] p-4 flex items-center justify-between mb-4 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-brand text-white flex items-center justify-center font-bold text-[16px]">
                                        {resource.creatorAvatar}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-black text-[14px]">{resource.creatorName}</span>
                                        <span className="text-[12px] font-bold text-textMid">Creator on AdGate</span>
                                    </div>
                                </div>
                                <Link to={`/@${resource.creatorHandle}`} className="px-4 h-8 flex items-center justify-center rounded-full bg-brand/10 text-brand font-black text-[12px] hover:bg-brand/20 transition-colors">
                                    Follow
                                </Link>
                            </div>

                            <div className="w-full bg-surfaceAlt border border-border rounded-[14px] p-5 flex flex-col items-center text-center">
                                <h3 className="font-black text-[15px] mb-1">Want to earn from your own free content?</h3>
                                <p className="text-[13px] font-semibold text-textMid mb-4">Join 10,000+ creators earning with AdGate links.</p>
                                <Link to="/" className="w-full sm:w-auto px-6 h-10 flex items-center justify-center rounded-lg bg-brand text-white font-black text-[14px] hover:bg-brand-hover shadow-sm">
                                    Create Free Link
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {isShowingAd && currentAd && (
                isVideo ? (
                    <VideoAdViewer
                        ad={currentAd}
                        onCompleted={handleVideoComplete}
                        onSkip={handleVideoSkip}
                    />
                ) : (
                    <AdInterstitial
                        ad={currentAd}
                        onClose={handleAdClose}
                        onClick={handleAdClick}
                    />
                )
            )}
        </div>
    );
};
