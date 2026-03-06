import { useState } from 'react';
import { CountUp } from '../../ui/CountUp';
import { Building2, Calendar, PiggyBank } from 'lucide-react';
import { BottomSheet } from '../ui/BottomSheet';
import { useProgress } from '../../../context/ProgressContext';
import { useToast } from '../../../context/ToastContext';

export const EarningsTab = () => {
    const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);

    // Mock Data
    const balance = {
        total: 1245.50,
        thisMonth: 340.20,
        available: 125.00
    };

    // Mock 14 days earnings data
    const chartData = [
        { date: 'Oct 1', amount: 12.50 }, { date: 'Oct 2', amount: 15.00 },
        { date: 'Oct 3', amount: 8.20 }, { date: 'Oct 4', amount: 22.40 },
        { date: 'Oct 5', amount: 18.00 }, { date: 'Oct 6', amount: 30.50 },
        { date: 'Oct 7', amount: 25.00 }, { date: 'Oct 8', amount: 14.10 },
        { date: 'Oct 9', amount: 19.80 }, { date: 'Oct 10', amount: 42.00 },
        { date: 'Oct 11', amount: 38.50 }, { date: 'Oct 12', amount: 20.00 },
        { date: 'Oct 13', amount: 16.50 }, { date: 'Oct 14', amount: 28.20 }
    ];
    const maxDay = Math.max(...chartData.map(d => d.amount));

    const linksEarnings = [
        { id: '1', title: 'freeresource.pdf', earned: 840.20 },
        { id: '2', title: 'figma-ui-kit.fig', earned: 210.50 },
        { id: '3', title: 'old-campaign.zip', earned: 194.80 }
    ];
    const maxLinkEarnings = Math.max(...linksEarnings.map(l => l.earned));

    const [payouts] = useState([
        { id: 1, date: 'Sep 1 - Sep 30', amount: 320.00, status: 'completed' },
        { id: 2, date: 'Aug 1 - Aug 31', amount: 480.50, status: 'completed' }
    ]);

    return (
        <div className="flex flex-col gap-6 px-4 pt-4 sm:pt-8 w-full">
            {/* Balance Strip */}
            <div className="w-full rounded-[18px] bg-gradient-to-br from-success to-[#2f5e40] p-5 shadow-sm relative overflow-hidden flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />

                <div className="flex flex-col relative z-10 border-b border-white/20 pb-3 sm:border-0 sm:pb-0">
                    <span className="text-[12px] font-bold text-white/80 uppercase tracking-wide">Total Earned</span>
                    <span className="text-[20px] font-black text-white leading-tight mt-0.5">
                        $<CountUp end={balance.total} decimals={2} />
                    </span>
                </div>

                <div className="flex flex-col relative z-10 border-b border-white/20 pb-3 sm:border-0 sm:pb-0">
                    <span className="text-[12px] font-bold text-white/80 uppercase tracking-wide">This Month</span>
                    <span className="text-[20px] font-black text-white leading-tight mt-0.5">
                        $<CountUp end={balance.thisMonth} decimals={2} />
                    </span>
                </div>

                <div className="flex flex-col relative z-10">
                    <span className="text-[13px] font-bold text-successBg uppercase tracking-wide">Available to Withdraw</span>
                    <span className="text-[28px] font-black text-white leading-tight mt-0.5 drop-shadow-sm">
                        $<CountUp end={balance.available} decimals={2} />
                    </span>
                </div>
            </div>

            {/* Withdraw Button */}
            <button
                onClick={() => setIsWithdrawOpen(true)}
                disabled={balance.available < 10}
                className={`w-full h-[52px] rounded-[14px] flex items-center justify-center gap-2 font-black text-[16px] transition-all shadow-[0_4px_14px_rgba(65,122,85,0.2)] ${balance.available >= 10
                        ? 'bg-success text-white hover:bg-[#346344] hover:-translate-y-0.5'
                        : 'bg-surfaceAlt text-textLight shadow-none cursor-not-allowed border border-border'
                    }`}
            >
                <Building2 size={20} />
                {balance.available >= 10 ? 'Withdraw Earnings' : 'Minimum $10 to withdraw'}
            </button>

            {/* Earnings Chart */}
            <div className="flex flex-col gap-3">
                <h3 className="text-[14px] font-extrabold text-text">Earnings Over Time</h3>
                <div className="w-full relative card p-0 pt-6 pb-2 shadow-none overflow-hidden">
                    <div className="w-full h-[200px] overflow-x-auto hide-scrollbar pl-4 pr-4 flex items-end gap-2 relative">
                        {chartData.map((d, i) => {
                            const heightPercentage = Math.max((d.amount / maxDay) * 100, 2);
                            return (
                                <div key={i} className="flex-1 min-w-[32px] sm:min-w-[40px] flex flex-col justify-end group">
                                    <div className="w-full flex-1 flex items-end">
                                        <div
                                            className="w-full bg-success/20 group-hover:bg-success transition-colors rounded-t-[4px] relative"
                                            style={{ height: `${heightPercentage}%` }}
                                        >
                                            {/* Tooltip */}
                                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-text text-white text-[10px] font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 shadow-sm">
                                                ${d.amount.toFixed(2)}
                                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-text" />
                                            </div>
                                        </div>
                                    </div>
                                    <span className="text-[9px] font-bold text-textLight mt-2 text-center truncate">{d.date.split(' ')[1]}</span>
                                </div>
                            );
                        })}
                    </div>
                    {/* Fade gradients for scrollability hint */}
                    <div className="absolute top-0 bottom-0 left-0 w-4 bg-gradient-to-r from-white to-transparent pointer-events-none sm:hidden" />
                    <div className="absolute top-0 bottom-0 right-0 w-4 bg-gradient-to-l from-white to-transparent pointer-events-none sm:hidden" />
                </div>
            </div>

            {/* Per-Link Earnings */}
            <div className="flex flex-col gap-3">
                <h3 className="text-[14px] font-extrabold text-text">Earnings by Link</h3>
                <div className="card p-0 shadow-none overflow-hidden flex flex-col">
                    {linksEarnings.map((link, idx) => (
                        <div key={link.id} className="flex items-center px-4 h-[48px] border-b border-border last:border-0 gap-3 group cursor-pointer hover:bg-surfaceAlt transition-colors">
                            <span className="text-[13px] font-extrabold text-text truncate max-w-[40%] sm:max-w-[50%]">{link.title}</span>
                            <div className="flex-1 flex items-center">
                                <div className="h-[6px] bg-success/20 rounded-full w-full overflow-hidden">
                                    <div
                                        className="h-full bg-success rounded-full"
                                        style={{ width: `${(link.earned / maxLinkEarnings) * 100}%` }}
                                    />
                                </div>
                            </div>
                            <span className="text-[13px] font-black text-text">${link.earned.toFixed(2)}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Payout History */}
            <div className="flex flex-col gap-3 pb-6">
                <h3 className="text-[14px] font-extrabold text-text">Payout History</h3>
                <div className="card p-0 shadow-none flex flex-col overflow-hidden">
                    {payouts.length > 0 ? payouts.map(payout => (
                        <div key={payout.id} className="flex items-center justify-between px-4 h-[60px] border-b border-border last:border-0">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-surfaceAlt flex items-center justify-center text-textMid shrink-0">
                                    <Calendar size={18} />
                                </div>
                                <div className="flex flex-col leading-tight">
                                    <span className="text-[14px] font-extrabold text-text">{payout.date}</span>
                                    <span className="text-[11px] font-bold text-textLight uppercase tracking-wide">Via Bank Transfer</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-end leading-tight gap-1">
                                <span className="text-[15px] font-black text-success">${payout.amount.toFixed(2)}</span>
                                <span className="text-[10px] bg-successBg text-success font-black px-2 py-0.5 rounded-pill uppercase">Paid</span>
                            </div>
                        </div>
                    )) : (
                        <div className="w-full py-12 flex flex-col items-center justify-center gap-2">
                            <PiggyBank size={32} className="text-textLight mb-2" strokeWidth={1.5} />
                            <span className="text-[14px] font-black text-text">No payouts yet</span>
                            <span className="text-[12px] font-semibold text-textMid">Keep sharing your links!</span>
                        </div>
                    )}
                </div>
            </div>

            <WithdrawSheet
                isOpen={isWithdrawOpen}
                onClose={() => setIsWithdrawOpen(false)}
                availableAmount={balance.available}
            />
        </div>
    );
};

const WithdrawSheet = ({ isOpen, onClose, availableAmount }: { isOpen: boolean, onClose: () => void, availableAmount: number }) => {
    const [amount, setAmount] = useState(availableAmount.toString());
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { showToast } = useToast();
    const { startProgress, stopProgress } = useProgress();

    const val = parseFloat(amount) || 0;
    const isError = val < 10 || val > availableAmount;
    const fee = val * 0.05;
    const final = val - fee;

    const handleSubmit = async () => {
        setIsSubmitting(true);
        startProgress();
        await new Promise(r => setTimeout(r, 1000));
        setIsSubmitting(false);
        stopProgress();
        showToast({ message: 'Payout requested! Arrives in 2–3 business days', type: 'success' });
        onClose();
    };

    return (
        <BottomSheet isOpen={isOpen} onClose={onClose} title="Withdraw Earnings">
            <div className="flex flex-col gap-6 pt-2 pb-4">
                <div className="flex flex-col items-center gap-1">
                    <span className="text-[13px] font-bold text-textMid">Available Balance</span>
                    <span className="text-[28px] font-black text-text">${availableAmount.toFixed(2)}</span>
                </div>

                <div className="flex flex-col gap-1.5 relative">
                    <label className="text-[12px] font-extrabold text-textMid uppercase tracking-wide">Amount to withdraw</label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[18px] font-black text-textMid">$</span>
                        <input
                            type="number"
                            className={`w-full h-[56px] border ${isError ? 'border-error ring-1 ring-error' : 'border-border'} rounded-[12px] px-8 pl-8 text-[20px] font-black text-text focus:outline-none focus:border-success focus:ring-1 focus:ring-success transition-all`}
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            min="10"
                            step="1"
                            max={availableAmount}
                        />
                    </div>
                    {isError && val > 0 && <span className="text-[11px] font-bold text-error mt-1">{val < 10 ? 'Minimum is $10' : 'Exceeds balance'}</span>}
                </div>

                <div className="card shadow-none p-4 flex flex-col gap-3 bg-surface border-border">
                    <div className="flex justify-between items-center text-[13px] font-bold text-textMid">
                        <span>Withdraw amount</span>
                        <span>${val.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-[13px] font-bold text-textMid">
                        <span>Platform fee (5%)</span>
                        <span className="text-warning">-${fee.toFixed(2)}</span>
                    </div>
                    <div className="h-[1px] w-full bg-border" />
                    <div className="flex justify-between items-center text-[15px] font-black text-text">
                        <span>Total transfer</span>
                        <span className="text-success">${final > 0 ? final.toFixed(2) : '0.00'}</span>
                    </div>
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={isError || isSubmitting}
                    className="btn-primary bg-success hover:bg-[#346344] w-full h-[52px] rounded-[14px] text-[16px] mt-2"
                >
                    {isSubmitting ? (
                        <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        'Confirm Payout'
                    )}
                </button>
            </div>
        </BottomSheet>
    );
};
