import { useParams, Link } from 'react-router-dom';
import { TrendingUp, Check, ShieldCheck, Info } from 'lucide-react';

export const JoinPage = () => {
    const { code } = useParams<{ code: string }>();

    // Mock referrer info mapping
    const referrerName = code === 'ALEX8K2P' ? 'Alex' : 'A creator';

    return (
        <div className="min-h-screen bg-bg flex flex-col lg:flex-row">
            {/* Left Column - The Hook */}
            <div className="flex-1 px-6 py-12 lg:px-24 flex flex-col justify-center max-w-[800px] lg:max-w-none mx-auto w-full lg:border-r border-border bg-white lg:bg-transparent relative z-10 z-[2]">

                {/* Logo & Referrer Badge */}
                <div className="flex items-center gap-4 mb-16">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-text text-white flex items-center justify-center font-black text-xs leading-none">
                            AG
                        </div>
                        <span className="font-black text-lg tracking-tight text-text">AdGate</span>
                    </Link>
                    <div className="h-6 px-3 bg-[#EBF5EE] border border-[#BBF7D0] rounded-full flex items-center justify-center">
                        <span className="text-[11px] font-[800] text-[#166534] tracking-wide uppercase">
                            {referrerName} invited you
                        </span>
                    </div>
                </div>

                <div className="max-w-[480px]">
                    <h1 className="text-[42px] sm:text-[52px] font-black text-text leading-[1.05] tracking-tight mb-8">
                        The easiest way to monetize your audience.
                    </h1>

                    <div className="flex flex-col gap-6 mb-10">
                        <div className="flex items-start gap-4">
                            <div className="w-8 h-8 rounded-full bg-brandTint flex items-center justify-center shrink-0">
                                <TrendingUp className="w-4 h-4 text-brand" />
                            </div>
                            <div>
                                <h3 className="text-[16px] font-[800] text-text">Keep 95% of Revenue</h3>
                                <p className="text-[14px] text-textMid mt-1 leading-relaxed">We take a tiny 5% cut. You keep the rest. Payouts via Stripe or Crypto.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-8 h-8 rounded-full bg-surfaceAlt flex items-center justify-center shrink-0">
                                <Check className="w-4 h-4 text-text" />
                            </div>
                            <div>
                                <h3 className="text-[16px] font-[800] text-text">Share Any File Setup</h3>
                                <p className="text-[14px] text-textMid mt-1 leading-relaxed">Lock videos, PDFs, zip files, or secret links behind an ad-wall in 30 seconds.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-8 h-8 rounded-full bg-[#EBF5EE] flex items-center justify-center shrink-0">
                                <ShieldCheck className="w-4 h-4 text-[#166534]" />
                            </div>
                            <div>
                                <h3 className="text-[16px] font-[800] text-text">Free For Your Audience</h3>
                                <p className="text-[14px] text-textMid mt-1 leading-relaxed">Your fans just watch a 10-second ad to unlock. No credit cards required.</p>
                            </div>
                        </div>
                    </div>

                    <button className="w-full h-[56px] bg-brand text-white rounded-xl font-[800] text-[16px] flex items-center justify-center hover:bg-brandHover transition-colors mb-4 shadow-sm" style={{ boxShadow: '0 4px 12px rgba(217,119,87,0.2)' }}>
                        Sign Up Free
                    </button>

                    <p className="text-[12px] font-[600] text-textMid text-center mb-10">Join 12,000+ creators earning today.</p>

                    {/* Transparency Note */}
                    <div className="w-full rounded-[16px] bg-[#FAF9F7] border border-[#E6E2D9] p-5 shadow-sm">
                        <div className="flex items-start gap-3">
                            <Info className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                            <div>
                                <h4 className="text-[13px] font-[800] text-text mb-1 flex items-center gap-1.5">
                                    Transparency note
                                </h4>
                                <p className="text-[13px] text-textMid font-[600] leading-relaxed">
                                    By using this link, you don't lose anything. AdGate gives {referrerName} a 5% bonus <strong>from our cut</strong> on your earnings forever. You still keep 95% always. Win-win.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column - Dashboard Preview (Desktop Only) */}
            <div className="hidden lg:flex flex-1 bg-[#FAF9F7] items-center justify-center p-12 overflow-hidden relative">

                {/* Background Pattern */}
                <div
                    className="absolute inset-0 opacity-[0.03] z-[0]"
                    style={{
                        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'1\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")',
                    }}
                />

                <div className="relative z-10 w-full max-w-[600px] h-[700px] bg-white rounded-[24px] border border-border shadow-[0_24px_48px_rgba(0,0,0,0.08)] flex flex-col overflow-hidden rotate-[2deg] scale-[1.05] translate-x-12">

                    {/* Mock Header */}
                    <div className="h-[64px] border-b border-border px-6 flex items-center justify-between bg-white shrink-0">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-surfaceAlt animate-pulse" />
                            <div className="w-24 h-4 rounded bg-surfaceAlt animate-pulse" />
                        </div>
                        <div className="w-32 h-8 rounded-full bg-brandTint" />
                    </div>

                    {/* Mock Content */}
                    <div className="p-8 flex-1 bg-[#FAF9F7]">
                        <div className="flex gap-4 mb-8">
                            <div className="flex-1 bg-white border border-border rounded-[16px] p-6 shadow-sm">
                                <div className="w-8 h-8 rounded-full bg-surfaceAlt animate-pulse mb-8" />
                                <div className="w-24 h-4 rounded bg-surfaceAlt animate-pulse mb-2" />
                                <div className="w-32 h-8 rounded bg-text opacity-10" />
                            </div>
                            <div className="flex-1 bg-white border border-border rounded-[16px] p-6 shadow-sm">
                                <div className="w-8 h-8 rounded-full bg-surfaceAlt animate-pulse mb-8" />
                                <div className="w-24 h-4 rounded bg-surfaceAlt animate-pulse mb-2" />
                                <div className="w-32 h-8 rounded bg-text opacity-10" />
                            </div>
                        </div>

                        <div className="w-full bg-white border border-border rounded-[16px] p-6 shadow-sm">
                            <div className="w-full h-4 rounded bg-surfaceAlt animate-pulse mb-6 max-w-[200px]" />
                            <div className="flex flex-col gap-4">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded bg-surfaceAlt animate-pulse" />
                                            <div className="flex flex-col gap-2">
                                                <div className="w-32 h-3 rounded bg-surfaceAlt animate-pulse" />
                                                <div className="w-16 h-2 rounded bg-surfaceAlt animate-pulse opacity-50" />
                                            </div>
                                        </div>
                                        <div className="w-12 h-6 rounded-full bg-brandTint" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Bottom Nav Mock */}
                    <div className="h-[64px] border-t border-border bg-white flex items-center justify-around px-6 shrink-0">
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className={`w-10 h-10 flex flex-col items-center justify-center gap-1 ${i === 1 ? 'opacity-100' : 'opacity-40'}`}>
                                <div className="w-5 h-5 rounded bg-text animate-pulse" />
                                <div className="w-6 h-1 rounded flex-shrink-0 bg-text animate-pulse" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
