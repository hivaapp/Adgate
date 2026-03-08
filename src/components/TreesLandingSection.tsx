import { useEffect, useState, useRef } from 'react';
import { platformTrees } from '../lib/mockData';

export const TreesLandingSection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [count, setCount] = useState(0);
    const [pulse, setPulse] = useState(false);
    const [tickerIndex, setTickerIndex] = useState(0);
    const [liveTotal, setLiveTotal] = useState(platformTrees.totalTreesPlanted);

    const sectionRef = useRef<HTMLDivElement>(null);

    const MOCK_TICKERS = [
        "Maya from India just planted tree",
        "Raj from Brazil just planted tree",
        "Sarah from Kenya just planted tree",
        "John from US just planted tree",
        "Akira from Japan just planted tree",
        "Elena from Spain just planted tree",
        "Omar from Egypt just planted tree",
        "Chen from China just planted tree",
        "Leo from Italy just planted tree",
        "Zoe from Canada just planted tree",
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Initial count up animation
    useEffect(() => {
        if (!isVisible) return;

        const duration = 2000;
        const frames = 60;
        const totalFrames = (duration / 1000) * frames;
        let currentFrame = 0;

        const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

        const counter = setInterval(() => {
            currentFrame++;
            const progress = currentFrame / totalFrames;
            const currentCount = Math.floor(liveTotal * easeOut(progress));

            setCount(currentCount);

            if (currentFrame === totalFrames) {
                clearInterval(counter);
                setCount(liveTotal);
            }
        }, 1000 / frames);

        return () => clearInterval(counter);
    }, [isVisible, liveTotal]); // Runs when visible and liveTotal is available

    // Live increment simulation
    useEffect(() => {
        if (!isVisible) return;

        const interval = setInterval(() => {
            setLiveTotal((prev: number) => prev + 1);
            setCount((prev: number) => prev + 1);
            setPulse(true);
            setTimeout(() => setPulse(false), 300);
        }, 45000); // 45 seconds

        return () => clearInterval(interval);
    }, [isVisible]);

    // Ticker simulation
    useEffect(() => {
        if (!isVisible) return;

        const interval = setInterval(() => {
            setTickerIndex((prev: number) => (prev + 1) % MOCK_TICKERS.length);
        }, 8000);

        return () => clearInterval(interval);
    }, [isVisible, MOCK_TICKERS.length]);

    return (
        <div
            ref={sectionRef}
            className="w-full relative py-10 px-5 flex flex-col items-center"
            style={{ backgroundColor: '#0F4C2A' }}
        >
            {/* Pattern Overlay */}
            <div
                className="absolute inset-0 z-0 opacity-[0.04]"
                style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' fill=\'white\'%3E%3Cpath d=\'M10 0l10 10-10 10L0 10z\'/%3E%3C/svg%3E")',
                    backgroundSize: '20px 20px'
                }}
            />

            <div className="relative z-10 w-full max-w-[800px] flex flex-col items-center">

                {/* Top Badge */}
                <div className="h-[36px] px-4 rounded-[50px] border border-white/20 bg-white/10 flex items-center justify-center gap-2 mb-6">
                    <span className="text-[16px]">🌳</span>
                    <span className="text-[11px] font-[800] text-white tracking-widest uppercase">Platform Impact</span>
                </div>

                {/* Main Counter */}
                <div className="flex flex-col items-center text-center mb-8">
                    <div
                        className={`text-[56px] font-[900] text-white tracking-[-0.04em] leading-none transition-transform duration-300 ${pulse ? 'scale-[1.05]' : 'scale-100'}`}
                    >
                        {count.toLocaleString('en-US')}
                    </div>
                    <div className="text-[16px] font-[800] text-white/80 mt-1 mb-2">Trees Planted</div>
                    <div className="text-[13px] font-[600] text-white/60">and counting — 🌱 a new tree every 18 minutes</div>

                    {/* Ticker */}
                    <div className="mt-4 h-[20px] overflow-hidden relative w-full max-w-[300px]">
                        {MOCK_TICKERS.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`absolute inset-0 text-[12px] font-[600] text-white/50 text-center transition-opacity duration-1000 ${tickerIndex === idx ? 'opacity-100' : 'opacity-0'}`}
                            >
                                Latest: {msg} #{liveTotal.toLocaleString()}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Three Impact Stats Row */}
                <div className="w-full flex flex-col sm:flex-row gap-3 sm:gap-0 mt-4 mb-10">
                    <div className="flex-1 flex flex-col items-center text-center pb-3 sm:pb-0 sm:border-r border-white/30 border-b sm:border-b-0">
                        <div className="text-[24px] font-[900] text-white">{platformTrees.totalCreatorsPlanting.toLocaleString()}</div>
                        <div className="text-[12px] text-white/70">Creators Donating</div>
                    </div>
                    <div className="flex-1 flex flex-col items-center text-center pb-3 sm:pb-0 sm:border-r border-white/30 border-b sm:border-b-0">
                        <div className="text-[24px] font-[900] text-white">{(platformTrees.totalCO2OffsetKg).toLocaleString()} kg</div>
                        <div className="text-[12px] text-white/70">CO₂ Offset</div>
                    </div>
                    <div className="flex-1 flex flex-col items-center text-center pb-3 sm:pb-0 border-b sm:border-b-0 border-white/30 last:border-0 last:pb-0">
                        <div className="text-[24px] font-[900] text-white">47</div>
                        <div className="text-[12px] text-white/70">Countries Reached</div>
                    </div>
                </div>

                {/* Countries Planted Visual */}
                <div className="w-full mb-10">
                    <h3 className="text-[14px] font-[700] text-white text-center mb-4">Where Your Trees Are Growing</h3>
                    <div className="flex flex-col">
                        {platformTrees.countriesPlanted.map((c: { flag: string; country: string; percentage: number; trees: number }, i: number) => (
                            <div key={i} className="h-[40px] flex items-center w-full max-w-[400px] mx-auto">
                                <span className="w-8 text-[16px] text-center">{c.flag}</span>
                                <span className="w-24 text-[13px] font-[700] text-white truncate">{c.country}</span>
                                <div className="flex-1 flex items-center justify-end gap-3">
                                    <div className="w-[80px] sm:w-[120px] h-[6px] rounded-[3px] bg-white/30 overflow-hidden">
                                        <div className="h-full bg-white/80" style={{ width: `${c.percentage}%` }} />
                                    </div>
                                    <span className="w-12 text-right text-[12px] font-[800] text-white">{c.trees.toLocaleString()}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Partner Credit */}
                <div className="text-center mb-10">
                    <span className="text-[12px] text-white/60 block mb-1">In partnership with</span>
                    <span className="text-[14px] font-[800] text-white block mb-0.5">One Tree Planted 🌳</span>
                    <a href="https://onetreeplanted.org" target="_blank" rel="noopener noreferrer" className="text-[12px] font-[700] text-[#4ADE80] underline">
                        oneTreePlanted.org
                    </a>
                </div>

                {/* Creator CTA */}
                <div className="w-full rounded-[14px] border border-white/20 p-5 flex flex-col items-center text-center bg-white/10">
                    <span className="text-[32px] mb-3">🌳</span>
                    <h3 className="text-[16px] font-[900] text-white mb-1">Join {platformTrees.totalCreatorsPlanting.toLocaleString()} creators planting trees</h3>
                    <p className="text-[13px] text-white/70 mb-5">Enable the donation toggle when creating your link</p>
                    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="w-full sm:w-auto sm:px-12 h-[48px] bg-white text-[#E8312A] rounded-[14px] font-[800] text-[14px] hover:bg-white/90 transition-colors">
                        Start Planting
                    </button>
                </div>
            </div>
        </div>
    );
};
