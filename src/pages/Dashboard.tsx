import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LinkIcon, Share2, Copy, Plus, Home, DollarSign } from 'lucide-react';

export const Dashboard = () => {
    const { isLoggedIn, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/', { replace: true });
        }
    }, [isLoggedIn, navigate]);

    if (!isLoggedIn) return null;

    const stats = [
        { icon: '🔗', label: 'Total Links', value: '1', delay: '0ms' },
        { icon: '👀', label: 'Total Views', value: '0', delay: '100ms' },
        { icon: '🔓', label: 'Total Unlocks', value: '0', delay: '200ms' },
        { icon: '💸', label: 'Total Earned', value: '$0.00', delay: '300ms' },
    ];

    return (
        <div className="flex flex-col items-center w-full min-h-screen bg-bg pb-24">
            <div className="w-full max-w-[800px] px-4 pt-8 flex flex-col gap-8">

                {/* Welcome Banner */}
                <div className="w-full rounded-card overflow-hidden relative p-8 shadow-sm">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand to-[#ff6b65]" />
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl mix-blend-overlay" />

                    <div className="relative z-10 text-white flex flex-col gap-2">
                        <h1 className="text-3xl font-black tracking-tight drop-shadow-sm">
                            Welcome back, {user?.name.split(' ')[0]}!
                        </h1>
                        <p className="text-white/80 font-bold text-lg drop-shadow-sm max-w-[400px]">
                            Your link is live and ready. Share it below to start monetizing your audience.
                        </p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {stats.map((stat, idx) => (
                        <div
                            key={idx}
                            className="card flex flex-col items-start p-5 gap-3 animate-slide-up hover:-translate-y-1 transition-transform"
                            style={{ animationDelay: stat.delay, animationFillMode: 'both' }}
                        >
                            <span className="text-3xl">{stat.icon}</span>
                            <div className="flex flex-col gap-0.5">
                                <span className="text-[28px] font-black text-text leading-none">{stat.value}</span>
                                <span className="text-[11px] font-bold text-textMid uppercase tracking-wider">{stat.label}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Your Links Section */}
                <div className="w-full flex flex-col gap-4">
                    <h2 className="text-xl font-black text-text tracking-tight">Your Links</h2>

                    <div className="card flex flex-col gap-5 relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-1.5 h-full bg-brand" />

                        <div className="flex items-start justify-between pl-2">
                            <div className="flex flex-col gap-1">
                                <h3 className="font-black text-lg text-text leading-tight truncate">freeresource.pdf</h3>
                                <div className="flex gap-2 items-center">
                                    <span className="bg-surfaceAlt border border-border text-textLight text-[10px] font-bold px-2 inline-flex rounded-badge uppercase">PDF</span>
                                    <span className="bg-surfaceAlt border border-border text-textLight text-[10px] font-bold px-2 inline-flex rounded-badge uppercase">1 Ad</span>
                                </div>
                            </div>
                        </div>

                        <div className="w-full bg-surfaceAlt border border-border rounded-xl p-3 pl-4 flex items-center justify-between gap-3 overflow-hidden ml-2">
                            <span className="font-mono font-bold text-sm text-textMid truncate">adga.te/r/freeresource</span>

                            <div className="flex gap-2">
                                <button className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center text-text hover:text-brand hover:border-brand-tint transition-colors">
                                    <Copy className="w-4 h-4" />
                                </button>
                                <button className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center text-text hover:text-brand hover:border-brand-tint transition-colors">
                                    <Share2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 pl-2 border-t border-border pt-4">
                            <div className="flex flex-col">
                                <span className="font-black text-base text-text">0</span>
                                <span className="text-[10px] font-bold text-textLight uppercase tracking-wider">Views</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-black text-base text-text">0</span>
                                <span className="text-[10px] font-bold text-textLight uppercase tracking-wider">Unlocks</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-black text-base text-eco">$0.00</span>
                                <span className="text-[10px] font-bold text-textLight uppercase tracking-wider">Earned</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Eco Card */}
                <div className="w-full rounded-card border-none bg-eco-tint p-6 flex items-center gap-4 text-eco">
                    <span className="text-3xl">🌱</span>
                    <div className="flex flex-col gap-1">
                        <h4 className="font-black tracking-tight text-lg">Tree donation active</h4>
                        <p className="font-bold text-sm opacity-90 leading-snug">
                            Every 20 unlocks plants a tree. Share your link to start making a real-world impact.
                        </p>
                    </div>
                </div>

                {/* Empty History */}
                <div className="w-full mt-4 flex flex-col gap-4">
                    <h2 className="text-xl font-black text-text tracking-tight">Earnings History</h2>

                    <div className="card w-full py-16 flex flex-col items-center justify-center text-center gap-4">
                        <span className="text-5xl opacity-40 grayscale filter">📭</span>
                        <h3 className="text-xl font-black text-text tracking-tight mt-2">No earnings yet</h3>
                        <p className="text-textMid font-bold text-sm max-w-[280px]">
                            You just created your first link. Share it with your audience to start seeing revenue here.
                        </p>

                        <button
                            onClick={() => navigate('/')}
                            className="btn-secondary text-brand border-brand/20 bg-brand-tint hover:bg-brand/10 hover:border-brand/40 mt-2 px-6"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Create another link
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Bottom Nav */}
            <div className="fixed bottom-0 left-0 w-full bg-surface/90 backdrop-blur-md border-t border-border h-[64px] sm:hidden flex items-center justify-around pb-safe z-40 px-4">
                <button className="flex flex-col items-center gap-1 text-textMid hover:text-brand transition-colors w-16">
                    <Home className="w-5 h-5" />
                    <span className="text-[10px] font-bold tracking-wider uppercase">Home</span>
                </button>
                <button className="flex flex-col items-center gap-1 text-brand w-16">
                    <LinkIcon className="w-5 h-5" />
                    <span className="text-[10px] font-bold tracking-wider uppercase">Links</span>
                </button>
                <button className="flex flex-col items-center gap-1 text-textMid hover:text-brand transition-colors w-16">
                    <DollarSign className="w-5 h-5" />
                    <span className="text-[10px] font-bold tracking-wider uppercase">Earnings</span>
                </button>
            </div>
        </div>
    );
};
