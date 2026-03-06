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
