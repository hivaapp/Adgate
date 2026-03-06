import { useState } from 'react';
import { BottomSheet } from '../ui/BottomSheet';
import { UploadCloud, TreeDeciduous } from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';
import { useAuth } from '../../context/AuthContext';
import { AdTypeSelector } from '../AdTypeSelector';

interface CreateLinkSheetProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export const CreateLinkSheet = ({ isOpen, onClose, onSuccess }: CreateLinkSheetProps) => {
    const [file, setFile] = useState<File | null>(null);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [adCount, setAdCount] = useState(1);
    const [adType, setAdType] = useState<"click" | "video">("click");
    const [donate, setDonate] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { startProgress, stopProgress } = useProgress();
    const { createLink } = useAuth();

    const handleSubmit = async () => {
        setIsSubmitting(true);
        startProgress();

        await createLink({
            title,
            description: desc,
            adCount,
            donateEnabled: donate,
            adType,
            fileType: file?.name.split('.').pop()?.toUpperCase() || 'FILE',
            fileName: file?.name,
        });

        setIsSubmitting(false);
        stopProgress();
        onSuccess();

        // Reset state after slight delay
        setTimeout(() => {
            setFile(null);
            setTitle('');
            setDesc('');
            setAdCount(1);
            setAdType('click');
            setDonate(false);
        }, 300);
    };

    return (
        <BottomSheet isOpen={isOpen} onClose={onClose} title="New Link" fullHeight>
            <div className="flex flex-col gap-[20px] pb-[80px]">

                {/* Upload Section */}
                <div className="w-full">
                    {!file ? (
                        <div className="h-[120px] w-full border-2 border-dashed border-border rounded-[14px] flex flex-col items-center justify-center bg-surfaceAlt/50 cursor-pointer hover:border-brand/40 hover:bg-brandTint transition-colors"
                            onClick={() => {
                                // Mock file selection
                                setFile(new File([''], 'new-resource.pdf', { type: 'application/pdf' }));
                            }}
                        >
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm mb-2 text-textMid">
                                <UploadCloud size={20} strokeWidth={2.5} />
                            </div>
                            <span className="text-[14px] font-bold text-text">Tap to select file</span>
                        </div>
                    ) : (
                        <div className="w-full p-3 bg-surface border border-border rounded-[12px] flex items-center justify-between shadow-sm">
                            <div className="flex items-center gap-3 overflow-hidden pr-2">
                                <div className="w-10 h-10 rounded-lg bg-surfaceAlt flex items-center justify-center flex-shrink-0 text-[20px]">
                                    📄
                                </div>
                                <span className="font-bold text-[14px] truncate text-text">{file.name}</span>
                            </div>
                            <button
                                onClick={() => setFile(null)}
                                className="text-[12px] font-bold text-error bg-errorBg px-3 h-8 rounded-full flex-shrink-0 hover:bg-error/20 transition-colors"
                            >
                                Remove
                            </button>
                        </div>
                    )}
                </div>

                {/* Title and Description */}
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5 relative">
                        <label className="text-[12px] font-extrabold text-textMid uppercase tracking-wide">Resource Title</label>
                        <input
                            type="text"
                            className={`input-field h-[48px] text-[15px] font-bold ${title.length > 50 ? 'border-error/50 focus:border-error focus:ring-error focus:ring-1' : ''}`}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            maxLength={60}
                            placeholder="e.g. Figma UI Kit - 2026 Edition"
                        />
                        <span className={`absolute bottom-3 right-3 text-[11px] font-bold ${title.length >= 50 ? 'text-error' : 'text-textLight'}`}>
                            {title.length}/60
                        </span>
                    </div>

                    <div className="flex flex-col gap-1.5 relative">
                        <label className="text-[12px] font-extrabold text-textMid uppercase tracking-wide">Description <span className="text-textLight font-semibold capitalize tracking-normal">(optional)</span></label>
                        <textarea
                            className={`w-full border border-border rounded-[12px] p-3 text-[14px] font-semibold bg-white focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand transition-colors h-[80px] resize-none ${desc.length > 140 ? 'border-error/50 focus:border-error focus:ring-error focus:ring-1' : ''}`}
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            maxLength={150}
                            placeholder="Add a short description so users know what they are unlocking..."
                        />
                        <span className={`absolute bottom-3 right-3 text-[11px] font-bold ${desc.length >= 140 ? 'text-error' : 'text-textLight'}`}>
                            {desc.length}/150
                        </span>
                    </div>
                </div>

                {/* Ad Type */}
                <div className="flex flex-col gap-3">
                    <label className="text-[13px] font-extrabold text-textMid uppercase tracking-wide">Ad Type</label>
                    <AdTypeSelector value={adType} onChange={setAdType} adCount={adCount} />
                </div>

                {/* Ad Count */}
                <div className="flex flex-col gap-3">
                    <label className="text-[12px] font-extrabold text-textMid uppercase tracking-wide">Ads required to unlock</label>
                    <div className="flex items-center gap-3">
                        <div className="flex gap-2 bg-surfaceAlt p-1.5 rounded-[16px] border border-border shrink-0">
                            {[1, 2, 3].map(num => (
                                <button
                                    key={num}
                                    onClick={() => setAdCount(num)}
                                    className={`w-[48px] h-[48px] rounded-[10px] flex items-center justify-center text-[16px] font-black transition-all ${adCount === num ? 'bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] text-brand scale-105 z-10' : 'text-textMid hover:text-text'
                                        }`}
                                >
                                    {num}
                                </button>
                            ))}
                        </div>
                        <p className="text-[12px] font-bold leading-tight text-textLight">
                            {adCount === 1 && "Highest conversion. Best for new creators."}
                            {adCount === 2 && "Balanced earnings and user experience."}
                            {adCount === 3 && "Maximum revenue. May lower conversions."}
                        </p>
                    </div>
                </div>

                {/* Donate Toggle */}
                <div
                    onClick={() => setDonate(!donate)}
                    className={`w-full border-2 rounded-[16px] p-4 flex items-center justify-between cursor-pointer transition-all ${donate ? 'border-success bg-successBg/50 scale-[1.01]' : 'border-border bg-surface hover:border-border/80'
                        }`}
                >
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${donate ? 'bg-success text-white' : 'bg-surfaceAlt text-textMid'}`}>
                            <TreeDeciduous size={20} strokeWidth={2.5} />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-extrabold text-[14px] text-text">Donate 5% to Trees</span>
                            <span className="font-bold text-[12px] text-textMid mt-0.5">Increases unlocks by ~32%</span>
                        </div>
                    </div>
                    <div className={`w-12 h-7 rounded-full px-1 flex items-center transition-colors ${donate ? 'bg-success' : 'bg-border'}`}>
                        <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${donate ? 'translate-x-[20px]' : 'translate-x-0'}`} />
                    </div>
                </div>
            </div>

            {/* Sticky Action Bar */}
            <div className="fixed bottom-0 left-0 w-full bg-white border-t border-border/60 p-4 pb-[env(safe-area-inset-bottom,16px)] sm:absolute z-20">
                <button
                    onClick={handleSubmit}
                    disabled={!file || !title || isSubmitting}
                    className="btn-primary w-full h-[52px] rounded-[14px] text-[16px]"
                >
                    {isSubmitting ? (
                        <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        'Generate Link'
                    )}
                </button>
            </div>
        </BottomSheet>
    );
};
