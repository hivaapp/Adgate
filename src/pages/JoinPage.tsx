import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { currentUser as mockUser } from '../lib/mockData';
import { Check, Link as LinkIcon } from 'lucide-react';

export const JoinPage = () => {
    const { code } = useParams<{ code: string }>();
    const { login } = useAuth();
    const navigate = useNavigate();

    const referrer = mockUser.referral?.referralCode === code ? mockUser : null;

    if (!referrer) {
        return (
            <div className="min-h-screen bg-bg flex flex-col items-center justify-center px-4">
                <div className="w-16 h-16 bg-[#FFF0EF] text-[#E8312A] rounded-full flex items-center justify-center mb-6">
                    <LinkIcon size={32} />
                </div>
                <h1 className="text-[18px] font-[800] text-text text-center mb-2">This referral link is no longer valid</h1>
                <p className="text-[14px] text-textMid text-center mb-8 font-[600]">It may have expired or been removed.</p>
                <button onClick={() => navigate('/')} className="h-[48px] px-8 bg-[#E8312A] text-white rounded-[14px] font-[800] text-[15px] shadow-sm">
                    Explore AdGate
                </button>
            </div>
        );
    }

    const handleSignup = async (provider: string) => {
        // mock signup flow
        await login(provider);
        // store the referral code in mock context somehow, AuthContext handles mock logic for now
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen bg-white">
            <header className="h-[48px] border-b border-border flex items-center justify-center">
                <div className="flex items-center gap-1.5 opacity-90">
                    <div className="w-5 h-5 rounded-[6px] bg-text text-white flex items-center justify-center font-black text-[9px] leading-none">
                        AG
                    </div>
                    <span className="font-black text-[15px] tracking-tight text-text">AdGate</span>
                </div>
            </header>

            <div className="pt-[40px] px-[20px] flex flex-col items-center pb-[80px]">
                <div className="bg-[#FFFBEB] text-[#92400E] px-3 py-1 rounded-full text-[11px] font-[800] h-[28px] flex items-center justify-center mb-3">
                    You were invited by
                </div>

                <div className="bg-white border text-center border-border rounded-[14px] p-4 shadow-[0_1px_3px_rgba(0,0,0,0.06)] flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#E8312A] text-white flex items-center justify-center font-black text-[16px]">
                        {referrer.username.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col items-start pr-2">
                        <span className="text-[15px] font-[900] text-text leading-tight">{referrer.username}</span>
                        <span className="text-[13px] font-[600] text-textMid">@{referrer.username}</span>
                    </div>
                </div>

                <h1 className="mt-[20px] text-center text-text" style={{ fontSize: 'clamp(24px, 6vw, 36px)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.02em', maxWidth: '480px' }}>
                    Earn money sharing free content with your audience.
                </h1>

                <p className="mt-[12px] mb-[24px] text-center text-[#666] font-[600] text-[15px] max-w-[400px]">
                    Upload a file. Share a link. Your audience watches a short ad to unlock it. You keep 95%.
                </p>

                <div className="flex flex-col w-full max-w-[400px] gap-2 mb-6">
                    {['Free to join — no credit card needed', 'Keep 95% of all ad revenue you generate', 'Your audience always gets your content free'].map((benefit, i) => (
                        <div key={i} className="flex items-center gap-3 h-[44px]">
                            <div className="w-5 h-5 rounded-full bg-[#417A55]/10 text-[#417A55] flex items-center justify-center shrink-0">
                                <Check size={12} strokeWidth={4} />
                            </div>
                            <span className="text-[14px] font-[700] text-[#333]">{benefit}</span>
                        </div>
                    ))}
                </div>

                <div className="w-full max-w-[400px] bg-[#EDFAF3] border border-[#BBF7D0] rounded-[14px] p-4 flex gap-3 mb-6">
                    <span className="text-[24px] leading-none">🎁</span>
                    <p className="text-[13px] font-[700] text-[#166534] leading-[1.6]">
                        Bonus: @{referrer.username} earns 5% of your future earnings as a thank-you. This costs you nothing — it comes from AdGate's share, not yours.
                    </p>
                </div>

                <div className="w-full max-w-[400px] flex flex-col gap-3">
                    <button onClick={() => handleSignup('email')} className="w-full h-[56px] bg-[#E8312A] text-white rounded-[14px] font-[900] text-[16px] shadow-sm mb-1 hover:bg-[#C4663F] transition-colors">
                        Create Free Account
                    </button>

                    <button onClick={() => handleSignup('google')} className="w-full flex items-center justify-center h-[48px] bg-white border border-border rounded-[14px] font-bold text-text gap-2 transition-transform hover:-translate-y-[1px] hover:shadow-sm">
                        <span className="text-xl font-black">G</span> Continue with Google
                    </button>
                    <button onClick={() => handleSignup('twitter')} className="w-full flex items-center justify-center h-[48px] bg-white border border-border rounded-[14px] font-bold text-text gap-2 transition-transform hover:-translate-y-[1px] hover:shadow-sm">
                        <span className="text-xl font-black">𝕏</span> Continue with X / Twitter
                    </button>
                    <button onClick={() => handleSignup('discord')} className="w-full flex items-center justify-center h-[48px] bg-white border border-border rounded-[14px] font-bold text-text gap-2 transition-transform hover:-translate-y-[1px] hover:shadow-sm">
                        <span className="text-xl font-black">D</span> Continue with Discord
                    </button>
                    <button onClick={() => handleSignup('github')} className="w-full flex items-center justify-center h-[48px] bg-white border border-border rounded-[14px] font-bold text-text gap-2 transition-transform hover:-translate-y-[1px] hover:shadow-sm">
                        <span className="text-xl font-black">GH</span> Continue with GitHub
                    </button>

                    <div className="mt-4 text-center">
                        <span className="text-[13px] text-textMid">Already have an account? </span>
                        <button onClick={() => navigate('/')} className="text-[13px] font-bold text-brand hover:underline">Log in →</button>
                    </div>
                </div>
            </div>

            <div className="w-full h-[60px] bg-[#F6F6F6] flex items-center justify-center gap-2 mb-10 px-4 mt-auto border-t border-border">
                <div className="w-4 h-4 rounded-[4px] bg-text text-white flex items-center justify-center font-black text-[7px] leading-none shrink-0">
                    AG
                </div>
                <span className="text-[13px] font-[700] text-[#555]">Join 12,400 creators already earning on AdGate</span>
            </div>
        </div>
    );
};
