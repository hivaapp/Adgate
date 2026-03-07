import { useState, useEffect } from "react";
import { AdTypeSelector } from "./AdTypeSelector";
import { CustomSponsorForm, type CustomAdData } from "./CustomSponsorForm";

export type AdSourceType = "platform" | "custom";

interface AdSourceSelectorProps {
    value?: AdSourceType;
    adType?: "click" | "video";
    customAd?: CustomAdData | null;
    onChange?: (source: AdSourceType) => void;
    onAdTypeChange?: (type: "click" | "video") => void;
    onCustomAdChange?: (data: CustomAdData | null) => void;
    onErrorStateChange?: (hasErrors: boolean) => void;
    adCount?: number;
}

export function AdSourceSelector({
    value = "platform",
    adType = "click",
    customAd,
    onChange,
    onAdTypeChange,
    onCustomAdChange,
    onErrorStateChange,
    adCount = 1
}: AdSourceSelectorProps) {
    const [source, setSource] = useState<AdSourceType>(value);

    useEffect(() => {
        if (value !== undefined) setSource(value);
    }, [value]);

    const handleSourceChange = (newSource: AdSourceType) => {
        setSource(newSource);
        if (onChange) onChange(newSource);
    };

    const isPlatform = source === "platform";
    const isCustom = source === "custom";

    return (
        <div className="flex flex-col w-full gap-3">
            <div className="grid grid-cols-1 min-[500px]:grid-cols-2 gap-3 w-full">
                {/* Platform Ads Card */}
                <button
                    type="button"
                    onClick={() => handleSourceChange("platform")}
                    className={`flex flex-col text-left rounded-[14px] border-2 p-4 transition-colors duration-150 relative ${isPlatform ? "border-[#E8312A] bg-[#FFF8F8]" : "border-[#E8E8E8] bg-white hover:border-[#D0D0D0]"}`}
                >
                    <div className="flex items-center gap-3 w-full">
                        <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0 transition-colors ${isPlatform ? "bg-[#FFE8E7] text-[#E8312A]" : "bg-[#F5F5F5] text-[#888888]"}`}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                                <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                                <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                                <line x1="12" y1="20" x2="12.01" y2="20" />
                            </svg>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[15px] font-[900] text-[#21201C]">Platform Ads</span>
                            <span className="text-[12px] font-[600] text-[#6B6860] mt-0.5">AdGate finds sponsors for you</span>
                        </div>
                        <div className="ml-auto w-5 h-5 shrink-0 rounded-full flex items-center justify-center transition-colors duration-150 border-2 border-gray-300">
                            {isPlatform && (
                                <div className="w-5 h-5 rounded-full bg-[#E8312A] flex items-center justify-center -m-0.5">
                                    <div className="w-2.5 h-2.5 bg-white rounded-full" />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="w-full h-[1px] bg-[#E6E2D9] my-4" />

                    <div className="flex flex-col gap-2 flex-1">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#417A55] shrink-0" />
                            <span className="text-[12px] font-[700] text-[#555]">No sponsor hunting needed</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#0056D2] shrink-0" />
                            <span className="text-[12px] font-[700] text-[#555]">Auto-matched to your content</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#A0622A] shrink-0" />
                            <span className="text-[12px] font-[700] text-[#555]">Earn per view or click automatically</span>
                        </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-transparent text-[12px] font-[800] text-[#417A55]">
                        Est. ${(0.02 * adCount).toFixed(2)}–${(0.15 * adCount).toFixed(2)} per unlock
                    </div>
                </button>

                {/* Custom Sponsor Card */}
                <button
                    type="button"
                    onClick={() => handleSourceChange("custom")}
                    className={`flex flex-col text-left rounded-[14px] border-2 p-4 transition-colors duration-150 relative ${isCustom ? "border-[#6366F1] bg-[#F5F3FF]" : "border-[#E8E8E8] bg-white hover:border-[#D0D0D0]"}`}
                >
                    <div className="flex items-center gap-3 w-full">
                        <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0 transition-colors ${isCustom ? "bg-[#EDE9FE] text-[#6366F1]" : "bg-[#F5F5F5] text-[#888888]"}`}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[15px] font-[900] text-[#21201C]">Custom Sponsor</span>
                            <span className="text-[12px] font-[600] text-[#6B6860] mt-0.5">Use your own sponsor's ad</span>
                        </div>
                        <div className="ml-auto w-5 h-5 shrink-0 rounded-full flex items-center justify-center transition-colors duration-150 border-2 border-gray-300">
                            {isCustom && (
                                <div className="w-5 h-5 rounded-full bg-[#6366F1] flex items-center justify-center -m-0.5">
                                    <div className="w-2.5 h-2.5 bg-white rounded-full" />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="w-full h-[1px] bg-[#E6E2D9] my-4" />

                    <div className="flex flex-col gap-2 flex-1">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#417A55] shrink-0" />
                            <span className="text-[12px] font-[700] text-[#555]">Your deal, your terms</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#0056D2] shrink-0" />
                            <span className="text-[12px] font-[700] text-[#555]">Upload video or image creative</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#A0622A] shrink-0" />
                            <span className="text-[12px] font-[700] text-[#555]">Set your own redirect link</span>
                        </div>
                    </div>

                    <div className={`mt-3 pt-3 border-t border-transparent text-[12px] font-[700] transition-colors ${isCustom ? "text-[#6366F1]" : "text-[#AAA49C]"}`}>
                        Earn your sponsorship rate — AdGate takes 5% at payout
                    </div>
                </button>
            </div>

            {/* Dynamic Content Container */}
            <div className={`grid transition-[grid-template-rows,opacity] duration-[250ms] ${isPlatform ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="overflow-hidden">
                    <div className="pt-3 pb-1 pl-3 ml-1 border-l-2 border-[#E8E8E8]">
                        <AdTypeSelector
                            value={adType}
                            onChange={onAdTypeChange}
                            adCount={adCount}
                        />
                    </div>
                </div>
            </div>

            <div className={`grid transition-[grid-template-rows,opacity] duration-[250ms] ${isCustom ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="overflow-hidden">
                    <CustomSponsorForm
                        value={customAd}
                        onChange={onCustomAdChange}
                        onErrorStateChange={onErrorStateChange}
                    />
                </div>
            </div>
        </div>
    );
}
