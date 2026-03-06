import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { ChevronRight, Copy, LogOut } from 'lucide-react';
import { useToast } from '../../../context/ToastContext';
import { ConfirmationBottomSheet } from '../../ui/ConfirmationBottomSheet';
import { useProgress } from '../../../context/ProgressContext';
import { useNavigate } from 'react-router-dom';

export const AccountTab = () => {
    const { user, logout } = useAuth();
    const { showToast } = useToast();
    const { startProgress, stopProgress } = useProgress();
    const navigate = useNavigate();

    const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
    const [donate, setDonate] = useState(false);

    const publicUrl = `adga.te/@${user?.username || 'creator'}`;

    const handleCopyPublic = () => {
        navigator.clipboard.writeText(`https://${publicUrl}`);
        showToast({ message: 'Public profile link copied', type: 'success' });
    };

    const handleLogout = async () => {
        setIsLogoutConfirmOpen(false);
        startProgress();
        setTimeout(() => {
            stopProgress();
            logout();
            navigate('/', { replace: true });
        }, 600);
    };

    return (
        <div className="flex flex-col gap-6 px-4 pt-4 sm:pt-8 w-full pb-8">
            {/* Profile Section */}
            <div className="card p-5 flex flex-col items-center gap-3">
                <div className="w-[60px] h-[60px] rounded-full bg-brand flex items-center justify-center text-white font-black text-2xl shadow-sm">
                    {user?.name?.[0]?.toUpperCase() || 'C'}
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-[16px] font-black text-text leading-tight">{user?.name}</span>
                    <span className="text-[13px] font-bold text-textMid mt-0.5">{user?.email}</span>
                </div>
                <button className="w-full h-[44px] bg-white border border-border text-text font-bold text-[14px] rounded-[10px] mt-2 hover:bg-surfaceAlt transition-colors">
                    Edit Profile
                </button>
            </div>

            {/* Public Profile Link */}
            <div className="flex flex-col gap-2">
                <span className="text-[12px] font-extrabold text-textMid tracking-wide uppercase px-1">Public Profile</span>
                <div className="w-full bg-surfaceAlt border border-border rounded-[12px] p-1.5 flex items-center justify-between">
                    <span className="font-mono text-[13px] font-bold text-textMid pl-3 truncate">{publicUrl}</span>
                    <button
                        onClick={handleCopyPublic}
                        className="w-[44px] h-[44px] rounded-[10px] bg-white border border-border flex items-center justify-center text-text hover:text-brand transition-colors shrink-0 shadow-sm"
                    >
                        <Copy size={16} strokeWidth={2.5} />
                    </button>
                </div>
            </div>

            {/* Settings Groups */}
            <div className="flex flex-col gap-6">

                {/* Group 1 */}
                <div className="flex flex-col w-full bg-white rounded-[16px] border border-border overflow-hidden shadow-sm">
                    <SettingRow label="Notification Preferences">
                        <ChevronRight className="w-5 h-5 text-textLight" />
                    </SettingRow>
                    <SettingRow label="Default Ad Count">
                        <div className="flex items-center gap-2">
                            <span className="text-[14px] font-extrabold text-brand bg-brandTint px-2 py-0.5 rounded-md">2 Ads</span>
                            <ChevronRight className="w-5 h-5 text-textLight" />
                        </div>
                    </SettingRow>
                    <div className="h-[52px] w-full bg-white px-4 flex items-center justify-between">
                        <span className="text-[15px] font-extrabold text-text">Donate 5% to Trees</span>
                        <div
                            onClick={() => setDonate(!donate)}
                            className={`w-12 h-7 rounded-full px-1 flex items-center cursor-pointer transition-colors ${donate ? 'bg-success' : 'bg-border'}`}
                        >
                            <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${donate ? 'translate-x-[20px]' : 'translate-x-0'}`} />
                        </div>
                    </div>
                </div>

                {/* Group 2 */}
                <div className="flex flex-col w-full bg-white rounded-[16px] border border-border overflow-hidden shadow-sm">
                    <SettingRow label="Connected Stripe Account">
                        <div className="flex items-center gap-2">
                            <span className="text-[13px] font-bold text-warning uppercase bg-warningBg px-2 py-0.5 rounded-pill">Not Connected</span>
                            <ChevronRight className="w-5 h-5 text-textLight" />
                        </div>
                    </SettingRow>
                    <SettingRow label="Payout History">
                        <ChevronRight className="w-5 h-5 text-textLight" />
                    </SettingRow>
                    <SettingRow label="Tax Information" hasBorder={false}>
                        <ChevronRight className="w-5 h-5 text-textLight" />
                    </SettingRow>
                </div>

                {/* Group 3 - Danger Zone */}
                <div className="flex flex-col gap-2">
                    <span className="text-[12px] font-extrabold text-error tracking-wide uppercase px-1">Danger Zone</span>
                    <div className="flex flex-col w-full bg-white rounded-[16px] border border-border overflow-hidden shadow-sm">
                        <SettingRow label="Change Password">
                            <ChevronRight className="w-5 h-5 text-textLight" />
                        </SettingRow>
                        <div className="h-[52px] w-full bg-white px-4 flex items-center justify-between cursor-pointer hover:bg-errorBg/30 transition-colors">
                            <span className="text-[15px] font-extrabold text-error">Delete Account</span>
                            <ChevronRight className="w-5 h-5 text-error" />
                        </div>
                    </div>
                </div>

            </div>

            {/* Logout Button */}
            <button
                onClick={() => setIsLogoutConfirmOpen(true)}
                className="w-full h-[48px] bg-white border border-error/50 text-error font-extrabold text-[15px] rounded-[12px] mt-4 mb-2 flex items-center justify-center gap-2 hover:bg-errorBg transition-colors"
            >
                <LogOut size={16} strokeWidth={3} /> Log Out
            </button>

            <ConfirmationBottomSheet
                isOpen={isLogoutConfirmOpen}
                onClose={() => setIsLogoutConfirmOpen(false)}
                title="Log Out"
                description="Are you sure you want to log out of your account?"
                confirmText="Log Out"
                cancelText="Cancel"
                isDanger={false}
                onConfirm={handleLogout}
            />
        </div>
    );
};

const SettingRow = ({ label, children, hasBorder = true }: { label: string, children: React.ReactNode, hasBorder?: boolean }) => (
    <div className={`h-[52px] w-full bg-white px-4 flex items-center justify-between cursor-pointer hover:bg-surfaceAlt transition-colors ${hasBorder ? 'border-b border-border/60' : ''}`}>
        <span className="text-[15px] font-extrabold text-text">{label}</span>
        {children}
    </div>
);
