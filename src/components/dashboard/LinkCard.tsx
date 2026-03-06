import { Share2, Edit2, MoreHorizontal, FileIcon, ShieldAlert, Play, MousePointerClick } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface LinkCardProps {
    link: any;
    onEdit: () => void;
    onMore: () => void;
}

export const LinkCard = ({ link, onEdit, onMore }: LinkCardProps) => {
    const { showToast } = useToast();
    const isDisabled = link.status === 'disabled';

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: link.title,
                    url: `https://${link.url}`
                });
            } catch (err) {
                console.log('Share canceled', err);
            }
        } else {
            handleCopy();
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(`https://${link.url}`);
        showToast({ message: 'Link copied to clipboard', type: 'success' });
    };

    return (
        <div
            className={`w-full bg-white rounded-[18px] p-4 flex flex-col gap-3 transition-all duration-300 relative border border-border shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden ${isDisabled ? 'opacity-60 grayscale-[20%]' : ''
                }`}
        >
            {/* 1. Title Row */}
            <div className="flex items-center justify-between w-full">
                <h3 className="text-[15px] font-black text-text truncate max-w-[85%]">
                    {link.title}
                </h3>
            </div>

            {/* 2. Badges Row */}
            <div className="flex items-center gap-1.5 overflow-x-auto hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
                {isDisabled ? (
                    <span className="flex-shrink-0 h-[28px] px-2.5 rounded-pill bg-warningBg border border-warning/20 text-[11px] font-black tracking-wide text-warning uppercase flex items-center justify-center">
                        ⏸ Paused
                    </span>
                ) : (
                    <span className="flex-shrink-0 h-[28px] px-2.5 rounded-pill bg-surfaceAlt border border-border text-[11px] font-black tracking-wide text-textMid uppercase flex items-center justify-center gap-1">
                        <FileIcon size={12} strokeWidth={3} /> {link.type}
                    </span>
                )}

                {link.adType === 'video' ? (
                    <span className="flex-shrink-0 h-[26px] px-[10px] rounded-[50px] bg-[#E8312A] text-[11px] font-[800] text-white flex items-center justify-center gap-1.5 shadow-sm">
                        <Play size={10} fill="currentColor" /> Video
                    </span>
                ) : (
                    <span className="flex-shrink-0 h-[26px] px-[10px] rounded-[50px] bg-[#333333] text-[11px] font-[800] text-white flex items-center justify-center gap-1.5 shadow-sm">
                        <MousePointerClick size={10} /> Click
                    </span>
                )}

                <span className="flex-shrink-0 h-[28px] px-2.5 rounded-pill bg-surfaceAlt border border-border text-[11px] font-black tracking-wide text-textMid uppercase flex items-center justify-center gap-1">
                    <ShieldAlert size={12} strokeWidth={3} /> {link.adCount} Ad{link.adCount > 1 ? 's' : ''}
                </span>

                {link.donate && (
                    <span className="flex-shrink-0 h-[28px] px-2.5 rounded-pill bg-successBg border border-success/20 text-[11px] font-black tracking-wide text-success uppercase flex items-center justify-center gap-1">
                        🌱 Trees
                    </span>
                )}
            </div>

            {/* 3. URL Pill */}
            <button
                onClick={handleCopy}
                className="w-full h-[36px] bg-surfaceAlt border border-border rounded-[8px] px-3 flex items-center hover:border-textLight transition-colors mt-0.5 active:bg-border"
            >
                <span className="font-mono text-[13px] font-bold text-textMid truncate">{link.url}</span>
            </button>

            {/* 4. Stats Row */}
            <div className="flex w-full mt-1">
                <div className="flex-1 flex flex-col justify-center items-start border-r border-border pr-3">
                    <span className="text-[12px] font-bold text-textLight uppercase tracking-wider mb-0.5">Views</span>
                    <span className="text-[16px] font-black text-text leading-none">{link.views.toLocaleString()}</span>
                </div>
                <div className="flex-1 flex flex-col justify-center items-center border-r border-border px-3">
                    <span className="text-[12px] font-bold text-textLight uppercase tracking-wider mb-0.5">Unlocks</span>
                    <span className="text-[16px] font-black text-text leading-none">{link.unlocks.toLocaleString()}</span>
                </div>
                <div className="flex-1 flex flex-col justify-center items-end pl-3">
                    <span className="text-[12px] font-bold text-textLight uppercase tracking-wider mb-0.5">Earned</span>
                    <span className="text-[16px] font-black text-success leading-none">${link.earned.toFixed(2)}</span>
                </div>
            </div>

            {/* 5. Actions Row */}
            <div className="w-full flex gap-2 mt-2">
                <button
                    onClick={handleShare}
                    className="flex-1 h-[36px] bg-[#EEF2FF] text-[#4F46E5] font-black text-[13px] rounded-[10px] flex items-center justify-center gap-1.5 hover:bg-[#E0E7FF] transition-colors"
                >
                    <Share2 size={16} strokeWidth={3} /> Share
                </button>
                <button
                    onClick={onEdit}
                    className="flex-1 h-[36px] bg-surfaceAlt text-text font-black text-[13px] rounded-[10px] flex items-center justify-center gap-1.5 hover:bg-border transition-colors border border-border"
                >
                    <Edit2 size={16} strokeWidth={3} /> Edit
                </button>
                <button
                    onClick={onMore}
                    className="flex-1 h-[36px] bg-white text-brand border border-brand/40 font-black text-[13px] rounded-[10px] flex items-center justify-center gap-1.5 hover:bg-brandTint transition-colors"
                >
                    <MoreHorizontal size={20} strokeWidth={3} />
                </button>
            </div>
        </div>
    );
};
