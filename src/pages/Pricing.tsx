import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check, Lock, CalendarX, CheckCircle2, CircleDollarSign, Percent, BadgeDollarSign, ChevronDown, ChevronUp } from 'lucide-react';

const PRICING_FAQS = [
    { q: "When exactly is the 5% fee taken?", a: "The 5% platform fee is deducted only when you request a payout to your Stripe account. Your dashboard will always show your gross earnings until that point." },
    { q: "Is there a minimum payout threshold?", a: "Yes, you must have at least $10 in available balance to request a payout." },
    { q: "How often are payouts processed?", a: "Payouts are processed automatically every Monday for the earnings generated in the previous week." },
    { q: "What payment methods are supported?", a: "We currently support direct payouts to bank accounts via Stripe Connect in over 130 countries." },
    { q: "Are there any upload or storage fees?", a: "No. You get 100MB of free file storage per resource, and we never charge storage fees or limit your link traffic." },
    { q: "What happens to my earnings if I delete my account?", a: "Any pending balance above $10 will be paid out to your connected Stripe account before deletion is finalized." }
];

export const Pricing = () => {
    const [isDonateOn, setIsDonateOn] = useState(false);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    // Set meta tags properly
    useEffect(() => {
        document.title = "AdGate Pricing — Free to Start, 5% at Payout";
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute("content", "AdGate takes 5% on payouts only. No monthly fees. No hidden charges. No lock-in.");
        }
    }, []);

    const calcTotal = 35.00;
    const calcFee = 1.75;
    const calcSubtotal = 33.25;
    const calcDonate = 1.66;
    const calcTakeHome = isDonateOn ? (calcSubtotal - calcDonate).toFixed(2) : calcSubtotal.toFixed(2);

    return (
        <div className="flex flex-col items-center w-full min-h-screen bg-bg selection:bg-brandTint selection:text-brand">
            {/* Hero Section */}
            <div className="w-full max-w-[800px] px-4 pt-12 sm:pt-20 pb-16 flex flex-col items-center text-center animate-fadeIn">
                <div className="h-[36px] bg-[#FFF0EF] border border-[#E8312A] border-opacity-20 px-4 rounded-full flex items-center gap-2 mb-6">
                    <span className="text-[14px]">💰</span>
                    <span className="text-[#E8312A] font-extrabold text-[11px] uppercase tracking-wider">Simple, creator-first pricing</span>
                </div>

                <h1 className="text-[clamp(28px,7vw,42px)] font-black text-[#111] leading-[1.05] tracking-tight mb-4">
                    You earn. We take a small cut.
                </h1>

                <p className="text-[#666] font-semibold text-[15px] max-w-[400px] mx-auto mb-10 leading-snug">
                    AdGate takes 5% on payouts only. No monthly fees. No hidden charges. No lock-in.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 cursor-default">
                    <div className="flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-[#E8312A]" />
                        <span className="text-[13px] font-bold text-[#444]">Free to join</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Lock size={16} className="text-[#E8312A]" />
                        <span className="text-[13px] font-bold text-[#444]">No upfront cost</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CalendarX size={16} className="text-[#E8312A]" />
                        <span className="text-[13px] font-bold text-[#444]">Cancel anytime</span>
                    </div>
                </div>
            </div>

            {/* The Main Pricing Model Explanation */}
            <div className="w-full bg-[#F6F6F6] py-8 sm:py-12 flex flex-col items-center">
                <div className="w-full max-w-[800px] px-5 sm:px-8 flex flex-col items-center">
                    <h2 className="text-[20px] font-black text-[#111] text-center mb-1">How AdGate Pricing Works</h2>
                    <p className="text-[13px] text-textMid text-center mb-8">Follow the lifecycle of an unlocked resource.</p>

                    <div className="w-full bg-white rounded-[18px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)] border border-border flex flex-col">
                        <div className="flex items-start sm:items-center py-4 sm:py-5 border-b border-border gap-4">
                            <div className="text-success mt-1 sm:mt-0"><CheckCircle2 size={24} /></div>
                            <div className="flex-1">
                                <h3 className="text-[14px] font-extrabold text-text mb-1">Creating links</h3>
                                <p className="text-[13px] font-semibold text-textMid leading-relaxed">Upload your file, choose your ad settings, generate a link. Completely free. Create unlimited links.</p>
                            </div>
                            <div className="h-[26px] px-2.5 bg-success text-white font-extrabold text-[10px] uppercase rounded-full flex items-center tracking-wider">
                                Free
                            </div>
                        </div>

                        <div className="flex items-start sm:items-center py-4 sm:py-5 border-b border-border gap-4">
                            <div className="text-[#F59E0B] mt-1 sm:mt-0"><CircleDollarSign size={24} /></div>
                            <div className="flex-1">
                                <h3 className="text-[14px] font-extrabold text-text mb-1">Ad Revenue</h3>
                                <p className="text-[13px] font-semibold text-textMid leading-relaxed">Every time a viewer watches a video ad or clicks a sponsor link on your content, AdGate collects the ad revenue on your behalf.</p>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-[16px] font-black text-[#111]">100%</span>
                                <span className="text-[10px] text-textMid">collected</span>
                            </div>
                        </div>

                        <div className="flex items-start sm:items-center py-4 sm:py-5 border-b border-border gap-4">
                            <div className="text-[#E8312A] mt-1 sm:mt-0"><Percent size={24} /></div>
                            <div className="flex-1">
                                <h3 className="text-[14px] font-extrabold text-text mb-1">Platform Fee</h3>
                                <p className="text-[13px] font-semibold text-textMid leading-relaxed">When you request a payout, AdGate deducts 5% to keep the lights on and improve the platform. That's it. No other charges.</p>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-[20px] font-black text-[#E8312A]">5%</span>
                                <span className="text-[10px] text-textMid">at payout</span>
                            </div>
                        </div>

                        <div className="flex items-start sm:items-center py-4 sm:py-5 gap-4">
                            <div className="text-success mt-1 sm:mt-0"><BadgeDollarSign size={24} /></div>
                            <div className="flex-1">
                                <h3 className="text-[14px] font-extrabold text-text mb-1">Your Earnings</h3>
                                <p className="text-[13px] font-semibold text-textMid leading-relaxed">You receive 95% of all ad revenue generated by your links, paid directly to your Stripe account weekly.</p>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-[20px] font-black text-success">95%</span>
                                <span className="text-[10px] text-textMid">yours</span>
                            </div>
                        </div>
                    </div>

                    <p className="text-[13px] text-[#888] text-center mt-6">Donate 5% to plant trees? Fully optional. Comes from your 95%, not extra.</p>
                </div>
            </div>

            {/* Visual Math Section */}
            <div className="w-full bg-white py-12 flex flex-col items-center">
                <div className="w-full max-w-[600px] px-5 flex flex-col items-center">
                    <h2 className="text-[20px] font-black text-[#111] text-center mb-8">See Exactly What You Earn</h2>

                    <div className="w-full bg-white rounded-[18px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)] border border-border flex flex-col items-center">
                        <span className="text-[13px] font-bold text-textMid text-center mb-6">Example: 1,000 viewers unlock your resource</span>

                        <div className="w-full flex flex-col gap-2 relative">
                            {/* Row 1 */}
                            <div className="w-full bg-[#F8F8F8] h-[48px] rounded-full px-5 flex items-center justify-between">
                                <span className="text-[14px] font-bold text-text">Total Ad Revenue Generated</span>
                                <span className="text-[16px] font-black text-[#111]">${calcTotal.toFixed(2)}</span>
                            </div>

                            <div className="flex justify-center -my-2 z-10">
                                <div className="bg-white p-1 pb-1.5"><ChevronDown size={14} className="text-textLight" /></div>
                            </div>

                            {/* Row 2 */}
                            <div className="w-full bg-white border-l-[3px] border-[#E8312A] h-[48px] rounded-r-lg shadow-sm border-y border-r border-[#F3F1EC] px-4 flex items-center justify-between">
                                <span className="text-[14px] font-bold text-text">Platform Fee (5%)</span>
                                <span className="text-[16px] font-black text-[#E8312A]">- ${calcFee.toFixed(2)}</span>
                            </div>

                            <div className="flex justify-center -my-2 z-10">
                                <div className="bg-white p-1 pb-1.5"><ChevronDown size={14} className="text-textLight" /></div>
                            </div>

                            {/* Row 3 */}
                            <div className="w-full bg-[#F0FFF4] h-[48px] rounded-lg px-5 flex items-center justify-between border border-[#D1FADF]">
                                <span className="text-[14px] font-bold text-text">Your Earnings Before Donation</span>
                                <span className="text-[16px] font-black text-[#111]">= ${calcSubtotal.toFixed(2)}</span>
                            </div>

                            {/* Row 4 (Conditional) */}
                            {isDonateOn && (
                                <>
                                    <div className="flex justify-center -my-2 z-10">
                                        <div className="bg-white p-1 pb-1.5"><ChevronDown size={14} className="text-textLight" /></div>
                                    </div>
                                    <div className="w-full bg-white border-l-[3px] border-success h-[48px] rounded-r-lg shadow-sm border-y border-r border-[#F3F1EC] px-4 flex items-center justify-between animate-slideDown">
                                        <span className="text-[14px] font-bold text-text">Tree Donation (5% of your share)</span>
                                        <span className="text-[16px] font-black text-success">- ${calcDonate.toFixed(2)}</span>
                                    </div>
                                </>
                            )}

                            <div className="flex justify-center -my-2 z-10">
                                <div className="bg-white p-1 pb-1.5"><ChevronDown size={14} className="text-textLight" /></div>
                            </div>

                            {/* Row 5 */}
                            <div className="w-full bg-[#EDFAF3] h-[56px] rounded-[12px] px-5 flex items-center justify-between border border-[#D1FADF]">
                                <span className="text-[15px] font-black text-text">Your Final Take Home</span>
                                <span className="text-[22px] font-black text-success">${calcTakeHome}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 mt-8">
                            <span className="text-[14px] font-bold text-text">Include tree donation?</span>
                            <button
                                onClick={() => setIsDonateOn(!isDonateOn)}
                                className={`w-[44px] h-[24px] rounded-full p-1 transition-colors relative shrink-0 ${isDonateOn ? 'bg-success' : 'bg-textLight'}`}
                            >
                                <div className={`w-[16px] h-[16px] bg-white rounded-full transition-transform absolute top-1 ${isDonateOn ? 'translate-x-[20px]' : 'translate-x-[0px]'}`} />
                            </button>
                        </div>

                        <p className="text-[11px] text-textMid text-center mt-6">
                            Based on estimated $0.035 CPM per unlock. Actual earnings vary by geography, niche, and ad type.
                        </p>
                    </div>
                </div>
            </div>

            {/* Plan Comparison Section */}
            <div className="w-full bg-white py-12 flex flex-col items-center">
                <div className="w-full max-w-[800px] px-5 flex flex-col items-center">
                    <h2 className="text-[20px] font-black text-[#111] text-center mb-1">Plans</h2>
                    <p className="text-[14px] text-textMid text-center mb-10">Start free forever. Upgrade when you're ready.</p>

                    <div className="w-full flex flex-col sm:flex-row gap-4 sm:gap-4 items-stretch justify-center">
                        {/* Free Plan */}
                        <div className="flex-1 bg-white border-2 border-[#E8E8E8] rounded-[18px] p-6 flex flex-col">
                            <h3 className="text-[16px] font-black text-[#111]">Free</h3>
                            <p className="text-[13px] text-textMid mb-6">Perfect for getting started</p>

                            <div className="flex items-baseline mb-2">
                                <span className="text-[24px] font-black text-[#111] -mt-2 self-start">$</span>
                                <span className="text-[48px] font-black text-[#111] leading-none">0</span>
                            </div>
                            <p className="text-[14px] font-bold text-textMid mb-6">forever</p>

                            <div className="w-full h-px bg-border mb-6" />

                            <div className="flex flex-col gap-0 mb-8 flex-1">
                                {["Unlimited link creation", "Video and click ad types", "1–3 ads per unlock", "Supabase file storage up to 100MB", "Creator public profile page", "Referral program access", "Weekly payouts via Stripe", "Basic analytics per link"].map((feature, i) => (
                                    <div key={i} className="flex items-center gap-3 h-[40px]">
                                        <Check size={16} className="text-success shrink-0" />
                                        <span className="text-[13px] font-bold text-[#333]">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <Link to="/" className="w-full h-[48px] bg-[#E8312A] text-white font-black text-[15px] rounded-md flex items-center justify-center hover:bg-[#C42823] transition-colors">
                                Get Started Free
                            </Link>
                        </div>

                        {/* Pro Plan */}
                        <div className="flex-1 bg-gradient-to-br from-[#1A1A1A] to-[#2D2D2D] border-2 border-[#E8312A] rounded-[18px] p-6 flex flex-col relative">
                            <div className="absolute top-4 right-4 h-[24px] px-3 bg-[#F59E0B] text-white font-extrabold text-[10px] uppercase rounded-full flex items-center tracking-wider">
                                Coming Soon
                            </div>

                            <h3 className="text-[16px] font-black text-white">Pro</h3>
                            <p className="text-[13px] font-semibold text-white/70 mb-6">For serious creators</p>

                            <div className="flex items-baseline mb-2">
                                <span className="text-[24px] font-black text-white -mt-2 self-start">$</span>
                                <span className="text-[48px] font-black text-white leading-none">29</span>
                            </div>
                            <p className="text-[14px] font-semibold text-white/60 mb-6">per month</p>

                            <div className="w-full h-px bg-white/20 mb-6" />

                            <div className="flex flex-col gap-0 mb-4 flex-1">
                                {["Unlimited link creation", "Video and click ad types", "1–3 ads per unlock", "Supabase file storage up to 100MB", "Creator public profile page", "Referral program access", "Weekly payouts via Stripe", "Basic analytics per link"].map((feature, i) => (
                                    <div key={i} className="flex items-center gap-3 h-[40px]">
                                        <Check size={16} className="text-white/80 shrink-0" />
                                        <span className="text-[13px] font-bold text-white/90">{feature}</span>
                                    </div>
                                ))}
                                {["Custom domain for links", "Advanced analytics with geography breakdown", "Priority ad network placement", "Remove AdGate branding from unlock pages"].map((feature, i) => (
                                    <div key={`pro-${i}`} className="flex items-center gap-3 h-[40px]">
                                        <span className="text-[#F59E0B] shrink-0 text-[14px]">★</span>
                                        <span className="text-[13px] font-bold text-[#F59E0B]">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="text-[13px] text-white/60 text-center mb-6">
                                Same 5% payout commission
                            </div>

                            <button className="w-full h-[48px] bg-white text-[#111] font-black text-[15px] rounded-md flex items-center justify-center hover:bg-gray-100 transition-colors">
                                Join Waitlist
                            </button>
                        </div>
                    </div>

                    <p className="text-[13px] text-textMid text-center mt-8">Both plans include the tree planting donation option. 🌱</p>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="w-full bg-white py-12 flex flex-col items-center">
                <div className="w-full max-w-[600px] px-5">
                    <h2 className="text-[20px] font-black text-[#111] mb-8 text-center">Pricing FAQs</h2>

                    <div className="flex flex-col gap-3">
                        {PRICING_FAQS.map((faq, idx) => (
                            <div key={idx} className="bg-white border border-border rounded-[16px] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                                <button
                                    className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-surfaceAlt transition-colors"
                                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                >
                                    <span className="font-black text-[15px] text-text pr-4">{faq.q}</span>
                                    {openFaq === idx ? <ChevronUp size={20} className="text-textMid min-w-[20px]" /> : <ChevronDown size={20} className="text-textMid min-w-[20px]" />}
                                </button>
                                {openFaq === idx && (
                                    <div className="px-5 pb-4 pt-1 text-[14px] font-semibold text-textMid leading-relaxed">
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom CTA */}
            <div className="w-full bg-[#0F4C2A] py-[48px] flex flex-col items-center">
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
