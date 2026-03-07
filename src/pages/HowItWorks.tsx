import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';


export const HowItWorks = () => {
    useEffect(() => {
        document.title = "How AdGate Works — The Complete Creator Guide";
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute("content", "From uploading your first file to earning your first dollar — whether through our ad network or your own sponsors, understand every step.");
        }
    }, []);

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="flex flex-col items-center w-full min-h-screen bg-bg selection:bg-brandTint selection:text-brand pb-0">
            {/* Hero Section */}
            <div className="w-full bg-white px-4 pt-[48px] sm:pt-20 pb-16 flex flex-col items-center text-center animate-fadeIn">
                <div className="h-[36px] bg-[#EFF6FF] px-4 rounded-full flex items-center justify-center mb-6">
                    <span className="text-[#1D4ED8] font-extrabold text-[11px] uppercase tracking-wider">Complete Guide</span>
                </div>

                <h1 className="text-[clamp(26px,6vw,40px)] font-black text-text leading-[1.05] tracking-tight mb-4 max-w-[800px]">
                    Everything you need to know about AdGate
                </h1>

                <p className="text-[#666] font-semibold text-[15px] max-w-[480px] mx-auto mb-10 leading-snug">
                    From uploading your first file to your first payout — understand every step of how the platform works.
                </p>

                <div className="w-full max-w-[340px] bg-white rounded-[14px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)] border border-border text-left mx-auto">
                    <h3 className="text-[13px] font-extrabold text-[#666] mb-4 uppercase tracking-wide">In This Guide</h3>
                    <div className="flex flex-col gap-0">
                        {[
                            { id: "what-is-adgate", label: "What Is AdGate" },
                            { id: "for-creators", label: "How Creators Use It" },
                            { id: "for-viewers", label: "How Viewers Experience It" },
                            { id: "ad-types", label: "The Ad Types Explained" },
                            { id: "custom-sponsor", label: "Custom Sponsor Ads" },
                            { id: "getting-paid", label: "Getting Paid" },
                            { id: "referral-program", label: "The Referral Program" },
                            { id: "trees", label: "The Tree Planting Program" },
                        ].map((item, index) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className="h-[40px] flex items-center gap-3 w-full hover:bg-surfaceAlt rounded-md transition-colors px-2 -mx-2"
                            >
                                <div className="w-[20px] h-[20px] rounded-full bg-[#FFF0EF] text-[#E8312A] flex items-center justify-center text-[11px] font-black shrink-0">{index + 1}</div>
                                <span className="text-[14px] font-bold text-[#E8312A]">{item.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Section 1 — What Is AdGate */}
            <div id="what-is-adgate" className="w-full bg-[#F6F6F6] py-[40px] px-5 flex flex-col items-center">
                <div className="w-full max-w-[600px] flex flex-col items-center">
                    <div className="flex flex-col items-center gap-2 mb-8">
                        <div className="flex items-center gap-2">
                            <div className="w-[64px] h-[64px] bg-white rounded-[16px] border border-[#FFE4E6] shadow-sm flex items-center justify-center text-[32px]">📁</div>
                            <div className="text-[#AAA] font-bold">→</div>
                            <div className="w-[64px] h-[64px] bg-white rounded-[16px] border border-[#FFE4E6] shadow-sm flex items-center justify-center text-[32px]">🔗</div>
                            <div className="text-[#AAA] font-bold">→</div>
                            <div className="w-[64px] h-[64px] bg-white rounded-[16px] border border-[#FFE4E6] shadow-sm flex items-center justify-center text-[32px]">💰</div>
                        </div>
                        <span className="text-[11px] font-extrabold text-[#888] tracking-widest uppercase my-1">Two ways to earn</span>
                        <div className="flex items-center gap-2">
                            <div className="w-[64px] h-[64px] bg-[#EDE9FE] rounded-[16px] shadow-sm flex items-center justify-center text-[32px]">📁</div>
                            <div className="text-[#AAA] font-bold">→</div>
                            <div className="w-[64px] h-[64px] bg-[#EDE9FE] rounded-[16px] shadow-sm flex items-center justify-center text-[32px]">⭐</div>
                            <div className="text-[#AAA] font-bold">→</div>
                            <div className="w-[64px] h-[64px] bg-[#EDE9FE] rounded-[16px] shadow-sm flex items-center justify-center text-[32px]">💰</div>
                        </div>
                    </div>

                    <h2 className="text-[22px] font-black text-[#111] mb-6">What is AdGate?</h2>

                    <div className="flex flex-col gap-4 text-[15px] font-semibold text-[#444] leading-[1.75]">
                        <p>AdGate is a simple link monetization tool. It allows you to share digital files, links, or text and get paid every time someone accesses them.</p>
                        <p>It's built for content creators, educators, prompt engineers, designers, or anyone who shares valuable free resources online.</p>
                        <p>Unlike traditional content gating tools, AdGate gives you two distinct revenue paths. You can let AdGate's ad network handle everything automatically, or you can bring your own sponsors and keep every cent of your deal. Your audience always gets the content free — you always get paid.</p>
                    </div>

                    <div className="mt-8 border-l-[4px] border-[#E8312A] bg-[#FFF0EF] p-[16px] rounded-[12px] w-full shadow-sm">
                        <p className="text-[16px] font-extrabold text-[#E8312A] italic m-0">
                            "AdGate turns free content into revenue — through our ad network or your own sponsors. Your audience pays nothing. You keep everything."
                        </p>
                    </div>
                </div>
            </div>

            {/* Section 2 — How Creators Use It */}
            <div id="for-creators" className="w-full bg-white py-[40px] px-5 flex flex-col items-center">
                <div className="w-full max-w-[800px] flex flex-col items-center">
                    <h2 className="text-[22px] font-black text-[#111] mb-8">How Creators Use AdGate</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-8">
                        {[
                            { step: "1", icon: "👤", tint: "bg-[#EFF6FF]", title: "Sign up in 10 seconds", desc: "Use Google, Twitter, GitHub, or Discord. No forms, no credit card, instant access." },
                            { step: "2", icon: "📤", tint: "bg-[#FFF0EF]", title: "Upload any file or resource", desc: "PDFs, ZIP files, prompt packs, guides, templates, images. Up to 100MB free. Or paste a link to external content." },
                            { step: "3", icon: "🎯", tint: "bg-[#FFFBEB]", title: "Set your ad preferences", desc: "Pick how ads work — let AdGate serve Video or Click Ads automatically, or upload your own sponsor's creative for zero commission. Choose 1 to 3 ads per unlock for platform ads. Takes 30 seconds." },
                            { step: "4", icon: "🔗", tint: "bg-[#F5F3FF]", title: "Generate your shareable link", desc: "AdGate creates a unique URL like adgate.io/r/abc123 that you own. Share it anywhere. Your link works the same way regardless of ad type — one URL your audience can click from anywhere." },
                            { step: "5", icon: "📲", tint: "bg-[#ECFDF5]", title: "Post on any platform", desc: "Twitter, Instagram, YouTube descriptions, TikTok bio, Reddit posts, newsletters, Discord servers — anywhere." },
                            { step: "6", icon: "💰", tint: "bg-[#FEF3C7]", title: "Earn from every unlock", desc: "Your dashboard shows real-time views, unlocks, and earnings. Get paid weekly to Stripe." }
                        ].map(item => (
                            <div key={item.step} className="bg-white border border-border p-[16px] rounded-[14px] min-h-[160px] relative overflow-hidden flex flex-col shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                                <div className="absolute top-2 left-3 text-[48px] font-black text-black opacity-[0.08] leading-none select-none">{item.step}</div>
                                <div className="relative z-10 flex flex-col h-full">
                                    <div className={`w - [48px] h - [48px] rounded - [12px] ${item.tint} flex items - center justify - center text - [24px] mb - 4`}>
                                        {item.icon}
                                    </div>
                                    <h3 className="text-[16px] font-black text-[#111] mb-2 leading-snug">{item.title}</h3>
                                    <p className="text-[13px] font-semibold text-textMid leading-[1.6]">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="w-full flex flex-col gap-2.5">
                        <div className="w-full bg-[#FFF0EF] border border-[#E8312A] p-[20px] rounded-[14px] text-center">
                            <span className="text-[14px] font-bold text-[#E8312A]">💡 Pro tip: Creators who share their link in 3 or more places earn 4x more than those who share in just one.</span>
                        </div>
                        <div className="w-full bg-[#FFF0EF] border border-[#E8312A] p-[20px] rounded-[14px] text-center">
                            <span className="text-[14px] font-bold text-[#E8312A]">💡 Pro tip: Creators with a custom sponsor earn 100% of their deal. If you have even one brand partnership, set up a Custom Sponsor link — AdGate charges nothing on those earnings.</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 3 — How Viewers Experience It */}
            <div id="for-viewers" className="w-full bg-[#F6F6F6] py-[40px] px-5 flex flex-col items-center">
                <div className="w-full max-w-[800px] flex flex-col items-center">
                    <h2 className="text-[22px] font-black text-[#111] mb-1">What Your Audience Sees</h2>
                    <p className="text-[14px] text-textMid mb-10 text-center">Your viewers never pay anything. Here is exactly what they experience.</p>

                    <div className="w-[280px] bg-[#1A1A1A] rounded-[32px] p-[8px] mb-10 shadow-lg relative mx-auto">
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[80px] h-[24px] bg-[#1A1A1A] z-20 rounded-b-xl" />
                        <div className="w-full h-[480px] bg-white rounded-[24px] overflow-y-auto no-scrollbar relative z-10 p-[16px] flex flex-col gap-6 scroll-smooth">
                            <div className="flex flex-col gap-2">
                                <div className="text-[11px] font-bold text-center text-textMid bg-surfaceAlt px-2 py-1 rounded-full self-center">1. They see your preview</div>
                                <div className="border border-border rounded-lg p-3 bg-white shadow-sm flex flex-col gap-2 relative">
                                    <div className="font-bold text-[13px]">My Awesome Guide</div>
                                    <div className="text-[10px] text-textMid">1.2 MB PDF</div>
                                    <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white to-transparent" />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <div className="text-[11px] font-bold text-center text-textMid bg-surfaceAlt px-2 py-1 rounded-full self-center">2. They choose to unlock</div>
                                <div className="w-full bg-[#E8312A] text-white rounded-lg p-2 text-center text-[12px] font-bold flex flex-col gap-1 shadow-sm">
                                    <div className="flex justify-center gap-1 mb-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-white opacity-40"></div>
                                        <div className="w-1.5 h-1.5 rounded-full bg-white opacity-40"></div>
                                    </div>
                                    Unlock Now
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <div className="text-[11px] font-bold text-center text-textMid bg-surfaceAlt px-2 py-1 rounded-full self-center">3. They see the ad (or sponsor)</div>
                                <div className="w-full h-[120px] bg-[#111] rounded-lg relative overflow-hidden flex items-center justify-center text-[10px] text-white uppercase font-bold">
                                    <div className="absolute top-2 left-2 bg-[#6366F1] px-[6px] py-[2px] rounded-full text-[9px] flex items-center gap-1 shadow-sm">
                                        <span className="text-[8px]">✨</span>Sponsored
                                    </div>
                                    <div className="absolute top-2 right-2 bg-black/50 px-2 py-1 rounded-full">Wait 5s</div>
                                    <div className="flex flex-col items-center opacity-50">
                                        <span className="text-[20px] mb-1">📺</span>
                                        Sponsor Message
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <div className="text-[11px] font-bold text-center text-textMid bg-surfaceAlt px-2 py-1 rounded-full self-center">4. They get the content free</div>
                                <div className="w-full bg-success text-white rounded-lg p-2 text-center text-[12px] font-bold shadow-sm">
                                    Download Resource
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
                        <div className="flex flex-col">
                            <h3 className="text-[16px] font-black text-[#111] mb-4">For Viewers, It's Simple</h3>
                            <ul className="flex flex-col gap-3">
                                {["No account needed", "No payment required", "Instant access after ad"].map((item, i) => (
                                    <li key={i} className="flex gap-2">
                                        <CheckCircle2 size={16} className="text-success shrink-0 mt-0.5" />
                                        <span className="text-[14px] font-semibold text-[#333]">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex flex-col">
                            <h3 className="text-[16px] font-black text-[#111] mb-4">Why Viewers Accept It</h3>
                            <ul className="flex flex-col gap-3">
                                {["Content is genuinely valuable", "Ads are brief (5–30 seconds)", "They know the creator benefits"].map((item, i) => (
                                    <li key={i} className="flex gap-2">
                                        <CheckCircle2 size={16} className="text-success shrink-0 mt-0.5" />
                                        <span className="text-[14px] font-semibold text-[#333]">{item}</span>
                                    </li>
                                ))}
                                <li className="flex gap-2">
                                    <CheckCircle2 size={16} className="text-success shrink-0 mt-0.5" />
                                    <span className="text-[12px] font-semibold text-textMid">Custom sponsor ads feel more relevant — creators choose sponsors that match their content.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 4 — The Three Ad Configurations */}
            <div id="ad-types" className="w-full bg-white py-[40px] px-5 flex flex-col items-center">
                <div className="w-full max-w-[800px] flex flex-col items-center">
                    <h2 className="text-[22px] font-black text-[#111] mb-2 text-center">The Three Ad Configurations</h2>
                    <p className="text-[14px] text-textMid mb-10 text-center max-w-[500px] leading-relaxed">
                        Creators choose one of three setups when generating a link. Platform ads are automatic. Custom Sponsor is your own deal.
                    </p>

                    <div className="w-full flex text-left flex-col md:flex-row gap-4 mb-10 items-stretch">
                        <div className="flex-1 bg-white border border-border border-l-[4px] border-l-[#E8312A] p-4 rounded-[14px] shadow-[0_1px_3px_rgba(0,0,0,0.06)] flex flex-col relative">
                            <h3 className="text-[15px] font-black text-[#E8312A] mb-4 pr-16 line-clamp-1 truncate w-full">Platform Video Ad</h3>
                            <div className="absolute top-4 right-4 bg-[#FFF0EF] text-[#E8312A] px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase shrink-0">5% fee</div>
                            <ul className="flex flex-col gap-2.5 text-[13px] font-medium text-textMid leading-[1.5] w-full">
                                <li>✨ Duration 15–30 seconds</li>
                                <li>✨ Skip after 5 seconds</li>
                                <li>✨ Watched or skipped counts</li>
                                <li>✨ Est. $0.05–$0.15 / ad</li>
                                <li>✨ Best for video audiences</li>
                            </ul>
                        </div>

                        <div className="flex-1 bg-white border border-border border-l-[4px] border-l-[#888] p-4 rounded-[14px] shadow-[0_1px_3px_rgba(0,0,0,0.06)] flex flex-col relative">
                            <h3 className="text-[15px] font-black text-[#333] mb-4 pr-16 line-clamp-1 truncate w-full">Platform Click Ad</h3>
                            <div className="absolute top-4 right-4 bg-[#FFF0EF] text-[#E8312A] px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase shrink-0">5% fee</div>
                            <ul className="flex flex-col gap-2.5 text-[13px] font-medium text-textMid leading-[1.5] w-full">
                                <li>✨ Viewer taps CTA</li>
                                <li>✨ Opens in new tab</li>
                                <li>✨ Confirmed tap counts</li>
                                <li>✨ Est. $0.02–$0.08 / ad</li>
                                <li>✨ Best for X / Reddit logic</li>
                            </ul>
                        </div>

                        <div className="flex-1 bg-[#FAFAFF] border border-border border-l-[4px] border-l-[#6366F1] p-4 rounded-[14px] shadow-[0_1px_3px_rgba(0,0,0,0.06)] flex flex-col relative">
                            <h3 className="text-[15px] font-black text-[#6366F1] mb-[34px] pr-20 line-clamp-1 truncate w-[85%]">Custom Sponsor Ad</h3>
                            <div className="absolute top-3 right-3 bg-[#F0FFF4] text-[#166534] px-2.5 py-[6px] rounded-full text-[10px] font-black uppercase text-center shrink-0">0% fee<br />100% yours</div>
                            <ul className="flex flex-col gap-2.5 text-[13px] font-medium text-textMid leading-[1.5] w-full">
                                <li>✨ Upload image or video</li>
                                <li>✨ Set redirect URL & CTA</li>
                                <li>✨ Viewer sees your sponsor</li>
                                <li>✨ Keeps 100% of your rate</li>
                                <li>✨ Best for brand deals</li>
                            </ul>
                        </div>
                    </div>

                    <div className="w-full bg-white border border-border rounded-[14px] shadow-[0_1px_3px_rgba(0,0,0,0.06)] overflow-hidden hidden sm:flex flex-col">
                        <div className="grid grid-cols-[1.5fr_1fr_1fr] bg-surfaceAlt px-4 py-3 border-b border-border">
                            <span className="text-[12px] font-extrabold text-textMid uppercase tracking-wider">Ad Type</span>
                            <span className="text-[12px] font-extrabold text-textMid uppercase tracking-wider">Est. Per Unlock</span>
                            <span className="text-[12px] font-extrabold text-textMid uppercase tracking-wider">Platform Fee</span>
                        </div>
                        <div className="grid grid-cols-[1.5fr_1fr_1fr] px-4 py-4 border-b border-border items-center">
                            <span className="text-[14px] font-bold text-text">Platform Video</span>
                            <span className="text-[14px] font-medium text-textMid">$0.05–$0.15</span>
                            <span className="text-[14px] font-medium text-textMid">5%</span>
                        </div>
                        <div className="grid grid-cols-[1.5fr_1fr_1fr] px-4 py-4 border-b border-[transparent] items-center">
                            <span className="text-[14px] font-bold text-text">Platform Click</span>
                            <span className="text-[14px] font-medium text-textMid">$0.02–$0.08</span>
                            <span className="text-[14px] font-medium text-textMid">5%</span>
                        </div>
                        <div className="grid grid-cols-[1.5fr_1fr_1fr] px-4 py-4 bg-[#F0FFF4] items-center border-t border-[#BBF7D0]">
                            <span className="text-[14px] font-black text-[#166534]">Custom Sponsor</span>
                            <span className="text-[14px] font-bold italic text-[#4C1D95]">Your negotiated rate</span>
                            <span className="text-[15px] font-black text-[#166534]">0%</span>
                        </div>
                    </div>

                    <div className="w-full flex flex-col gap-3 sm:hidden">
                        <div className="bg-white border border-border rounded-[12px] p-4 flex flex-col gap-2 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                            <span className="font-black text-[14px] text-text">Platform Video</span>
                            <div className="flex justify-between items-center">
                                <span className="text-[13px] font-medium text-textMid">Est: $0.05–$0.15</span>
                                <span className="text-[13px] font-medium text-textMid">Fee: 5%</span>
                            </div>
                        </div>
                        <div className="bg-white border border-border rounded-[12px] p-4 flex flex-col gap-2 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                            <span className="font-black text-[14px] text-text">Platform Click</span>
                            <div className="flex justify-between items-center">
                                <span className="text-[13px] font-medium text-textMid">Est: $0.02–$0.08</span>
                                <span className="text-[13px] font-medium text-textMid">Fee: 5%</span>
                            </div>
                        </div>
                        <div className="bg-[#F0FFF4] border border-[#BBF7D0] rounded-[12px] p-4 flex flex-col gap-2 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                            <span className="font-black text-[15px] text-[#166534]">Custom Sponsor</span>
                            <div className="flex flex-col gap-1">
                                <span className="text-[14px] font-bold italic text-[#4C1D95]">Your negotiated rate</span>
                                <span className="text-[14px] font-black text-[#166534]">Fee: 0%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 5 — Custom Sponsor Ads Deep Dive */}
            <div id="custom-sponsor" className="w-full bg-[#F6F6F6] py-[40px] px-5 flex flex-col items-center">
                <div className="w-full max-w-[800px] flex flex-col items-center">
                    <div className="flex items-center gap-2 mb-6">
                        <h2 className="text-[22px] font-black text-[#111]">Bring Your Own Sponsors</h2>
                        <div className="bg-[#6366F1] text-white px-2.5 py-[3px] rounded-full text-[11px] font-extrabold flex items-center justify-center">NEW</div>
                    </div>

                    <div className="w-full bg-[#EDE9FE] border border-[#C4B5FD] rounded-[20px] p-[20px] mb-10 text-center shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                        <p className="text-[16px] font-bold text-[#4C1D95] leading-[1.65]">
                            If you have a brand deal — or you want to land one — Custom Sponsor links let you serve that ad yourself. AdGate charges nothing. The full sponsorship rate is yours.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 w-full mb-10">
                        {[
                            { step: "1", icon: "🤝", tint: "bg-[#EDE9FE]", title: "Land or accept a sponsorship", desc: "Reach out to brands relevant to your audience, or accept an inbound deal. Agree on a rate per 1,000 impressions or a flat fee for your link." },
                            { step: "2", icon: "📤", tint: "bg-[#EDE9FE]", title: "Upload your sponsor's creative", desc: "Upload the brand's image or video ad directly into AdGate when creating your link. Supported formats: JPG, PNG, WebP for images — MP4, MOV, WebM for video. Up to 50MB." },
                            { step: "3", icon: "⚙️", tint: "bg-[#EDE9FE]", title: "Set your redirect and CTA", desc: "Paste the destination URL — your affiliate link, the brand's campaign page, or any URL. Set the call-to-action button text. Configure how long the ad shows before viewers can proceed." },
                            { step: "4", icon: "🔗", tint: "bg-[#EDE9FE]", title: "Share your link as normal", desc: "Your custom sponsor link works exactly like a platform ad link. Same URL format, same unlock experience for viewers. They see your sponsor's ad instead of a network ad." },
                            { step: "5", icon: "💰", tint: "bg-[#EDE9FE]", title: "Keep 100% of your earnings", desc: "AdGate tracks impressions and CTA clicks so you can report performance to your sponsor. You collect your sponsorship fee directly. AdGate charges zero commission on custom sponsor links." }
                        ].map(item => (
                            <div key={item.step} className="bg-white border border-border p-[16px] rounded-[14px] relative overflow-hidden flex flex-col shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                                <div className="absolute top-2 right-3 text-[48px] font-black text-[#6366F1] opacity-[0.08] leading-none select-none">{item.step}</div>
                                <div className="relative z-10 flex flex-col h-full">
                                    <div className={`w - [40px] h - [40px] rounded - [12px] ${item.tint} flex items - center justify - center text - [20px] mb - 3`}>
                                        {item.icon}
                                    </div>
                                    <h3 className="text-[14px] font-black text-[#111] mb-1.5 leading-snug">{item.title}</h3>
                                    <p className="text-[12px] font-semibold text-textMid leading-[1.6]">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="w-full text-left mb-10">
                        <h3 className="text-[13px] font-extrabold text-[#888] tracking-wider uppercase mb-3">Accepted creative formats</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-white border border-border rounded-[12px] p-[14px] flex gap-3 items-start shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                                <div className="w-[40px] h-[40px] bg-[#EDE9FE] rounded-[10px] flex items-center justify-center text-[20px] shrink-0">🖼️</div>
                                <div className="flex flex-col">
                                    <span className="text-[14px] font-extrabold text-[#111]">Image Ad</span>
                                    <span className="text-[12px] text-textMid mt-0.5">JPG, PNG, WebP. Max 5MB. Display duration 5–30 seconds configurable. Best for: brand awareness, product showcase.</span>
                                </div>
                            </div>
                            <div className="bg-white border border-border rounded-[12px] p-[14px] flex gap-3 items-start shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                                <div className="w-[40px] h-[40px] bg-[#EDE9FE] rounded-[10px] flex items-center justify-center text-[20px] shrink-0">🎬</div>
                                <div className="flex flex-col">
                                    <span className="text-[14px] font-extrabold text-[#111]">Video Ad</span>
                                    <span className="text-[12px] text-textMid mt-0.5">MP4, MOV, WebM. Max 50MB. Skip available after 5 seconds. Best for: storytelling, demos, product reveals.</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full bg-white border-l-[3px] border-l-[#6366F1] border-[1px] border-border rounded-[14px] p-5 mb-10 text-left shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                        <h3 className="text-[14px] font-extrabold text-[#111] mb-2">Proof of delivery for your sponsor</h3>
                        <p className="text-[13px] font-semibold text-textMid leading-[1.7] mb-5">
                            After your link goes live, your analytics dashboard tracks impressions and CTA clicks in real time. Copy a formatted sponsor report with one tap — impressions, click-through rate, and campaign period — to share directly with your brand contact.
                        </p>

                        <div className="bg-[#1A1A1A] rounded-[14px] p-4 flex flex-col w-full max-w-[400px]">
                            <span className="text-[11px] font-bold text-white/50 mb-3 border-b border-white/10 pb-2">Example Sponsor Report</span>
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between items-center"><span className="text-[12px] text-white/70">Resource</span><span className="text-[12px] font-bold text-white">Daily Prompt Pack</span></div>
                                <div className="flex justify-between items-center"><span className="text-[12px] text-white/70">Impressions</span><span className="text-[12px] font-bold text-white">12,450</span></div>
                                <div className="flex justify-between items-center"><span className="text-[12px] text-white/70">CTA Clicks</span><span className="text-[12px] font-bold text-white">1,245</span></div>
                                <div className="flex justify-between items-center"><span className="text-[12px] text-white/70">CTR</span><span className="text-[12px] font-bold text-white">10.0%</span></div>
                            </div>
                            <button className="mt-4 w-full h-[40px] rounded-lg border border-[#6366F1] text-[#6366F1] font-bold text-[13px] flex items-center justify-center hover:bg-[#6366F1]/10 transition-colors">Copy Report</button>
                        </div>
                    </div>

                    <div className="w-full bg-[#EDFAF3] border border-[#BBF7D0] rounded-[14px] p-[20px] flex items-center gap-4 text-left">
                        <div className="text-[32px] shrink-0">🎉</div>
                        <div className="flex flex-col gap-0.5">
                            <span className="text-[16px] font-black text-[#166534]">Zero commission on every custom sponsor link</span>
                            <span className="text-[13px] font-semibold text-[#166534]/80">AdGate earns nothing from your sponsorship deals. That's how we attract the best creators.</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 6 — Getting Paid */}
            <div id="getting-paid" className="w-full bg-white py-[40px] px-5 flex flex-col items-center">
                <div className="w-full max-w-[800px] flex flex-col items-center">
                    <h2 className="text-[22px] font-black text-[#111] mb-8">Getting Paid on AdGate</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-10">
                        {[
                            { icon: "📊", tint: "bg-[#EFF6FF]", title: "How Revenue Is Tracked", desc: "Every ad watch or click generates a revenue event stored server-side. You can see this in real-time on your dashboard. Earnings accumulate immediately." },
                            { icon: "📅", tint: "bg-[#ECFDF5]", title: "When You Get Paid", desc: "Payouts are processed weekly every Monday. You need a minimum of $10 in available balance to receive a payout. Payouts arrive within 2–3 business days via Stripe." },
                            {
                                icon: "✂️", tint: "bg-[#FFFBEB]", title: "Transparent Commission Structure", desc: "Commission depends on how your link earns. Platform Ad links: AdGate deducts 5% when you request a payout. Custom Sponsor links: AdGate deducts nothing — 0% commission, always. The 5% only ever applies to earnings generated through AdGate's own ad network.",
                                isCommission: true
                            },
                            { icon: "💳", tint: "bg-[#F5F3FF]", title: "Connecting Stripe", desc: "You connect your Stripe account once during onboarding. AdGate uses Stripe Connect to send funds directly to your bank account in 130+ countries." }
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-5 rounded-[16px] shadow-[0_1px_3px_rgba(0,0,0,0.06)] border border-border flex flex-col">
                                <div className={`w - [40px] h - [40px] rounded - [10px] ${item.tint} flex items - center justify - center text - [20px] mb - 3`}>{item.icon}</div>
                                <h3 className="text-[15px] font-black text-[#111] mb-2">{item.title}</h3>
                                <p className="text-[13px] font-semibold text-textMid leading-[1.6] mb-3">{item.desc}</p>
                                {item.isCommission && (
                                    <div className="flex flex-col gap-1.5 mt-auto">
                                        <div className="flex items-center justify-between bg-surfaceAlt px-3 py-2 rounded-lg">
                                            <span className="text-[12px] font-bold text-text">Platform Ads</span>
                                            <span className="text-[12px] font-black text-[#E8312A] bg-[#FFF0EF] px-2 py-0.5 rounded-full">5% at payout</span>
                                        </div>
                                        <div className="flex items-center justify-between bg-[#F0FFF4] px-3 py-2 rounded-lg border border-[#BBF7D0]">
                                            <span className="text-[12px] font-bold text-[#166534]">Custom Sponsor</span>
                                            <span className="text-[12px] font-black text-white bg-[#166534] px-2 py-0.5 rounded-full">0% always</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="w-full bg-white rounded-[16px] p-6 border border-border flex flex-col sm:flex-row gap-6 relative shadow-[0_1px_3px_rgba(0,0,0,0.06)] mb-3 before:content-[''] before:absolute before:left-6 sm:before:left-auto sm:before:top-10 sm:before:h-1 before:w-[2px] sm:before:w-[calc(100%-64px)] before:h-[calc(100%-48px)] before:bg-border before:z-0">
                        {[
                            { step: "Viewer unlocks", sub: "Revenue logged instantly" },
                            { step: "Weekly cutoff", sub: "Monday 12:00 UTC" },
                            { step: "Payout processed", sub: "Monday afternoon" },
                            { step: "Funds arrive", sub: "2–3 business days" }
                        ].map((item, i) => (
                            <div key={i} className="flex-1 flex flex-row sm:flex-col items-center gap-4 sm:gap-3 relative z-10 z-10">
                                <div className="w-[16px] h-[16px] rounded-full bg-success border-4 border-white shadow-sm shrink-0" />
                                <div className="flex flex-col sm:items-center text-left sm:text-center mt-1 sm:mt-0">
                                    <span className="text-[13px] font-black text-text leading-tight">{item.step}</span>
                                    <span className="text-[11px] font-semibold text-textLight">{item.sub}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <span className="text-[12px] font-medium text-textMid text-center w-full block">
                        Custom Sponsor earnings are reported separately in your payout breakdown — no fee applied at any stage.
                    </span>
                </div>
            </div>

            {/* Section 7 — The Referral Program */}
            <div id="referral-program" className="w-full bg-[#F6F6F6] py-[40px] px-5 flex flex-col items-center">
                <div className="w-full max-w-[800px] flex flex-col items-center">
                    <h2 className="text-[22px] font-black text-[#111] mb-6">Earn More With Referrals</h2>

                    <div className="w-full bg-[#FFFBEB] border border-[#F59E0B] p-5 rounded-[16px] shadow-sm flex flex-col items-center mb-10">
                        <h3 className="text-[18px] font-black text-[#92400E] text-center mb-1 leading-snug">Refer a creator → Earn 5% of their lifetime earnings → Forever.</h3>
                        <p className="text-[13px] text-[#78350F] text-center">At absolutely no cost to them.</p>
                    </div>

                    <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                        {[
                            { num: "1", title: "Share your unique referral link", desc: "Every creator gets a personal link." },
                            { num: "2", title: "They sign up and start earning", desc: "No minimum required from them." },
                            { num: "3", title: "You earn 5% every time they earn", desc: "Automatic, forever, no cap." }
                        ].map((item, i) => (
                            <div key={i} className="bg-white border border-border p-4 rounded-[14px] flex flex-col shadow-sm">
                                <div className="w-8 h-8 rounded-full bg-[#F59E0B] text-white flex items-center justify-center font-black text-[14px] mb-3">{item.num}</div>
                                <h4 className="text-[15px] font-black text-[#111] mb-1">{item.title}</h4>
                                <span className="text-[13px] font-semibold text-textMid">{item.desc}</span>
                            </div>
                        ))}
                    </div>

                    <div className="w-full bg-[#1A1A1A] p-5 rounded-[14px] flex flex-col text-white shadow-sm">
                        <span className="text-[13px] font-bold text-white/50 mb-4">Referral Earnings Example</span>

                        <div className="flex flex-col gap-0 border-b border-white/10">
                            {[
                                { left: "1 referred creator earning $50/month", right: "$2.50/mo" },
                                { left: "5 referred creators averaging $80/month", right: "$20/mo" },
                                { left: "20 referred creators averaging $100/month", right: "$100/mo" }
                            ].map((row, i) => (
                                <div key={i} className="flex justify-between items-center h-[48px] border-t border-white/10 gap-2">
                                    <span className="text-[13px] font-semibold text-white/90 truncate">{row.left}</span>
                                    <span className="text-[14px] font-black text-[#F59E0B]">{row.right}</span>
                                </div>
                            ))}
                        </div>
                        <p className="text-[13px] text-white/70 text-center mt-5">
                            These compound. The more you refer, the more passive income you build.
                        </p>
                    </div>
                </div>
            </div>

            {/* Section 8 — The Tree Planting Program */}
            <div id="trees" className="w-full bg-[#0F4C2A] py-[40px] px-5 flex flex-col items-center">
                <div className="w-full max-w-[800px] flex flex-col items-center">
                    <h2 className="text-[22px] font-black text-white mb-8 text-center">Making an Impact Together</h2>

                    <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                        <div className="bg-white/10 border border-white/20 p-5 rounded-[16px] flex flex-col items-center text-center">
                            <span className="text-[32px] font-black text-white leading-none">12,450</span>
                            <span className="text-[13px] font-bold text-white/70 mt-1">Total Trees Planted</span>
                        </div>
                        <div className="bg-white/10 border border-white/20 p-5 rounded-[16px] flex flex-col items-center text-center">
                            <span className="text-[32px] font-black text-white leading-none">1,830</span>
                            <span className="text-[13px] font-bold text-white/70 mt-1">Creators Contributing</span>
                        </div>
                        <div className="bg-white/10 border border-white/20 p-5 rounded-[16px] flex flex-col items-center text-center">
                            <span className="text-[32px] font-black text-white leading-none">2.4M</span>
                            <span className="text-[13px] font-bold text-white/70 mt-1">Lbs CO₂ Offset</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 text-[14px] font-semibold text-white/80 leading-[1.75] mb-8 w-full max-w-[600px] text-center">
                        <p>AdGate partners with One Tree Planted to convert ad impressions into real-world reforestation. By opting into the tree donation, 5% of your earnings go directly toward planting trees in areas that need it most.</p>
                        <p>Currently, trees are being planted in the Amazon Rainforest, Sub-Saharan Africa, and parts of Australia. Every time you generate income, you can track your personal impact on your dashboard.</p>
                    </div>

                    <div className="w-full bg-[#166534] p-5 rounded-[14px] text-center shadow-sm">
                        <span className="text-[16px] font-extrabold text-white">Every 40 unlocks = 1 tree planted. Your content, your audience, your impact.</span>
                    </div>
                </div>
            </div>

            {/* Bottom CTA */}
            <div className="w-full bg-[#0F4C2A] pt-4 pb-[48px] flex flex-col items-center">
                <div className="w-full max-w-[600px] px-5 flex flex-col items-center text-center">
                    <div className="text-[48px] mb-4">🌳</div>
                    <h2 className="text-[24px] font-black text-white mb-2">Start earning today. It's free.</h2>
                    <p className="text-[14px] font-bold text-white/70 mb-8">Platform Ads: 95% yours. Custom Sponsor: 100% yours. Always free to start.</p>
                    <Link to="/" className="w-full sm:w-[200px] h-[52px] bg-[#E8312A] text-white font-extrabold text-[15px] rounded-[14px] flex items-center justify-center hover:bg-[#C42823] transition-colors shadow-sm">
                        Create Your First Link
                    </Link>
                </div>
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
        </div>
    );
};
