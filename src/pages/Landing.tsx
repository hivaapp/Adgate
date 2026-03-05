import { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { UploadCloud, Link as LinkIcon, Trash2, Lock, Check, Loader2 } from 'lucide-react';
import { SignInModal } from '../components/SignInModal';
import { useNavigate } from 'react-router-dom';

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
        if (files.length === 0) return; // Normally show error, but keeping it simple
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
        <div className="flex flex-col items-center w-full pb-24">
            {/* Hero Section */}
            <div className="w-full max-w-[800px] px-4 pt-10 sm:pt-16 pb-12 flex flex-col items-center text-center">
                <div className="bg-brand-tint text-brand font-black text-xs px-3 py-1.5 rounded-pill mb-6 flex items-center gap-2">
                    <span>Earn from every share — for free</span>
                </div>

                <h1 className="text-4xl sm:text-5xl font-black text-text leading-[1.1] tracking-tight mb-4">
                    Monetize your audience.<br />
                    <span className="text-brand">Without subscriptions.</span>
                </h1>

                <p className="text-textMid font-bold text-base sm:text-lg max-w-[480px] mb-8">
                    Upload any file, set the ad count, and share the link. Viewers watch a short ad to unlock it, and you keep 95% of the revenue.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3">
                    <div className="bg-surface border border-border px-4 py-2 flex gap-2 items-center rounded-pill shadow-DEFAULT">
                        <span className="text-xl">🙌</span>
                        <div className="flex flex-col items-start leading-none gap-0.5">
                            <span className="font-black text-sm text-text">12.4k</span>
                            <span className="font-bold text-[10px] text-textLight uppercase tracking-wider">Creators</span>
                        </div>
                    </div>
                    <div className="bg-surface border border-border px-4 py-2 flex gap-2 items-center rounded-pill shadow-DEFAULT">
                        <span className="text-xl">🔗</span>
                        <div className="flex flex-col items-start leading-none gap-0.5">
                            <span className="font-black text-sm text-text">145k+</span>
                            <span className="font-bold text-[10px] text-textLight uppercase tracking-wider">Links Gen</span>
                        </div>
                    </div>
                    <div className="bg-surface border border-border px-4 py-2 flex gap-2 items-center rounded-pill shadow-DEFAULT">
                        <span className="text-xl">💸</span>
                        <div className="flex flex-col items-start leading-none gap-0.5">
                            <span className="font-black text-sm text-eco">$2.1M</span>
                            <span className="font-bold text-[10px] text-textLight uppercase tracking-wider">Paid Out</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Action Area */}
            <div className="w-full max-w-[560px] px-4 flex flex-col gap-6">

                {/* Step 1 */}
                <div className="card w-full flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-7 h-7 bg-text text-white rounded-full flex items-center justify-center font-black text-sm">1</div>
                        <h3 className="font-black text-text text-lg tracking-tight">Upload your files</h3>
                    </div>

                    <div
                        className={`w-full rounded-xl border-2 border-dashed p-6 flex flex-col items-center text-center transition-all duration-200 ease-out cursor-pointer ${isDragging ? 'border-brand bg-brand-tint scale-[1.02]' : 'border-border bg-surfaceAlt hover:border-textMid'
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
                        <div className={`w-12 h-12 rounded-full mb-3 flex items-center justify-center ${isDragging ? 'bg-brand/20 text-brand' : 'bg-surface border border-border text-textLight'}`}>
                            <UploadCloud className="w-6 h-6" />
                        </div>
                        <h4 className="font-black text-text mb-1 tracking-tight">Drag and drop files here</h4>
                        <p className="text-textMid font-bold text-sm mb-4">or click to select files from your device</p>
                        <div className="flex gap-2">
                            <span className="bg-surface border border-border text-textLight text-xs font-bold px-2 py-1 rounded-badge">PDF</span>
                            <span className="bg-surface border border-border text-textLight text-xs font-bold px-2 py-1 rounded-badge">ZIP</span>
                            <span className="bg-surface border border-border text-textLight text-xs font-bold px-2 py-1 rounded-badge">IMG</span>
                            <span className="bg-surface border border-border text-textLight text-xs font-bold px-2 py-1 rounded-badge">TXT</span>
                        </div>
                    </div>

                    {files.length > 0 && (
                        <div className="flex flex-col gap-2 animate-fade-in mt-2">
                            {files.map((file, idx) => (
                                <div key={idx} className="flex items-center justify-between p-3 bg-surfaceAlt rounded-xl border border-border animate-pop-in">
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <span className="text-2xl shrink-0">📄</span>
                                        <span className="font-bold text-sm text-text truncate">{file.name}</span>
                                    </div>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); removeFile(idx); }}
                                        className="w-8 h-8 rounded-full flex items-center justify-center text-textLight hover:bg-brand-tint hover:text-brand transition-colors shrink-0"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Step 2 */}
                <div className="card w-full flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-7 h-7 bg-text text-white rounded-full flex items-center justify-center font-black text-sm">2</div>
                        <h3 className="font-black text-text text-lg tracking-tight">Set ad requirement</h3>
                    </div>

                    <div className="flex gap-4 items-stretch">
                        <div className="flex gap-2 shrink-0">
                            {[1, 2, 3].map(num => (
                                <button
                                    key={num}
                                    onClick={() => setAdCount(num)}
                                    className={`w-14 h-14 rounded-xl font-black text-xl transition-all duration-150 ease-out flex items-center justify-center ${adCount === num
                                        ? 'bg-brand text-white shadow-red'
                                        : 'bg-surface border-2 border-border text-textMid hover:border-brand-tint hover:text-brand'
                                        }`}
                                >
                                    {num}
                                </button>
                            ))}
                        </div>

                        <div className="flex-1 bg-surfaceAlt border border-border rounded-xl p-3 flex flex-col justify-center gap-0.5">
                            <span className="font-black text-text tracking-tight">{activeEstimate.label}</span>
                            <div className="flex items-center gap-3 text-xs font-bold">
                                <span className="text-textMid">{activeEstimate.time}</span>
                                <span className="text-eco">{activeEstimate.earnings} / unlock</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Step 3 */}
                <div className={`card w-full flex items-center gap-4 transition-colors duration-300 ${isDonateOn ? 'border-eco bg-eco/5' : ''}`}>
                    <div className="w-12 h-12 rounded-xl bg-eco-tint text-eco flex items-center justify-center text-2xl shrink-0">
                        🌱
                    </div>
                    <div className="flex-1">
                        <h3 className="font-black text-text tracking-tight mb-0.5">Donate 5% to plant trees</h3>
                        <p className="text-textMid font-bold text-[11px] leading-snug">
                            Boost your viewer trust. We automatically route 5% of this link's earnings to reforestation.
                        </p>
                    </div>
                    <button
                        onClick={() => setIsDonateOn(!isDonateOn)}
                        className={`w-14 h-8 rounded-pill p-1 transition-colors duration-200 ease-in-out shrink-0 ${isDonateOn ? 'bg-eco' : 'bg-border'}`}
                    >
                        <div className={`bg-white w-6 h-6 rounded-full shadow-sm transition-transform duration-200 ease-out ${isDonateOn ? 'translate-x-6' : 'translate-x-0'}`} />
                    </button>
                </div>

                {/* Generate Button */}
                <button
                    onClick={handleGenerate}
                    disabled={isGenerating || files.length === 0}
                    className="btn-primary w-full h-14 text-lg mt-2 relative overflow-hidden group"
                >
                    {isGenerating ? (
                        <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                        <div className="flex items-center gap-2">
                            <LinkIcon className="w-5 h-5" />
                            <span>Generate Shareable Link</span>
                        </div>
                    )}
                </button>

                {/* Output Section */}
                {isGenerated && (
                    <div className="w-full flex flex-col gap-2 mt-2 animate-slide-up">
                        <span className="font-black text-sm text-textMid uppercase tracking-wider ml-1">Your Link</span>

                        <div className="flex items-center gap-2">
                            <div className={`flex-1 h-14 rounded-xl bg-surfaceAlt border-2 flex items-center px-4 overflow-hidden relative transition-colors ${!isLoggedIn ? 'border-dashed border-border' : 'border-brand bg-brand-tint/30'}`}>
                                {!isLoggedIn && (
                                    <div className="absolute inset-0 backdrop-blur-[4px] bg-white/40 z-10" />
                                )}
                                <span className={`font-mono font-bold text-sm sm:text-base text-text`}>{fakeUrl}</span>
                            </div>

                            {!isLoggedIn ? (
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="btn-primary h-14 px-6 shrink-0"
                                >
                                    <Lock className="w-4 h-4 mr-2" />
                                    Sign In
                                </button>
                            ) : (
                                <button
                                    onClick={copyToClipboard}
                                    className={`h-14 px-6 shrink-0 font-bold rounded-button text-white transition-all duration-150 ease-out flex items-center gap-2 shadow-sm ${isCopied ? 'bg-eco hover:bg-eco-hover' : 'bg-brand hover:bg-brand-hover shadow-red'
                                        }`}
                                >
                                    {isCopied ? (
                                        <>
                                            <Check className="w-5 h-5" />
                                            Copied!
                                        </>
                                    ) : (
                                        <>
                                            <LinkIcon className="w-5 h-5" />
                                            Copy
                                        </>
                                    )}
                                </button>
                            )}
                        </div>

                        {!isLoggedIn && (
                            <div className="bg-brand-tint border border-brand/20 p-3 rounded-xl flex items-start gap-2 mt-1 animate-fade-in">
                                <span className="text-lg">👆</span>
                                <p className="text-sm font-bold text-brand">
                                    Sign in to reveal and copy your link. Your files are saved securely.
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {/* How it works simple section */}
                <div className="mt-8 pt-8 border-t border-border w-full">
                    <h4 className="font-black text-text text-center tracking-tight mb-6">How it works for your audience</h4>
                    <div className="flex items-center justify-between relative px-2 sm:px-4">
                        <div className="absolute top-6 left-10 right-10 h-px bg-border -z-10" />

                        <div className="flex flex-col items-center gap-2 bg-bg px-2">
                            <div className="w-12 h-12 bg-surface border border-border rounded-xl flex items-center justify-center text-xl shadow-sm">
                                🔗
                            </div>
                            <span className="font-bold text-xs text-textMid">Click Link</span>
                        </div>

                        <div className="flex flex-col items-center gap-2 bg-bg px-2">
                            <div className="w-12 h-12 bg-surface border-2 border-brand text-brand rounded-xl flex items-center justify-center text-xl shadow-sm">
                                ▶️
                            </div>
                            <span className="font-bold text-xs text-textMid">Watch Ad</span>
                        </div>

                        <div className="flex flex-col items-center gap-2 bg-bg px-2">
                            <div className="w-12 h-12 bg-surface border border-border rounded-xl flex items-center justify-center text-xl shadow-sm">
                                🎁
                            </div>
                            <span className="font-bold text-xs text-textMid">Get File</span>
                        </div>
                    </div>

                    <div className="bg-surface border border-border rounded-xl mt-8 p-4 text-center">
                        <p className="font-bold text-sm text-text">
                            You earn 95% of the ad revenue.
                            {isDonateOn && <span className="text-eco ml-1">5% goes to planting trees 🌲</span>}
                        </p>
                    </div>
                </div>

            </div>

            <SignInModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={handleSignInSuccess}
            />
        </div>
    );
};
