import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { UploadCloud, Link as LinkIcon, Lock, Check, Loader2, ChevronDown, ChevronUp, Star, DollarSign, ArrowRight, Play, Settings } from 'lucide-react';
import { SignInModal } from '../components/SignInModal';
import { AdSourceSelector, type AdSourceType } from '../components/AdSourceSelector';
import { type CustomAdData } from '../components/CustomSponsorForm';
import { TreesLandingSection } from '../components/TreesLandingSection';
import { BottomSheet } from '../components/ui/BottomSheet';
import { useNavigate, Link } from 'react-router-dom';
import { ContentBuilder, type ContentData } from '../components/ContentBuilder';

const FAQS = [
    { q: "How much can I earn?", a: "You earn 95% of ad revenue. Rates vary by ad count, but average $0.02 - $0.06 per unlock. For 10,000 unlocks, you can earn up to $600." },
    { q: "Is it really free for my audience?", a: "Yes! They just need to click 1-3 ads depending on your settings. No paywalls, no crypto, no subscriptions." },
    { q: "What files can I upload?", a: "You can upload files up to 5GB, including PDFs, ZIPs, Images, Documents, or just share a secret link." },
    { q: "How do payouts work?", a: "Payouts are sent weekly to your connected Stripe account. Minimum payout threshold is $10." }
];

const TESTIMONIALS = [
    { name: "Sarah J.", role: "Design Creator", handle: "@sarahcreates", text: "I made $420 in my first week just by sharing my free Figma templates through AdGate. The setup took literally 10 seconds.", avatar: "S", color: "bg-blue-500" },
    { name: "Mark D.", role: "Developer", handle: "@markdev", text: "Finally, a way to monetize my open-source boilerplates without annoying my community with heavy paywalls.", avatar: "M", color: "bg-purple-500" },
    { name: "Elena R.", role: "3D Artist", handle: "@elenadesigns", text: "My audience loves that they can support me just by clicking an ad. The 5% tree planting feature is a huge plus too.", avatar: "E", color: "bg-green-500" }
];

export const Landing = () => {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Content state
    const [contentData, setContentData] = useState<ContentData>({
        contentMode: 'file',
        textContent: '',
        links: [],
        file: null
    });

    // Ad count state
    const [adCount, setAdCount] = useState<number>(1);

    // Ad Source State
    const [adSource, setAdSource] = useState<AdSourceType>("platform");
    const [customAd, setCustomAd] = useState<CustomAdData | null>(null);
    const [hasCustomAdErrors, setHasCustomAdErrors] = useState(true); // default true since empty form

    // Donate toggle state
    const [isDonateOn, setIsDonateOn] = useState(true);

    // Generate state
    const [isGenerating, setIsGenerating] = useState(false);
    const [isGenerated, setIsGenerated] = useState(false);
    const linkRevealed = isLoggedIn && isGenerated;

    const [fakeUrl] = useState('adga.te/r/freeresource');
    const [isCopied, setIsCopied] = useState(false);

    // Calc state
    const [calcViews, setCalcViews] = useState(2000);
    const [calcAds, setCalcAds] = useState(1);
    const [calcDonateOn, setCalcDonateOn] = useState(false);
    const [calcShowFormula, setCalcShowFormula] = useState(false);

    // FAQ state
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    // Mobile UI state
    const [isAdSetupSheetOpen, setAdSetupSheetOpen] = useState(false);
    const [isTreesSheetOpen, setTreesSheetOpen] = useState(false);
    const [hasPulsed, setHasPulsed] = useState(false);
    const [hasConfiguredAdSetup, setHasConfiguredAdSetup] = useState(false);
    const outputCardRef = useRef<HTMLDivElement>(null);

    // How It Works state
    const [howTab, setHowTab] = useState<'platform' | 'custom'>('platform');

    useEffect(() => {
        if (isGenerated && outputCardRef.current) {
            outputCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }, [isGenerated]);

    useEffect(() => {
        const hasContent = contentData.file || contentData.textContent.trim().length > 0 || contentData.links.length > 0;
        if (hasContent && !hasPulsed && !hasConfiguredAdSetup) {
            const timer = setTimeout(() => {
                if (!hasConfiguredAdSetup) setHasPulsed(true);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [contentData, hasPulsed, hasConfiguredAdSetup]);

    useEffect(() => {
        if (hasPulsed) {
            const timer = setTimeout(() => setHasPulsed(false), 600);
            return () => clearTimeout(timer);
        }
    }, [hasPulsed]);

    const handleAdSetupApply = () => {
        setHasConfiguredAdSetup(true);
        setHasPulsed(false);
        setAdSetupSheetOpen(false);
    };

    // Computed Values
    const getAdEstimates = (count: number) => {
        switch (count) {
            case 1: return { label: 'Quick unlock', time: '~15 sec', earnings: '$0.02' };
            case 2: return { label: 'Standard', time: '~30 sec', earnings: '$0.04' };
            case 3: return { label: 'Max earnings', time: '~45 sec', earnings: '$0.06' };
            default: return { label: 'Standard', time: '~30 sec', earnings: '$0.04' };
        }
    };
    const activeEstimate = getAdEstimates(adCount);

    const calcRate = 0.065;
    const calcGross = Math.round(calcViews * 0.6 * calcAds * calcRate);
    const calcNet = calcGross * 0.95;
    const calcFinal = calcDonateOn ? calcNet - (calcNet * 0.05) : calcNet;


    const handleGenerate = () => {
        const hasTextContent = contentData.textContent.trim().length > 0 || contentData.links.length > 0;
        const hasContent = contentData.file || hasTextContent;
        if (!hasContent) return;
        if (adSource === 'custom') {
            if (hasCustomAdErrors) {
                // Trigger validation UI
                window.dispatchEvent(new Event('CUSTOM_SPONSOR_VALIDATE'));
                alert("Please complete your sponsor details before generating.");
                return;
            }
        }
        setIsGenerating(true);
        setTimeout(() => {
            setIsGenerating(false);
            setIsGenerated(true);
        }, 1200);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(`https://${fakeUrl}`);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    const handleSignInSuccess = () => {
        if (isGenerated) {
            navigate('/dashboard');
        }
    };

    return (
        <div className="flex flex-col items-center w-full min-h-screen bg-bg selection:bg-brandTint selection:text-brand">
            {/* Hero Section */}
            <div className="w-full max-w-[800px] px-4 pt-[32px] pb-[20px] flex flex-col items-center text-center animate-fadeIn">
                <h1
                    className="w-full text-center"
                    style={{
                        fontFamily: '"Nunito", sans-serif',
                        fontWeight: 900,
                        fontSize: 'clamp(26px, 7vw, 42px)',
                        color: '#111111',
                        letterSpacing: '-0.03em',
                        lineHeight: 1.2
                    }}
                >
                    Upload anything. Share a link. Get <span style={{ color: '#E8312A' }}>paid</span> when people unlock it.
                </h1>

                <div className="h-[12px]" />

                <p
                    className="text-center mx-auto text-[15px] sm:text-[17px]"
                    style={{
                        fontFamily: '"Nunito", sans-serif',
                        fontWeight: 600,
                        color: '#666666',
                        maxWidth: '400px',
                        lineHeight: 1.5
                    }}
                >
                    Your audience gets it free by watching a short ad. You keep 95%.
                </p>
            </div>

            {/* Generator Component */}
            <div className="w-full max-w-[600px] px-4 mb-24 relative z-10" id="generator">
                {/* Desktop Step Layout */}
                <div className="hidden sm:flex bg-white rounded-[24px] border border-border shadow-md p-4 sm:p-6 flex-col gap-6">
                    {/* Step 1 */}
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-6 h-6 bg-text text-white rounded-full flex items-center justify-center font-black text-[12px]">1</div>
                            <h3 className="font-black text-text text-[18px] tracking-tight">Create your resource</h3>
                        </div>

                        <ContentBuilder value={contentData} onChange={setContentData} />
                    </div>

                    <div className="h-px w-full bg-border" />

                    {/* Step 2 */}
                    <div className={`flex flex-col gap-3 min-h-[0px] p-4 -m-4 rounded-[20px] transition-colors border-2 ${adSource === 'custom' ? 'border-[#6366F1]/40' : 'border-transparent'}`}>
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 bg-[#E8312A] text-white rounded-full flex items-center justify-center font-black text-[12px] transition-transform active:scale-110">2</div>
                            <h3 className="font-black text-text text-[18px] tracking-tight">Choose how you want ads to work</h3>
                        </div>
                        <p className="text-[12px] text-textMid -mt-2 ml-9">AdGate can serve ads for you, or you can use your own sponsor.</p>

                        <div className="ml-9">
                            <AdSourceSelector
                                value={adSource}
                                onChange={setAdSource}
                                customAd={customAd}
                                onCustomAdChange={setCustomAd}
                                onErrorStateChange={setHasCustomAdErrors}
                                adCount={adCount}
                            />
                            {adSource === 'custom' && (
                                <div className="mt-4 p-3 rounded-[14px] bg-surfaceAlt/50 border border-border text-[12px] text-textMid">
                                    Ad count set by your creative duration.
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="h-px w-full bg-border" />

                    {/* Step 3 */}
                    <div className={`flex flex-col gap-3 overflow-hidden transition-all duration-300 ${adSource === 'custom' ? 'opacity-0 max-h-0' : 'opacity-100 max-h-[500px]'}`}>
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 bg-text text-white rounded-full flex items-center justify-center font-black text-[12px]">3</div>
                            <h3 className="font-black text-text text-[18px] tracking-tight">Set ad requirement</h3>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 items-stretch ml-9">
                            <div className="flex gap-2 shrink-0">
                                {[1, 2, 3].map(num => (
                                    <button
                                        key={num}
                                        onClick={() => setAdCount(num)}
                                        className={`w-14 h-14 rounded-[12px] font-black text-[20px] transition-all flex items-center justify-center border-2 ${adCount === num
                                            ? 'bg-brand text-white border-brand'
                                            : 'bg-white border-border text-textMid hover:border-brandTint'
                                            }`}
                                    >
                                        {num}
                                    </button>
                                ))}
                            </div>

                            <div className="flex-1 bg-surfaceAlt border border-border rounded-[12px] px-4 py-2 flex justify-center flex-col min-h-[56px]">
                                <span className="font-black text-[14px] text-text">{activeEstimate.label}</span>
                                <div className="flex items-center justify-between text-[12px] font-bold mt-1">
                                    <span className="text-textMid">Time: {activeEstimate.time}</span>
                                    <span className="text-success bg-successBg px-1.5 py-0.5 rounded-[14px]">{activeEstimate.earnings} / unlock</span>
                                </div>
                            </div>
                        </div>
                        <div className="h-px w-full bg-border mt-3" />
                    </div>

                    {/* Step 4 / Donate */}
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 bg-text text-white rounded-full flex items-center justify-center font-black text-[12px] transition-transform">{adSource === 'custom' ? '3' : '4'}</div>
                            <h3 className="font-black text-text text-[18px] tracking-tight">Donate (Optional)</h3>
                        </div>
                        <div className={`ml-9 flex items-center justify-between p-3 rounded-[12px] border transition-colors ${isDonateOn ? 'bg-successBg border-success/30' : 'bg-surfaceAlt border-border'}`}>
                            <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[16px] ${isDonateOn ? 'bg-success/20 text-success' : 'bg-border text-textLight'}`}>
                                    🌱
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-black text-[14px] text-text">Donate 5% to plant trees</span>
                                    <span className="font-bold text-[11px] text-textMid">Boost viewer trust & conversion rates.</span>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsDonateOn(!isDonateOn)}
                                className={`w-[44px] h-[24px] rounded-full p-1 transition-colors relative shrink-0 ${isDonateOn ? 'bg-success' : 'bg-textLight'}`}
                            >
                                <div className={`w-[16px] h-[16px] bg-white rounded-full transition-transform absolute top-1 ${isDonateOn ? 'translate-x-[20px]' : 'translate-x-0'}`} />
                            </button>
                        </div>
                    </div>

                    {/* Generate Action */}
                    <div className="flex flex-col gap-2 mt-2">
                        {!isGenerated ? (
                            <button
                                onClick={handleGenerate}
                                disabled={isGenerating || !(contentData.file || contentData.textContent.trim().length > 0 || contentData.links.length > 0)}
                                className={`h-[56px] rounded-[14px] font-black text-[16px] flex items-center justify-center gap-2 transition-all ${(contentData.file || contentData.textContent.trim().length > 0 || contentData.links.length > 0) ? 'bg-brand text-white hover:bg-brand-hover shadow-sm' : 'bg-surfaceAlt text-textLight cursor-not-allowed'}`}
                            >
                                {isGenerating ? (
                                    <Loader2 size={24} className="animate-spin" />
                                ) : (
                                    <>
                                        <LinkIcon size={20} />
                                        Generate Shareable Link
                                    </>
                                )}
                            </button>
                        ) : (
                            <div className="flex flex-col animate-fadeIn">
                                <label className="font-black text-[11px] text-textMid uppercase tracking-wider mb-1.5">Your Generated Link</label>
                                <div className="flex gap-2">
                                    {linkRevealed ? (
                                        <>
                                            <div className="flex-1 h-[56px] rounded-[14px] border-2 px-4 flex items-center relative overflow-hidden transition-colors bg-brandTint border-brand/30">
                                                <span className="font-bold font-mono text-[14px] sm:text-[15px] truncate text-text">{fakeUrl}</span>
                                            </div>
                                            <button onClick={copyToClipboard} className={`h-[56px] w-[56px] rounded-[14px] flex items-center justify-center text-white transition-colors shrink-0 shadow-sm ${isCopied ? 'bg-success' : 'bg-brand hover:bg-brand-hover'}`}>
                                                {isCopied ? <Check size={24} /> : <LinkIcon size={24} />}
                                            </button>
                                        </>
                                    ) : (
                                        <button onClick={() => setIsModalOpen(true)} className="w-full h-[56px] bg-brand text-white rounded-[14px] font-black text-[15px] flex items-center justify-center gap-2 shadow-sm shrink-0 hover:bg-brand-hover transition-colors">
                                            <Lock size={18} /> Sign In to Reveal Link
                                        </button>
                                    )}
                                </div>
                                <div className="flex items-center gap-2 mt-3 flex-wrap">
                                    {adSource === 'platform' ? (
                                        <div className="h-[24px] px-2 rounded-full bg-[#E8312A] flex items-center gap-1.5 text-white shadow-sm">
                                            <Play size={10} fill="currentColor" />
                                            <span className="text-[12px] font-[700] uppercase tracking-wider">Video</span>
                                        </div>
                                    ) : (
                                        <div className="h-[24px] px-2 rounded-full bg-[#6366F1] flex items-center gap-1.5 text-white shadow-sm">
                                            <Star size={10} fill="currentColor" />
                                            <span className="text-[12px] font-[700] uppercase tracking-wider">Custom</span>
                                        </div>
                                    )}
                                    <div className="h-[24px] px-2 rounded-full bg-surfaceAlt border border-border flex items-center text-textMid shadow-sm">
                                        <span className="text-[12px] font-[700] uppercase">
                                            {contentData.contentMode === 'file' ? (contentData.file ? contentData.file.name : "File") :
                                             contentData.contentMode === 'text' ? (contentData.links.length > 0 && contentData.textContent.trim().length === 0 ? `${contentData.links.length} Link${contentData.links.length > 1 ? 's' : ''}` : "Text Content") :
                                             "Text + File"}
                                        </span>
                                    </div>
                                    <div className="h-[24px] px-2 rounded-full bg-surfaceAlt border border-border flex items-center text-textMid shadow-sm">
                                        <span className="text-[12px] font-[700] uppercase">{adCount} Ad{adCount > 1 ? 's' : ''}</span>
                                    </div>
                                </div>
                                {!linkRevealed && (
                                    <p className="text-[12px] font-bold text-brand mt-2 flex items-center gap-1.5 bg-brandTint p-2 rounded-[14px]">
                                        <span className="text-[16px]">👆</span> Sign in or create an account to claim and share this link.
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Compact Layout */}
                <div className="sm:hidden flex flex-col w-full">
                    <ContentBuilder value={contentData} onChange={setContentData} />

                    {/* The Settings Summary Bar */}
                    <div className="w-full h-[52px] bg-white rounded-[14px] mt-[8px] flex overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.06)] border border-[#E6E2D9]">
                        {/* Ad Setup Item */}
                        <button onClick={() => setAdSetupSheetOpen(true)} className={`flex-1 flex flex-col justify-center items-center relative ${hasPulsed ? 'bg-[#FFF0EF] transition-colors duration-300' : 'bg-white'}`}>
                            <div className="flex items-center gap-1">
                                {hasConfiguredAdSetup ? (
                                    adSource === 'platform' ? <Play size={10} className="text-[#E8312A]" /> : <Star size={10} className="text-[#6366F1]" />
                                ) : (
                                    <Settings size={10} className="text-[#AAA49C]" />
                                )}
                                <span className="text-[11px] text-textMid">Ad Setup</span>
                                {adSource === 'custom' && hasConfiguredAdSetup && <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#6366F1]" />}
                            </div>
                            {hasConfiguredAdSetup ? (
                                <span className="text-[11px] sm:text-[12px] font-[800] text-[#111] truncate px-1 max-w-[140px]">
                                    {adSource === 'platform' ? `Platform \u00B7 ${adCount} video ad${adCount > 1 ? 's' : ''}` : `Custom \u00B7 ${(customAd?.redirectUrl) ? 'Watch \u2192 Click' : 'Video'} \u00B7 ${customAd?.brandName || 'Sponsor'}`}
                                </span>
                            ) : (
                                <span className="text-[12px] italic text-[#BBBBBB]">Tap to set</span>
                            )}
                        </button>
                        <div className="w-[1px] h-full bg-[#F0F0F0]" />

                        {/* Trees Item */}
                        <button onClick={() => setTreesSheetOpen(true)} className="flex-1 flex flex-col justify-center items-center">
                            <div className="flex items-center gap-1">
                                <span className="text-[10px]">🌱</span>
                                <span className="text-[11px] text-textMid">Trees</span>
                            </div>
                            <span className={`text-[12px] font-[800] ${isDonateOn ? 'text-[#417A55]' : 'text-textMid'}`}>
                                {isDonateOn ? 'On' : 'Off'}
                            </span>
                        </button>
                        <div className="w-[1px] h-full bg-[#F0F0F0]" />

                        {/* Options Item */}
                        <button className="flex-1 flex flex-col justify-center items-center" onClick={() => alert("Options coming soon!")}>
                            <div className="flex items-center gap-1">
                                <Settings size={10} className="text-textLight" />
                                <span className="text-[11px] text-textMid">Options</span>
                            </div>
                            <span className="text-[12px] italic text-[#BBBBBB] opacity-80">Coming soon</span>
                        </button>
                    </div>

                    {/* Generate Button */}
                    <div className="mt-[10px]">
                        <button
                            onClick={handleGenerate}
                            disabled={isGenerating || !(contentData.file || contentData.textContent.trim().length > 0 || contentData.links.length > 0)}
                            className={`w-full h-[52px] rounded-[14px] font-[800] text-[16px] flex items-center justify-center gap-2 transition-all shadow-[0_1px_3px_rgba(0,0,0,0.06)]
                            ${(contentData.file || contentData.textContent.trim().length > 0 || contentData.links.length > 0) ? 'bg-[#E8312A] text-white' : 'bg-[#E8312A]/50 text-white'}`}
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 size={20} className="animate-spin" />
                                    Generating...
                                </>
                            ) : !(contentData.file || contentData.textContent.trim().length > 0 || contentData.links.length > 0) ? (
                                "Add content to get started"
                            ) : (
                                <>
                                    <LinkIcon size={18} />
                                    Generate Shareable Link
                                </>
                            )}
                        </button>
                    </div>

                    {/* Generated Link Output (Mobile) */}
                    {isGenerated && (
                        <div ref={outputCardRef} className="mt-[10px] bg-white rounded-[14px] p-[14px] shadow-[0_1px_3px_rgba(0,0,0,0.06)] border border-[#E6E2D9] animate-in slide-in-from-bottom-4 fade-in duration-300">
                            <div className="flex items-center gap-1.5 mb-2">
                                <div className="w-4 h-4 rounded-full bg-[#EBF5EE] text-[#417A55] flex items-center justify-center">
                                    <Check size={10} strokeWidth={4} />
                                </div>
                                <span className="text-[12px] font-[700] text-[#417A55]">Your link is ready</span>
                            </div>

                            <div className="flex gap-2">
                                {isLoggedIn ? (
                                    <>
                                        <div className="flex-1 h-[40px] rounded-[10px] px-3 flex items-center relative overflow-hidden transition-colors bg-[#F3F1EC]">
                                            <span className="font-bold font-mono text-[13px] truncate text-text">{fakeUrl}</span>
                                        </div>
                                        <button onClick={copyToClipboard} className={`w-[40px] h-[40px] rounded-full flex items-center justify-center text-white transition-colors shrink-0 shadow-sm ${isCopied ? 'bg-success' : 'bg-[#E8312A]'}`}>
                                            {isCopied ? <Check size={18} /> : <LinkIcon size={18} />}
                                        </button>
                                    </>
                                ) : (
                                    <button onClick={() => setIsModalOpen(true)} className="w-full h-[40px] bg-[#E8312A] text-white rounded-[10px] font-black text-[13px] flex items-center justify-center gap-1.5 shrink-0">
                                        Sign In to reveal
                                    </button>
                                )}
                            </div>

                            {/* Ad Type Badges Mobile */}
                            <div className="flex items-center gap-1.5 mt-3">
                                {adSource === 'platform' ? (
                                    <div className="h-[22px] px-2 rounded-full bg-[#FFF0EF] flex items-center gap-1 text-[#E8312A]">
                                        <Play size={8} fill="currentColor" />
                                        <span className="text-[10px] font-[800] uppercase pt-px">Platform</span>
                                    </div>
                                ) : (
                                    <div className="h-[22px] px-2 rounded-full bg-[#F5F3FF] flex items-center gap-1 text-[#6366F1]">
                                        <Star size={8} fill="currentColor" />
                                        <span className="text-[10px] font-[800] uppercase pt-px">Custom</span>
                                    </div>
                                )}
                                <div className="h-[22px] px-2 rounded-full bg-surfaceAlt border border-border flex items-center text-textMid">
                                    <span className="text-[10px] font-[800] uppercase pt-px">{adCount} Ad{adCount > 1 ? 's' : ''}</span>
                                </div>
                            </div>

                            {/* Mobile Compact How It Works Row */}
                            <div className="mt-[12px] h-[48px] bg-[#F8F8F8] rounded-[10px] flex items-center">
                                <div className="flex-1 flex flex-col items-center justify-center gap-0.5">
                                    <span className="text-[18px]">🔗</span>
                                    <span className="text-[10px] font-[700] text-textMid">Click link</span>
                                </div>
                                <div className="w-[1px] h-[24px] bg-[#E8E8E8]" />
                                <div className="flex-1 flex flex-col items-center justify-center gap-0.5">
                                    <span className="text-[18px]">{adSource === 'custom' ? '✨' : '📺'}</span>
                                    <span className="text-[10px] font-[700] text-textMid">{adSource === 'custom' ? 'View sponsor' : 'Watch ad'}</span>
                                </div>
                                <div className="w-[1px] h-[24px] bg-[#E8E8E8]" />
                                <div className="flex-1 flex flex-col items-center justify-center gap-0.5">
                                    <span className="text-[18px]">🎁</span>
                                    <span className="text-[10px] font-[700] text-textMid">Free content</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* How It Works Desktop Only */}
            <div id="how-it-works" className="hidden sm:flex w-full bg-white border-y border-border py-20 flex-col items-center">
                <div className="w-full max-w-[800px] px-4">
                    <div className="flex flex-col items-center text-center mb-10">
                        <span className="text-brand font-black text-[12px] uppercase tracking-widest mb-2">Simple Process</span>
                        <h2 className="text-[32px] font-black text-text leading-tight">Create, share, earn.</h2>
                        <p className="text-[16px] text-textMid font-bold mt-2 max-w-[400px]">The easiest way to monetize free resources.</p>
                    </div>

                    <div className="flex p-1 bg-surfaceAlt rounded-[12px] border border-border mb-10 mx-auto w-max max-w-full">
                        <button
                            onClick={() => setHowTab('platform')}
                            className={`px-6 py-2 rounded-[8px] font-[800] text-[14px] transition-colors ${howTab === 'platform' ? 'bg-white shadow-sm text-text' : 'text-textMid hover:text-text'}`}
                        >
                            Platform Ads
                        </button>
                        <button
                            onClick={() => setHowTab('custom')}
                            className={`px-6 py-2 rounded-[8px] font-[800] text-[14px] transition-colors flex items-center gap-2 ${howTab === 'custom' ? 'bg-white shadow-sm text-[#4F46E5]' : 'text-textMid hover:text-text'}`}
                        >
                            Custom Sponsor <span className="bg-[#E0EEF5] text-[#0369A1] px-1.5 py-0.5 rounded-[14px] text-[10px] uppercase font-black">0% Fee</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
                        <div className="flex flex-col items-center text-center group">
                            <div className="w-20 h-20 bg-surfaceAlt rounded-[20px] flex items-center justify-center border border-border mb-6 group-hover:-translate-y-2 transition-transform shadow-sm">
                                <UploadCloud size={32} className={howTab === 'custom' ? 'text-[#4F46E5]' : 'text-brand'} />
                            </div>
                            <h3 className="text-[18px] font-black text-text mb-2">1. Upload Context</h3>
                            <p className="text-[14px] text-textMid font-bold">Add your files, set title, description, and {howTab === 'custom' ? 'link your own sponsor creative' : 'choose 1-3 ads'}.</p>
                        </div>
                        <div className="flex flex-col items-center text-center group">
                            <div className="w-20 h-20 bg-surfaceAlt rounded-[20px] flex items-center justify-center border border-border mb-6 group-hover:-translate-y-2 transition-transform shadow-sm relative">
                                <LinkIcon size={32} className="text-text" />
                                <div className={`absolute -top-2 -right-2 text-white text-[10px] font-black px-2 py-0.5 rounded-full ${howTab === 'custom' ? 'bg-[#4F46E5]' : 'bg-brand'}`}>SHARE</div>
                            </div>
                            <h3 className="text-[18px] font-black text-text mb-2">2. Share Everywhere</h3>
                            <p className="text-[14px] text-textMid font-bold">Post your generated link on YouTube, X, Instagram, or your newsletter.</p>
                        </div>
                        <div className="flex flex-col items-center text-center group">
                            <div className="w-20 h-20 bg-surfaceAlt rounded-[20px] flex items-center justify-center border border-border mb-6 group-hover:-translate-y-2 transition-transform shadow-sm">
                                <DollarSign size={32} className="text-success" />
                            </div>
                            <h3 className="text-[18px] font-black text-text mb-2">3. Earn Revenue</h3>
                            <p className="text-[14px] text-textMid font-bold">{howTab === 'custom' ? 'Direct viewers to your sponsor.' : 'Users watch a short video to automatically unlock. You get paid for every view.'}</p>
                        </div>
                    </div>

                    <div className="w-full max-w-[500px] mx-auto bg-surfaceAlt p-6 rounded-[16px] border border-border">
                        <h4 className="font-[800] text-[15px] mb-4 border-b border-border pb-2">How earnings work</h4>
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-[14px] font-[700] text-textMid">{howTab === 'custom' ? 'Your Sponsorship Deal' : 'AdGate Ad Revenue'}</span>
                            <span className="text-[14px] font-[800] text-text">{howTab === 'custom' ? '(negotiated)' : '100%'}</span>
                        </div>
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-[14px] font-[700] text-textMid">Platform Fee</span>
                            <span className={`text-[14px] font-[800] ${howTab === 'custom' ? 'text-success' : 'text-[#E8312A]'}`}>
                                {howTab === 'custom' ? '$0.00 FREE' : '- 5%'}
                            </span>
                        </div>
                        {isDonateOn && (
                            <div className="flex justify-between items-start mb-3 bg-[#EBF5EE] p-2 rounded-[14px]">
                                <div className="flex flex-col">
                                    <span className="text-[13px] font-[700] text-[#417A55]">Tree Donation (Optional)</span>
                                    {howTab === 'custom' && <span className="text-[11px] text-[#417A55]/80 mt-1 max-w-[200px]">You choose to donate 5% of your deal. This comes from your 100% and is your choice.</span>}
                                </div>
                                <span className="text-[13px] font-[800] text-[#417A55] whitespace-nowrap">- 5%</span>
                            </div>
                        )}
                        <div className="h-px bg-border w-full my-3" />
                        <div className="flex justify-between items-center">
                            <span className="text-[16px] font-[900] text-text">Your Earnings</span>
                            <span className="text-[20px] font-[900] text-success">
                                {howTab === 'custom'
                                    ? (isDonateOn ? '95% of your deal' : '100% of your deal')
                                    : (isDonateOn ? '90%' : '95%')}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Earnings Calculator */}
            {/* Earnings Calculator */}
            <div className="w-full bg-bg py-24 flex flex-col items-center">
                <div className="w-full max-w-[600px] px-4 flex flex-col items-center">
                    <div className="flex flex-col items-center text-center mb-10">
                        <h2 className="text-[20px] font-black text-text mb-1">Calculate Your Earnings</h2>
                        <p className="text-[14px] text-textMid font-bold">See what your content could earn you every month</p>
                    </div>

                    <div className="w-full bg-white rounded-[18px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)] border border-border">
                        {/* Input Row 1 - Monthly Link Clicks */}
                        <div className="flex flex-col gap-3 mb-6">
                            <label className="text-[13px] font-[800] text-[#333]">Monthly link clicks</label>
                            <input
                                type="range"
                                min="100" max="100000" step="100"
                                value={calcViews}
                                onChange={(e) => setCalcViews(Number(e.target.value))}
                                className="w-full h-2 bg-border rounded-[14px] appearance-none cursor-pointer accent-[#E8312A]"
                            />
                            <div className="text-[18px] font-[900] text-[#E8312A] -mt-1">
                                {calcViews.toLocaleString()} clicks
                            </div>
                            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                                {[500, 1000, 5000, 10000, 50000].map(val => (
                                    <button
                                        key={val}
                                        onClick={() => setCalcViews(val)}
                                        className="h-[34px] px-4 rounded-[50px] border border-border text-textMid font-bold text-[13px] hover:bg-surfaceAlt whitespace-nowrap shrink-0"
                                    >
                                        {val >= 1000 ? `${val / 1000}K` : val}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Information Row - Rates */}
                        <div className="flex flex-col gap-2 mb-6 bg-surfaceAlt p-4 rounded-[12px] border border-border">
                            <div className="flex items-center justify-between">
                                <span className="text-[13px] font-[800] text-text">Platform Video Ads</span>
                                <span className="text-[13px] font-[800] text-success">$0.05–$0.15 <span className="text-textLight font-[600]">/ unlock</span></span>
                            </div>
                            <span className="text-[12px] text-textMid font-[600]">Based on platform video ad CPMs.</span>
                            
                            <div className="mt-3 pt-3 border-t border-border flex flex-col gap-2 relative group cursor-help">
                                <div className="flex items-center justify-between">
                                    <span className="text-[13px] font-[800] text-[#4F46E5]">Custom Sponsor</span>
                                    <span className="text-[13px] font-[800] text-[#4F46E5] opacity-80 decoration-1 underline-offset-2 underline decoration-[#4F46E5]/30">Varies</span>
                                </div>
                                <div className="mt-1 bg-[#F5F3FF] p-3 rounded-[12px] opacity-0 group-hover:opacity-100 transition-opacity absolute top-[30px] w-full text-left pointer-events-none z-10 shadow-sm border border-[#E0D8FE]">
                                    <span className="text-[12px] text-textMid font-[600]">With a custom sponsor you keep 100% of your deal. AdGate takes zero commission. Your earnings are entirely between you and your sponsor.</span>
                                </div>
                            </div>
                        </div>

                        {/* Input Row 3 - Ads per Unlock */}
                        <div className="flex flex-col gap-3 mb-6">
                            <label className="text-[13px] font-[800] text-[#333]">Ads per unlock</label>
                            <div className="flex flex-row gap-2 items-stretch">
                                {[1, 2, 3].map(num => (
                                    <button
                                        key={num}
                                        onClick={() => setCalcAds(num)}
                                        className={`w-14 h-14 rounded-[12px] font-black text-[20px] transition-all flex items-center justify-center border-2 ${calcAds === num
                                            ? 'bg-brand text-white border-brand'
                                            : 'bg-white border-border text-textMid hover:border-brandTint'
                                            }`}
                                    >
                                        {num}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Input Row 4 - Donate To Trees Toggle */}
                        <div className="flex items-center justify-between mb-6">
                            <label className="text-[13px] font-[700] text-[#111]">Donate 5% to trees 🌱</label>
                            <button
                                onClick={() => setCalcDonateOn(!calcDonateOn)}
                                className={`w-[44px] h-[24px] rounded-full p-1 transition-colors relative shrink-0 ${calcDonateOn ? 'bg-success' : 'bg-textLight'}`}
                            >
                                <div className={`w-[16px] h-[16px] bg-white rounded-full transition-transform absolute top-1 ${calcDonateOn ? 'translate-x-[20px]' : 'translate-x-0'}`} />
                            </button>
                        </div>

                        <div className="h-px w-full bg-border mb-6" />

                        {/* Results Block */}
                        <div className="flex flex-col mb-4">
                            <span className="text-[11px] font-[800] text-textMid uppercase tracking-wide">Estimated Monthly Earnings</span>
                            <div className="text-[40px] font-[900] text-[#E8312A] leading-tight mb-3">
                                ${calcGross.toLocaleString('en-US')}
                            </div>

                            <span className="text-[11px] text-textMid mb-1 font-bold">After 5% Platform Fee</span>
                            <div className="text-[24px] font-[900] text-[#111] mb-2 leading-tight">
                                ${calcNet.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                            </div>

                            <div className={`flex flex-col overflow-hidden transition-all duration-300 ${calcDonateOn ? 'max-h-[80px] opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'}`}>
                                <span className="text-[11px] text-success font-bold mb-1">After Tree Donation (5% of yours)</span>
                                <div className="text-[20px] font-[800] text-success leading-tight">
                                    ${calcFinal.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                                </div>
                            </div>
                        </div>

                        {/* Disclosure */}
                        <div className="w-full bg-surfaceAlt border border-border rounded-[12px] overflow-hidden">
                            <button
                                onClick={() => setCalcShowFormula(!calcShowFormula)}
                                className="w-full h-[40px] px-4 flex items-center justify-between hover:bg-border/50 transition-colors"
                            >
                                <span className="text-[12px] font-[700] text-[#666]">How is this calculated?</span>
                                <ChevronDown size={16} className={`text-textMid transition-transform ${calcShowFormula ? 'rotate-180' : ''}`} />
                            </button>
                            {calcShowFormula && (
                                <div className="px-4 pb-4 pt-1">
                                    <p className="text-[11px] font-mono text-textMid leading-relaxed">
                                        clicks &times; 60% unlock rate &times; {calcAds} ads &times; ${calcRate.toFixed(3)} per unlock = gross. Gross &times; 95% = your earnings.
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Annual Projection */}
                        <div className="mt-6 text-center">
                            <span className="text-[14px] font-[800] text-[#333]">
                                That's est. ${(calcFinal * 12).toLocaleString('en-US', { maximumFractionDigits: 0 })} per year 🎯
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Testimonials */}
            <div className="w-full bg-white border-y border-border py-20 flex flex-col items-center">
                <div className="w-full max-w-[1000px] px-4">
                    <h2 className="text-[32px] sm:text-[40px] font-black text-text leading-tight text-center mb-12">Loved by creators.</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {TESTIMONIALS.map((t, idx) => (
                            <div key={idx} className="bg-surfaceAlt border border-border rounded-[20px] p-6 flex flex-col items-start hover:shadow-md transition-shadow">
                                <div className="flex gap-1 mb-4 text-[#F59E0B]">
                                    <Star fill="currentColor" size={16} />
                                    <Star fill="currentColor" size={16} />
                                    <Star fill="currentColor" size={16} />
                                    <Star fill="currentColor" size={16} />
                                    <Star fill="currentColor" size={16} />
                                </div>
                                <p className="text-[15px] font-bold text-text leading-relaxed mb-6">"{t.text}"</p>
                                <div className="mt-auto flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full ${t.color} text-white flex items-center justify-center font-black text-[16px]`}>
                                        {t.avatar}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-black text-[14px] text-text leading-none">{t.name}</span>
                                        <span className="font-bold text-[12px] text-textMid mt-1">{t.role} {t.handle}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Use Cases Teaser */}
            <div className="w-full bg-white border-b border-border py-20 flex flex-col items-center overflow-hidden">
                <div className="w-full flex flex-col items-center">
                    <h2 className="text-[20px] font-black text-text leading-tight text-center mb-1">What Creators Are Sharing</h2>
                    <p className="text-[14px] text-textMid text-center mb-10">Any content your audience wants is content you can monetize.</p>

                    <div className="w-full overflow-x-auto no-scrollbar px-4 pb-4 flex justify-start sm:justify-center mb-8">
                        <div className="flex gap-4">
                            {[
                                { emoji: '🤖', name: 'AI & Prompts', desc: 'up to $375/mo' },
                                { emoji: '📚', name: 'Education', desc: 'up to $500/mo' },
                                { emoji: '🎨', name: 'Design', desc: 'up to $600/mo' },
                                { emoji: '💼', name: 'Business', desc: 'up to $700/mo' },
                                { emoji: '💻', name: 'Coding', desc: 'up to $520/mo' },
                                { emoji: '📷', name: 'Photography', desc: 'up to $760/mo' }
                            ].map((card, i) => (
                                <Link
                                    to={`/use-cases?category=${encodeURIComponent(card.name)}`}
                                    key={i}
                                    className="w-[160px] h-[180px] shrink-0 bg-white rounded-[14px] shadow-[0_1px_3px_rgba(0,0,0,0.06)] border border-border p-4 flex flex-col items-center justify-center hover:-translate-y-1 transition-transform"
                                >
                                    <div className="text-[40px] mb-4">{card.emoji}</div>
                                    <h3 className="text-[14px] font-black text-[#111] text-center mb-1">{card.name}</h3>
                                    <span className="text-[12px] font-extrabold text-success text-center">{card.desc}</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <Link to="/use-cases" className="h-[44px] w-full sm:w-[160px] max-w-[200px] border-2 border-[#E8312A] text-[#E8312A] font-black text-[14px] rounded-full flex items-center justify-center hover:bg-[#FFF0EF] transition-colors mb-3 px-4">
                        See All 18 Use Cases →
                    </Link>
                    <span className="text-[12px] text-textMid text-center">Estimated monthly earnings based on 10K monthly link clicks.</span>
                </div>
            </div>

            {/* FAQ */}
            <div className="w-full bg-bg py-20 flex flex-col items-center">
                <div className="w-full max-w-[600px] px-4">
                    <h2 className="text-[32px] font-black text-text mb-8 text-center">Questions & Answers</h2>

                    <div className="flex flex-col gap-3">
                        {FAQS.map((faq, idx) => (
                            <div key={idx} className="bg-white border border-border rounded-[16px] overflow-hidden">
                                <button
                                    className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-surfaceAlt transition-colors"
                                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                >
                                    <span className="font-black text-[15px] text-text pr-4">{faq.q}</span>
                                    {openFaq === idx ? <ChevronUp size={20} className="text-textMid min-w-[20px]" /> : <ChevronDown size={20} className="text-textMid min-w-[20px]" />}
                                </button>
                                {openFaq === idx && (
                                    <div className="px-5 pb-4 pt-1 text-[14px] font-bold text-textMid leading-relaxed">
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Trees Section */}
            <TreesLandingSection />

            {/* CTA Pre-Footer */}
            <div className="w-full bg-brand py-24 px-4 flex flex-col items-center text-center">
                <h2 className="text-[36px] sm:text-[48px] font-black text-white leading-tight mb-4">Start monetizing today.</h2>
                <p className="text-brandTint font-bold text-[16px] max-w-[400px] mb-8">Join thousands of creators earning revenue from their free content.</p>
                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="h-[56px] px-8 bg-white text-brand font-black text-[16px] rounded-[16px] shadow-lg hover:scale-105 transition-transform flex items-center gap-2">
                    Create a Link <ArrowRight size={20} />
                </button>
            </div>

            {/* Standard Footer */}
            <footer className="w-full bg-white border-t border-border py-12 px-4 flex flex-col items-center">
                <div className="w-full max-w-[1000px] flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2 opacity-80">
                        <div className="w-6 h-6 rounded-[14px] bg-text text-white flex items-center justify-center font-black text-[10px] leading-none shrink-0">
                            AG
                        </div>
                        <span className="font-black text-[16px] tracking-tight text-text">AdGate</span>
                    </div>

                    <div className="flex items-center gap-6 text-[13px] font-bold text-textMid">
                        <Link to="/explore" className="hover:text-text transition-colors">Explore</Link>
                        <Link to="/terms" className="hover:text-text transition-colors">Terms of Service</Link>
                        <Link to="/privacy" className="hover:text-text transition-colors">Privacy Policy</Link>
                        <Link to="/contact" className="hover:text-text transition-colors">Contact</Link>
                    </div>

                    <div className="text-[12px] font-bold text-textLight">
                        © {new Date().getFullYear()} AdGate Inc. All rights reserved.
                    </div>
                </div>
            </footer>

            <SignInModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={handleSignInSuccess}
            />

            {/* Mobile Bottom Sheets */}
            <BottomSheet isOpen={isAdSetupSheetOpen} onClose={() => setAdSetupSheetOpen(false)} title="Ad Setup">
                <div className="flex flex-col gap-6 pt-2 pb-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-[14px] font-[800] text-[#111]">1. Ad Source</label>
                        <AdSourceSelector
                            value={adSource}
                            onChange={setAdSource}
                            customAd={customAd}
                            onCustomAdChange={setCustomAd}
                            onErrorStateChange={setHasCustomAdErrors}
                            adCount={adCount}
                        />
                    </div>
                    {adSource === 'platform' && (
                        <div className="flex flex-col gap-3">
                            <label className="text-[14px] font-[800] text-[#111]">2. Requirement</label>
                            <div className="flex gap-2">
                                {[1, 2, 3].map(num => (
                                    <button
                                        key={num}
                                        onClick={() => setAdCount(num)}
                                        className={`flex-1 h-12 rounded-[12px] font-[800] text-[16px] transition-all border-2 ${adCount === num
                                            ? 'bg-brand text-white border-brand'
                                            : 'bg-white border-[#E8E8E8] text-[#666] hover:border-brandTint'
                                            }`}
                                    >
                                        {num} Ad{num > 1 ? 's' : ''}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                    <button onClick={handleAdSetupApply} className="w-full h-[52px] bg-brand text-white font-[800] text-[16px] rounded-[14px] mt-2">
                        Apply Settings
                    </button>
                </div>
            </BottomSheet>

            <BottomSheet isOpen={isTreesSheetOpen} onClose={() => setTreesSheetOpen(false)} title="Trees">
                <div className="flex flex-col gap-6 pt-2 pb-6">
                    <div className="flex flex-col items-center text-center p-6 bg-[#EBF5EE] rounded-[18px]">
                        <span className="text-[48px] mb-2 leading-none">🌱</span>
                        <h4 className="font-[900] text-[20px] text-[#222]">Plant trees by sharing</h4>
                        <p className="font-[600] text-[14px] text-success mt-2 leading-snug">
                            Donate 5% of your earnings to plant trees. You'll get a special badge to show your audience.
                        </p>

                        <div className="w-full bg-white rounded-[12px] p-4 mt-6 flex items-center justify-between border border-success/20 shadow-sm">
                            <span className="font-[800] text-[15px] text-[#111]">Donate 5%</span>
                            <button
                                onClick={() => setIsDonateOn(!isDonateOn)}
                                className={`w-[52px] h-[28px] rounded-full p-1 transition-colors relative shrink-0 ${isDonateOn ? 'bg-success' : 'bg-[#E8E8E8]'}`}
                            >
                                <div className={`w-[20px] h-[20px] bg-white rounded-full transition-transform absolute top-1 ${isDonateOn ? 'translate-x-[24px]' : 'translate-x-0'}`} />
                            </button>
                        </div>
                    </div>
                </div>
            </BottomSheet>
        </div>
    );
};
