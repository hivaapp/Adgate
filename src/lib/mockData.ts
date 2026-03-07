export interface User {
    id: string;
    name: string;
    username: string;
    email: string;
    avatarInitial: string;
    bio: string;
    website: string;
    stripeConnected: boolean;
    totalEarned: number;
    thisMonth: number;
    availableToWithdraw: number;
    joinedDate: string;
    hasSeenOnboarding: boolean;
    referral?: {
        referralCode: string;
        referralLink: string;
        totalReferrals: number;
        activeReferrals: number;
        totalReferralEarnings: number;
        thisMonthReferralEarnings: number;
        pendingReferralEarnings: number;
        referralTier: string;
    };
    myTrees?: {
        totalTreesPlanted: number;
        co2OffsetKg: number;
        firstTreeDate: string;
        treesThisMonth: number;
        treesFromReferrals: number;
        equivalentDrivingKm: number;
    };
}

export const currentUser: User = {
    id: "u_123",
    name: "Alex Creator",
    username: "alexcreator",
    email: "alex@example.com",
    avatarInitial: "A",
    bio: "Creating tools and resources for designers and developers.",
    website: "https://alexcreator.com",
    stripeConnected: false,
    totalEarned: 47.32,
    thisMonth: 12.80,
    availableToWithdraw: 22.10,
    joinedDate: "2024-01-15T00:00:00Z",
    hasSeenOnboarding: false,
    referral: {
        referralCode: "ALEX8K2P",
        referralLink: "https://adgate.io/join/ALEX8K2P",
        totalReferrals: 7,
        activeReferrals: 5,
        totalReferralEarnings: 18.43,
        thisMonthReferralEarnings: 4.20,
        pendingReferralEarnings: 1.85,
        referralTier: "Silver"
    },
    myTrees: {
        totalTreesPlanted: 23,
        co2OffsetKg: 460,
        firstTreeDate: "2024-02-01T00:00:00Z",
        treesThisMonth: 4,
        treesFromReferrals: 6,
        equivalentDrivingKm: 2300
    }
};

export const mockLinks = [
    {
        id: "link_01",
        slug: "design-system-pro",
        title: "Pro Design System UI Kit",
        description: "A complete professional design system for Figma with 1000+ components.",
        fileType: "ZIP",
        fileName: "DesignSystemPro.zip",
        fileSize: "24.5 MB",
        adCount: 3,
        adSource: "platform",
        adType: "video",
        donateEnabled: true,
        isActive: true,
        viewCount: 1420,
        unlockCount: 840,
        earned: 15.20,
        conversionRate: "59.1%",
        createdAt: "2024-02-10T10:00:00Z",
        geography: [{ country: "US", percent: 45 }, { country: "UK", percent: 20 }, { country: "IN", percent: 15 }],
        deviceSplit: { mobile: 65, desktop: 30, tablet: 5 },
    },
    {
        id: "link_02",
        slug: "midjourney-prompts",
        title: "100+ Midjourney Prompts for Character Design",
        description: "My personal collection of prompts for generating consistent and detailed characters.",
        fileType: "PDF",
        fileName: "Midjourney_Characters.pdf",
        fileSize: "4.2 MB",
        adCount: 1,
        adSource: "custom",
        adType: "click",
        customAd: {
            fileName: "novamind-promo.mp4",
            fileSize: 10240000,
            fileMimeType: "video/mp4",
            previewUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800",
            redirectUrl: "https://example.com/novamind",
            requiresClick: true,
            ctaText: "Try Free",
            brandName: "NovaMind AI",
            skipAfter: 5,
            impressions: 890,
            videoWatches: 650,
            clicks: 612
        },
        donateEnabled: false,
        isActive: true,
        viewCount: 890,
        unlockCount: 612,
        earned: 8.56,
        conversionRate: "68.7%",
        createdAt: "2024-03-01T14:30:00Z",
        geography: [{ country: "US", percent: 50 }, { country: "CA", percent: 15 }, { country: "AU", percent: 10 }],
        deviceSplit: { mobile: 80, desktop: 15, tablet: 5 },
    },
    {
        id: "link_03",
        slug: "notion-habit-tracker",
        title: "Ultimate Notion Habit Tracker",
        description: "Track your daily, weekly, and monthly habits with this aesthetic Notion template.",
        fileType: "LINK",
        fileName: "Notion Template Link",
        fileSize: "0 KB",
        adCount: 1,
        adSource: "platform",
        adType: "video",
        donateEnabled: true,
        isActive: true,
        viewCount: 3045,
        unlockCount: 2150,
        earned: 22.45,
        conversionRate: "70.6%",
        createdAt: "2024-01-20T09:15:00Z",
        geography: [{ country: "US", percent: 40 }, { country: "IN", percent: 25 }, { country: "UK", percent: 15 }],
        deviceSplit: { mobile: 55, desktop: 40, tablet: 5 },
    },
    {
        id: "link_04",
        slug: "react-auth-boilerplate",
        title: "React Auth Boilerplate (Firebase)",
        description: "Start your next project quickly with this pre-configured React + Firebase authentication boilerplate.",
        fileType: "ZIP",
        fileName: "react-auth-starter.zip",
        fileSize: "1.8 MB",
        adCount: 1,
        adSource: "custom",
        adType: "video",
        customAd: {
            fileName: "flowdesk-demo.mp4",
            fileSize: 4500000,
            fileMimeType: "video/mp4",
            previewUrl: "",
            redirectUrl: "https://example.com/flowdesk",
            requiresClick: true,
            ctaText: "Learn More",
            brandName: "FlowDesk Tools",
            skipAfter: 5,
            impressions: 450,
            videoWatches: 180,
            clicks: 120
        },
        donateEnabled: false,
        isActive: true,
        viewCount: 450,
        unlockCount: 120,
        earned: 1.11,
        conversionRate: "26.6%",
        createdAt: "2024-04-05T16:45:00Z",
        geography: [{ country: "IN", percent: 40 }, { country: "US", percent: 30 }, { country: "DE", percent: 10 }],
        deviceSplit: { mobile: 20, desktop: 78, tablet: 2 },
    },
    {
        id: "link_05",
        slug: "freelance-contract-template",
        title: "Freelance Client Contract Template",
        description: "The exact contract I use to protect myself as a freelance designer.",
        fileType: "DOC",
        fileName: "Freelance_Contract.docx",
        fileSize: "125 KB",
        adCount: 3,
        adSource: "platform",
        adType: "video",
        donateEnabled: true,
        isActive: false,
        viewCount: 210,
        unlockCount: 85,
        earned: 0.00,
        conversionRate: "40.4%",
        createdAt: "2023-11-12T11:20:00Z",
        geography: [{ country: "US", percent: 70 }, { country: "UK", percent: 10 }, { country: "CA", percent: 5 }],
        deviceSplit: { mobile: 50, desktop: 45, tablet: 5 },
    },
    {
        id: "link_06",
        slug: "youtube-thumbnail-pack",
        title: "Viral YouTube Thumbnail PSDs",
        description: "5 fully editable Photoshop templates for high-CTR thumbnails.",
        fileType: "ZIP",
        fileName: "YT_Thumbnails.zip",
        fileSize: "45.2 MB",
        adCount: 1,
        adSource: "custom",
        adType: "click",
        customAd: {
            fileName: "creatorpro-app.mp4",
            fileSize: 8500000,
            fileMimeType: "video/mp4",
            previewUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800",
            redirectUrl: "https://example.com/creatorpro",
            requiresClick: true,
            ctaText: "Shop Now",
            brandName: "CreatorPro App",
            skipAfter: 5,
            impressions: 110,
            videoWatches: 0,
            clicks: 0
        },
        donateEnabled: false,
        isActive: true,
        viewCount: 110,
        unlockCount: 0,
        earned: 0.00,
        conversionRate: "0%",
        createdAt: "2024-04-18T08:00:00Z",
        geography: [],
        deviceSplit: { mobile: 0, desktop: 0, tablet: 0 },
    }
];

export const mockActivity = [
    { id: "act_1", type: "unlock", description: "Someone in United States unlocked", timestamp: "2 mins ago", earned: 0.04, resourceTitle: "Pro Design System UI Kit" },
    { id: "act_2", type: "unlock", description: "Someone in India unlocked", timestamp: "15 mins ago", earned: 0.02, resourceTitle: "React Auth Boilerplate" },
    { id: "act_3", type: "tip", description: "Tree donation made from unlock", timestamp: "1 hour ago", earned: 0.00, resourceTitle: "Notion Habit Tracker" },
    { id: "act_4", type: "unlock", description: "Someone in UK unlocked", timestamp: "2 hours ago", earned: 0.03, resourceTitle: "Ultimate Notion Habit Tracker" },
    { id: "act_5", type: "unlock", description: "Someone in Canada unlocked", timestamp: "5 hours ago", earned: 0.04, resourceTitle: "100+ Midjourney Prompts" },
    { id: "act_6", type: "payout", description: "Payout to Stripe initiated", timestamp: "Yesterday", earned: -25.00, resourceTitle: "" },
    { id: "act_7", type: "unlock", description: "Someone in Australia unlocked", timestamp: "Yesterday", earned: 0.04, resourceTitle: "100+ Midjourney Prompts" },
    { id: "act_8", type: "creation", description: "Created new link", timestamp: "3 days ago", earned: 0.00, resourceTitle: "Viral YouTube Thumbnail PSDs" },
    { id: "act_9", type: "unlock", description: "Someone in Germany unlocked", timestamp: "3 days ago", earned: 0.03, resourceTitle: "Pro Design System UI Kit" },
    { id: "act_10", type: "unlock", description: "Someone in France unlocked", timestamp: "4 days ago", earned: 0.03, resourceTitle: "Pro Design System UI Kit" },
];

export const mockPayoutHistory = [
    { id: "pay_1", amount: 25.00, status: "pending", period: "April 2024", transferId: "tr_pending", createdAt: "2024-04-18T10:00:00Z" },
    { id: "pay_2", amount: 32.50, status: "completed", period: "March 2024", transferId: "tr_18fHajXw9", createdAt: "2024-04-01T10:00:00Z" },
    { id: "pay_3", amount: 15.20, status: "completed", period: "February 2024", transferId: "tr_92kLpsVn2", createdAt: "2024-03-01T10:00:00Z" },
    { id: "pay_4", amount: 20.00, status: "completed", period: "January 2024", transferId: "tr_34mBrtYq1", createdAt: "2024-02-01T10:00:00Z" },
];

export const mockEarningsData = [
    { date: "Apr 5", amount: 0.45 },
    { date: "Apr 6", amount: 0.60 },
    { date: "Apr 7", amount: 1.10 },
    { date: "Apr 8", amount: 0.85 },
    { date: "Apr 9", amount: 1.40 },
    { date: "Apr 10", amount: 2.10 },
    { date: "Apr 11", amount: 1.80 },
    { date: "Apr 12", amount: 1.50 },
    { date: "Apr 13", amount: 0.90 },
    { date: "Apr 14", amount: 1.25 },
    { date: "Apr 15", amount: 1.70 },
    { date: "Apr 16", amount: 2.45 },
    { date: "Apr 17", amount: 2.15 },
    { date: "Apr 18", amount: 1.65 },
];

export const mockCreatorProfile = { ...currentUser, links: mockLinks.filter(l => l.isActive) };

export const mockExploreResources: any[] = [
    {
        id: "exp_1", slug: "100-chatgpt-prompts-marketers", title: "100 ChatGPT Prompts for Marketers", description: "Boost your marketing with these prompts.", creatorName: "Prompt Lab", creatorUsername: "promptlab", creatorAvatarInitial: "P", creatorAvatarColor: "#F59E0B", category: "AI & Prompts", fileType: "PDF", fileEmoji: "📄", adSource: "platform", adType: "video", adCount: 2, requiresClick: false, brandName: null, ctaText: null, donateEnabled: true, unlockCount: 4820, fileSize: "2.1 MB", createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), isNew: true, isTrending: true, isFeatured: false
    },
    {
        id: "exp_2", slug: "figma-mobile-ui-kit-2025", title: "Figma Mobile UI Kit 2025", description: "Modern UI components for Figma apps.", creatorName: "UI Designs", creatorUsername: "uidesigns", creatorAvatarInitial: "U", creatorAvatarColor: "#8B5CF6", category: "Design", fileType: "ZIP", fileEmoji: "📦", adSource: "custom", adType: "video", adCount: 1, requiresClick: true, brandName: "Notion", ctaText: "Try Notion Free", donateEnabled: false, unlockCount: 3240, fileSize: "45 MB", createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), isNew: false, isTrending: false, isFeatured: true
    },
    {
        id: "exp_3", slug: "30-day-fitness-plan", title: "30-Day Fitness Plan PDF", description: "A simple plan to get fit in 30 days.", creatorName: "Fit Coach", creatorUsername: "fitcoach", creatorAvatarInitial: "F", creatorAvatarColor: "#10B981", category: "Fitness", fileType: "PDF", fileEmoji: "📄", adSource: "platform", adType: "click", adCount: 1, requiresClick: false, brandName: null, ctaText: null, donateEnabled: true, unlockCount: 2190, fileSize: "3.5 MB", createdAt: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString(), isNew: false, isTrending: false, isFeatured: false
    },
    {
        id: "exp_4", slug: "python-cheat-sheet", title: "Python Cheat Sheet Pack", description: "Learn Python syntax fast.", creatorName: "Dev Hints", creatorUsername: "devhints", creatorAvatarInitial: "D", creatorAvatarColor: "#3B82F6", category: "Coding", fileType: "PDF", fileEmoji: "📄", adSource: "platform", adType: "video", adCount: 1, requiresClick: false, brandName: null, ctaText: null, donateEnabled: true, unlockCount: 6750, fileSize: "1.2 MB", createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(), isNew: false, isTrending: true, isFeatured: true
    },
    {
        id: "exp_5", slug: "lightroom-preset-collection", title: "Lightroom Preset Collection", description: "Professional filters for Lightroom.", creatorName: "Lens Works", creatorUsername: "lens.works", creatorAvatarInitial: "L", creatorAvatarColor: "#EC4899", category: "Photography", fileType: "ZIP", fileEmoji: "📦", adSource: "custom", adType: "video", adCount: 1, requiresClick: true, brandName: "Adobe", ctaText: "Explore Adobe", donateEnabled: true, unlockCount: 1830, fileSize: "12 MB", createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), isNew: false, isTrending: false, isFeatured: false
    },
    {
        id: "exp_6", slug: "notion-business-template", title: "Notion Business Template", description: "Organize your business in Notion.", creatorName: "Workflow Pro", creatorUsername: "workflowpro", creatorAvatarInitial: "W", creatorAvatarColor: "#6B7280", category: "Business", fileType: "ZIP", fileEmoji: "📦", adSource: "platform", adType: "click", adCount: 2, requiresClick: false, brandName: null, ctaText: null, donateEnabled: false, unlockCount: 987, fileSize: "5.5 MB", createdAt: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(), isNew: false, isTrending: false, isFeatured: false
    },
    {
        id: "exp_7", slug: "ai-art-midjourney-prompts", title: "AI Art Midjourney Prompt Pack", description: "Beautiful AI art prompts.", creatorName: "AI Artist", creatorUsername: "aiartist", creatorAvatarInitial: "A", creatorAvatarColor: "#EF4444", category: "AI & Prompts", fileType: "TXT", fileEmoji: "📝", adSource: "custom", adType: "video", adCount: 1, requiresClick: true, brandName: "Canva", ctaText: "Try Canva Free", donateEnabled: true, unlockCount: 5610, fileSize: "15 KB", createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), isNew: false, isTrending: true, isFeatured: false
    },
    {
        id: "exp_8", slug: "guitar-chord-chart", title: "Guitar Chord Chart PDF", description: "Essential chords for beginners.", creatorName: "Chord Daily", creatorUsername: "chord.daily", creatorAvatarInitial: "C", creatorAvatarColor: "#14B8A6", category: "Music", fileType: "PDF", fileEmoji: "📄", adSource: "platform", adType: "video", adCount: 1, requiresClick: false, brandName: null, ctaText: null, donateEnabled: true, unlockCount: 1120, fileSize: "2.8 MB", createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), isNew: true, isTrending: false, isFeatured: false
    },
    {
        id: "exp_9", slug: "email-marketing-playbook", title: "Email Marketing Playbook", description: "The ultimate playbook for email ROI.", creatorName: "Growth Hack", creatorUsername: "growthhack", creatorAvatarInitial: "G", creatorAvatarColor: "#F59E0B", category: "Business", fileType: "PDF", fileEmoji: "📄", adSource: "platform", adType: "click", adCount: 3, requiresClick: false, brandName: null, ctaText: null, donateEnabled: false, unlockCount: 743, fileSize: "4 MB", createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(), isNew: false, isTrending: false, isFeatured: false
    },
    {
        id: "exp_10", slug: "canva-instagram-templates", title: "Canva Instagram Templates", description: "Ready to use templates.", creatorName: "Design Spark", creatorUsername: "designspark", creatorAvatarInitial: "D", creatorAvatarColor: "#8B5CF6", category: "Design", fileType: "ZIP", fileEmoji: "📦", adSource: "platform", adType: "video", adCount: 1, requiresClick: false, brandName: null, ctaText: null, donateEnabled: true, unlockCount: 8930, fileSize: "18 MB", createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(), isNew: false, isTrending: false, isFeatured: true
    },
    {
        id: "exp_11", slug: "keto-meal-prep-guide", title: "Keto Meal Prep Guide", description: "Meal prepping recipes and plans.", creatorName: "Keto Life", creatorUsername: "ketolife", creatorAvatarInitial: "K", creatorAvatarColor: "#10B981", category: "Fitness", fileType: "PDF", fileEmoji: "📄", adSource: "custom", adType: "video", adCount: 1, requiresClick: true, brandName: "MyFitnessPal", ctaText: "Track With MFP", donateEnabled: true, unlockCount: 2450, fileSize: "8 MB", createdAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(), isNew: false, isTrending: false, isFeatured: false
    },
    {
        id: "exp_12", slug: "javascript-interview-questions", title: "JavaScript Interview Questions", description: "Ace your next tech interview.", creatorName: "JS Master", creatorUsername: "jsmaster", creatorAvatarInitial: "J", creatorAvatarColor: "#FBBF24", category: "Coding", fileType: "PDF", fileEmoji: "📄", adSource: "platform", adType: "video", adCount: 2, requiresClick: false, brandName: null, ctaText: null, donateEnabled: false, unlockCount: 3870, fileSize: "5.5 MB", createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(), isNew: false, isTrending: true, isFeatured: false
    },
    {
        id: "exp_13", slug: "fantasy-story-templates", title: "Fantasy Story Writing Templates", description: "Worldbuilding and plotting templates.", creatorName: "Story Craft", creatorUsername: "storycraft", creatorAvatarInitial: "S", creatorAvatarColor: "#EC4899", category: "Writing", fileType: "PDF", fileEmoji: "📄", adSource: "custom", adType: "video", adCount: 1, requiresClick: true, brandName: "Grammarly", ctaText: "Write Better Free", donateEnabled: true, unlockCount: 890, fileSize: "3.2 MB", createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), isNew: true, isTrending: false, isFeatured: false
    },
    {
        id: "exp_14", slug: "stock-trading-cheat-sheet", title: "Stock Trading Cheat Sheet", description: "Quick reference guide for traders.", creatorName: "Trade Wise", creatorUsername: "tradewise", creatorAvatarInitial: "T", creatorAvatarColor: "#10B981", category: "Finance", fileType: "PDF", fileEmoji: "📄", adSource: "platform", adType: "click", adCount: 1, requiresClick: false, brandName: null, ctaText: null, donateEnabled: false, unlockCount: 1560, fileSize: "1.5 MB", createdAt: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(), isNew: false, isTrending: false, isFeatured: false
    },
    {
        id: "exp_15", slug: "language-learning-vocab-pack", title: "Language Learning Vocabulary Pack", description: "Flashcards and vocab lists.", creatorName: "Polyglot AI", creatorUsername: "polyglot.ai", creatorAvatarInitial: "P", creatorAvatarColor: "#3B82F6", category: "Education", fileType: "ZIP", fileEmoji: "📦", adSource: "platform", adType: "video", adCount: 1, requiresClick: false, brandName: null, ctaText: null, donateEnabled: true, unlockCount: 4120, fileSize: "15 MB", createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(), isNew: false, isTrending: false, isFeatured: false
    },
    {
        id: "exp_16", slug: "minecraft-build-blueprint", title: "Minecraft Build Blueprint Pack", description: "Awesome house and castle blueprints.", creatorName: "Block Vault", creatorUsername: "blockvault", creatorAvatarInitial: "B", creatorAvatarColor: "#14B8A6", category: "Gaming", fileType: "ZIP", fileEmoji: "📦", adSource: "custom", adType: "video", adCount: 1, requiresClick: false, brandName: "Discord", ctaText: "Join Discord", donateEnabled: false, unlockCount: 2780, fileSize: "32 MB", createdAt: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000).toISOString(), isNew: false, isTrending: false, isFeatured: false
    },
    {
        id: "exp_17", slug: "procreate-brush-collection", title: "Procreate Brush Collection", description: "Watercolor and ink brushes.", creatorName: "Art Brush", creatorUsername: "artbrush", creatorAvatarInitial: "A", creatorAvatarColor: "#F43F5E", category: "Design", fileType: "ZIP", fileEmoji: "📦", adSource: "platform", adType: "video", adCount: 3, requiresClick: false, brandName: null, ctaText: null, donateEnabled: true, unlockCount: 1340, fileSize: "60 MB", createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), isNew: true, isTrending: false, isFeatured: false
    },
    {
        id: "exp_18", slug: "freelance-contract-template", title: "Freelance Contract Template", description: "A simple boilerplate contract.", creatorName: "Freelance Pro", creatorUsername: "freelancepro", creatorAvatarInitial: "F", creatorAvatarColor: "#6B7280", category: "Business", fileType: "PDF", fileEmoji: "📄", adSource: "platform", adType: "click", adCount: 2, requiresClick: false, brandName: null, ctaText: null, donateEnabled: false, unlockCount: 670, fileSize: "1.2 MB", createdAt: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000).toISOString(), isNew: false, isTrending: false, isFeatured: false
    },
    {
        id: "exp_19", slug: "claude-ai-system-prompts", title: "Claude AI System Prompts", description: "Advanced system prompt setups.", creatorName: "AI Builder", creatorUsername: "aibuilder", creatorAvatarInitial: "A", creatorAvatarColor: "#8B5CF6", category: "AI & Prompts", fileType: "TXT", fileEmoji: "📝", adSource: "custom", adType: "video", adCount: 1, requiresClick: true, brandName: "Notion", ctaText: "Get Notion Free", donateEnabled: true, unlockCount: 3320, fileSize: "25 KB", createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), isNew: false, isTrending: true, isFeatured: false
    },
    {
        id: "exp_20", slug: "home-workout-no-equipment", title: "Home Workout No Equipment Guide", description: "Get fit anywhere, anytime.", creatorName: "Home Gym", creatorUsername: "homegym", creatorAvatarInitial: "H", creatorAvatarColor: "#F97316", category: "Fitness", fileType: "PDF", fileEmoji: "📄", adSource: "custom", adType: "video", adCount: 1, requiresClick: false, brandName: "Whoop", ctaText: "Try Whoop", donateEnabled: true, unlockCount: 1890, fileSize: "6.5 MB", createdAt: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000).toISOString(), isNew: false, isTrending: false, isFeatured: false
    },
    {
        id: "exp_21", slug: "react-component-library", title: "React Component Library", description: "A fully built UI component library for React.", creatorName: "React Dev", creatorUsername: "reactdev", creatorAvatarInitial: "R", creatorAvatarColor: "#0EA5E9", category: "Coding", fileType: "ZIP", fileEmoji: "📦", adSource: "platform", adType: "video", adCount: 2, requiresClick: false, brandName: null, ctaText: null, donateEnabled: false, unlockCount: 2140, fileSize: "22 MB", createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), isNew: false, isTrending: false, isFeatured: false
    },
    {
        id: "exp_22", slug: "wedding-photo-presets", title: "Wedding Photo Editing Presets", description: "Beautiful presets for lightroom.", creatorName: "Wedding Frame", creatorUsername: "weddingframe", creatorAvatarInitial: "W", creatorAvatarColor: "#EC4899", category: "Photography", fileType: "ZIP", fileEmoji: "📦", adSource: "custom", adType: "video", adCount: 1, requiresClick: true, brandName: "Pixlr", ctaText: "Edit Free on Pixlr", donateEnabled: true, unlockCount: 760, fileSize: "4.5 MB", createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), isNew: true, isTrending: false, isFeatured: false
    },
    {
        id: "exp_23", slug: "viral-tweet-templates", title: "Viral Tweet Templates", description: "Formats for guaranteed engagement.", creatorName: "Twitter Growth", creatorUsername: "twittergrowth", creatorAvatarInitial: "T", creatorAvatarColor: "#3B82F6", category: "Writing", fileType: "TXT", fileEmoji: "📝", adSource: "platform", adType: "click", adCount: 1, requiresClick: false, brandName: null, ctaText: null, donateEnabled: false, unlockCount: 5240, fileSize: "12 KB", createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(), isNew: false, isTrending: true, isFeatured: false
    },
    {
        id: "exp_24", slug: "dnd-character-sheet", title: "Dungeons & Dragons Character Sheet Pack", description: "Customizable character sheets.", creatorName: "RPG Vault", creatorUsername: "rpgvault", creatorAvatarInitial: "R", creatorAvatarColor: "#EF4444", category: "Gaming", fileType: "PDF", fileEmoji: "📄", adSource: "platform", adType: "video", adCount: 1, requiresClick: false, brandName: null, ctaText: null, donateEnabled: true, unlockCount: 1050, fileSize: "2.5 MB", createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), isNew: false, isTrending: false, isFeatured: false
    }
];

export const referredCreators = [
    { id: "ref_1", name: "Sarah Market", username: "sarahmarket", avatarInitial: "S", joinedViaReferral: "2024-03-01T00:00:00Z", totalEarned: 120.50, yourCut: 6.03, thisMonthEarned: 45.00, yourCutThisMonth: 2.25, isActive: true, resourceCount: 4, lastActive: "2 days ago" },
    { id: "ref_2", name: "Dev Dave", username: "devdave", avatarInitial: "D", joinedViaReferral: "2024-03-10T00:00:00Z", totalEarned: 85.00, yourCut: 4.25, thisMonthEarned: 20.00, yourCutThisMonth: 1.00, isActive: true, resourceCount: 2, lastActive: "1 week ago" },
    { id: "ref_3", name: "Video Creator", username: "vidcreator", avatarInitial: "V", joinedViaReferral: "2024-03-15T00:00:00Z", totalEarned: 210.00, yourCut: 10.50, thisMonthEarned: 15.00, yourCutThisMonth: 0.75, isActive: true, resourceCount: 6, lastActive: "3 days ago" },
    { id: "ref_4", name: "Artist Anna", username: "annaart", avatarInitial: "A", joinedViaReferral: "2024-03-20T00:00:00Z", totalEarned: 42.00, yourCut: 2.10, thisMonthEarned: 4.00, yourCutThisMonth: 0.20, isActive: true, resourceCount: 3, lastActive: "1 day ago" },
    { id: "ref_5", name: "Founder Joe", username: "founderjoe", avatarInitial: "F", joinedViaReferral: "2024-04-01T00:00:00Z", totalEarned: 0.00, yourCut: 0.00, thisMonthEarned: 0.00, yourCutThisMonth: 0.00, isActive: false, resourceCount: 0, lastActive: "2 weeks ago" },
    { id: "ref_6", name: "JS Ninja", username: "jsninja", avatarInitial: "J", joinedViaReferral: "2024-04-05T00:00:00Z", totalEarned: 65.00, yourCut: 3.25, thisMonthEarned: 65.00, yourCutThisMonth: 3.25, isActive: true, resourceCount: 5, lastActive: "4 hours ago" },
    { id: "ref_7", name: "Photo Pro", username: "photopro", avatarInitial: "P", joinedViaReferral: "2024-04-10T00:00:00Z", totalEarned: 15.00, yourCut: 0.75, thisMonthEarned: 15.00, yourCutThisMonth: 0.75, isActive: true, resourceCount: 1, lastActive: "just now" }
];

export const referralActivity = [
    { id: "rac_1", type: "earned", referredUsername: "jsninja", referredAvatarInitial: "J", amount: 20.00, yourCut: 1.00, timestamp: "2 hours ago" },
    { id: "rac_2", type: "joined", referredUsername: "photopro", referredAvatarInitial: "P", amount: 0, yourCut: 0, timestamp: "1 day ago" },
    { id: "rac_3", type: "earned", referredUsername: "vidcreator", referredAvatarInitial: "V", amount: 50.00, yourCut: 2.50, timestamp: "2 days ago" },
    { id: "rac_4", type: "earned", referredUsername: "sarahmarket", referredAvatarInitial: "S", amount: 15.00, yourCut: 0.75, timestamp: "3 days ago" },
    { id: "rac_5", type: "joined", referredUsername: "jsninja", referredAvatarInitial: "J", amount: 0, yourCut: 0, timestamp: "1 week ago" },
    { id: "rac_6", type: "earned", referredUsername: "devdave", referredAvatarInitial: "D", amount: 10.00, yourCut: 0.50, timestamp: "1 week ago" },
    { id: "rac_7", type: "joined", referredUsername: "founderjoe", referredAvatarInitial: "F", amount: 0, yourCut: 0, timestamp: "2 weeks ago" },
    { id: "rac_8", type: "joined", referredUsername: "annaart", referredAvatarInitial: "A", amount: 0, yourCut: 0, timestamp: "3 weeks ago" },
    { id: "rac_9", type: "earned", referredUsername: "sarahmarket", referredAvatarInitial: "S", amount: 30.00, yourCut: 1.50, timestamp: "1 month ago" },
    { id: "rac_10", type: "joined", referredUsername: "vidcreator", referredAvatarInitial: "V", amount: 0, yourCut: 0, timestamp: "1 month ago" }
];

export const platformTrees = {
    totalTreesPlanted: 47283,
    totalCreatorsPlanting: 9840,
    totalCO2OffsetKg: 945660,
    treesThisMonth: 3847,
    treesThisWeek: 891,
    treesPlantedToday: 127,
    partnerOrganization: "One Tree Planted",
    countriesPlanted: [
        { country: "India", flag: "🇮🇳", trees: 14185, percentage: 30 },
        { country: "Brazil", flag: "🇧🇷", trees: 11820, percentage: 25 },
        { country: "Kenya", flag: "🇰🇪", trees: 9457, percentage: 20 },
        { country: "Indonesia", flag: "🇮🇩", trees: 4728, percentage: 10 },
        { country: "Madagascar", flag: "🇲🇬", trees: 2364, percentage: 5 },
        { country: "Peru", flag: "🇵🇪", trees: 1891, percentage: 4 },
        { country: "Philippines", flag: "🇵🇭", trees: 1418, percentage: 3 },
        { country: "Ghana", flag: "🇬🇭", trees: 1420, percentage: 3 }
    ]
};
