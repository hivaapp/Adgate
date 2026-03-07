import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { ChevronRight, ChevronLeft, Copy, LogOut, AlertTriangle } from 'lucide-react';
import { useToast } from '../../../context/ToastContext';
import { ConfirmationBottomSheet } from '../../ui/ConfirmationBottomSheet';
import { useProgress } from '../../../context/ProgressContext';
import { useNavigate } from 'react-router-dom';

export const AccountTab = () => {
    const { currentUser, logout } = useAuth();
    const { addToast } = useToast();
    const { startProgress, stopProgress } = useProgress();
    const navigate = useNavigate();

    const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
    const [donate, setDonate] = useState(true);
    const [activeScreen, setActiveScreen] = useState<string | null>(null);

    const publicUrl = `adgate.link/@${currentUser?.username || 'creator'}`;

    const handleCopyPublic = () => {
        navigator.clipboard.writeText(`https://${publicUrl}`);
        addToast('Public profile link copied', 'success');
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

    const navigateTo = (screen: string) => setActiveScreen(screen);
    const goBack = () => setActiveScreen(null);

    if (activeScreen) {
        return (
            <div className="w-full flex-1 flex flex-col pt-4 bg-bg animate-slideInRight pb-24 absolute inset-0 z-20 min-h-screen">
                <div className="px-4 flex items-center mb-6 mt-[env(safe-area-inset-top)] shrink-0">
                    <button onClick={goBack} className="w-10 h-10 flex items-center justify-center -ml-2 rounded-full hover:bg-surfaceAlt">
                        <ChevronLeft size={24} />
                    </button>
                    <h2 className="text-[18px] font-black tracking-tight ml-2">
                        {activeScreen === 'notifications' && 'Notification Preferences'}
                        {activeScreen === 'ad_count' && 'Default Ad Count'}
                        {activeScreen === 'stripe' && 'Stripe Account'}
                        {activeScreen === 'tax' && 'Tax Information'}
                        {activeScreen === 'password' && 'Change Password'}
                        {activeScreen === 'edit_profile' && 'Edit Profile'}
                        {activeScreen === 'delete' && 'Delete Account'}
                    </h2>
                </div>
                <div className="px-4 flex-1">
                    {activeScreen === 'notifications' && <ScreenNotifications onSave={goBack} />}
                    {activeScreen === 'ad_count' && <ScreenAdCount onSave={goBack} />}
                    {activeScreen === 'stripe' && <ScreenStripe />}
                    {activeScreen === 'tax' && <ScreenTax onSave={goBack} />}
                    {activeScreen === 'password' && <ScreenPassword onSave={goBack} />}
                    {activeScreen === 'edit_profile' && <ScreenEditProfile user={currentUser} onSave={goBack} />}
                    {activeScreen === 'delete' && <ScreenDelete />}
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 px-4 pt-4 sm:pt-8 w-full pb-28 min-h-full">
            {/* Profile Section */}
            <div className="card p-5 flex flex-col items-center gap-3 border-border shadow-sm">
                <div className="w-[64px] h-[64px] rounded-full bg-brand flex items-center justify-center text-white font-black text-[28px] shadow-sm">
                    {currentUser?.avatarInitial || 'A'}
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-[18px] font-black text-text leading-tight">{currentUser?.name}</span>
                    <span className="text-[13px] font-bold text-textMid mt-0.5">{currentUser?.email}</span>
                </div>
                <button
                    onClick={() => navigateTo('edit_profile')}
                    className="w-full h-[44px] bg-white border border-border text-text font-bold text-[14px] rounded-[10px] mt-2 hover:bg-surfaceAlt active:scale-[0.98] transition-all"
                >
                    Edit Profile
                </button>
            </div>

            {/* Public Profile Link */}
            <div className="flex flex-col gap-2">
                <span className="text-[12px] font-extrabold text-textMid tracking-widest uppercase px-1">Public Profile</span>
                <div className="w-full bg-surfaceAlt border border-border rounded-[12px] p-1.5 flex items-center justify-between">
                    <span className="font-mono text-[13px] font-bold text-textMid pl-3 truncate max-w-[calc(100%-60px)]">{publicUrl}</span>
                    <button
                        onClick={handleCopyPublic}
                        className="w-[44px] h-[44px] rounded-[10px] bg-white border border-border flex items-center justify-center text-text hover:text-brand transition-colors shrink-0 shadow-sm active:scale-[0.95]"
                    >
                        <Copy size={16} strokeWidth={2.5} />
                    </button>
                </div>
            </div>

            {/* Settings Groups */}
            <div className="flex flex-col gap-6">

                {/* Group 1 */}
                <div className="flex flex-col w-full bg-white rounded-[16px] border border-border overflow-hidden shadow-sm">
                    <SettingRow label="Notification Preferences" onClick={() => navigateTo('notifications')} />

                    <SettingRow label="Default Ad Count" onClick={() => navigateTo('ad_count')}>
                        <div className="flex items-center gap-2">
                            <span className="text-[14px] font-extrabold text-brand bg-brandTint px-2 py-0.5 rounded-md">2 Ads</span>
                            <ChevronRight className="w-5 h-5 text-textLight" />
                        </div>
                    </SettingRow>

                    <div className="h-[52px] w-full bg-white px-4 flex items-center justify-between">
                        <span className="text-[15px] font-extrabold text-text">Donate 5% to Trees</span>
                        <div
                            onClick={() => setDonate(!donate)}
                            className={`w-12 h-7 rounded-full px-1 flex items-center cursor-pointer transition-colors ${donate ? 'bg-success' : 'bg-surfaceAlt border border-border'}`}
                        >
                            <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${donate ? 'translate-x-[20px]' : 'translate-x-0 border border-border'}`} />
                        </div>
                    </div>
                </div>

                {/* Group 2 */}
                <div className="flex flex-col w-full bg-white rounded-[16px] border border-border overflow-hidden shadow-sm">
                    <SettingRow label="Connected Stripe Account" onClick={() => navigateTo('stripe')}>
                        <div className="flex items-center gap-2">
                            {currentUser?.stripeConnected ? (
                                <span className="text-[13px] font-bold text-success uppercase bg-successBg px-2 py-0.5 rounded-[50px]">Connected</span>
                            ) : (
                                <span className="text-[13px] font-bold text-warning uppercase bg-warningBg px-2 py-0.5 rounded-[50px]">Not Connected</span>
                            )}
                            <ChevronRight className="w-5 h-5 text-textLight" />
                        </div>
                    </SettingRow>
                    <SettingRow label="Tax Information" hasBorder={false} onClick={() => navigateTo('tax')} />
                </div>

                {/* Group 3 - Danger Zone */}
                <div className="flex flex-col gap-2 mt-2">
                    <span className="text-[12px] font-extrabold text-error tracking-widest uppercase px-1">Danger Zone</span>
                    <div className="flex flex-col w-full bg-white rounded-[16px] border border-error/50 overflow-hidden shadow-sm">
                        <SettingRow label="Change Password" onClick={() => navigateTo('password')} />
                        <div
                            onClick={() => navigateTo('delete')}
                            className="h-[52px] w-full bg-white px-4 flex items-center justify-between cursor-pointer hover:bg-errorBg/30 transition-colors"
                        >
                            <span className="text-[15px] font-extrabold text-error">Delete Account</span>
                            <ChevronRight className="w-5 h-5 text-error" />
                        </div>
                    </div>
                </div>

            </div>

            {/* Logout Button */}
            <button
                onClick={() => setIsLogoutConfirmOpen(true)}
                className="w-full h-[52px] bg-white border border-border text-text font-extrabold text-[15px] rounded-[14px] mt-4 mb-2 flex items-center justify-center gap-2 hover:bg-surfaceAlt active:scale-95 transition-all shadow-sm"
            >
                <LogOut size={18} strokeWidth={2.5} /> Log Out
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

const SettingRow = ({ label, children, hasBorder = true, onClick }: { label: string, children?: React.ReactNode, hasBorder?: boolean, onClick?: () => void }) => (
    <div
        onClick={onClick}
        className={`h-[52px] w-full bg-white px-4 flex items-center justify-between cursor-pointer hover:bg-surfaceAlt active:bg-border transition-colors ${hasBorder ? 'border-b border-border' : ''}`}
    >
        <span className="text-[15px] font-extrabold text-text">{label}</span>
        {children || <ChevronRight className="w-5 h-5 text-textLight" />}
    </div>
);

// --- Sub Screens ---

const ToggleRow = ({ label, initial = true }: { label: string, initial?: boolean }) => {
    const [on, setOn] = useState(initial);
    return (
        <div className="h-[52px] w-full flex items-center justify-between border-b border-border last:border-0">
            <span className="text-[14px] font-bold text-text">{label}</span>
            <div onClick={() => setOn(!on)} className={`w-12 h-7 rounded-full px-1 flex items-center cursor-pointer transition-colors ${on ? 'bg-success' : 'bg-surfaceAlt border border-border'}`}>
                <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${on ? 'translate-x-[20px]' : 'translate-x-0 border border-border'}`} />
            </div>
        </div>
    );
};

const ScreenNotifications = ({ onSave }: { onSave: () => void }) => {
    const { addToast } = useToast();
    const handleSave = () => { addToast('Preferences saved', 'success'); onSave(); };
    return (
        <div className="flex flex-col h-full animate-fadeIn">
            <div className="bg-white rounded-[16px] border border-border px-4 flex flex-col mb-6">
                <ToggleRow label="New unlock notification" />
                <ToggleRow label="Weekly earnings summary" />
                <ToggleRow label="Custom sponsor ad milestones" initial={false} />
                <ToggleRow label="Payout sent confirmation" />
                <ToggleRow label="New follower on profile" initial={false} />
                <ToggleRow label="Platform announcements" />
            </div>
            <button onClick={handleSave} className="w-full h-[52px] bg-brand text-white font-black rounded-[14px] mt-auto">Save Preferences</button>
        </div>
    );
};

const ScreenAdCount = ({ onSave }: { onSave: () => void }) => {
    const [count, setCount] = useState(2);
    const { addToast } = useToast();
    const handleSave = () => { addToast('Default ad count updated', 'success'); onSave(); };
    return (
        <div className="flex flex-col h-full animate-fadeIn">
            <div className="bg-white rounded-[16px] border border-border p-5 flex flex-col items-center gap-4 mb-6 text-center">
                <div className="flex items-center gap-2 mb-2 w-full">
                    {[1, 2, 3].map(n => (
                        <button key={n} onClick={() => setCount(n)} className={`flex-1 h-[48px] rounded-[10px] font-black text-[15px] transition-colors border ${count === n ? 'bg-brand text-white border-brand' : 'bg-white text-text border-border'}`}>{n} Ad{n > 1 ? 's' : ''}</button>
                    ))}
                </div>
                <p className="text-[14px] font-semibold text-textMid leading-relaxed">
                    Set the default number of ads viewers must click to unlock your new resources. Higher counts earn more but may reduce conversions.
                </p>
            </div>
            <button onClick={handleSave} className="w-full h-[52px] bg-brand text-white font-black rounded-[14px] mt-auto">Save Default</button>
        </div>
    );
};

const ScreenStripe = () => {
    const { currentUser, updateProfile } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const { addToast } = useToast();

    const handleConnect = () => {
        setIsLoading(true);
        setTimeout(() => {
            updateProfile({ stripeConnected: true });
            setIsLoading(false);
            addToast('Stripe connected successfully!', 'success');
        }, 1500);
    };

    const handleDisconnect = () => {
        updateProfile({ stripeConnected: false });
        addToast('Stripe disconnected', 'success');
    };

    return (
        <div className="flex flex-col items-center pt-8 animate-fadeIn">
            <div className="w-16 h-16 bg-[#635BFF] text-white rounded-[16px] flex items-center justify-center font-black text-2xl mb-6 shadow-md">S</div>
            {!currentUser?.stripeConnected ? (
                <>
                    <h3 className="text-[20px] font-black tracking-tight mb-2">Connect Stripe</h3>
                    <p className="text-[14px] font-medium text-textMid text-center mb-8 px-4 max-w-[300px]">
                        Connect your Stripe account to receive automatic payouts for your earnings.
                    </p>
                    <button
                        onClick={handleConnect}
                        disabled={isLoading}
                        className="w-full h-[56px] bg-[#635BFF] hover:bg-[#5249ea] text-white font-bold text-[16px] rounded-[14px] transition-colors flex items-center justify-center"
                    >
                        {isLoading ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Connect with Stripe'}
                    </button>
                </>
            ) : (
                <div className="w-full bg-white border border-border rounded-[16px] p-5 flex flex-col gap-4 text-center items-center">
                    <span className="px-3 py-1 bg-successBg text-success font-black text-[12px] rounded-full flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-success" /> Connected</span>
                    <span className="font-bold text-[15px]">{currentUser.email}</span>
                    <span className="text-[13px] font-semibold text-textMid">Last payout: 2 days ago</span>
                    <button onClick={handleDisconnect} className="mt-4 w-full h-[44px] border border-error text-error font-bold rounded-[10px] hover:bg-errorBg transition-colors">
                        Disconnect
                    </button>
                </div>
            )}
        </div>
    );
};

const ScreenTax = ({ onSave }: { onSave: () => void }) => {
    const { addToast } = useToast();
    const handleSave = () => { addToast('Tax information saved', 'success'); onSave(); };
    return (
        <div className="flex flex-col h-full animate-fadeIn">
            <div className="bg-white rounded-[16px] border border-border p-5 flex flex-col gap-4 mb-6">
                <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-extrabold text-textMid uppercase tracking-wide">Legal Name</label>
                    <input type="text" className="w-full h-[48px] bg-surfaceAlt border border-border rounded-[10px] px-3 font-semibold text-[15px] focus:border-brand focus:ring-1 focus:ring-brand outline-none" defaultValue="Alex Creator" />
                </div>
                <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-extrabold text-textMid uppercase tracking-wide">Country</label>
                    <select className="w-full h-[48px] bg-surfaceAlt border border-border rounded-[10px] px-3 font-semibold text-[15px] focus:border-brand focus:ring-1 focus:ring-brand outline-none appearance-none">
                        <option>United States</option>
                        <option>United Kingdom</option>
                        <option>Canada</option>
                    </select>
                </div>
                <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-extrabold text-textMid uppercase tracking-wide">Tax ID / SSN</label>
                    <input type="password" placeholder="••••••••" className="w-full h-[48px] bg-surfaceAlt border border-border rounded-[10px] px-3 font-semibold text-[15px] focus:border-brand focus:ring-1 focus:ring-brand outline-none" />
                </div>
                <div className="flex flex-col gap-2 mt-2">
                    <label className="text-[13px] font-extrabold text-textMid uppercase tracking-wide">Entity Type</label>
                    <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 font-bold text-[14px]"><input type="radio" name="entity" defaultChecked className="accent-brand" /> Individual</label>
                        <label className="flex items-center gap-2 font-bold text-[14px]"><input type="radio" name="entity" className="accent-brand" /> Business</label>
                    </div>
                </div>
            </div>
            <p className="text-[12px] font-semibold text-textMid text-center mb-6">
                Valid tax forms are required to process payouts over $600 per calendar year in the US.
            </p>
            <button onClick={handleSave} className="w-full h-[52px] bg-brand text-white font-black rounded-[14px] mt-auto">Save Document</button>
        </div>
    );
};

const ScreenPassword = ({ onSave }: { onSave: () => void }) => {
    const { addToast } = useToast();
    const [pwd, setPwd] = useState('');

    // Simple bar color logic
    const len = pwd.length;
    let strength = 0;
    if (len > 0) strength = 1;
    if (len > 5) strength = 2;
    if (len > 8 && /[0-9]/.test(pwd)) strength = 3;
    if (len > 10 && /[^A-Za-z0-9]/.test(pwd)) strength = 4;

    const colors = ['bg-border', 'bg-error', 'bg-warning', 'bg-yellow-500', 'bg-success'];

    const handleSave = () => { addToast('Password successfully updated', 'success'); onSave(); };

    return (
        <div className="flex flex-col h-full animate-fadeIn">
            <div className="bg-white rounded-[16px] border border-border p-5 flex flex-col gap-4 mb-6">
                <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-extrabold text-textMid uppercase tracking-wide">Current</label>
                    <input type="password" placeholder="••••••••" className="w-full h-[48px] bg-surfaceAlt border border-border rounded-[10px] px-3 font-semibold text-[15px] focus:border-brand outline-none" />
                </div>
                <div className="flex flex-col gap-1.5 mt-2">
                    <label className="text-[13px] font-extrabold text-textMid uppercase tracking-wide">New Password</label>
                    <input type="password" value={pwd} onChange={e => setPwd(e.target.value)} placeholder="••••••••" className="w-full h-[48px] bg-surfaceAlt border border-border rounded-[10px] px-3 font-semibold text-[15px] focus:border-brand outline-none" />
                    <div className="flex items-center gap-1 mt-1 h-1.5 w-full">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className={`h-full flex-1 rounded-full bg-border overflow-hidden`}>
                                <div className={`h-full w-full transition-colors duration-300 ${strength >= i ? colors[strength] : 'bg-transparent'}`} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-1.5 mt-2">
                    <label className="text-[13px] font-extrabold text-textMid uppercase tracking-wide">Confirm New</label>
                    <input type="password" placeholder="••••••••" className="w-full h-[48px] bg-surfaceAlt border border-border rounded-[10px] px-3 font-semibold text-[15px] focus:border-brand outline-none" />
                </div>
            </div>
            <button onClick={handleSave} className="w-full h-[52px] bg-brand text-white font-black rounded-[14px] mt-auto">Update Password</button>
        </div>
    );
};

const ScreenEditProfile = ({ user, onSave }: { user: any, onSave: () => void }) => {
    const { updateProfile } = useAuth();
    const { addToast } = useToast();
    const [name, setName] = useState(user?.name || '');
    const [handle, setHandle] = useState(user?.username || '');
    const [bio, setBio] = useState(user?.bio || '');
    const [website, setWebsite] = useState(user?.website || '');

    const handleSave = () => {
        updateProfile({ name, username: handle, bio, website });
        addToast('Profile updated', 'success');
        onSave();
    };

    return (
        <div className="flex flex-col h-full animate-fadeIn pb-8 overflow-y-auto">
            <div className="flex flex-col items-center mb-6 pt-4">
                <div className="w-[80px] h-[80px] rounded-full bg-brand flex items-center justify-center text-white font-black text-[32px] mb-3 shadow-sm">{name[0] || 'A'}</div>
                <button className="px-4 py-1.5 border border-border font-bold text-[13px] rounded-full hover:bg-surfaceAlt">Change Photo</button>
            </div>

            <div className="bg-white rounded-[16px] border border-border p-5 flex flex-col gap-4 mb-6">
                <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-extrabold text-textMid uppercase tracking-wide">Display Name</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full h-[48px] bg-surfaceAlt border border-border rounded-[10px] px-3 font-semibold text-[15px] focus:border-brand outline-none" />
                </div>
                <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-extrabold text-textMid uppercase tracking-wide">Username</label>
                    <div className="flex items-center w-full h-[48px] bg-surfaceAlt border border-border rounded-[10px] px-3 focus-within:border-brand focus-within:ring-1 focus-within:ring-brand">
                        <span className="text-textLight font-bold mr-1">@</span>
                        <input type="text" value={handle} onChange={e => setHandle(e.target.value)} className="w-full h-full bg-transparent font-semibold text-[15px] outline-none" />
                    </div>
                </div>
                <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-extrabold text-textMid uppercase tracking-wide">Bio</label>
                    <textarea value={bio} onChange={e => setBio(e.target.value)} className="w-full h-[80px] resize-none bg-surfaceAlt border border-border rounded-[10px] p-3 font-semibold text-[14px] focus:border-brand outline-none leading-relaxed" />
                </div>
                <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-extrabold text-textMid uppercase tracking-wide">Website URL</label>
                    <input type="url" value={website} onChange={e => setWebsite(e.target.value)} className="w-full h-[48px] bg-surfaceAlt border border-border rounded-[10px] px-3 font-semibold text-[15px] focus:border-brand outline-none" />
                </div>
            </div>
            <button onClick={handleSave} className="w-full h-[52px] bg-brand text-white font-black rounded-[14px] mt-auto shrink-0 shadow-sm">Save Profile</button>
        </div>
    );
};

const ScreenDelete = () => {
    const [confirm, setConfirm] = useState('');
    const [openSheet, setOpenSheet] = useState(false);
    return (
        <div className="flex flex-col h-full animate-fadeIn">
            <div className="bg-errorBg rounded-[16px] border border-error/20 p-5 flex flex-col items-center text-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-error/10 text-error flex items-center justify-center mb-1"><AlertTriangle size={24} /></div>
                <h3 className="text-[18px] font-black tracking-tight text-error">Delete Your Account</h3>
                <p className="text-[14px] font-bold text-error/80 leading-relaxed mb-2">
                    This action is permanent and cannot be undone. All your links, earnings data, and history will be deleted immediately.
                </p>
                <div className="w-full text-left flex flex-col gap-1.5">
                    <label className="text-[13px] font-bold text-error">Type "DELETE" to confirm</label>
                    <input type="text" value={confirm} onChange={e => setConfirm(e.target.value)} className="w-full h-[48px] bg-white border border-error/30 rounded-[10px] px-3 font-bold text-[15px] text-error outline-none" />
                </div>
            </div>
            <button disabled={confirm !== 'DELETE'} onClick={() => setOpenSheet(true)} className={`w-full h-[52px] font-black rounded-[14px] mt-auto transition-colors ${confirm === 'DELETE' ? 'bg-error text-white' : 'bg-surfaceAlt text-textLight'}`}>Delete My Account</button>
            <ConfirmationBottomSheet
                isOpen={openSheet}
                onClose={() => setOpenSheet(false)}
                title="Final Confirmation"
                description="Your account will be scrubbed from our servers immediately."
                confirmText="Yes, Delete Forever"
                cancelText="Cancel"
                isDanger={true}
                onConfirm={() => { alert('Account deleted (mock)'); window.location.href = '/'; }}
            />
        </div>
    );
};
