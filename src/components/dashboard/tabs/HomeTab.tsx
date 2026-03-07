import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { CountUp } from '../../ui/CountUp';
import { Copy, Plus, ArrowRight, ChevronRight } from 'lucide-react';
import { useToast } from '../../../context/ToastContext';
import { TreesDetailScreen } from './TreesDetailScreen';

export const HomeTab = ({ onTabChange }: { onTabChange: (tab: any) => void }) => {
    const { currentUser: user } = useAuth();
    const { showToast } = useToast();
    const [showTreesDetail, setShowTreesDetail] = useState(false);

    // Mock Data
    const totalEarned = 142.50;
    const hasDonationLink = true; // mocking that creator has at least one donateEnabled link
    const myTrees = user?.myTrees;
    const latestLink = { url: 'adga.te/r/design-system', exists: true };
    const activities = [
        { id: 1, type: 'unlock', title: 'design-system locked unlocked', time: '2 mins ago', amount: 0.15, icon: '🔓', bg: 'bg-brand/10' },
        { id: 2, type: 'withdraw', title: 'Withdrawal completed', time: 'Yesterday', amount: null, icon: '🏦', bg: 'bg-success/10' },
        { id: 3, type: 'create', title: 'Created new link', time: '2 days ago', amount: null, icon: '🔗', bg: 'bg-surfaceAlt' },
        { id: 4, type: 'unlock', title: 'figma-kit locked unlocked', time: '2 days ago', amount: 0.20, icon: '🔓', bg: 'bg-brand/10' },
        { id: 5, type: 'unlock', title: 'resume-template unlocked', time: '3 days ago', amount: 0.10, icon: '🔓', bg: 'bg-brand/10' },
    ];

    const copyLink = () => {
        navigator.clipboard.writeText(latestLink.url);
        showToast({ message: 'Link copied to clipboard', type: 'success' });
    };

    if (showTreesDetail) {
        return <TreesDetailScreen onClose={() => setShowTreesDetail(false)} />;
    }

    return (
        <div className="flex flex-col gap-6 px-4 pt-4 sm:pt-8 w-full">
            {/* Greeting Strip */}
            <div className="w-full h-[88px] rounded-[18px] bg-gradient-to-r from-[#D97757] to-[#C4663F] p-5 flex items-center justify-between shadow-sm relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                <div className="flex flex-col relative z-10">
                    <span className="text-[13px] font-bold text-white/80">Good morning, {user?.name?.split(' ')[0] || 'Creator'}</span>
                    <span className="text-[28px] font-black text-white leading-tight">
                        $<CountUp end={totalEarned} decimals={2} />
                    </span>
                </div>
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center relative z-10 shadow-sm">
                    <span className="text-brand font-black text-lg">{user?.name?.[0]?.toUpperCase() || 'C'}</span>
                </div>
            </div>

            {/* Stats Row (2x2 on mobile, 3x2 desktop) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-[10px] w-full">
                <div className="card h-auto p-4 flex gap-1 flex-col shadow-none">
                    <span className="text-[20px] leading-none mb-1">🔗</span>
                    <span className="text-[24px] font-black leading-none text-text">
                        <CountUp end={12} />
                    </span>
                    <span className="text-[11px] font-bold text-textMid">Total Links</span>
                </div>
                <div className="card h-auto p-4 flex gap-1 flex-col shadow-none">
                    <span className="text-[20px] leading-none mb-1">👀</span>
                    <span className="text-[24px] font-black leading-none text-text">
                        <CountUp end={1284} />
                    </span>
                    <span className="text-[11px] font-bold text-textMid">Total Views</span>
                </div>
                <div className="card h-auto p-4 flex gap-1 flex-col shadow-none">
                    <span className="text-[20px] leading-none mb-1">🔓</span>
                    <span className="text-[24px] font-black leading-none text-text">
                        <CountUp end={842} />
                    </span>
                    <span className="text-[11px] font-bold text-textMid">Total Unlocks</span>
                </div>
                <div className="card h-auto p-4 flex gap-1 flex-col shadow-none">
                    <span className="text-[20px] leading-none mb-1">💸</span>
                    <span className="text-[24px] font-black leading-none text-text">
                        $<CountUp end={totalEarned} decimals={2} />
                    </span>
                    <span className="text-[11px] font-bold text-textMid">Total Earned</span>
                </div>
                <div className="card h-auto p-4 flex gap-1 flex-col shadow-none">
                    <span className="text-[20px] leading-none mb-1">▶️</span>
                    <span className="text-[24px] font-black leading-none text-text">
                        <CountUp end={541} />
                    </span>
                    <span className="text-[11px] font-bold text-textMid">Video Unlocks</span>
                </div>
                <div className="card h-auto p-4 flex gap-1 flex-col shadow-none">
                    <span className="text-[20px] leading-none mb-1">🖱️</span>
                    <span className="text-[24px] font-black leading-none text-text">
                        <CountUp end={301} />
                    </span>
                    <span className="text-[11px] font-bold text-textMid">Click Unlocks</span>
                </div>
                <div className="card h-auto p-4 flex gap-1 flex-col shadow-none sm:col-span-3 lg:col-span-1">
                    <span className="text-[20px] leading-none mb-1">✨</span>
                    <span className="text-[24px] font-black leading-none text-text">
                        <CountUp end={89} />
                    </span>
                    <span className="text-[11px] font-bold text-textMid">Sponsor Unlocks</span>
                </div>
            </div>

            {/* Quick Share Strip */}
            <div className="card p-4 shadow-none flex flex-col gap-3">
                {latestLink.exists ? (
                    <>
                        <div className="flex items-center justify-between">
                            <span className="text-[13px] font-extrabold text-text">Latest Link</span>
                            <button
                                onClick={copyLink}
                                className="flex items-center gap-1 text-[13px] font-bold text-brand hover:text-brand-hover"
                            >
                                <Copy className="w-3.5 h-3.5" /> Copy
                            </button>
                        </div>
                        <div className="w-full h-10 bg-surfaceAlt border border-border rounded-md px-3 flex items-center hover:border-[#D97757] transition-colors cursor-pointer group" onClick={copyLink}>
                            <span className="font-mono text-[13px] text-textMid truncate group-hover:text-text transition-colors">{latestLink.url}</span>
                        </div>
                    </>
                ) : (
                    <button onClick={() => onTabChange('links')} className="btn-secondary w-full text-brand border-brand/30 bg-brand-tint hover:bg-brand/10">
                        <Plus size={16} className="mr-2" />
                        Create Your First Link
                    </button>
                )}
            </div>

            {/* Trees Card */}
            {(hasDonationLink || (myTrees && myTrees.totalTreesPlanted > 0)) && (
                <div
                    onClick={() => setShowTreesDetail(true)}
                    className="bg-white rounded-[18px] p-4 w-full flex items-center gap-4 cursor-pointer hover:shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition-shadow border border-border"
                >
                    <div className="w-12 h-12 bg-[#EDFAF3] rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-[24px]">🌳</span>
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                        <div className="flex items-center justify-between">
                            <span className="text-[18px] font-[900] text-[#111] leading-tight">
                                {myTrees?.totalTreesPlanted || 0} Trees Planted
                            </span>
                            <ChevronRight className="w-5 h-5 text-textMid" />
                        </div>
                        <span className="text-[12px] font-[700] text-success leading-tight mt-0.5">
                            = {myTrees?.co2OffsetKg || 0}kg CO₂ offset
                        </span>
                        <span className="text-[11px] font-[600] text-[#888] mt-1">
                            Including {myTrees?.treesFromReferrals || 0} from your referred creators
                        </span>
                    </div>
                </div>
            )}

            {/* Recent Activity Feed */}
            <div className="flex flex-col w-full">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-[14px] font-extrabold text-text">Recent Activity</h3>
                    <button className="text-[13px] font-bold text-brand flex items-center gap-1">
                        See All <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                </div>
                <div className="card p-0 overflow-hidden shadow-none flex flex-col">
                    {activities.length > 0 ? activities.map((item, idx) => (
                        <div
                            key={item.id}
                            className="flex items-center justify-between h-[60px] px-4 border-b border-border last:border-0 animate-slide-right opacity-0"
                            style={{ animation: `slide-right 300ms cubic-bezier(0.16, 1, 0.3, 1) ${idx * 80}ms forwards` }}
                        >
                            <div className="flex items-center gap-3 overflow-hidden">
                                <div className={`w-9 h-9 flex-shrink-0 rounded-full flex items-center justify-center ${item.bg}`}>
                                    <span className="text-[16px]">{item.icon}</span>
                                </div>
                                <div className="flex flex-col overflow-hidden">
                                    <span className="text-[13px] font-bold text-text truncate">{item.title}</span>
                                    <span className="text-[11px] font-semibold text-textLight">{item.time}</span>
                                </div>
                            </div>
                            {item.amount && (
                                <span className="text-[13px] font-extrabold text-success flex-shrink-0 ml-2">
                                    +${item.amount.toFixed(2)}
                                </span>
                            )}
                        </div>
                    )) : (
                        <div className="w-full h-[120px] flex justify-center items-center flex-col gap-2">
                            <span className="text-2xl opacity-60">📭</span>
                            <span className="text-[14px] font-bold text-textMid">No activity yet</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Tips Cards */}
            <div className="flex flex-col w-full">
                <h3 className="text-[14px] font-extrabold text-text mb-3">Creator Tips</h3>

                <div className="flex sm:grid sm:grid-cols-2 gap-4 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0 hide-scrollbar snap-x snap-mandatory">
                    <div className="w-[220px] h-[100px] flex-shrink-0 card p-4 shadow-none border-l-4 border-l-brand flex flex-col justify-center snap-center">
                        <span className="text-[12px] font-bold text-brand mb-1">PRO TIP</span>
                        <h4 className="text-[14px] font-extrabold text-text leading-tight mb-0.5">Share in communities</h4>
                        <p className="text-[12px] font-semibold text-textMid leading-snug">Reddit and Discord drive the highest value traffic.</p>
                    </div>

                    <div className="w-[220px] h-[100px] flex-shrink-0 card p-4 shadow-none border-l-4 border-l-brand flex flex-col justify-center snap-center">
                        <span className="text-[12px] font-bold text-brand mb-1">PRO TIP</span>
                        <h4 className="text-[14px] font-extrabold text-text leading-tight mb-0.5">Test multiple lengths</h4>
                        <p className="text-[12px] font-semibold text-textMid leading-snug">Start at 1 ad, scale to 3 if engagement remains high.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
