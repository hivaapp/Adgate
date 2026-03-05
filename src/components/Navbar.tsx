import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import { SignInModal } from './SignInModal';
import { Settings } from 'lucide-react';

export const Navbar = () => {
    const { isLoggedIn, user } = useAuth();
    const location = useLocation();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const isDashboard = location.pathname === '/dashboard';

    return (
        <>
            <nav className="sticky top-0 z-40 bg-bg/80 backdrop-blur-md border-b border-border h-16 w-full shadow-sm pr-4 pl-4 sm:px-8 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center text-white font-black text-xs leading-none">
                        AG
                    </div>
                    <span className="font-black text-xl tracking-tight text-text hidden sm:block">AdGate</span>
                </Link>

                <div className="flex items-center gap-2 sm:gap-4">
                    {!isLoggedIn ? (
                        <>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="font-bold text-textMid hover:text-text transition-colors px-2 py-2"
                            >
                                Login
                            </button>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="btn-primary h-10 px-4 text-sm"
                            >
                                Sign Up
                            </button>
                        </>
                    ) : (
                        isDashboard ? (
                            <>
                                <div className="flex items-center gap-2 pr-4 border-r border-border h-8">
                                    <Settings className="w-5 h-5 text-textMid hover:text-text cursor-pointer" />
                                </div>
                                <div className="w-10 h-10 rounded-full bg-brand flex items-center justify-center text-white font-black text-lg cursor-pointer shadow-sm ml-2">
                                    {user?.avatarInitial || 'A'}
                                </div>
                            </>
                        ) : (
                            <>
                                <Link to="/dashboard" className="font-bold text-textMid hover:text-text transition-colors px-2 py-2">
                                    My Links
                                </Link>
                                <Link to="/dashboard" className="btn-primary h-10 px-4 text-sm">
                                    Dashboard
                                </Link>
                            </>
                        )
                    )}
                </div>
            </nav>

            <SignInModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};
