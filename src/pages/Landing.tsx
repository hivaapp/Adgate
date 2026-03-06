import { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { UploadCloud, Link as LinkIcon, Trash2, Lock, Check, Loader2, ChevronDown, ChevronUp, Star, TrendingUp, DollarSign, ArrowRight } from 'lucide-react';
import { SignInModal } from '../components/SignInModal';
import { useNavigate, Link } from 'react-router-dom';

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

    // Upload state
    const [files, setFiles] = useState<File[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Ad count state
    const [adCount, setAdCount] = useState<number>(1);

    // Donate toggle state
    const [isDonateOn, setIsDonateOn] = useState(true);

    // Generate state
    const [isGenerating, setIsGenerating] = useState(false);
    const [isGenerated, setIsGenerated] = useState(false);
    const [fakeUrl] = useState('adga.te/r/freeresource');
    const [isCopied, setIsCopied] = useState(false);

    // Calc state
    const [calcViews, setCalcViews] = useState(5000);
    const [calcAds, setCalcAds] = useState(2);

    // FAQ state
    const [openFaq, setOpenFaq] = useState<number | null>(0);

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

    const calcEarnings = (calcViews * (calcAds * 0.02)).toLocaleString('en-US', { style: 'currency', currency: 'USD' });

    // Handlers
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };
    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };
    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setFiles(prev => [...prev, ...Array.from(e.dataTransfer.files)]);
        }
    };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFiles(prev => [...prev, ...Array.from(e.target.files!)]);
        }
    };
    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleGenerate = () => {
        if (files.length === 0) return;
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
            <div className="w-full max-w-[800px] px-4 pt-12 sm:pt-20 pb-16 flex flex-col items-center text-center animate-fadeIn">
                <div className="bg-brandTint text-brand font-extrabold text-[12px] px-3 py-1 mt-6 rounded-full mb-6 flex items-center gap-2 border border-brand/20">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-brand"></span>
                    </span>
                    Earn from every share — for free
                </div>

                <h1 className="text-[40px] sm:text-[64px] font-black text-text leading-[1.05] tracking-tight mb-6">
                    Monetize your audience.<br />
                    <span className="text-brand">Without subscriptions.</span>
                </h1>

                <p className="text-textMid font-bold text-[16px] sm:text-[20px] max-w-[540px] mb-10 leading-snug">
                    Upload any file, set the ad count, and share the link. Viewers click a short ad to unlock it, and you keep 95% of the revenue.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                    <div className="bg-white border border-border px-4 py-3 flex gap-3 items-center rounded-[16px] shadow-sm">
                        <div className="w-10 h-10 bg-surfaceAlt rounded-full flex items-center justify-center text-[20px]">🙌</div>
                        <div className="flex flex-col items-start leading-none gap-1">
                            <span className="font-black text-[18px] text-text">12.4k</span>
                            <span className="font-bold text-[11px] text-textLight uppercase tracking-wider">Creators</span>
                        </div>
                    </div>
                    <div className="bg-white border border-border px-4 py-3 flex gap-3 items-center rounded-[16px] shadow-sm">
                        <div className="w-10 h-10 bg-surfaceAlt rounded-full flex items-center justify-center text-[20px]">🔗</div>
                        <div className="flex flex-col items-start leading-none gap-1">
                            <span className="font-black text-[18px] text-text">145k+</span>
                            <span className="font-bold text-[11px] text-textLight uppercase tracking-wider">Links Gen</span>
                        </div>
                    </div>
                    <div className="bg-white border border-border px-4 py-3 flex gap-3 items-center rounded-[16px] shadow-sm">
                        <div className="w-10 h-10 bg-successBg rounded-full flex items-center justify-center text-[20px]">💸</div>
                        <div className="flex flex-col items-start leading-none gap-1">
                            <span className="font-black text-[18px] text-success">$2.1M</span>
                            <span className="font-bold text-[11px] text-textLight uppercase tracking-wider">Paid Out</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Generator Component */}
            <div className="w-full max-w-[600px] px-4 mb-24 relative z-10" id="generator">
                <div className="bg-white rounded-[24px] border border-border shadow-md p-4 sm:p-6 flex flex-col gap-6">

                    {/* Step 1 */}
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 bg-text text-white rounded-full flex items-center justify-center font-black text-[12px]">1</div>
                            <h3 className="font-black text-text text-[18px] tracking-tight">Upload your files</h3>
                        </div>

                        <div
                            className={`w-full rounded-[16px] border border-dashed p-6 flex flex-col items-center text-center transition-all duration-200 ease-out cursor-pointer ${isDragging ? 'border-brand bg-brandTint scale-[1.01]' : 'border-border bg-surfaceAlt hover:border-textMid'
                                }`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <input
                                type="file"
                                className="hidden"
                                ref={fileInputRef}
                                multiple
                                onChange={handleFileChange}
                            />
                            <div className={`w-12 h-12 rounded-full mb-3 flex items-center justify-center ${isDragging ? 'bg-brand/20 text-brand' : 'bg-white border border-border text-textLight'}`}>
                                <UploadCloud size={24} />
                            </div>
                            <h4 className="font-black text-[15px] text-text tracking-tight mb-1">Drag and drop files here</h4>
                            <p className="text-textMid font-bold text-[13px] mb-4">or click to select files</p>
                            <div className="flex gap-2">
                                <span className="bg-white border border-border text-textLight text-[10px] font-black px-2 py-0.5 rounded uppercase">PDF</span>
                                <span className="bg-white border border-border text-textLight text-[10px] font-black px-2 py-0.5 rounded uppercase">ZIP</span>
                                <span className="bg-white border border-border text-textLight text-[10px] font-black px-2 py-0.5 rounded uppercase">IMG</span>
                            </div>
                        </div>

                        {files.length > 0 && (
                            <div className="flex flex-col gap-2 mt-1 animate-fadeIn">
                                {files.map((file, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-[12px] border border-border shadow-sm">
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            <div className="w-8 h-8 rounded bg-surfaceAlt flex items-center justify-center text-[16px] shrink-0">📄</div>
                                            <span className="font-bold text-[13px] text-text truncate">{file.name}</span>
                                        </div>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); removeFile(idx); }}
                                            className="w-8 h-8 rounded-full flex items-center justify-center text-textLight hover:bg-errorBg hover:text-error transition-colors shrink-0"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="h-px w-full bg-border" />

                    {/* Step 2 */}
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 bg-text text-white rounded-full flex items-center justify-center font-black text-[12px]">2</div>
                            <h3 className="font-black text-text text-[18px] tracking-tight">Set ad requirement</h3>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 items-stretch">
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
                                    <span className="text-success bg-successBg px-1.5 py-0.5 rounded">{activeEstimate.earnings} / unlock</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Step 3 / Donate */}
                    <div className={`flex items-center justify-between p-3 rounded-[12px] border transition-colors ${isDonateOn ? 'bg-successBg border-success/30' : 'bg-surfaceAlt border-border'}`}>
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

                    {/* Generate Action */}
                    <div className="flex flex-col gap-2 mt-2">
                        {!isGenerated ? (
                            <button
                                onClick={handleGenerate}
                                disabled={isGenerating || files.length === 0}
                                className={`h-[56px] rounded-[14px] font-black text-[16px] flex items-center justify-center gap-2 transition-all ${files.length > 0 ? 'bg-brand text-white hover:bg-brand-hover shadow-sm' : 'bg-surfaceAlt text-textLight cursor-not-allowed'}`}
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
                                    <div className={`flex-1 h-[56px] rounded-[14px] border-2 px-4 flex items-center relative overflow-hidden transition-colors ${isLoggedIn ? 'bg-brandTint border-brand/30' : 'bg-surfaceAlt border-border border-dashed'}`}>
                                        {!isLoggedIn && <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px] z-10" />}
                                        <span className="font-bold font-mono text-[14px] sm:text-[15px] truncate text-text">{fakeUrl}</span>
                                    </div>
                                    {!isLoggedIn ? (
                                        <button onClick={() => setIsModalOpen(true)} className="h-[56px] px-6 bg-brand text-white rounded-[14px] font-black text-[15px] flex items-center gap-2 shadow-sm shrink-0">
                                            <Lock size={18} /> Sign In
                                        </button>
                                    ) : (
                                        <button onClick={copyToClipboard} className={`h-[56px] w-[56px] rounded-[14px] flex items-center justify-center text-white transition-colors shrink-0 shadow-sm ${isCopied ? 'bg-success' : 'bg-brand hover:bg-brand-hover'}`}>
                                            {isCopied ? <Check size={24} /> : <LinkIcon size={24} />}
                                        </button>
                                    )}
                                </div>
                                {!isLoggedIn && (
                                    <p className="text-[12px] font-bold text-brand mt-2 flex items-center gap-1.5 bg-brandTint p-2 rounded-lg">
                                        <span className="text-[16px]">👆</span> Sign in or create an account to claim and share this link.
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* How It Works */}
            <div id="how-it-works" className="w-full bg-white border-y border-border py-20 flex flex-col items-center">
                <div className="w-full max-w-[800px] px-4">
                    <div className="flex flex-col items-center text-center mb-16">
                        <span className="text-brand font-black text-[12px] uppercase tracking-widest mb-2">Simple Process</span>
                        <h2 className="text-[32px] sm:text-[40px] font-black text-text leading-tight">Create, share, earn.</h2>
                        <p className="text-[16px] text-textMid font-bold mt-3 max-w-[400px]">The easiest way to monetize free resources. No user sign-ups required.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                        <div className="flex flex-col items-center text-center group">
                            <div className="w-20 h-20 bg-surfaceAlt rounded-[20px] flex items-center justify-center border border-border mb-6 group-hover:-translate-y-2 transition-transform shadow-sm">
                                <UploadCloud size={32} className="text-brand" />
                            </div>
                            <h3 className="text-[18px] font-black text-text mb-2">1. Upload Context</h3>
                            <p className="text-[14px] text-textMid font-bold">Add your files, set title, description, and choose 1-3 ads for verification.</p>
                        </div>
                        <div className="flex flex-col items-center text-center group">
                            <div className="w-20 h-20 bg-surfaceAlt rounded-[20px] flex items-center justify-center border border-border mb-6 group-hover:-translate-y-2 transition-transform shadow-sm relative">
                                <LinkIcon size={32} className="text-text" />
                                <div className="absolute -top-2 -right-2 bg-brand text-white text-[10px] font-black px-2 py-0.5 rounded-full">SHARE</div>
                            </div>
                            <h3 className="text-[18px] font-black text-text mb-2">2. Share Everywhere</h3>
                            <p className="text-[14px] text-textMid font-bold">Post your generated link on YouTube, X, Instagram, or your newsletter.</p>
                        </div>
                        <div className="flex flex-col items-center text-center group">
                            <div className="w-20 h-20 bg-surfaceAlt rounded-[20px] flex items-center justify-center border border-border mb-6 group-hover:-translate-y-2 transition-transform shadow-sm">
                                <DollarSign size={32} className="text-success" />
                            </div>
                            <h3 className="text-[18px] font-black text-text mb-2">3. Earn Revenue</h3>
                            <p className="text-[14px] text-textMid font-bold">Users click ad(s) to automatically unlock. You get paid for every click.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Earnings Calculator */}
            <div className="w-full bg-bg py-24 flex flex-col items-center">
                <div className="w-full max-w-[800px] px-4 flex flex-col md:flex-row gap-12 items-center">
                    <div className="flex-1">
                        <span className="text-success font-black text-[12px] uppercase tracking-widest mb-2 inline-block">Calculator</span>
                        <h2 className="text-[32px] sm:text-[40px] font-black text-text leading-tight mb-4">Calculate your potential.</h2>
                        <p className="text-[16px] text-textMid font-bold mb-8">See how much you could earn compared to traditional URL shorteners.</p>

                        <div className="flex flex-col gap-6 w-full max-w-[400px]">
                            <div className="flex flex-col gap-3">
                                <div className="flex justify-between font-bold">
                                    <span className="text-[14px] text-text">Expected Unlocks</span>
                                    <span className="text-[14px] text-brand">{calcViews.toLocaleString()}</span>
                                </div>
                                <input
                                    type="range"
                                    min="100" max="50000" step="100"
                                    value={calcViews}
                                    onChange={(e) => setCalcViews(Number(e.target.value))}
                                    className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-brand"
                                />
                            </div>

                            <div className="flex flex-col gap-3">
                                <div className="flex justify-between font-bold">
                                    <span className="text-[14px] text-text">Ads per Unlock</span>
                                    <span className="text-[14px] text-brand">{calcAds} Ads</span>
                                </div>
                                <div className="flex gap-2 bg-surfaceAlt p-1 rounded-lg border border-border">
                                    {[1, 2, 3].map(num => (
                                        <button
                                            key={num}
                                            onClick={() => setCalcAds(num)}
                                            className={`flex-1 py-1.5 text-[14px] font-bold rounded-md transition-colors ${calcAds === num ? 'bg-white shadow-sm text-brand' : 'text-textMid hover:text-text'}`}
                                        >
                                            {num}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-[320px] bg-white rounded-[24px] border border-border p-6 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand blur-[60px] opacity-10 rounded-full" />
                        <h3 className="text-[14px] font-bold text-textMid mb-2 uppercase tracking-wide">Estimated Earnings</h3>
                        <div className="text-[48px] font-black text-text leading-none mb-6">
                            {calcEarnings}
                        </div>

                        <div className="flex flex-col gap-3 pt-6 border-t border-border">
                            <div className="flex justify-between text-[13px]">
                                <span className="font-bold text-textLight">Traditional Shortener</span>
                                <span className="font-bold text-text">~${((calcViews / 1000) * 1.5).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-[13px]">
                                <span className="font-bold text-textLight flex items-center gap-1"><TrendingUp size={14} /> Revenue Diff</span>
                                <span className="font-bold text-success">+{((calcViews * (calcAds * 0.02)) / ((calcViews / 1000) * 1.5)).toFixed(1)}x</span>
                            </div>
                        </div>
                        <button className="w-full mt-6 h-[44px] bg-bg border border-border rounded-lg text-text font-black text-[14px] hover:bg-surfaceAlt transition-colors">
                            Start Earning
                        </button>
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
                        <div className="w-6 h-6 rounded bg-text text-white flex items-center justify-center font-black text-[10px] leading-none shrink-0">
                            AG
                        </div>
                        <span className="font-black text-[16px] tracking-tight text-text">AdGate</span>
                    </div>

                    <div className="flex items-center gap-6 text-[13px] font-bold text-textMid">
                        <Link to="/explore" className="hover:text-text transition-colors">Explore</Link>
                        <a href="#" className="hover:text-text transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-text transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-text transition-colors">Contact</a>
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
        </div>
    );
};
