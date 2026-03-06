import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';

interface ProgressContextType {
    startProgress: () => void;
    stopProgress: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider = ({ children }: { children: ReactNode }) => {
    const [isProgressing, setIsProgressing] = useState(false);
    const [progress, setProgress] = useState(0);

    const startProgress = useCallback(() => {
        setIsProgressing(true);
        setProgress(30);
        // Simulate progress bar moving
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev > 85) return prev;
                return prev + Math.random() * 10;
            });
        }, 300);

        // Let's attach this interval to state or window to clear it, but simple is okay for fake data
        (window as any).__progressInterval = interval;
    }, []);

    const stopProgress = useCallback(() => {
        clearInterval((window as any).__progressInterval);
        setProgress(100);
        setTimeout(() => {
            setIsProgressing(false);
            setProgress(0);
        }, 300);
    }, []);

    return (
        <ProgressContext.Provider value={{ startProgress, stopProgress }}>
            {children}
            {isProgressing && (
                <div id="nprogress">
                    <div
                        className="bar"
                        style={{ width: `${progress}%`, transition: 'width 200ms ease' }}
                    >
                        <div className="peg" />
                    </div>
                </div>
            )}
        </ProgressContext.Provider>
    );
};

export const useProgress = () => {
    const context = useContext(ProgressContext);
    if (!context) throw new Error('useProgress used outside Provider');
    return context;
};
