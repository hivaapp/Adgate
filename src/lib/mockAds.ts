export interface MockAd {
    id: string;
    brand: string;
    tagline: string;
    cta: string;
    bgColor: string;
    textColor: string;
    logo: string;
    url: string;
    category: string;
}

export const mockAds: MockAd[] = [
    {
        id: "ad_01",
        brand: "Spotify",
        tagline: "Listening is everything.",
        cta: "Try Free",
        bgColor: "#1DB954",
        textColor: "#FFFFFF",
        logo: "🎵",
        url: "https://spotify.com",
        category: "Music",
    },
    {
        id: "ad_02",
        brand: "Nike",
        tagline: "Just Do It.",
        cta: "Learn More",
        bgColor: "#000000",
        textColor: "#FFFFFF",
        logo: "👟",
        url: "https://nike.com",
        category: "Shopping",
    },
    {
        id: "ad_03",
        brand: "Notion",
        tagline: "One workspace. Every team.",
        cta: "Get Started",
        bgColor: "#F7F7F5",
        textColor: "#000000",
        logo: "📓",
        url: "https://notion.so",
        category: "Productivity",
    },
    {
        id: "ad_04",
        brand: "Figma",
        tagline: "How the internet builds software.",
        cta: "Get Started",
        bgColor: "#F24E1E",
        textColor: "#FFFFFF",
        logo: "🎨",
        url: "https://figma.com",
        category: "Creative",
    },
    {
        id: "ad_05",
        brand: "Shopify",
        tagline: "The platform commerce is built on.",
        cta: "Try Free",
        bgColor: "#95BF47",
        textColor: "#FFFFFF",
        logo: "🛍️",
        url: "https://shopify.com",
        category: "Shopping",
    },
    {
        id: "ad_06",
        brand: "Duolingo",
        tagline: "Learn a language for free. Forever.",
        cta: "Download Now",
        bgColor: "#58CC02",
        textColor: "#FFFFFF",
        logo: "🦉",
        url: "https://duolingo.com",
        category: "Education",
    },
    {
        id: "ad_07",
        brand: "Coursera",
        tagline: "Build Skills with Online Courses from Top Institutions",
        cta: "Learn More",
        bgColor: "#0056D2",
        textColor: "#FFFFFF",
        logo: "🎓",
        url: "https://coursera.org",
        category: "Education",
    },
    {
        id: "ad_08",
        brand: "Canva",
        tagline: "Empowering the world to design.",
        cta: "Try Free",
        bgColor: "#00C4CC",
        textColor: "#FFFFFF",
        logo: "✨",
        url: "https://canva.com",
        category: "Creative",
    },
    {
        id: "ad_09",
        brand: "Adobe",
        tagline: "Creativity for all.",
        cta: "Get Started",
        bgColor: "#FF0000",
        textColor: "#FFFFFF",
        logo: "🖌️",
        url: "https://adobe.com",
        category: "Creative",
    },
    {
        id: "ad_10",
        brand: "Grammarly",
        tagline: "Great Writing, Simplified.",
        cta: "Try Free",
        bgColor: "#15C39A",
        textColor: "#FFFFFF",
        logo: "✍️",
        url: "https://grammarly.com",
        category: "Productivity",
    },
    {
        id: "ad_11",
        brand: "Dropbox",
        tagline: "Keep life organized and work moving.",
        cta: "Learn More",
        bgColor: "#0061FE",
        textColor: "#FFFFFF",
        logo: "📦",
        url: "https://dropbox.com",
        category: "Productivity",
    },
    {
        id: "ad_12",
        brand: "Slack",
        tagline: "Make work life simpler, more pleasant and more productive.",
        cta: "Get Started",
        bgColor: "#4A154B",
        textColor: "#FFFFFF",
        logo: "💬",
        url: "https://slack.com",
        category: "Productivity",
    },
];

export function getRandomAd(shownAdIds: string[]): MockAd {
    let availableAds = mockAds.filter((ad) => !shownAdIds.includes(ad.id));
    if (availableAds.length === 0) {
        // If all ads shown, start over
        availableAds = [...mockAds];
    }
    const randomIndex = Math.floor(Math.random() * availableAds.length);
    return availableAds[randomIndex];
}

export interface MockVideoAd {
    id: string;
    brand: string;
    tagline: string;
    duration: number; // 15, 20, 25, or 30
    skipAfter: number; // always 5
    backgroundColor: string;
    textColor: string;
    logoEmoji: string;
    destinationUrl: string;
    ctaText: string;
    videoSimulation: {
        headline: string;
        subtext: string;
        accentColor: string;
    };
    category: string;
}

export const mockVideoAds: MockVideoAd[] = [
    {
        id: "vid_01",
        brand: "Notion",
        tagline: "One workspace. Every team.",
        duration: 15,
        skipAfter: 5,
        backgroundColor: "#F7F7F5",
        textColor: "#000000",
        logoEmoji: "📓",
        destinationUrl: "https://notion.so",
        ctaText: "Get Started",
        videoSimulation: {
            headline: "Organize your entire life.",
            subtext: "Notes, tasks, wikis, and databases all in one place.",
            accentColor: "#EAEAEA"
        },
        category: "Productivity",
    },
    {
        id: "vid_02",
        brand: "Figma",
        tagline: "How the internet builds software.",
        duration: 20,
        skipAfter: 5,
        backgroundColor: "#1E1E1E",
        textColor: "#FFFFFF",
        logoEmoji: "🎨",
        destinationUrl: "https://figma.com",
        ctaText: "Try Figma Free",
        videoSimulation: {
            headline: "Design together, in real time.",
            subtext: "Collaborate on interfaces, prototypes, and more.",
            accentColor: "#F24E1E"
        },
        category: "Creative",
    },
    {
        id: "vid_03",
        brand: "Shopify",
        tagline: "The platform commerce is built on.",
        duration: 25,
        skipAfter: 5,
        backgroundColor: "#004C3F",
        textColor: "#FFFFFF",
        logoEmoji: "🛍️",
        destinationUrl: "https://shopify.com",
        ctaText: "Start Free Trial",
        videoSimulation: {
            headline: "Sell everywhere.",
            subtext: "Online, in person, and around the world.",
            accentColor: "#95BF47"
        },
        category: "Shopping",
    },
    {
        id: "vid_04",
        brand: "Duolingo",
        tagline: "Learn a language for free. Forever.",
        duration: 30,
        skipAfter: 5,
        backgroundColor: "#58CC02",
        textColor: "#FFFFFF",
        logoEmoji: "🦉",
        destinationUrl: "https://duolingo.com",
        ctaText: "Start Learning",
        videoSimulation: {
            headline: "Fun, free, and effective.",
            subtext: "Bite-sized lessons that feel like a game.",
            accentColor: "#89E219"
        },
        category: "Education",
    },
    {
        id: "vid_05",
        brand: "Adobe",
        tagline: "Creativity for all.",
        duration: 15,
        skipAfter: 5,
        backgroundColor: "#FF0000",
        textColor: "#FFFFFF",
        logoEmoji: "🖌️",
        destinationUrl: "https://adobe.com",
        ctaText: "Get Creative Cloud",
        videoSimulation: {
            headline: "Make it happen.",
            subtext: "The industry standard in creative software.",
            accentColor: "#B30000"
        },
        category: "Creative",
    },
    {
        id: "vid_06",
        brand: "Canva",
        tagline: "Empowering the world to design.",
        duration: 20,
        skipAfter: 5,
        backgroundColor: "#00C4CC",
        textColor: "#FFFFFF",
        logoEmoji: "✨",
        destinationUrl: "https://canva.com",
        ctaText: "Design for Free",
        videoSimulation: {
            headline: "What will you design today?",
            subtext: "Presentations, videos, social media, and more.",
            accentColor: "#7D2AE8"
        },
        category: "Creative",
    },
    {
        id: "vid_07",
        brand: "Coursera",
        tagline: "World-class learning for anyone, anywhere.",
        duration: 25,
        skipAfter: 5,
        backgroundColor: "#0056D2",
        textColor: "#FFFFFF",
        logoEmoji: "🎓",
        destinationUrl: "https://coursera.org",
        ctaText: "Explore Courses",
        videoSimulation: {
            headline: "Learn without limits.",
            subtext: "Gain new skills and advance your career.",
            accentColor: "#2A73CC"
        },
        category: "Education",
    },
    {
        id: "vid_08",
        brand: "Grammarly",
        tagline: "Great Writing, Simplified.",
        duration: 30,
        skipAfter: 5,
        backgroundColor: "#15C39A",
        textColor: "#FFFFFF",
        logoEmoji: "✍️",
        destinationUrl: "https://grammarly.com",
        ctaText: "Get Grammarly Free",
        videoSimulation: {
            headline: "Write with confidence.",
            subtext: "AI-powered writing assistance across all your apps.",
            accentColor: "#11A683"
        },
        category: "Productivity",
    }
];

export function getNextVideoAd(shownAdIds: string[]): MockVideoAd {
    let availableAds = mockVideoAds.filter((ad) => !shownAdIds.includes(ad.id));
    if (availableAds.length === 0) {
        // If all ads shown, start over
        availableAds = [...mockVideoAds];
    }
    const randomIndex = Math.floor(Math.random() * availableAds.length);
    return availableAds[randomIndex];
}
