import { useState } from 'react';
import { currentUser, referredCreators, referralActivity } from '../../../lib/mockData';
import { Copy, Share2, Check, ExternalLink } from 'lucide-react';

export const ReferralsTab = () => {
    const [filter, setFilter] = useState<'active' | 'all'>('active');
    const [expandedRef, setExpandedRef] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const [feedCount, setFeedCount] = useState(5);
    const [toast, setToast] = useState('');

    const referral = currentUser.referral!;

    const filteredCreators = referredCreators.filter(c => filter === 'all' || c.isActive);
    const visibleActivity = referralActivity.slice(0, feedCount);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setToast('Referral link copied!');
        setTimeout(() => {
            setCopied(false);
            setToast('');
        }, 2000);
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Join AdGate',
                    text: `Hey! I use AdGate to earn money sharing free content. Join with my link and we both benefit: ${referral.referralLink}`,
                    url: referral.referralLink
                });
            } catch (err) {
                console.log('Error sharing', err);
            }
        } else {
            handleCopy(referral.referralLink);
        }
    };

    return (
        <div className="flex flex-col gap-6 w-full animate-fade-in pb-8">
            {toast && (
                <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-[#111] text-white px-4 py-2 rounded-full font-bold text-sm shadow-xl z-50 animate-slide-down">
                    {toast}
                </div>
            )}

            {/* Header section with negative margins on mobile to be edge-to-edge if needed, but the layout adds padding. We will stick to full width within container. */}
            <div className="w-full">
                <div
                    className="w-full rounded-[18px] md:rounded-[24px] p-5 relative overflow-hidden"
                    style={{ background: 'linear-gradient(135deg, #F59E0B, #EF6C00)' }}
                >
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-white text-[12px] font-bold opacity-70">Referral Earnings</span>
                        <div className="bg-black/20 px-3 py-1 rounded-full text-white text-[12px] font-[800]">
                            {referral.referralTier === 'Bronze' ? '🥉 Bronze' : referral.referralTier === 'Silver' ? '🥈 Silver' : '🥇 Gold'}
                        </div>
                    </div>
                    <div className="text-white text-[28px] font-[900] tracking-tight">
                        ${referral.totalReferralEarnings.toFixed(2)}
                    </div>
                </div>

                {/* 3 Metrics Row */}
                <div className="flex gap-2 mt-2">
                    <div className="flex-1 bg-white rounded-[14px] p-3 border shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
                        <div className="text-[16px] mb-1">💰</div>
                        <div className="text-[18px] font-[900] text-text">${referral.thisMonthReferralEarnings.toFixed(2)}</div>
                        <div className="text-[11px] font-[700] text-textMid uppercase tracking-wide">This Month</div>
                    </div>
                    <div className="flex-1 bg-white rounded-[14px] p-3 border shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
                        <div className="text-[16px] mb-1">🔥</div>
                        <div className="text-[18px] font-[900] text-text">{referral.activeReferrals}</div>
                        <div className="text-[11px] font-[700] text-textMid uppercase tracking-wide">Active Refs</div>
                    </div>
                    <div className="flex-1 bg-white rounded-[14px] p-3 border shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
                        <div className="text-[16px] mb-1">⏳</div>
                        <div className="text-[18px] font-[900] text-text">${referral.pendingReferralEarnings.toFixed(2)}</div>
                        <div className="text-[11px] font-[700] text-textMid uppercase tracking-wide">Pending</div>
                    </div>
                </div>
            </div>

            {/* Referral Link Section */}
            <div className="bg-white rounded-[18px] p-5 border border-border">
                <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-[14px] font-[900] text-text">Your Referral Link</h2>
                    <Share2 className="w-4 h-4 text-textMid" />
                </div>
                <p className="text-[13px] font-[600] text-textMid leading-[1.6] mb-4">
                    Share this link with other creators. You earn 5% of their ad revenue forever — at no cost to them.
                </p>

                <div className="flex items-center bg-[#F8F8F8] border border-[#E8E8E8] rounded-[18px] h-12 px-3 mb-3">
                    <div className="flex-1 truncate text-[13px] font-[700] text-text">
                        {referral.referralLink}
                    </div>
                    <button
                        onClick={() => handleCopy(referral.referralLink)}
                        className="w-9 h-9 flex items-center justify-center bg-brand text-white rounded-[14px] ml-2 hover:bg-brandHover transition-colors"
                    >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                </div>

                <div className="flex gap-2.5 mb-4">
                    <button
                        onClick={handleShare}
                        className="flex-1 h-12 bg-brand text-white rounded-[14px] font-bold text-[14px] flex items-center justify-center gap-2 hover:bg-brandHover transition-colors"
                    >
                        <Share2 className="w-4 h-4" /> Share Link
                    </button>
                    <button
                        onClick={() => handleCopy(referral.referralCode)}
                        className="flex-1 h-12 bg-white text-brand border border-brand rounded-[14px] font-bold text-[14px] flex items-center justify-center hover:bg-brandTint transition-colors"
                    >
                        Copy Code
                    </button>
                </div>

                <div className="text-center">
                    <span className="text-[12px] font-[700] text-textMid">Your code:</span>
                    <button
                        onClick={() => handleCopy(referral.referralCode)}
                        className="ml-2 text-[18px] font-[900] text-brand tracking-[0.08em] hover:opacity-80 transition-opacity"
                    >
                        {referral.referralCode}
                    </button>
                </div>
            </div>

            {/* Tier Progress Section */}
            <div className="bg-white rounded-[18px] p-5 border border-border">
                <h2 className="text-[14px] font-[900] text-text mb-4">Your Referral Tier</h2>

                <div className="flex flex-col gap-3">
                    {/* Bronze */}
                    <div className="flex items-center h-[52px]">
                        <div className="w-10 h-10 rounded-full bg-[#FFF5F0] flex items-center justify-center text-[20px] mr-3">🥉</div>
                        <div className="flex-1">
                            <div className="text-[13px] font-[800] text-text">Bronze</div>
                            <div className="text-[11px] text-success font-[700]">5% lifetime commission</div>
                            <div className="text-[11px] text-textMid">1–5 active referrals</div>
                        </div>
                        <div className="bg-successBg text-success px-2 py-1 rounded-[6px] text-[11px] font-bold">Achieved</div>
                    </div>

                    {/* Silver */}
                    <div className="flex items-center h-[52px]">
                        <div className="w-10 h-10 rounded-full bg-[#F3F4F6] flex items-center justify-center text-[20px] mr-3">🥈</div>
                        <div className="flex-1">
                            <div className="text-[13px] font-[800] text-text">Silver</div>
                            <div className="text-[11px] text-textMid font-[600]">5% commission + monthly bonus</div>
                            <div className="flex items-center gap-2 mt-1">
                                <div className="h-1.5 flex-1 bg-border rounded-full overflow-hidden">
                                    <div className="h-full bg-brand" style={{ width: '25%' }}></div>
                                </div>
                                <span className="text-[11px] font-bold text-textMid">5/20</span>
                            </div>
                        </div>
                    </div>

                    {/* Gold */}
                    <div className="flex items-center h-[52px]">
                        <div className="w-10 h-10 rounded-full bg-[#FEF3C7] flex items-center justify-center text-[20px] mr-3">🥇</div>
                        <div className="flex-1">
                            <div className="text-[13px] font-[800] text-text">Gold</div>
                            <div className="text-[11px] text-textMid font-[600]">5% commission + priority support</div>
                            <div className="text-[11px] text-textMid">21+ active referrals</div>
                        </div>
                        <div className="bg-border text-textMid px-2 py-1 rounded-[6px] text-[11px] font-bold flex items-center gap-1">
                            Lock
                        </div>
                    </div>
                </div>

                <div className="text-center text-[12px] text-textMid font-[600] mt-4">
                    You need 15 more active referrals to reach Silver
                </div>
            </div>

            {/* Your Referral Network Section */}
            <div>
                <div className="flex items-center justify-between mb-3 px-1">
                    <div className="flex items-center gap-2">
                        <h2 className="text-[14px] font-[900] text-text">Referred Creators</h2>
                        <span className="bg-border text-text px-2 py-0.5 rounded-full text-[11px] font-bold">{referredCreators.length}</span>
                    </div>
                    <div className="flex bg-[#F3F1EC] p-0.5 rounded-[14px] border border-[#E6E2D9]">
                        <button
                            onClick={() => setFilter('active')}
                            className={`px-3 py-1 rounded-[14px] text-[11px] font-[800] transition-colors ${filter === 'active' ? 'bg-white shadow-sm text-text' : 'text-textMid hover:text-text'}`}
                        >
                            Active
                        </button>
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-3 py-1 rounded-[14px] text-[11px] font-[800] transition-colors ${filter === 'all' ? 'bg-white shadow-sm text-text' : 'text-textMid hover:text-text'}`}
                        >
                            All
                        </button>
                    </div>
                </div>

                <div className="flex flex-col gap-[10px]">
                    {filteredCreators.map(creator => {
                        const isExpanded = expandedRef === creator.id;
                        const colors = ['bg-[#EAF0FF] text-[#3B82F6]', 'bg-[#F3E8FF] text-[#A855F7]', 'bg-[#E0F2FE] text-[#0EA5E9]', 'bg-[#DCFCE7] text-[#22C55E]'];
                        const colorClass = colors[creator.username.length % colors.length];

                        return (
                            <div
                                key={creator.id}
                                className="bg-white rounded-[14px] p-3.5 border border-border cursor-pointer hover:border-[#D0CCC4] transition-all overflow-hidden"
                                onClick={() => setExpandedRef(isExpanded ? null : creator.id)}
                            >
                                <div className="flex items-center">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-[900] text-[16px] mr-3 ${colorClass}`}>
                                        {creator.avatarInitial}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-[14px] font-[800] text-text truncate">{creator.name}</span>
                                        </div>
                                        <div className="text-[12px] text-textMid font-[600]">@{creator.username}</div>
                                        <div className="flex gap-1.5 mt-1">
                                            <span className="bg-[#F8F8F8] px-1.5 py-0.5 rounded-[4px] text-[11px] font-[700] text-textMid border border-[#E8E8E8]">
                                                {creator.resourceCount} link{creator.resourceCount !== 1 ? 's' : ''}
                                            </span>
                                            <span className="bg-[#F8F8F8] px-1.5 py-0.5 rounded-[4px] text-[11px] font-[700] text-textMid border border-[#E8E8E8]">
                                                {creator.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[15px] font-[900] text-success">+${creator.yourCut.toFixed(2)}</div>
                                        <div className="text-[11px] text-textMid font-[600]">lifetime earned</div>
                                    </div>
                                </div>

                                <div className={`grid transition-all duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
                                    <div className="overflow-hidden">
                                        <div className="bg-[#FAFAFA] rounded-[18px] p-3 border border-[#E8E8E8]">
                                            <div className="flex justify-between items-center mb-3">
                                                <div>
                                                    <div className="text-[11px] font-[700] text-textMid">Their Month</div>
                                                    <div className="text-[14px] font-[800] text-text">${creator.thisMonthEarned.toFixed(2)}</div>
                                                </div>
                                                <div>
                                                    <div className="text-[11px] font-[700] text-textMid">Your Cut</div>
                                                    <div className="text-[14px] font-[800] text-success">${creator.yourCutThisMonth.toFixed(2)}</div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-[11px] font-[700] text-textMid">Last Active</div>
                                                    <div className="text-[13px] font-[700] text-text">{creator.lastActive}</div>
                                                </div>
                                            </div>
                                            <div className="h-[1px] w-full bg-[#E8E8E8] mb-3"></div>
                                            <div className="flex justify-center">
                                                <button className="text-brand text-[12px] font-bold flex items-center gap-1 hover:underline">
                                                    View Profile <ExternalLink className="w-3 h-3" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Referral Activity Feed */}
            <div>
                <div className="flex items-center justify-between mb-3 px-1">
                    <h2 className="text-[14px] font-[900] text-text">Recent Activity</h2>
                    <button className="text-brand text-[12px] font-[800]">See All</button>
                </div>

                <div className="bg-white rounded-[18px] border border-border overflow-hidden">
                    {visibleActivity.map((act, index) => (
                        <div key={act.id} className={`flex items-center p-3.5 h-[56px] cursor-pointer active:bg-[#F8F8F8] transition-colors duration-[80ms] ${index !== visibleActivity.length - 1 ? 'border-b border-border' : ''}`}>
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center mr-3 ${act.type === 'joined' ? 'bg-successBg text-success' : 'bg-[#FFFBEB] text-[#D97757]'}`}>
                                {act.type === 'joined' ? '👋' : '💰'}
                            </div>
                            <div className="flex-1">
                                <div className="text-[13px] font-[700] text-text">
                                    {act.type === 'joined'
                                        ? `@${act.referredUsername} joined via your link`
                                        : `@${act.referredUsername} earned $${act.amount.toFixed(2)}`}
                                </div>
                                <div className="text-[11px] font-[600] text-textMid">{act.timestamp}</div>
                            </div>
                            {act.type === 'earned' && (
                                <div className="text-right pl-2">
                                    <div className="text-[11px] font-[600] text-textMid">you earned</div>
                                    <div className="text-[13px] font-[800] text-success">+${act.yourCut.toFixed(2)}</div>
                                </div>
                            )}
                        </div>
                    ))}
                    {feedCount < referralActivity.length && (
                        <button
                            onClick={() => setFeedCount(referralActivity.length)}
                            className="w-full h-10 flex items-center justify-center text-[12px] font-bold text-text bg-[#FAFAFA] border-t border-border hover:bg-[#F3F1EC] transition-colors"
                        >
                            Load More
                        </button>
                    )}
                </div>
            </div>

            {/* How Referrals Work Card */}
            <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-[18px] p-5">
                <h2 className="text-[14px] font-[900] text-[#92400E] mb-3">How it works</h2>
                <div className="flex flex-col gap-0">
                    <div className="flex items-center h-10">
                        <div className="w-5 h-5 rounded-full bg-[#FCD34D] text-[#92400E] flex items-center justify-center text-[11px] font-[900] mr-3">1</div>
                        <div className="text-[13px] font-[700] text-[#78350F]">Share your referral link with other creators</div>
                    </div>
                    <div className="flex items-center h-10">
                        <div className="w-5 h-5 rounded-full bg-[#FCD34D] text-[#92400E] flex items-center justify-center text-[11px] font-[900] mr-3">2</div>
                        <div className="text-[13px] font-[700] text-[#78350F]">They sign up and create their first monetized link</div>
                    </div>
                    <div className="flex items-center h-10">
                        <div className="w-5 h-5 rounded-full bg-[#FCD34D] text-[#92400E] flex items-center justify-center text-[11px] font-[900] mr-3">3</div>
                        <div className="text-[13px] font-[700] text-[#78350F]">Every time they earn, you earn 5% automatically</div>
                    </div>
                    <div className="flex items-center h-10">
                        <div className="w-5 h-5 rounded-full bg-[#FCD34D] text-[#92400E] flex items-center justify-center text-[11px] font-[900] mr-3">4</div>
                        <div className="text-[13px] font-[700] text-[#78350F]">No limit — earn forever on every referral</div>
                    </div>
                </div>
                <div className="mt-4 text-[12px] italic text-[#B45309] text-center font-[600]">
                    Zero cost to them. Pure bonus for you.
                </div>
            </div>
            <div className="h-6"></div>
        </div>
    );
};
