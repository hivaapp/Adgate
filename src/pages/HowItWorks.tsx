import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { AdTypeSelector } from '../components/AdTypeSelector';

export const HowItWorks = () => {
    useEffect(() => {
        document.title = "How AdGate Works — The Complete Creator Guide";
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute("content", "From uploading your first file to your first payout — understand every step of how the platform works.");
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
                    <div className="flex items-center gap-2 mb-8">
                        <div className="w-[64px] h-[64px] bg-white rounded-[16px] shadow-sm flex items-center justify-center text-[32px]">📁</div>
                        <div className="text-[#AAA] font-bold">→</div>
                        <div className="w-[64px] h-[64px] bg-white rounded-[16px] shadow-sm flex items-center justify-center text-[32px]">🔗</div>
                        <div className="text-[#AAA] font-bold">→</div>
                        <div className="w-[64px] h-[64px] bg-white rounded-[16px] shadow-sm flex items-center justify-center text-[32px]">💰</div>
                    </div>

                    <h2 className="text-[22px] font-black text-[#111] mb-6">What is AdGate?</h2>

                    <div className="flex flex-col gap-4 text-[15px] font-semibold text-[#444] leading-[1.75]">
                        <p>AdGate is a simple link monetization tool. It allows you to share digital files, links, or text and get paid every time someone accesses them.</p>
                        <p>It's built for content creators, educators, prompt engineers, designers, or anyone who shares valuable free resources online.</p>
                        <p>Unlike Patreon or Substack, your audience doesn't need to pull out a credit card. They simply watch a short, brand-safe ad to unlock your content. The advertiser pays AdGate, and we pass 95% of that payment directly to you.</p>
                    </div>

                    <div className="mt-8 border-l-[4px] border-[#E8312A] bg-[#FFF0EF] p-[16px] rounded-[12px] w-full shadow-sm">
                        <p className="text-[16px] font-extrabold text-[#E8312A] italic m-0">
                            "AdGate turns free content into revenue — without charging your audience a single cent."
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
                            { step: "3", icon: "⚙️", tint: "bg-[#FFFBEB]", title: "Set your ad preferences", desc: "Pick Video Ads or Click Ads. Choose 1, 2, or 3 ads per unlock. Toggle the tree donation. Takes 30 seconds." },
                            { step: "4", icon: "🔗", tint: "bg-[#F5F3FF]", title: "Generate your shareable link", desc: "AdGate creates a unique URL like adgate.io/r/abc123 that you own. Share it anywhere." },
                            { step: "5", icon: "📲", tint: "bg-[#ECFDF5]", title: "Post on any platform", desc: "Twitter, Instagram, YouTube descriptions, TikTok bio, Reddit posts, newsletters, Discord servers — anywhere." },
                            { step: "6", icon: "💰", tint: "bg-[#FEF3C7]", title: "Earn from every unlock", desc: "Your dashboard shows real-time views, unlocks, and earnings. Get paid weekly to Stripe." }
                        ].map(item => (
                            <div key={item.step} className="bg-white border border-border p-[16px] rounded-[14px] min-h-[160px] relative overflow-hidden flex flex-col shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                                <div className="absolute top-2 left-3 text-[48px] font-black text-black opacity-[0.08] leading-none select-none">{item.step}</div>
                                <div className="relative z-10 flex flex-col h-full">
                                    <div className={`w-[48px] h-[48px] rounded-[12px] ${item.tint} flex items-center justify-center text-[24px] mb-4`}>
                                        {item.icon}
                                    </div>
                                    <h3 className="text-[16px] font-black text-[#111] mb-2 leading-snug">{item.title}</h3>
                                    <p className="text-[13px] font-semibold text-textMid leading-[1.6]">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="full-width bg-[#FFF0EF] border border-[#E8312A] p-[20px] rounded-[14px] w-full text-center">
                        <span className="text-[14px] font-bold text-[#E8312A]">💡 Pro tip: Creators who share their link in 3 or more places earn 4x more than those who share in just one.</span>
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
                                <div className="text-[11px] font-bold text-center text-textMid bg-surfaceAlt px-2 py-1 rounded-full self-center">3. They see the ad</div>
                                <div className="w-full h-[120px] bg-[#111] rounded-lg relative overflow-hidden flex items-center justify-center text-[10px] text-white uppercase font-bold">
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
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 4 — The Ad Types Explained */}
            <div id="ad-types" className="w-full bg-white py-[40px] px-5 flex flex-col items-center">
                <div className="w-full max-w-[800px] flex flex-col items-center">
                    <h2 className="text-[22px] font-black text-[#111] mb-6">The Two Ad Types</h2>

                    <p className="text-[14px] text-textMid mb-4 text-center">When creating a link, you choose one of these two formats:</p>

                    <div className="pointer-events-none opacity-90 w-full sm:w-[500px] mb-10">
                        <AdTypeSelector value="click" onChange={() => { }} adCount={2} />
                    </div>

                    <div className="w-full flex flex-col sm:flex-row gap-6 mb-8 items-stretch">
                        <div className="flex-1 bg-white border border-border border-l-[4px] border-l-[#E8312A] p-4 rounded-[14px] shadow-sm flex flex-col">
                            <h3 className="text-[15px] font-black text-[#E8312A] mb-4">Video Ads — Higher Earnings</h3>
                            <ul className="flex flex-col gap-3 text-[13px] font-semibold text-[#444] leading-[1.7] flex-1">
                                <li><strong>How long videos are:</strong> 15–30 seconds</li>
                                <li><strong>When skip is available:</strong> after 5 seconds</li>
                                <li><strong>What the viewer sees:</strong> A branded full-screen video experience</li>
                                <li><strong>What counts as a completion:</strong> Watching to the end or tapping skip after 5 seconds</li>
                                <li><strong>Estimated earnings per completion:</strong> $0.05–$0.15 per ad watched</li>
                                <li><strong>Best for:</strong> Creators whose audience is accustomed to video platforms like YouTube or TikTok</li>
                            </ul>
                        </div>

                        <div className="flex-1 bg-white border border-border border-l-[4px] border-l-[#888] p-4 rounded-[14px] shadow-sm flex flex-col">
                            <h3 className="text-[15px] font-black text-[#333] mb-4">Click Ads — Instant Interaction</h3>
                            <ul className="flex flex-col gap-3 text-[13px] font-semibold text-[#444] leading-[1.7] flex-1">
                                <li><strong>What the viewer sees:</strong> A full-screen sponsor card</li>
                                <li><strong>What they have to do:</strong> Tap the CTA button which opens the advertiser in a new tab</li>
                                <li><strong>What counts as a click:</strong> A confirmed tap that opens the destination</li>
                                <li><strong>Estimated earnings per click:</strong> $0.02–$0.08</li>
                                <li><strong>Best for:</strong> Audiences on Twitter, Reddit, or newsletters where quick interaction is more natural</li>
                            </ul>
                        </div>
                    </div>

                    <div className="w-full flex flex-col gap-3">
                        <div className="bg-[#F8F8F8] border border-border rounded-[12px] p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                            <span className="font-black text-[14px] text-text">Video Ads</span>
                            <div className="flex flex-col sm:items-end">
                                <span className="text-[14px] font-bold text-success">$0.05–0.15 / unlock</span>
                                <span className="text-[12px] text-textMid">Est: $50–150 / mo @ 1k unlocks</span>
                            </div>
                        </div>
                        <div className="bg-[#F8F8F8] border border-border rounded-[12px] p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                            <span className="font-black text-[14px] text-text">Click Ads</span>
                            <div className="flex flex-col sm:items-end">
                                <span className="text-[14px] font-bold text-success">$0.02–0.08 / unlock</span>
                                <span className="text-[12px] text-textMid">Est: $20–80 / mo @ 1k unlocks</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 5 — Getting Paid */}
            <div id="getting-paid" className="w-full bg-[#F6F6F6] py-[40px] px-5 flex flex-col items-center">
                <div className="w-full max-w-[800px] flex flex-col items-center">
                    <h2 className="text-[22px] font-black text-[#111] mb-8">Getting Paid on AdGate</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-10">
                        {[
                            { icon: "📊", tint: "bg-[#EFF6FF]", title: "How Revenue Is Tracked", desc: "Every ad watch or click generates a revenue event stored server-side. You can see this in real-time on your dashboard. Earnings accumulate immediately." },
                            { icon: "📅", tint: "bg-[#ECFDF5]", title: "When You Get Paid", desc: "Payouts are processed weekly every Monday. You need a minimum of $10 in available balance to receive a payout. Payouts arrive within 2–3 business days via Stripe." },
                            { icon: "✂️", tint: "bg-[#FFFBEB]", title: "The 5% Commission", desc: "AdGate deducts 5% at the time of payout — not when revenue is earned. So your dashboard always shows your gross earnings. You see exactly what you made." },
                            { icon: "💳", tint: "bg-[#F5F3FF]", title: "Connecting Stripe", desc: "You connect your Stripe account once during onboarding. AdGate uses Stripe Connect to send funds directly to your bank account in 130+ countries." }
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-5 rounded-[16px] shadow-sm border border-border flex flex-col">
                                <div className={`w-[40px] h-[40px] rounded-[10px] ${item.tint} flex items-center justify-center text-[20px] mb-3`}>{item.icon}</div>
                                <h3 className="text-[15px] font-black text-[#111] mb-2">{item.title}</h3>
                                <p className="text-[13px] font-semibold text-textMid leading-[1.6]">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="w-full bg-white rounded-[16px] p-6 border border-border flex flex-col sm:flex-row gap-6 relative shadow-sm before:content-[''] before:absolute before:left-8 sm:before:left-auto sm:before:top-10 sm:before:h-1 before:w-[2px] sm:before:w-[calc(100%-64px)] before:h-[calc(100%-48px)] before:bg-border before:z-0">
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
                </div>
            </div>

            {/* Section 6 — The Referral Program */}
            <div id="referral-program" className="w-full bg-white py-[40px] px-5 flex flex-col items-center">
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

            {/* Section 7 — The Tree Planting Program */}
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
                    <p className="text-[14px] font-bold text-white/70 mb-8">95% yours. 5% fee. 0% risk.</p>
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
