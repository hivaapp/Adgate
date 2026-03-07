import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FileIcon, FileText, FileArchive, Image as ImageIcon, CheckCircle2, Lock, MousePointer2, Download, Twitter, MessageCircle, Copy, Check, Play, X, MousePointerClick } from 'lucide-react';
import { useAdSession } from '../hooks/useAdSession';
import { useToast } from '../context/ToastContext';
import { AdInterstitial } from '../components/AdInterstitial';
import { VideoAdViewer } from '../components/VideoAdViewer';
import { mockExploreResources } from '../lib/mockData';

export const ResourceUnlock = () => {
    const { slug } = useParams();
    const { addToast } = useToast();
    const { startSession, registerClick, registerVideoWatch, registerSponsorClick, getNextAd, totalAdsRequired, adsClicked, isComplete, customSponsorStep } = useAdSession();

    const [isShowingAd, setIsShowingAd] = useState(false);
    const [currentAd, setCurrentAd] = useState<any>(null);
    const [isRevealing, setIsRevealing] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [nextAdCountdown, setNextAdCountdown] = useState<number | null>(null);
    const [showTreeCard, setShowTreeCard] = useState(true);

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
        adSource: "custom",
        customAd: {
            brandName: "FlowDesk Tools",
            redirectUrl: "https://flowdesk.example.com",
            ctaText: "Get Access Now"
        }
    };

    const isCustom = resource.adSource === 'custom';
    const isVideo = isCustom ? true : resource.adType === 'video';
    const requiresClick = isCustom && !!resource.customAd?.redirectUrl;

    useEffect(() => {
        // Initialize session on mount or slug change
        startSession(slug || 'default', isVideo ? 'video' : 'click', resource.adCount, isCustom);
        // Set open graph tags (mock implementation via DOM)
        document.title = `${resource.title} - AdGate`;
    }, [slug, resource.adCount, startSession, resource.title, isVideo, isCustom]);

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
        if (customSponsorStep === "click") {
            setIsShowingAd(true);
            return;
        }
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
        if (isCustom) {
            registerVideoWatch(requiresClick);
            if (!requiresClick) {
                setIsShowingAd(false);
                addToast('Video complete! Revealing your content...', 'success');
            }
        } else {
            registerClick(currentAd.id);
            setIsShowingAd(false);
            const remaining = totalAdsRequired - adsClicked - 1;
            if (remaining > 0) {
                addToast(`Video completed! ${remaining} more to go`, 'success');
                setNextAdCountdown(3);
            } else {
                addToast('All videos complete! Revealing your content...', 'success');
            }
        }
    };

    const handleVideoSkip = () => {
        if (isCustom) {
            registerVideoWatch(requiresClick);
            if (!requiresClick) {
                setIsShowingAd(false);
                addToast('Video complete! Revealing your content...', 'success');
            }
        } else {
            registerClick(currentAd.id);
            setIsShowingAd(false);
            const remaining = totalAdsRequired - adsClicked - 1;
            if (remaining > 0) {
                addToast(`Video skipped! ${remaining} more to go`, 'success');
                setNextAdCountdown(3);
            } else {
                addToast('All videos complete! Revealing your content...', 'success');
            }
        }
    };

    const handleSponsorClick = () => {
        registerSponsorClick();
        setIsShowingAd(false);
        addToast('Sponsor visited! Revealing your content...', 'success');
        if (resource.customAd?.redirectUrl) {
            window.open(resource.customAd.redirectUrl, '_blank');
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
    let buttonIcon = isVideo ? <Play size={18} fill="currentColor" /> : <MousePointer2 size={18} />;
    let buttonBg = "bg-brand hover:bg-brand-hover";

    if (isCustom) {
        if (customSponsorStep === "watch") {
            buttonText = requiresClick ? "Watch + Click to Unlock" : "Watch to Unlock";
        } else if (customSponsorStep === "click") {
            buttonText = "Visit Sponsor to Unlock";
            buttonIcon = <MousePointerClick size={18} />;
            buttonBg = "bg-[#6366F1] hover:bg-[#4F46E5]";
        } else {
            buttonText = requiresClick ? "Watch + Click to Unlock" : "Watch to Unlock";
        }
    } else {
        if (remainingAds > 1 && remainingAds !== totalAdsRequired) {
            buttonText = isVideo ? `Watch ${remainingAds} Videos to Unlock` : `Click ${remainingAds} Ads to Unlock`;
        } else if (remainingAds === 1 && totalAdsRequired > 1) {
            buttonText = isVideo ? "One More Video — Almost There" : "One More Ad — Almost There";
        } else if (remainingAds > 1) {
            buttonText = isVideo ? `Watch ${remainingAds} Videos to Unlock` : `Click ${remainingAds} Ads to Unlock`;
        }
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
                <div className="w-full bg-success flex flex-col items-center justify-center animate-slide-down shadow-md z-20 px-4 py-3">
                    <div className="flex items-center gap-2 text-white font-black text-[15px] sm:text-[16px] text-center">
                        <CheckCircle2 size={20} className="shrink-0" />
                        {isCustom && requiresClick
                            ? `Thanks for supporting ${resource.customAd?.brandName}. You watched their video and visited their site.`
                            : (resource.donateEnabled ? 'Unlocked! And you helped plant a tree.' : 'Unlocked!')}
                    </div>
                    <span className="text-white/90 text-[13px] font-bold mt-1">Your free resource is ready to download</span>
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

                        <div className="flex items-center flex-wrap justify-center gap-2 text-[12px] font-bold text-textMid mb-6">
                            <span>{resource.unlockCount} unlocks</span>
                            <span className="w-1 h-1 rounded-full bg-border" />
                            <span>{resource.fileSize}</span>
                            <span className="w-1 h-1 rounded-full bg-border" />
                            <span className="px-2 py-0.5 bg-surfaceAlt rounded-md text-[11px]">{resource.fileType}</span>

                            {isCustom ? (
                                <span className="px-2 py-0.5 bg-[#EEF2FF] text-[#4F46E5] rounded-md text-[11px] flex items-center gap-1 font-bold">
                                    ✨ Sponsor: {requiresClick ? 'Watch + Click' : 'Video Only'}
                                </span>
                            ) : (
                                <span className="px-2 py-0.5 bg-brandTint text-brand rounded-md text-[11px] flex items-center gap-1">
                                    {isVideo ? <Play size={10} fill="currentColor" /> : <MousePointerClick size={10} />} {resource.adCount} {isVideo ? 'Video' : 'Ad'}{resource.adCount > 1 ? 's' : ''}
                                </span>
                            )}

                            {resource.donateEnabled && (
                                <span className="px-2 py-0.5 bg-[#EBF5EE] text-[#166534] rounded-md text-[11px] flex items-center gap-1">🌱 Trees</span>
                            )}
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

                        {resource.donateEnabled ? (
                            <div className="mt-5 w-full bg-[#EBF5EE] border border-[#BBF7D0] rounded-[16px] p-4 flex items-start gap-4">
                                <span className="text-[24px] shrink-0 mt-0.5">🌳</span>
                                <div>
                                    <h4 className="text-[14px] font-black text-[#166534] leading-tight mb-1">Make an Impact</h4>
                                    <p className="text-[13px] font-semibold text-[#166534]/80 leading-relaxed">
                                        This creator has planted 142 trees so far. 5% of earnings from your unlock will plant trees in Kenya.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="mt-5 w-full bg-surfaceAlt border border-border rounded-[16px] p-4 flex items-start gap-4">
                                <span className="text-[24px] shrink-0 mt-0.5">🌱</span>
                                <div>
                                    <h4 className="text-[14px] font-black text-text leading-tight mb-1">Global Impact</h4>
                                    <p className="text-[13px] font-semibold text-textMid leading-relaxed">
                                        AdGate creators have planted 12,450 trees so far. <Link to="/" className="text-brand hover:underline">Create your own free link</Link> at adgate.io.
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
                            {isCustom ? (
                                <div className="flex items-center justify-center gap-2 mb-6 pointer-events-none">
                                    <div className="flex flex-col items-center gap-2 relative">
                                        <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 z-10 shadow-sm transition-all duration-300
                                            ${customSponsorStep === "click" || isComplete ? 'bg-success border-success text-white animate-checkPop' : 'bg-white border-[#6366F1] text-[#6366F1] animate-pulseRing'}
                                        `}>
                                            {(customSponsorStep === "click" || isComplete) ? <Check size={18} strokeWidth={3} /> : <Play size={16} fill="currentColor" />}
                                        </div>
                                        <span className={`text-[10px] font-bold ${customSponsorStep === "click" || isComplete ? 'text-success' : 'text-[#6366F1]'}`}>
                                            Step 1: Watch
                                        </span>
                                    </div>

                                    {requiresClick && (
                                        <>
                                            <div className={`w-8 sm:w-16 h-[2px] -mt-[18px] transition-colors ${customSponsorStep === "click" ? 'bg-[#6366F1]' : isComplete ? 'bg-success' : 'bg-border'}`} />
                                            <div className="flex flex-col items-center gap-2 relative">
                                                <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 z-10 shadow-sm transition-all duration-300
                                                    ${isComplete ? 'bg-success border-success text-white animate-checkPop' :
                                                        customSponsorStep === "click" ? 'bg-white border-[#6366F1] text-[#6366F1] animate-pulseRing' :
                                                            'bg-white border-border text-border'}
                                                `}>
                                                    {isComplete ? <Check size={18} strokeWidth={3} /> : <MousePointerClick size={16} />}
                                                </div>
                                                <span className={`text-[10px] font-bold ${isComplete ? 'text-success' : customSponsorStep === "click" ? 'text-[#6366F1]' : 'text-textLight'}`}>
                                                    Step 2: Click
                                                </span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ) : (
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
                            )}

                            <div className="text-center mb-5">
                                {isCustom ? (
                                    <>
                                        <p className="text-[14px] font-bold text-text mb-1">
                                            {customSponsorStep === "click" ? "Step 1 complete! Now visit the sponsor's website to unlock." : "A brief message from our sponsor to unlock your resource."}
                                        </p>
                                        <p className="text-[12px] font-semibold text-textMid flex items-center justify-center gap-1">
                                            Sponsored by {resource.customAd?.brandName || 'Partner'}
                                        </p>
                                    </>
                                ) : isVideo ? (
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
                                    className={`w-full h-[54px] ${buttonBg} text-white font-black text-[15px] rounded-[14px] flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-[0.98]`}
                                >
                                    {buttonIcon}
                                    {buttonText}
                                </button>
                            )}

                            {resource.donateEnabled && nextAdCountdown === null && (
                                <p className="text-center text-[12px] font-bold text-success mt-3 flex items-center justify-center gap-1"><span className="text-[14px]">🌱</span> Unlocking this also plants trees</p>
                            )}

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
                            {resource.donateEnabled && (
                                <button
                                    className="w-full h-[44px] bg-[#EBF5EE] hover:bg-[#dcfce7] border border-[#BBF7D0] text-[#166534] font-black text-[14px] rounded-[14px] flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-[0.98] mb-2"
                                >
                                    Share Your Impact 🌱
                                </button>
                            )}
                            <p className="text-center text-[12px] font-bold text-textMid mb-8 mt-1">
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

            {isShowingAd && (
                customSponsorStep === "click" ? (
                    <SponsorClickInterstitial
                        customAd={resource.customAd}
                        onClick={handleSponsorClick}
                        onClose={handleAdClose}
                    />
                ) : isVideo && currentAd ? (
                    <VideoAdViewer
                        ad={currentAd}
                        onCompleted={handleVideoComplete}
                        onSkip={handleVideoSkip}
                        isCustom={isCustom}
                        customAd={resource.customAd}
                        requiresClick={requiresClick}
                    />
                ) : currentAd ? (
                    <AdInterstitial
                        ad={currentAd}
                        onClose={handleAdClose}
                        onClick={handleAdClick}
                        isCustom={isCustom}
                        customAd={resource.customAd}
                    />
                ) : null
            )}

            {/* Trees Counter Fixed Card */}
            {showTreeCard && (
                <div className="hidden sm:flex fixed bottom-6 left-6 z-40 w-[240px] bg-white border border-border shadow-[0_4px_16px_rgba(0,0,0,0.08)] rounded-[16px] p-4 flex-col animate-slideInRight">
                    <button onClick={() => setShowTreeCard(false)} className="absolute top-3 right-3 text-textLight hover:text-text transition-colors">
                        <X size={16} />
                    </button>
                    <span className="text-[20px] mb-1">🌳</span>
                    <span className="text-[13px] font-black text-text leading-tight mb-1">AdGate Forest</span>
                    <span className="text-[11px] font-bold text-textMid mb-3">12,450 trees planted</span>
                    <div className="w-full h-1.5 bg-surfaceAlt rounded-full overflow-hidden">
                        <div className="h-full bg-success w-[45%]" />
                    </div>
                </div>
            )}
        </div>
    );
};

// Step 2 Click Interstitial for Custom Sponsors
const SponsorClickInterstitial = ({ customAd, onClick, onClose }: any) => {
    return (
        <div className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-md animate-fadeIn p-4 sm:p-8 items-center justify-center" role="dialog" aria-modal="true">
            {/* Deliberately no close button as per specs: "No close button on Step 2; encourages click or abandonment via browser controls" */}
            <div className="w-full max-w-[400px] bg-white rounded-[24px] overflow-hidden flex flex-col items-center">
                <div className="w-full h-12 bg-successBg flex items-center justify-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-success flex items-center justify-center">
                        <Check size={12} className="text-white" strokeWidth={4} />
                    </div>
                    <span className="text-[13px] font-black text-success uppercase tracking-wide">Step 1 Complete</span>
                </div>

                <div className="p-8 flex flex-col items-center w-full">
                    <div className="w-20 h-20 bg-surfaceAlt rounded-full mb-4 flex items-center justify-center">
                        <span className="text-4xl font-black text-brand">
                            {customAd?.brandName ? customAd.brandName[0].toUpperCase() : "B"}
                        </span>
                    </div>
                    <h2 className="text-[24px] font-black tracking-tight leading-tight text-center mb-2">
                        Thanks for watching!
                    </h2>
                    <p className="text-[15px] font-medium text-textMid text-center mb-8 px-2 leading-snug">
                        Click below to visit <span className="text-text font-bold">{customAd?.brandName}</span> and instantly unlock your link.
                    </p>
                    <button
                        onClick={onClick}
                        className="w-full h-[56px] rounded-[16px] bg-[#6366F1] hover:bg-[#4F46E5] flex items-center justify-center text-white font-black text-[16px] shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                        {customAd?.ctaText || "Visit Sponsor"} <MousePointerClick size={18} className="ml-2" />
                    </button>
                    <button onClick={onClose} className="mt-6 text-textLight hover:text-textMid text-[12px] font-bold underline transition-colors">
                        I'll do this later
                    </button>
                </div>
            </div>
        </div>
    );
};
