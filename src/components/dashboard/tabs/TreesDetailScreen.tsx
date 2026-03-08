import { useState, useEffect } from 'react';
import { ArrowLeft, Share2, Copy, ExternalLink } from 'lucide-react';
import { currentUser } from '../../../lib/mockData';
import { CountUp } from '../../ui/CountUp';
import { useToast } from '../../../context/ToastContext';

interface TreesDetailScreenProps {
    onClose: () => void;
}

export const TreesDetailScreen = ({ onClose }: TreesDetailScreenProps) => {
    const { showToast } = useToast();
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setAnimate(true), 10);
        return () => clearTimeout(timer);
    }, []);

    const trees = currentUser.myTrees!;
    const shareText = `I've helped plant ${trees.totalTreesPlanted} trees through AdGate! 🌳 Join me in making an impact while sharing free content.`;

    const handleCopy = () => {
        navigator.clipboard.writeText(shareText);
        showToast({ message: 'Impact statement copied!', type: 'success' });
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'My AdGate Impact',
                    text: shareText,
                });
            } catch (err) {
                console.log('Error sharing', err);
            }
        } else {
            handleCopy();
        }
    };

    const mockChartData = [
        { month: 'Nov', count: 1 },
        { month: 'Dec', count: 3 },
        { month: 'Jan', count: 5 },
        { month: 'Feb', count: 4 },
        { month: 'Mar', count: 6 },
        { month: 'Apr', count: 4 },
    ];
    const maxCount = Math.max(...mockChartData.map(d => d.count));

    return (
        <div className={`fixed inset-0 bg-bg z-50 flex flex-col transition-transform duration-300 ease-out sm:relative sm:transition-none sm:translate-x-0 ${animate ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="h-16 flex items-center px-4 border-b border-border bg-white sticky top-0 z-10">
                <button onClick={onClose} className="w-10 h-10 flex items-center justify-center -ml-2 text-text hover:bg-surfaceAlt rounded-full transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="flex-1 text-center text-[16px] font-[900] text-text pr-8">Your Trees</h1>
            </div>

            <div className="flex-1 overflow-y-auto pb-safe">
                <div className="p-4 sm:p-8 max-w-[800px] mx-auto flex flex-col gap-6">
                    {/* Top Card */}
                    <div
                        className="w-full rounded-[24px] p-8 flex flex-col items-center justify-center text-center relative overflow-hidden"
                        style={{ background: 'linear-gradient(135deg, #0F4C2A, #166534)' }}
                    >
                        {/* Leaf pattern overlay */}
                        <div
                            className="absolute inset-0 opacity-10"
                            style={{
                                backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'white\'%3E%3Cpath d=\'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z\'/%3E%3C/svg%3E")',
                                backgroundSize: '30px 30px'
                            }}
                        />
                        <div className="relative z-10 flex flex-col items-center">
                            <div className="text-[64px] font-[900] text-white leading-none tracking-tight mb-2">
                                <CountUp end={trees.totalTreesPlanted} />
                            </div>
                            <div className="text-[16px] font-[800] text-white opacity-90 mb-1">Trees Planted by Your Content</div>
                            <div className="text-[13px] font-[600] text-[#BBF7D0] mb-4">={trees.co2OffsetKg}kg CO₂ offset</div>
                            <div className="text-[12px] font-[600] text-white/70">Your first tree: {new Date(trees.firstTreeDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                        </div>
                    </div>

                    {/* Breakdown */}
                    <div className="bg-white rounded-[18px] p-5 border border-border">
                        <h2 className="text-[14px] font-[900] text-text mb-2">Your Impact Breakdown</h2>
                        <div className="flex flex-col">
                            <div className="flex items-center justify-between h-12 border-b border-border">
                                <div className="flex items-center gap-2">
                                    <span className="text-[18px]">🌳</span>
                                    <span className="text-[13px] font-[700] text-textMid">Total Trees</span>
                                </div>
                                <span className="text-[14px] font-[800] text-text">{trees.totalTreesPlanted}</span>
                            </div>
                            <div className="flex items-center justify-between h-12 border-b border-border">
                                <div className="flex items-center gap-2">
                                    <span className="text-[18px]">🌱</span>
                                    <span className="text-[13px] font-[700] text-textMid">From Donations</span>
                                </div>
                                <span className="text-[14px] font-[800] text-text">{trees.totalTreesPlanted - trees.treesFromReferrals}</span>
                            </div>
                            <div className="flex items-center justify-between h-12 border-b border-border">
                                <div className="flex items-center gap-2">
                                    <span className="text-[18px]">🫂</span>
                                    <span className="text-[13px] font-[700] text-textMid">From Referrals</span>
                                </div>
                                <span className="text-[14px] font-[800] text-text">{trees.treesFromReferrals}</span>
                            </div>
                            <div className="flex items-center justify-between h-12">
                                <div className="flex items-center gap-2">
                                    <span className="text-[18px]">☁️</span>
                                    <span className="text-[13px] font-[700] text-textMid">CO₂ Offset</span>
                                </div>
                                <span className="text-[14px] font-[800] text-text">{trees.co2OffsetKg}kg</span>
                            </div>
                        </div>
                    </div>

                    {/* Chart */}
                    <div className="bg-white rounded-[18px] p-5 border border-border">
                        <h2 className="text-[14px] font-[900] text-text mb-6">Trees Per Month</h2>
                        <div className="flex items-end justify-between h-32 gap-2 mt-4 relative">
                            {mockChartData.map((data, i) => {
                                const heightPercent = Math.max((data.count / maxCount) * 100, 4);
                                return (
                                    <div key={i} className="flex-1 flex flex-col justify-end items-center group relative h-full">
                                        <div
                                            className="w-full max-w-[32px] bg-[#BBF7D0] rounded-t-[6px] transition-all duration-500 ease-out group-hover:bg-[#4ADE80]"
                                            style={{ height: animate ? `${heightPercent}%` : '4%' }}
                                        />

                                        {/* Tooltip */}
                                        <div className="absolute -top-8 bg-[#111] text-white text-[10px] font-bold px-2 py-1 rounded-[6px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                                            {data.count} trees
                                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#111] rotate-45" />
                                        </div>

                                        <span className="text-[10px] font-bold text-textMid mt-2">{data.month}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Share Section */}
                    <div className="bg-white rounded-[18px] p-5 border border-border">
                        <h2 className="text-[14px] font-[900] text-text mb-3">Share Your Impact</h2>
                        <div className="bg-[#EDFAF3] border border-[#BBF7D0] p-4 rounded-[18px] mb-4 relative">
                            <div className="text-[24px] absolute top-2 left-2 opacity-20">"</div>
                            <p className="text-[14px] font-[700] text-[#166534] text-center relative z-10 px-2 leading-relaxed">
                                {shareText}
                            </p>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={handleShare}
                                className="flex-1 h-12 bg-brand text-white rounded-[14px] font-bold text-[14px] flex items-center justify-center gap-2 hover:bg-brandHover transition-colors"
                            >
                                <Share2 className="w-4 h-4" /> Share
                            </button>
                            <button
                                onClick={handleCopy}
                                className="flex-1 h-12 bg-surfaceAlt text-text border border-border rounded-[14px] font-bold text-[14px] flex items-center justify-center gap-2 hover:bg-border transition-colors"
                            >
                                <Copy className="w-4 h-4" /> Copy
                            </button>
                        </div>
                    </div>

                    {/* Footer link */}
                    <div className="text-center pb-4">
                        <a
                            href="https://onetreeplanted.org"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[12px] font-[600] text-textMid hover:text-text transition-colors"
                        >
                            See your trees being tracked at oneTreePlanted.org
                            <ExternalLink className="w-3 h-3" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
