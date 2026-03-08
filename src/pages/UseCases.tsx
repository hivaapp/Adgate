import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Play, MousePointerClick } from 'lucide-react';

const CATEGORIES = [
    "All", "AI & Prompts", "Education", "Design", "Fitness",
    "Business", "Gaming", "Music", "Photography", "Writing", "Coding", "Finance",
    "✨ Custom Sponsor"
];

const USE_CASES = [
    // AI & Prompts
    {
        id: 1, category: "AI & Prompts", emoji: "🤖", tint: "bg-[#FFF0EF]",
        title: "ChatGPT Prompt Packs", creator: "AI Prompt Engineer",
        desc: "You craft premium ChatGPT, Claude, or Midjourney prompts and package them into downloadable packs. Your Twitter or LinkedIn followers want them — now you can share them freely while earning.",
        uploads: ["📄 PDF guide", "📝 Prompt pack TXT", "🗂️ ZIP of templates"],
        scenarios: [
            { label: "Small", sub: "500 monthly link clicks", range: "$10–18/mo" },
            { label: "Medium", sub: "2,000 monthly clicks", range: "$42–75/mo" },
            { label: "Large", sub: "10,000 monthly clicks", range: "$210–375/mo" }
        ],
        calcNote: "Based on 60% unlock rate, 1 ad, $0.035–0.065/unlock",
        bestAd: "click"
    },
    {
        id: 2, category: "AI & Prompts", emoji: "🤖", tint: "bg-[#FFF0EF]",
        title: "AI Workflow Guides", creator: "AI Educator",
        desc: "Step-by-step guides showing how to use AI tools for real tasks. Huge demand on YouTube, TikTok, and Reddit. Package them as a PDF or Notion page export.",
        uploads: ["📄 PDF guide", "📓 Notion export", "📝 markdown file"],
        scenarios: [
            { label: "Small", sub: "500 monthly link clicks", range: "$8–15/mo" },
            { label: "Medium", sub: "2,000 monthly clicks", range: "$33–60/mo" },
            { label: "Large", sub: "10,000 monthly clicks", range: "$165–300/mo" }
        ],
        calcNote: "Based on 60% unlock rate, 1 ad, $0.035–0.065/unlock",
        bestAd: "video"
    },
    {
        id: 3, category: "AI & Prompts", emoji: "🤖", tint: "bg-[#FFF0EF]",
        title: "Custom GPT Templates", creator: "No-code AI Builder",
        desc: "Custom GPT system prompts and instruction sets that followers can paste directly into ChatGPT. Highly shareable in AI communities.",
        uploads: ["📝 TXT file", "📄 PDF", "🧩 JSON export"],
        scenarios: [
            { label: "Small", sub: "500 monthly link clicks", range: "$12–20/mo" },
            { label: "Medium", sub: "2,000 monthly clicks", range: "$48–80/mo" },
            { label: "Large", sub: "10,000 monthly clicks", range: "$240–400/mo" }
        ],
        calcNote: "Based on 60% unlock rate, 2 ads, $0.035–0.065/unlock",
        bestAd: "click"
    },

    // Education
    {
        id: 4, category: "Education", emoji: "📚", tint: "bg-[#EFF6FF]",
        title: "Free Study Guides", creator: "Student Creator / Teacher",
        desc: "Summary sheets, revision guides, and cheat sheets for school subjects. Massively shared around exam seasons on TikTok and Instagram.",
        uploads: ["📄 PDF", "🖼️ image PNG", "🗂️ ZIP of multiple sheets"],
        scenarios: [
            { label: "Small", sub: "500 monthly link clicks", range: "$6–12/mo" },
            { label: "Medium", sub: "2,000 monthly clicks", range: "$25–50/mo" },
            { label: "Large", sub: "10,000 monthly clicks", range: "$125–250/mo" }
        ],
        calcNote: "Based on 60% unlock rate, 1 ad, $0.035–0.065/unlock",
        bestAd: "video"
    },
    {
        id: 5, category: "Education", emoji: "📚", tint: "bg-[#EFF6FF]",
        title: "Online Course Previews", creator: "Course Creator",
        desc: "Give away the first module of your paid course as a free AdGate resource. Build email lists, earn from ads, and funnel viewers into the full course.",
        uploads: ["📄 PDF module", "🎬 video file", "🗂️ ZIP"],
        scenarios: [
            { label: "Small", sub: "500 monthly link clicks", range: "$15–25/mo" },
            { label: "Medium", sub: "2,000 monthly clicks", range: "$60–100/mo" },
            { label: "Large", sub: "10,000 monthly clicks", range: "$300–500/mo" }
        ],
        calcNote: "Based on 60% unlock rate, 2 ads, $0.035–0.065/unlock",
        bestAd: "video"
    },
    {
        id: 6, category: "Education", emoji: "📚", tint: "bg-[#EFF6FF]",
        title: "Language Learning Sheets", creator: "Language Teacher / Polyglot",
        desc: "Vocabulary sheets, grammar cheat sheets, and phrase packs in any language. Consistently viral on Pinterest and Instagram.",
        uploads: ["📄 PDF", "🖼️ image files", "🗂️ printable ZIP"],
        scenarios: [
            { label: "Small", sub: "500 monthly link clicks", range: "$7–13/mo" },
            { label: "Medium", sub: "2,000 monthly clicks", range: "$28–52/mo" },
            { label: "Large", sub: "10,000 monthly clicks", range: "$140–260/mo" }
        ],
        calcNote: "Based on 60% unlock rate, 1 ad, $0.035–0.065/unlock",
        bestAd: "click"
    },

    // Design
    {
        id: 7, category: "Design", emoji: "🎨", tint: "bg-[#F5F3FF]",
        title: "Free Figma Templates", creator: "UI/UX Designer",
        desc: "Dashboard templates, icon packs, UI kits shared on Twitter and design communities. These resources get thousands of downloads when shared well.",
        uploads: ["🔗 Figma community link", "🗂️ ZIP of assets", "📄 PDF showcase"],
        scenarios: [
            { label: "Small", sub: "500 monthly link clicks", range: "$18–30/mo" },
            { label: "Medium", sub: "2,000 monthly clicks", range: "$72–120/mo" },
            { label: "Large", sub: "10,000 monthly clicks", range: "$360–600/mo" }
        ],
        calcNote: "Based on 60% unlock rate, 2 ads, $0.035–0.065/unlock",
        bestAd: "click"
    },
    {
        id: 8, category: "Design", emoji: "🎨", tint: "bg-[#F5F3FF]",
        title: "Canva Templates", creator: "Social Media Designer",
        desc: "Ready-made Canva templates for Instagram posts, presentations, and resumes. Viral on Pinterest and TikTok.",
        uploads: ["🔗 Canva template link", "🖼️ PNG preview pack", "📄 PDF"],
        scenarios: [
            { label: "Small", sub: "500 monthly link clicks", range: "$10–18/mo" },
            { label: "Medium", sub: "2,000 monthly clicks", range: "$40–72/mo" },
            { label: "Large", sub: "10,000 monthly clicks", range: "$200–360/mo" }
        ],
        calcNote: "Based on 60% unlock rate, 1 ad, $0.035–0.065/unlock",
        bestAd: "click"
    },
    {
        id: 9, category: "Design", emoji: "🎨", tint: "bg-[#F5F3FF]",
        title: "Illustration Asset Packs", creator: "Illustrator / Graphic Designer",
        desc: "Free icon sets, sticker packs, background textures, and illustration elements for commercial use. Shared heavily in design forums and Reddit.",
        uploads: ["🗂️ ZIP of SVG/PNG assets", "📄 PDF license"],
        scenarios: [
            { label: "Small", sub: "500 monthly link clicks", range: "$14–22/mo" },
            { label: "Medium", sub: "2,000 monthly clicks", range: "$56–88/mo" },
            { label: "Large", sub: "10,000 monthly clicks", range: "$280–440/mo" }
        ],
        calcNote: "Based on 60% unlock rate, 1 ad, $0.035–0.065/unlock",
        bestAd: "video"
    },

    // Fitness
    {
        id: 10, category: "Fitness", emoji: "💪", tint: "bg-[#ECFDF5]",
        title: "Free Workout Plans", creator: "Fitness Creator / Personal Trainer",
        desc: "4-week workout plans, exercise guides, and nutrition sheets shared on Instagram and YouTube. Evergreen content that gets reshared continuously.",
        uploads: ["📄 PDF workout plan", "🖼️ image guides", "📊 spreadsheet"],
        scenarios: [
            { label: "Small", sub: "500 monthly link clicks", range: "$9–16/mo" },
            { label: "Medium", sub: "2,000 monthly clicks", range: "$36–64/mo" },
            { label: "Large", sub: "10,000 monthly clicks", range: "$180–320/mo" }
        ],
        calcNote: "Based on 60% unlock rate, 1 ad, $0.035–0.065/unlock",
        bestAd: "video"
    },
    {
        id: 11, category: "Fitness", emoji: "💪", tint: "bg-[#ECFDF5]",
        title: "Meal Prep Guides", creator: "Nutrition Creator",
        desc: "Weekly meal prep plans with shopping lists and calorie breakdowns. Massive demand on TikTok and Pinterest.",
        uploads: ["📄 PDF guide", "📝 printable shopping list", "🖼️ image pack"],
        scenarios: [
            { label: "Small", sub: "500 monthly link clicks", range: "$8–14/mo" },
            { label: "Medium", sub: "2,000 monthly clicks", range: "$32–56/mo" },
            { label: "Large", sub: "10,000 monthly clicks", range: "$160–280/mo" }
        ],
        calcNote: "Based on 60% unlock rate, 1 ad, $0.035–0.065/unlock",
        bestAd: "video"
    },

    // Business
    {
        id: 12, category: "Business", emoji: "💼", tint: "bg-[#FFFBEB]",
        title: "Business Templates", creator: "Business Coach",
        desc: "Pitch deck templates, business plan frameworks, invoice templates, and SOP documents. High value to startup audiences.",
        uploads: ["📄 PDF", "📊 PowerPoint PPTX", "🔗 Google Slides export"],
        scenarios: [
            { label: "Small", sub: "500 monthly link clicks", range: "$20–35/mo" },
            { label: "Medium", sub: "2,000 monthly clicks", range: "$80–140/mo" },
            { label: "Large", sub: "10,000 monthly clicks", range: "$400–700/mo" }
        ],
        calcNote: "Based on 60% unlock rate, 2 ads, $0.035–0.065/unlock",
        bestAd: "click"
    },
    {
        id: 13, category: "Business", emoji: "💼", tint: "bg-[#FFFBEB]",
        title: "Marketing Playbooks", creator: "Marketing Creator",
        desc: "Free social media calendars, content frameworks, and campaign templates. Shared heavily on LinkedIn and Twitter.",
        uploads: ["📄 PDF playbook", "📊 spreadsheet", "🗂️ ZIP bundle"],
        scenarios: [
            { label: "Small", sub: "500 monthly link clicks", range: "$18–28/mo" },
            { label: "Medium", sub: "2,000 monthly clicks", range: "$72–112/mo" },
            { label: "Large", sub: "10,000 monthly clicks", range: "$360–560/mo" }
        ],
        calcNote: "Based on 60% unlock rate, 2 ads, $0.035–0.065/unlock",
        bestAd: "click"
    },

    // Gaming
    {
        id: 14, category: "Gaming", emoji: "🎮", tint: "bg-[#F0F0FF] text-[#1A1A2E]",
        title: "Game Guides and Walkthroughs", creator: "Gaming Creator",
        desc: "Strategy guides, speed run notes, achievement checklists for popular games. Shared on Reddit gaming communities and Discord servers.",
        uploads: ["📄 PDF guide", "📝 TXT file", "🖼️ image strategy maps"],
        scenarios: [
            { label: "Small", sub: "500 monthly link clicks", range: "$11–19/mo" },
            { label: "Medium", sub: "2,000 monthly clicks", range: "$44–76/mo" },
            { label: "Large", sub: "10,000 monthly clicks", range: "$220–380/mo" }
        ],
        calcNote: "Based on 60% unlock rate, 1 ad, $0.035–0.065/unlock",
        bestAd: "video"
    },

    // Coding
    {
        id: 15, category: "Coding", emoji: "💻", tint: "bg-[#F0FDFA]",
        title: "Code Snippets and Boilerplates", creator: "Developer Creator",
        desc: "Starter templates, React component libraries, Python scripts, and code snippets shared on Twitter and GitHub communities.",
        uploads: ["🗂️ ZIP of code files", "📄 PDF documentation", "📝 markdown README"],
        scenarios: [
            { label: "Small", sub: "500 monthly link clicks", range: "$16–26/mo" },
            { label: "Medium", sub: "2,000 monthly clicks", range: "$64–104/mo" },
            { label: "Large", sub: "10,000 monthly clicks", range: "$320–520/mo" }
        ],
        calcNote: "Based on 60% unlock rate, 2 ads, $0.035–0.065/unlock",
        bestAd: "click"
    },
    {
        id: 16, category: "Coding", emoji: "💻", tint: "bg-[#F0FDFA]",
        title: "Developer Cheat Sheets", creator: "Developer / Tech Creator",
        desc: "Git commands, SQL cheat sheets, keyboard shortcut guides, regex references. Perennially popular and reshared for years.",
        uploads: ["📄 PDF", "🖼️ PNG poster", "🗂️ ZIP pack"],
        scenarios: [
            { label: "Small", sub: "500 monthly link clicks", range: "$12–20/mo" },
            { label: "Medium", sub: "2,000 monthly clicks", range: "$48–80/mo" },
            { label: "Large", sub: "10,000 monthly clicks", range: "$240–400/mo" }
        ],
        calcNote: "Based on 60% unlock rate, 1 ad, $0.035–0.065/unlock",
        bestAd: "click"
    },

    // Photography
    {
        id: 17, category: "Photography", emoji: "📷", tint: "bg-[#FFF7ED]",
        title: "Lightroom Presets", creator: "Photographer / Travel Creator",
        desc: "Free Lightroom preset packs shared on Instagram and YouTube. Creators with even 2K followers see hundreds of downloads.",
        uploads: ["🗂️ ZIP of XMP preset files", "📄 PDF installation guide"],
        scenarios: [
            { label: "Small", sub: "500 monthly link clicks", range: "$22–38/mo" },
            { label: "Medium", sub: "2,000 monthly clicks", range: "$88–152/mo" },
            { label: "Large", sub: "10,000 monthly clicks", range: "$440–760/mo" }
        ],
        calcNote: "Based on 60% unlock rate, 2 ads, $0.035–0.065/unlock",
        bestAd: "video"
    },

    // Writing
    {
        id: 18, category: "Writing", emoji: "✍️", tint: "bg-[#FFF1F2]",
        title: "Writing Templates", creator: "Writer / Newsletter Creator",
        desc: "Email newsletter templates, blog post frameworks, copywriting formulas, and content calendars. Shared on Substack communities.",
        uploads: ["📄 PDF", "📓 Notion template export", "🔗 Google Docs export"],
        scenarios: [
            { label: "Small", sub: "500 monthly link clicks", range: "$10–17/mo" },
            { label: "Medium", sub: "2,000 monthly clicks", range: "$40–68/mo" },
            { label: "Large", sub: "10,000 monthly clicks", range: "$200–340/mo" }
        ],
        calcNote: "Based on 60% unlock rate, 1 ad, $0.035–0.065/unlock",
        bestAd: "click"
    },
    // Custom Sponsor
    {
        id: 19, category: "✨ Custom Sponsor", emoji: "⭐", tint: "bg-[#EDE9FE]",
        title: "Creators With Brand Partnerships", creator: "Sponsored Creator / Influencer",
        desc: "You already have brand deals — or you're actively pitching to brands. Instead of sending your sponsor's ad to a newsletter or posting it as a story, gate your free content behind your sponsor's ad. Your audience unlocks the content, sees the ad, and your sponsor gets verified impressions. You negotiate the rate directly and keep every cent.",
        uploads: ["📄 Sponsor's image creative", "🎬 Sponsor's video ad", "🔗 Affiliate redirect link", "📊 Any high-value free resource"],
        scenarios: [
            { label: "Small", sub: "1,000 monthly impressions", range: "Your negotiated rate × 1K impressions — 0% to AdGate" },
            { label: "Medium", sub: "5,000 monthly impressions", range: "Your negotiated rate × 5K impressions — 0% to AdGate" },
            { label: "Large", sub: "20,000 monthly impressions", range: "Your negotiated rate × 20K impressions — 0% to AdGate" }
        ],
        calcNote: "Rate is negotiated directly with your sponsor. Industry standard image CPM: $5–$25. Video CPM: $15–$50. AdGate takes zero commission.",
        bestAd: "custom",
        isCustomSponsor: true
    },
    {
        id: 20, category: "✨ Custom Sponsor", emoji: "🤝", tint: "bg-[#EDE9FE]",
        title: "Micro-Influencer Sponsorships", creator: "Micro-Influencer / Niche Creator",
        desc: "You have a tight-knit niche audience of 1,000 to 50,000 followers. Brands in your niche will pay for access to your audience — even at micro-influencer scale. Use AdGate to deliver their ad as part of your free resource sharing. You get a direct sponsorship deal, they get verified ad views, your audience gets free content.",
        uploads: ["🖼️ Brand's product image", "🎬 Short brand video", "📄 Any niche resource your audience wants", "🔗 Brand's tracking URL"],
        scenarios: [
            { label: "Starter deal", sub: "500 impressions / month", range: "Typical flat fee deal: $100–$500/mo at 0% commission" },
            { label: "Growing deal", sub: "2,000 impressions / month", range: "Typical flat fee deal: $500–$2,000/mo at 0% commission" },
            { label: "Established deal", sub: "10,000 impressions / month", range: "Typical flat fee deal: $2,000–$10,000/mo at 0% commission" }
        ],
        calcNote: "Flat fee deals are common in micro-influencer sponsorships. You agree a price regardless of clicks. AdGate tracks impressions and provides sponsor reports — but takes nothing.",
        bestAd: "custom",
        isCustomSponsor: true
    }
];

export const UseCases = () => {
    const location = useLocation();
    const [filterCategory, setFilterCategory] = useState("All");
    const [prevSearch, setPrevSearch] = useState("");

    if (location.search !== prevSearch) {
        setPrevSearch(location.search);
        if (location.search.includes('category=')) {
            const cat = decodeURIComponent(location.search.split('category=')[1].split('&')[0]);
            if (CATEGORIES.includes(cat)) {
                setFilterCategory(cat);
            }
        }
    }

    useEffect(() => {
        document.title = "AdGate Use Cases — Earn From Any Content";
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute("content", "See every way to earn on AdGate with realistic estimated earnings per use case.");
        }
    }, []);

    useEffect(() => {
        // Scroll to content if navigated with a category
        if (location.search.includes('category=')) {
            setTimeout(() => window.scrollTo(0, 500), 50);
        }
    }, [location.search]);

    const [tickerState, setTickerState] = useState(0);
    const tickers = [
        "A fitness creator with 5K followers earns est. $120/mo",
        "A prompt engineer sharing ChatGPT guides earns est. $340/mo",
        "A teacher sharing free worksheets earns est. $85/mo",
        "A YouTuber with a brand deal uses Custom Sponsor — keeps 100% of their $500 deal",
        "An influencer serves their own sponsor ad — zero commission, full control"
    ];

    useEffect(() => {
        const i = setInterval(() => {
            setTickerState(prev => (prev + 1) % tickers.length);
        }, 5000);
        return () => clearInterval(i);
    }, [tickers.length]);

    return (
        <div className="flex flex-col items-center w-full min-h-screen bg-bg selection:bg-brandTint selection:text-brand pb-0">
            {/* Hero Section */}
            <div className="w-full bg-[#0A0A0A] px-6 pt-[56px] sm:pt-[72px] pb-[40px] flex flex-col items-center text-center">
                <div className="h-[36px] bg-[#FFFBEB] bg-opacity-[0.12] border border-[#F59E0B] border-opacity-30 px-3 rounded-full flex items-center justify-center mb-6 text-[#F59E0B] font-extrabold text-[11px] uppercase tracking-wider">
                    Real earnings. Real use cases.
                </div>

                <h1 className="text-[clamp(26px,6vw,40px)] font-black text-white leading-[1.05] tracking-tight mb-4 max-w-[800px]">
                    Anyone with an audience can earn on AdGate.
                </h1>

                <p className="text-white/60 font-semibold text-[15px] max-w-[500px] mx-auto mb-[40px] leading-snug">
                    From prompt engineers to fitness coaches — if you create free content your audience wants, you can monetize every share.
                </p>

                <div className="h-[48px] overflow-hidden flex items-center justify-center mb-[40px] relative">
                    <div className="text-[14px] font-bold text-[#E8312A] animate-fadeIn absolute transition-all" key={tickerState}>
                        {tickers[tickerState]}
                    </div>
                </div>

                <div className="w-full max-w-[800px] flex flex-row items-center justify-center gap-[24px] sm:gap-[64px] border-t border-white/10 pt-8">
                    <div className="flex flex-col items-center">
                        <span className="text-[24px] font-black text-white leading-none">$0.035</span>
                        <span className="text-[11px] font-semibold text-white/60 mt-2">avg per unlock</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-[24px] font-black text-white leading-none">100%</span>
                        <span className="text-[11px] font-semibold text-white/60 mt-2">Platform Ads 95% · Custom Sponsor 100%</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-[24px] font-black text-white leading-none">20</span>
                        <span className="text-[11px] font-semibold text-white/60 mt-2">use case types</span>
                    </div>
                </div>
            </div>

            {/* Category Filter */}
            <div className="w-full bg-white sticky top-[64px] z-30 shadow-sm border-b border-border h-[52px] flex items-center overflow-x-auto no-scrollbar px-4">
                <div className="flex items-center gap-2 max-w-[1000px] mx-auto min-w-max">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilterCategory(cat)}
                            className={`h-[36px] px-4 rounded-full font-bold text-[13px] whitespace-nowrap transition-colors border ${filterCategory === cat
                                ? cat === "✨ Custom Sponsor" ? 'bg-[#6366F1] text-white border-[#6366F1]' : 'bg-[#E8312A] text-white border-[#E8312A]'
                                : 'bg-transparent text-textMid border-border hover:bg-surfaceAlt'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Use Case Cards Content */}
            <div className="w-full bg-white py-12 flex flex-col items-center px-[24px]">
                <div className="w-full max-w-[600px] flex flex-col gap-6">
                    {USE_CASES.map(uc => {
                        const isMatch = filterCategory === "All" || filterCategory === uc.category;
                        return (
                            <div
                                key={uc.id}
                                className={`w-full bg-white border border-border rounded-[18px] p-[20px] shadow-[0_1px_3px_rgba(0,0,0,0.06)] flex flex-col transition-all duration-300 ${!isMatch ? 'opacity-30 scale-[0.98] pointer-events-none hidden' : 'opacity-100 scale-100 block'} ${uc.isCustomSponsor ? 'border-l-[3px] border-l-[#6366F1]' : ''}`}
                            >
                                {/* Card Header */}
                                <div className="flex gap-4 items-center mb-4">
                                    <div className={`w-[48px] h-[48px] rounded-[14px] flex items-center justify-center text-[24px] shrink-0 ${uc.tint}`}>
                                        {uc.emoji}
                                    </div>
                                    <div className="flex flex-col truncate">
                                        <h3 className="text-[16px] font-black text-[#111] truncate">{uc.title}</h3>
                                        <span className="text-[13px] font-bold text-textMid truncate">{uc.creator}</span>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-[14px] font-semibold text-[#555] leading-[1.7] mb-5">
                                    {uc.desc}
                                </p>

                                {/* What to Upload */}
                                <div className="flex flex-col mb-6">
                                    <span className="text-[11px] font-extrabold text-textMid uppercase tracking-wide mb-2">What to upload:</span>
                                    <div className="flex flex-row overflow-x-auto no-scrollbar gap-2 pb-1 -mx-1 px-1">
                                        {uc.uploads.map((upl, j) => (
                                            <div key={j} className="h-[28px] bg-surfaceAlt border border-border rounded-full px-2.5 flex items-center shrink-0 whitespace-nowrap text-[12px] font-bold text-text">
                                                {upl}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Estimated Earnings Section */}
                                <div className="w-full bg-[#F8F8F8] rounded-[12px] p-[14px] mb-5 border border-border">
                                    <span className="text-[11px] font-extrabold text-textMid uppercase tracking-wide block mb-3">
                                        {uc.isCustomSponsor ? 'Estimated Monthly Value' : 'Estimated Monthly Earnings'}
                                    </span>

                                    <div className="flex flex-col gap-0 border-b border-border mb-3">
                                        {uc.scenarios.map((sc, j) => (
                                            <div key={j} className="flex flex-col sm:flex-row justify-between py-[10px] border-t border-border gap-2">
                                                <div className="flex flex-col">
                                                    <span className="text-[13px] font-bold text-[#333] leading-tight">{sc.label}</span>
                                                    <span className="text-[11px] text-textMid font-medium">{sc.sub}</span>
                                                </div>
                                                <span className={`text-[13px] sm:text-[14px] font-black ${uc.isCustomSponsor ? 'text-success self-start sm:self-center mt-1 sm:mt-0 text-left sm:text-right' : 'text-success self-start sm:self-center'}`}>
                                                    {sc.range}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                    <span className="text-[11px] font-medium text-[#AAA] block leading-[1.6]">{uc.calcNote}</span>
                                </div>

                                {/* Footer */}
                                <div className="w-full flex items-center justify-between border-t border-border pt-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[11px] font-bold text-textMid">Best ad type</span>
                                        {uc.bestAd === 'video' ? (
                                            <div className="h-[22px] px-2 rounded-full bg-[#E8312A] flex items-center gap-1 text-white shadow-sm">
                                                <Play size={10} fill="currentColor" />
                                                <span className="text-[10px] font-black uppercase tracking-wider">Video</span>
                                            </div>
                                        ) : uc.bestAd === 'custom' ? (
                                            <div className="h-[22px] px-2 rounded-full bg-[#6366F1] flex items-center gap-1 text-white shadow-sm">
                                                <span className="text-[10px]">✨</span>
                                                <span className="text-[10px] font-black uppercase tracking-wider">Custom Sponsor</span>
                                            </div>
                                        ) : (
                                            <div className="h-[22px] px-2 rounded-full bg-[#333333] flex items-center gap-1 text-white shadow-sm">
                                                <MousePointerClick size={10} />
                                                <span className="text-[10px] font-black uppercase tracking-wider">Click</span>
                                            </div>
                                        )}
                                    </div>
                                    <Link to="/" className="text-[13px] font-black text-[#E8312A] hover:underline flex items-center gap-1 transition-colors">
                                        Try This <ArrowRight size={14} />
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Earnings Summary Section */}
            <div className="w-full bg-white py-12 px-5 flex flex-col items-center">
                <div className="w-full max-w-[600px] flex flex-col items-center">
                    <h2 className="text-[20px] font-black text-[#111] mb-1">How Earnings Are Calculated</h2>
                    <p className="text-[13px] text-textMid mb-6">Every number above is based on these consistent assumptions.</p>

                    <div className="w-full bg-white border border-border rounded-[14px] shadow-sm overflow-hidden mb-6">
                        <div className="w-full bg-surfaceAlt h-[32px] px-4 flex items-center border-b border-border">
                            <span className="flex-[1] text-[11px] font-extrabold text-textMid uppercase">Factor</span>
                            <span className="flex-[1] text-[11px] font-extrabold text-textMid uppercase">Value</span>
                            <span className="flex-[2] text-[11px] font-extrabold text-textMid uppercase">Notes</span>
                        </div>
                        {[
                            { f: "Unlock Rate", v: "60%", n: "Of viewers who click the link, 60% complete the ads" },
                            { f: "Video Ad CPM", v: "$0.065 per unlock", n: "Per completed video watch" },
                            { f: "Click Ad Rate", v: "$0.035 per click", n: "Per verified sponsor link click" },
                            { f: "Creator Share", v: "95%", n: "After 5% platform fee at payout" }
                        ].map((row, i) => (
                            <div key={i} className={`w-full p-4 flex flex-col sm:flex-row flex-wrap sm:items-center ${i > 0 ? 'border-t border-border' : ''}`}>
                                <span className="flex-[1] text-[13px] font-bold text-[#111]">{row.f}</span>
                                <span className="flex-[1] text-[13px] font-black text-brand">{row.v}</span>
                                <span className="flex-[2] text-[12px] font-semibold text-textMid">{row.n}</span>
                            </div>
                        ))}
                        <div className="w-full p-4 flex flex-col sm:flex-row flex-wrap sm:items-center border-t border-[#E5E7EB] bg-[#F5F3FF]">
                            <span className="flex-[1] text-[13px] font-bold text-[#111]">Custom Sponsor Rate</span>
                            <span className="flex-[1] text-[13px] font-black text-[#6366F1]">Your deal</span>
                            <span className="flex-[2] text-[12px] font-semibold text-[#4C1D95]">Negotiated directly — 0% AdGate commission</span>
                        </div>
                    </div>

                    <p className="text-[12px] font-medium text-textMid leading-[1.6] text-center max-w-[500px]">
                        Actual earnings vary by audience geography, niche relevance, and ad inventory. Creators in the US, UK, Canada, and Australia typically see higher rates. Custom Sponsor earnings are entirely independent of AdGate's ad network rates — your deal, your terms, your full earnings.
                    </p>
                </div>
            </div>

            {/* Bottom CTA */}
            <div className="w-full bg-[#0F4C2A] py-[48px] flex flex-col items-center">
                <div className="w-full max-w-[600px] px-5 flex flex-col items-center text-center">
                    <div className="text-[48px] mb-4">🌳</div>
                    <h2 className="text-[24px] font-black text-white mb-2">Start earning today. It's free.</h2>
                    <p className="text-[14px] font-bold text-white/70 mb-8">95% yours. 5% fee. 0% risk.</p>
                    <Link to="/" className="w-full sm:w-[200px] h-[52px] bg-[#E8312A] text-white font-extrabold text-[15px] rounded-[14px] flex items-center justify-center hover:bg-[#C42823] transition-colors shadow-sm">
                        Create Your First Link
                    </Link>
                </div>
            </div>

            {/* Standard Footer */}
            <footer className="w-full bg-white border-t border-border py-12 px-4 flex flex-col items-center">
                <div className="w-full max-w-[1000px] flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2 opacity-80">
                        <div className="w-6 h-6 rounded-[14px] bg-text text-white flex items-center justify-center font-black text-[10px] leading-none shrink-0">
                            AG
                        </div>
                        <span className="font-black text-[16px] tracking-tight text-text">AdGate</span>
                    </div>

                    <div className="flex items-center gap-6 text-[13px] font-bold text-textMid">
                        <Link to="/explore" className="hover:text-text transition-colors">Explore</Link>
                        <a href="#" className="hover:text-text transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-text transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-text transition-colors">Contact</a>
                    </div>

                    <div className="text-[12px] font-bold text-textLight">
                        © {new Date().getFullYear()} AdGate Inc. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};
