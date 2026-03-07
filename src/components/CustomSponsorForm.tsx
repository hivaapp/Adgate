import { useState, useEffect } from "react";
import { Image as ImageIcon, Play, UploadCloud, Check } from "lucide-react";

export interface CustomAdData {
    type: "image" | "video";
    fileName: string;
    fileSize: number;
    fileMimeType: string;
    previewUrl: string;
    redirectUrl: string;
    ctaText: string;
    brandName: string;
    displayDuration: number;
    skipAfter: number;
}

interface CustomSponsorFormProps {
    value?: CustomAdData | null;
    onChange?: (data: CustomAdData | null) => void;
    onErrorStateChange?: (hasErrors: boolean) => void;
}

export function CustomSponsorForm({ value, onChange, onErrorStateChange }: CustomSponsorFormProps) {
    const defaultData: CustomAdData = {
        type: "image",
        fileName: "",
        fileSize: 0,
        fileMimeType: "",
        previewUrl: "",
        redirectUrl: "",
        ctaText: "",
        brandName: "",
        displayDuration: 5,
        skipAfter: 5,
    };

    const [data, setData] = useState<CustomAdData>(value || defaultData);
    const [acknowledged, setAcknowledged] = useState(false);
    const [showErrors, setShowErrors] = useState(false);
    const [shakeAck, setShakeAck] = useState(false);

    useEffect(() => {
        if (value) {
            setData(value);
            // Pre-check for edit mode
            setAcknowledged(true);
        }
    }, [value]);

    useEffect(() => {
        // Expose errors to parent
        const isError = !data.brandName || !data.redirectUrl || !data.redirectUrl.startsWith("http") || !acknowledged;
        if (onErrorStateChange) {
            onErrorStateChange(isError);
        }
        if (onChange) {
            onChange(acknowledged ? data : null);
        }
    }, [data, acknowledged]);

    // Expose a validate method via ref in a real app, but here we can just rely on parent checking fields if needed, 
    // or passing a submit trigger. The prompt says "If Generate Link is tapped without this checked the checkbox row gets a red tint and shakes"
    // Since we don't have a ref, the parent can pass `showErrors` down?
    // Actually, "The form has its own internal state... expose values via onChange". We can pass the `validate` state up or wait for the Generate button to check.
    // To handle Generate button trigger, we will export a standalone form component but it needs a forwardRef or prop to trigger validation.
    // For now, let's keep internal errors based on `showErrors` prop if possible, or intercept the submission from parent. We'll add a boolean prop `triggerValidation`.

    // We'll manage trigger validation using a `submitAttempted` prop or just local state if they blur.

    const handleDataChange = (updates: Partial<CustomAdData>) => {
        const newData = { ...data, ...updates };
        setData(newData);
    };

    const handleFileSelect = (type: "image" | "video") => {
        // Mock file upload
        if (type === "image") {
            handleDataChange({
                type: "image",
                fileName: "sponsor_image.jpg",
                fileSize: 850000,
                fileMimeType: "image/jpeg",
                previewUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800",
            });
        } else {
            handleDataChange({
                type: "video",
                fileName: "sponsor_video.mp4",
                fileSize: 4500000,
                fileMimeType: "video/mp4",
                previewUrl: "",
            });
        }
    };

    const removeFile = () => {
        handleDataChange({
            fileName: "",
            fileSize: 0,
            fileMimeType: "",
            previewUrl: "",
        });
    };

    const formatSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = 1;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    };

    const brandError = showErrors && !data.brandName;
    const urlError = showErrors && (!data.redirectUrl || (!data.redirectUrl.startsWith("http://") && !data.redirectUrl.startsWith("https://")));
    const ackError = showErrors && !acknowledged;

    // We can expose a global event listener for form submission trigger
    useEffect(() => {
        const handleTrigger = () => {
            setShowErrors(true);
            if (!acknowledged) {
                setShakeAck(true);
                setTimeout(() => setShakeAck(false), 300);
            }
        };
        window.addEventListener("CUSTOM_SPONSOR_VALIDATE", handleTrigger);
        return () => window.removeEventListener("CUSTOM_SPONSOR_VALIDATE", handleTrigger);
    }, [acknowledged]);

    return (
        <div className="flex flex-col gap-6 w-full mt-4">
            {/* Section A - Upload */}
            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <span className="text-[13px] font-[800] text-[#333]">Ad Creative</span>
                    <div className="bg-[#EDE9FE] text-[#6366F1] text-[10px] font-[800] px-2.5 h-6 rounded-full flex items-center">
                        Custom
                    </div>
                </div>

                <div className="flex gap-2 w-full">
                    <button
                        onClick={() => handleDataChange({ type: "image", displayDuration: 5 })}
                        className={`flex-1 h-10 rounded-[10px] flex items-center justify-center text-[14px] font-[700] transition-colors ${data.type === "image" ? "bg-[#6366F1] text-white border border-[#6366F1]" : "bg-white text-[#666] border border-[#E8E8E8]"}`}
                    >
                        🖼️ Image Ad
                    </button>
                    <button
                        onClick={() => handleDataChange({ type: "video", displayDuration: 30 })}
                        className={`flex-1 h-10 rounded-[10px] flex items-center justify-center text-[14px] font-[700] transition-colors ${data.type === "video" ? "bg-[#6366F1] text-white border border-[#6366F1]" : "bg-white text-[#666] border border-[#E8E8E8]"}`}
                    >
                        🎬 Video Ad
                    </button>
                </div>

                {!data.fileName ? (
                    <button
                        onClick={() => handleFileSelect(data.type)}
                        className="w-full h-[100px] border border-dashed border-[#C4B5FD] rounded-[10px] bg-[#FAFAFF] flex flex-col items-center justify-center gap-1 mt-1 transition-colors hover:bg-[#F5F3FF]"
                    >
                        {data.type === "image" ? <ImageIcon size={24} className="text-[#6366F1]" /> : <Play size={24} className="text-[#6366F1]" />}
                        <span className="text-[13px] font-[700] text-[#6366F1]">Tap to upload sponsor {data.type === "image" ? "image" : "video"}</span>
                        <span className="text-[11px] text-[#AAA49C]">
                            {data.type === "image" ? "JPG, PNG, WebP · Max 5MB" : "MP4, MOV, WebM · Max 50MB"}
                        </span>
                    </button>
                ) : (
                    <div className="w-full rounded-[10px] border border-[#C4B5FD] bg-white p-[14px] flex items-center mt-1 relative">
                        {data.type === "image" ? (
                            <img src={data.previewUrl} alt="Preview" className="w-[60px] h-[60px] object-cover rounded-lg shrink-0" />
                        ) : (
                            <div className="w-[60px] h-[60px] bg-[#1A1A1A] rounded-lg flex items-center justify-center shrink-0">
                                <Play size={20} className="text-white fill-white" />
                            </div>
                        )}
                        <div className="ml-3 flex flex-col flex-1 min-w-0 pr-8">
                            <span className="text-[13px] font-[700] text-[#21201C] truncate">{data.fileName}</span>
                            <span className="text-[11px] text-[#AAA49C] mt-0.5">{formatSize(data.fileSize)}</span>
                        </div>
                        <button onClick={removeFile} className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[#F5F5F5] flex items-center justify-center text-[#888]">
                            &times;
                        </button>
                    </div>
                )}

                {/* Duration controls */}
                {data.fileName && data.type === "image" && (
                    <div className="flex flex-col gap-2 mt-2 animate-in fade-in slide-in-from-top-2 duration-250">
                        <span className="text-[12px] font-[700] text-[#333]">Show image for</span>
                        <div className="flex gap-2">
                            {[5, 10, 15, 30].map(sec => (
                                <button
                                    key={sec}
                                    onClick={() => handleDataChange({ displayDuration: sec })}
                                    className={`h-8 px-4 rounded-full text-[12px] font-[700] transition-colors ${data.displayDuration === sec ? "bg-[#6366F1] text-white" : "bg-[#F5F5F5] text-[#666]"}`}
                                >
                                    {sec}s
                                </button>
                            ))}
                        </div>
                        <span className="text-[12px] text-[#AAA49C]">Viewer must wait this long before they can proceed to the content.</span>
                    </div>
                )}

                {data.fileName && data.type === "video" && (
                    <div className="flex items-center gap-6 mt-2 animate-in fade-in slide-in-from-top-2 duration-250">
                        <div className="flex flex-col gap-1">
                            <span className="text-[12px] font-[700] text-[#666]">Duration</span>
                            <span className="text-[13px] font-[800] text-[#333]">30s</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[12px] font-[700] text-[#666]">Skip after</span>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => handleDataChange({ skipAfter: Math.max(3, data.skipAfter - 1) })}
                                    className="w-7 h-7 rounded-md bg-[#F5F5F5] flex items-center justify-center font-[700] text-[#666]"
                                >-</button>
                                <div className="w-12 h-9 border border-[#E8E8E8] rounded-md flex items-center justify-center text-[13px] font-[800] text-[#333]">
                                    {data.skipAfter}
                                </div>
                                <button
                                    onClick={() => handleDataChange({ skipAfter: Math.min(15, data.skipAfter + 1) })}
                                    className="w-7 h-7 rounded-md bg-[#F5F5F5] flex items-center justify-center font-[700] text-[#666]"
                                >+</button>
                            </div>
                        </div>
                    </div>
                )}
                {data.fileName && data.type === "video" && (
                    <span className="text-[12px] text-[#AAA49C]">Viewers can skip after {data.skipAfter} seconds. Full view earns more trust.</span>
                )}
            </div>

            {/* Section B - Sponsor Details */}
            <div className="flex flex-col gap-4">
                <span className="text-[13px] font-[800] text-[#333]">Sponsor Details</span>

                <div className="flex flex-col gap-1.5 relative">
                    <label className="text-[12px] font-[700] text-[#6B6860]">Sponsor / Brand Name</label>
                    <input
                        type="text"
                        placeholder="e.g. Notion, Your Brand Name"
                        value={data.brandName}
                        onChange={(e) => handleDataChange({ brandName: e.target.value.substring(0, 40) })}
                        className={`h-11 rounded-[10px] border px-3 text-[14px] outline-none transition-colors ${brandError ? "border-[#C0392B] focus:border-[#C0392B]" : "border-[#E8E8E8] focus:border-[#6366F1]"}`}
                    />
                    {data.brandName.length >= 30 && (
                        <span className="absolute top-0 right-1 text-[11px] text-[#AAA49C]">{data.brandName.length}/40</span>
                    )}
                    {brandError && <span className="text-[11px] text-[#C0392B]">Brand name is required</span>}
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-[700] text-[#6B6860]">Destination URL</label>
                    <input
                        type="text"
                        placeholder="https://yoursponsor.com"
                        value={data.redirectUrl}
                        onChange={(e) => {
                            handleDataChange({ redirectUrl: e.target.value });
                        }}
                        onBlur={() => setShowErrors(true)}
                        className={`h-11 rounded-[10px] border px-3 text-[14px] outline-none transition-colors ${urlError ? "border-[#C0392B] focus:border-[#C0392B]" : "border-[#E8E8E8] focus:border-[#6366F1]"}`}
                    />
                    {urlError ? (
                        <span className="text-[11px] text-[#C0392B]">Please enter a valid URL starting with https://</span>
                    ) : (
                        <span className="text-[11px] text-[#AAA49C]">Where viewers go when they click the ad. Use your affiliate or tracking link.</span>
                    )}
                </div>

                <div className="flex flex-col gap-1.5 relative">
                    <label className="text-[12px] font-[700] text-[#6B6860]">Call to Action Text</label>
                    <input
                        type="text"
                        placeholder="e.g. Visit Sponsor, Shop Now, Learn More, Try Free"
                        value={data.ctaText}
                        onChange={(e) => handleDataChange({ ctaText: e.target.value.substring(0, 24) })}
                        className="h-11 rounded-[10px] border border-[#E8E8E8] focus:border-[#6366F1] px-3 text-[14px] outline-none transition-colors"
                    />
                    <span className="absolute top-0 right-1 text-[11px] text-[#AAA49C]">{data.ctaText.length}/24</span>

                    <div className="flex overflow-x-auto gap-2 pb-1 mt-1 scrollbar-hide">
                        {["Visit Sponsor", "Shop Now", "Try Free", "Learn More", "Get Offer"].map(chip => (
                            <button
                                key={chip}
                                onClick={() => handleDataChange({ ctaText: chip })}
                                className="h-[28px] px-3 rounded-full border border-[#E8E8E8] text-[#666] text-[12px] font-[600] whitespace-nowrap bg-white hover:bg-[#F5F5F5] transition-colors shrink-0"
                            >
                                {chip}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Section C - Ad Preview */}
            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <span className="text-[13px] font-[800] text-[#333]">Live Preview</span>
                    <span className="text-[11px] text-[#AAA49C] italic">Updates as you type</span>
                </div>

                <div className="w-full bg-[#1A1A1A] p-2 rounded-[22px] border-[8px] border-[#1A1A1A]">
                    <div className="w-full h-[320px] rounded-[14px] bg-black relative overflow-hidden flex flex-col justify-end">
                        {!data.fileName ? (
                            <div className="absolute inset-0 bg-[#2A2A2A] flex flex-col items-center justify-center">
                                <UploadCloud size={32} className="text-white mb-2" />
                                <span className="text-[12px] text-[#AAA49C]">Upload your creative to see a preview</span>
                            </div>
                        ) : data.type === "image" ? (
                            <img src={data.previewUrl} className="absolute inset-0 w-full h-full object-cover" alt="Preview Background" />
                        ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <Play size={32} className="text-white fill-white mb-2" />
                                <span className="text-[12px] text-[#AAA49C]">Your video will play here</span>
                            </div>
                        )}

                        {/* Top ad label */}
                        <div className="absolute top-3 left-3 bg-[#444] text-[10px] font-[800] text-white px-2 py-0.5 rounded flex tracking-wider">
                            AD
                        </div>

                        {data.fileName && data.type === "video" && (
                            <div className="absolute bottom-20 right-3 bg-[rgba(255,255,255,0.1)] text-white text-[12px] font-[700] px-3 py-1.5 rounded-full backdrop-blur-md">
                                Skip Ad ›
                            </div>
                        )}

                        {/* Bottom Overlay */}
                        <div className="absolute inset-x-0 bottom-0 custom-ad-gradient h-1/2 flex flex-col justify-end p-4 pb-0 pointer-events-none z-10"
                            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)" }}>

                            <h3 className="text-white font-[900] text-[16px] mb-3 relative z-20">
                                {data.brandName || "Your Brand Name"}
                            </h3>

                            <div className="bg-white text-black font-[800] text-[14px] h-[44px] rounded-full flex items-center justify-center w-max px-6 mb-5 relative z-20 mx-auto">
                                {data.ctaText || "Visit Sponsor"}
                            </div>

                            {/* Progress bar */}
                            {(data.type === "image" || data.type === "video") && (
                                <div className="absolute bottom-0 left-0 h-1 bg-[rgba(255,255,255,0.3)] w-full">
                                    <div className="h-full bg-white w-1/3 rounded-r-full" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <p className="text-[11px] text-[#AAA49C] text-center">
                    This is how your ad will appear to viewers. Actual display may vary by device.
                </p>
            </div>

            {/* Section D - Acknowledgment */}
            <div className="mt-2">
                <button
                    onClick={() => setAcknowledged(!acknowledged)}
                    className={`w-full min-h-[44px] flex items-start gap-3 p-3 rounded-[10px] text-left transition-colors ${ackError ? "bg-[#FFF0EF] border border-[#C0392B]" : "border border-transparent"} ${shakeAck ? "animate-shake" : ""}`}
                >
                    <div className={`mt-0.5 w-5 h-5 shrink-0 rounded-[6px] flex items-center justify-center transition-colors border ${acknowledged ? "bg-[#6366F1] border-[#6366F1]" : "bg-white border-[#E8E8E8]"}`}>
                        {acknowledged && <Check size={14} className="text-white" strokeWidth={3} />}
                    </div>
                    <span className="text-[13px] font-[600] text-[#444] leading-relaxed">
                        I have the right to use this creative and redirect URL. I accept responsibility for my sponsor content. You keep 100% of your sponsorship earnings. AdGate charges no commission on custom sponsor links.
                    </span>
                </button>
                {ackError && (
                    <span className="text-[11px] text-[#C0392B] ml-1 mt-1 block">Please confirm you have rights to this content.</span>
                )}
            </div>

        </div>
    );
}
