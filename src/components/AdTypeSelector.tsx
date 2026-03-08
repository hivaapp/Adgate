import { useState } from "react";
import { Play, MousePointerClick } from "lucide-react";

interface AdTypeSelectorProps {
    defaultValue?: "click" | "video";
    value?: "click" | "video";
    onChange?: (type: "click" | "video") => void;
    adCount?: number;
}

export function AdTypeSelector({
    defaultValue = "click",
    value,
    onChange,
    adCount = 1,
}: AdTypeSelectorProps) {
    const [internalValue, setInternalValue] = useState<"click" | "video">(
        value || defaultValue
    );
    const [prevValue, setPrevValue] = useState<"click" | "video" | undefined>(value);

    // Sync from prop to state if controlled
    if (value !== prevValue) {
        setPrevValue(value);
        if (value !== undefined) {
            setInternalValue(value);
        }
    }

    const handleSelect = (type: "click" | "video") => {
        if (value === undefined) {
            setInternalValue(type);
        }
        if (onChange) {
            onChange(type);
        }
    };

    const isVideo = internalValue === "video";
    const isClick = internalValue === "click";

    const vMin = (0.05 * adCount).toFixed(2);
    const vMax = (0.15 * adCount).toFixed(2);
    const cMin = (0.02 * adCount).toFixed(2);
    const cMax = (0.08 * adCount).toFixed(2);

    return (
        <div className="grid grid-cols-1 min-[500px]:grid-cols-2 gap-3 w-full">
            {/* Video Ad Card */}
            <button
                type="button"
                onClick={() => handleSelect("video")}
                className={`flex flex-col text-left rounded-[14px] border-2 p-4 transition-colors duration-150 relative ${isVideo
                    ? "border-[#E8312A] bg-[#FFF8F8]"
                    : "border-[#E8E8E8] bg-white"
                    }`}
            >
                <div className="flex items-center gap-3 w-full">
                    <div
                        className={`w-10 h-10 rounded-[14px] flex items-center justify-center shrink-0 transition-colors duration-150 ${isVideo
                            ? "bg-[#FFE8E7] text-[#E8312A]"
                            : "bg-[#F5F5F5] text-[#888888]"
                            }`}
                    >
                        <Play size={20} fill="currentColor" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[15px] font-[900] text-[#21201C] leading-tight">
                            Video Ad
                        </span>
                        <span className="text-[12px] font-[600] text-[#6B6860] leading-tight mt-0.5">
                            Viewers watch a video
                        </span>
                    </div>
                    <div className="ml-auto w-5 h-5 shrink-0 rounded-full flex items-center justify-center transition-colors duration-150 border-2 border-gray-300">
                        {isVideo && (
                            <div className="w-5 h-5 rounded-full bg-[#E8312A] flex items-center justify-center -m-0.5">
                                <div className="w-2.5 h-2.5 bg-white rounded-full" />
                            </div>
                        )}
                    </div>
                </div>

                <div className="w-full h-[1px] bg-[#E6E2D9] my-4" />

                <div className="flex flex-col flex-1">
                    <div className="flex items-center h-[32px] gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#417A55] shrink-0" />
                        <span className="text-[12px] font-[700] text-[#555]">
                            Higher earnings per view
                        </span>
                    </div>
                    <div className="flex items-center h-[32px] gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#0056D2] shrink-0" />
                        <span className="text-[12px] font-[700] text-[#555]">
                            15–30 second videos
                        </span>
                    </div>
                    <div className="flex items-center h-[32px] gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#A0622A] shrink-0" />
                        <span className="text-[12px] font-[700] text-[#555]">
                            Skip available after 5 seconds
                        </span>
                    </div>
                </div>

                <div className="mt-3 pt-3 border-t border-transparent text-[12px] font-[800] text-[#417A55]">
                    Est. ${vMin}–{vMax} per unlock
                </div>
            </button>

            {/* Click Ad Card */}
            <button
                type="button"
                onClick={() => handleSelect("click")}
                className={`flex flex-col text-left rounded-[14px] border-2 p-4 transition-colors duration-150 relative ${isClick
                    ? "border-[#E8312A] bg-[#FFF8F8]"
                    : "border-[#E8E8E8] bg-white"
                    }`}
            >
                <div className="flex items-center gap-3 w-full">
                    <div
                        className={`w-10 h-10 rounded-[14px] flex items-center justify-center shrink-0 transition-colors duration-150 ${isClick
                            ? "bg-[#FFE8E7] text-[#E8312A]"
                            : "bg-[#F5F5F5] text-[#888888]"
                            }`}
                    >
                        <MousePointerClick size={20} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[15px] font-[900] text-[#21201C] leading-tight">
                            Click Ad
                        </span>
                        <span className="text-[12px] font-[600] text-[#6B6860] leading-tight mt-0.5">
                            Viewers click a sponsor link
                        </span>
                    </div>
                    <div className="ml-auto w-5 h-5 shrink-0 rounded-full flex items-center justify-center transition-colors duration-150 border-2 border-gray-300">
                        {isClick && (
                            <div className="w-5 h-5 rounded-full bg-[#E8312A] flex items-center justify-center -m-0.5">
                                <div className="w-2.5 h-2.5 bg-white rounded-full" />
                            </div>
                        )}
                    </div>
                </div>

                <div className="w-full h-[1px] bg-[#E6E2D9] my-4" />

                <div className="flex flex-col flex-1">
                    <div className="flex items-center h-[32px] gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#417A55] shrink-0" />
                        <span className="text-[12px] font-[700] text-[#555]">
                            Instant interaction
                        </span>
                    </div>
                    <div className="flex items-center h-[32px] gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#0056D2] shrink-0" />
                        <span className="text-[12px] font-[700] text-[#555]">
                            Opens sponsor in new tab
                        </span>
                    </div>
                    <div className="flex items-center h-[32px] gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#A0622A] shrink-0" />
                        <span className="text-[12px] font-[700] text-[#555]">
                            Verified click required
                        </span>
                    </div>
                </div>

                <div className="mt-3 pt-3 border-t border-transparent text-[12px] font-[800] text-[#417A55]">
                    Est. ${cMin}–{cMax} per unlock
                </div>
            </button>
        </div>
    );
}
