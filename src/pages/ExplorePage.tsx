/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, X, Grid, List as ListIcon, ChevronRight, Play, MousePointerClick, Star } from 'lucide-react';
import { mockExploreResources } from '../lib/mockData';

const CATEGORIES = ['All', 'AI & Prompts', 'Design', 'Fitness', 'Coding', 'Business', 'Photography', 'Writing', 'Music', 'Gaming', 'Education', 'Finance'];
const SORTS = ['Most Unlocked', 'Newest First', 'Trending Now', 'Sponsored First', 'A–Z'];

const categoryBackgrounds: Record<string, string> = {
    'AI & Prompts': '#F3F1EC',
    'Design': '#FDF4EC',
    'Fitness': '#EBF5EE',
    'Coding': '#F3F1EC',
    'Business': '#FFF',
    'Photography': '#F3F1EC',
    'Writing': '#FDF4EC',
    'Music': '#EBF5EE',
    'Gaming': '#F3F1EC',
    'Education': '#F3F1EC',
    'Finance': '#EBF5EE'
};

const getAdFormatBadge = (resource: any) => {
    if (resource.adSource === 'platform') {
        if (resource.adType === 'video') {
            return {
                label: 'Video',
                backgroundColor: '#F3F1EC',
                textColor: '#6B6860',
                icon: <Play size={12} fill="currentColor" />,
                sublabel: `${resource.adCount} ad${resource.adCount > 1 ? 's' : ''}`
            };
        } else {
            return {
                label: 'Click',
                backgroundColor: '#F3F1EC',
                textColor: '#6B6860',
                icon: <MousePointerClick size={12} />,
                sublabel: `${resource.adCount} click${resource.adCount > 1 ? 's' : ''}`
            };
        }
    } else {
        if (resource.requiresClick) {
            return {
                label: 'Sponsor Action',
                backgroundColor: '#FAF0EB',
                textColor: '#D97757',
                icon: <div className="flex -space-x-[4px]"><Play size={10} fill="currentColor" /><MousePointerClick size={10} /></div>,
                sublabel: `via ${resource.brandName}`
            };
        } else {
            return {
                label: 'Sponsor Video',
                backgroundColor: '#FAF0EB',
                textColor: '#D97757',
                icon: <Play size={12} fill="currentColor" />,
                sublabel: `via ${resource.brandName}`
            };
        }
    }
};

const formatCount = (count: number) => {
    if (count >= 1000) return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    return count.toString();
};

export const ExplorePage = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    // Filters
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
    const [sponsoredFilter, setSponsoredFilter] = useState(searchParams.get('sponsored') === 'true');
    const [treesFilter, setTreesFilter] = useState(searchParams.get('trees') === 'true');
    const [formatFilter, setFormatFilter] = useState(searchParams.get('format') || 'All Formats');
    const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'Most Unlocked');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    const [visibleCount, setVisibleCount] = useState(12);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [infoSheetFormat, setInfoSheetFormat] = useState<any>(null);

    // Initial scroll restoration
    useEffect(() => {
        const savedScroll = sessionStorage.getItem('adgate_explore_scroll');
        if (savedScroll) {
            setTimeout(() => window.scrollTo(0, parseInt(savedScroll, 10)), 10);
        }
        const handleScroll = () => {
            sessionStorage.setItem('adgate_explore_scroll', window.scrollY.toString());
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Sync state to URL
    useEffect(() => {
        const params = new URLSearchParams();
        if (selectedCategory !== 'All') params.set('category', selectedCategory);
        if (sponsoredFilter) params.set('sponsored', 'true');
        if (treesFilter) params.set('trees', 'true');
        if (formatFilter !== 'All Formats') params.set('format', formatFilter);
        if (sortBy !== 'Most Unlocked') params.set('sort', sortBy);
        setSearchParams(params, { replace: true });
    }, [selectedCategory, sponsoredFilter, treesFilter, formatFilter, sortBy, setSearchParams]);

    // Handle search debounce
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 150);
        return () => clearTimeout(handler);
    }, [searchQuery]);

    const filteredResources = useMemo(() => {
        let res = [...mockExploreResources];

        const q = debouncedSearchQuery.toLowerCase().trim();
        if (q) {
            res = res.filter(r =>
                r.title.toLowerCase().includes(q) ||
                r.creatorUsername.toLowerCase().includes(q) ||
                (r.brandName && r.brandName.toLowerCase().includes(q)) ||
                r.category.toLowerCase().includes(q)
            );
        }

        if (selectedCategory !== 'All') {
            res = res.filter(r => r.category === selectedCategory);
        }

        if (sponsoredFilter) {
            res = res.filter(r => r.adSource === 'custom');
        }

        if (treesFilter) {
            res = res.filter(r => r.donateEnabled);
        }

        if (formatFilter === 'Platform Ads') {
            res = res.filter(r => r.adSource === 'platform');
        } else if (formatFilter === 'Click Ads') {
            res = res.filter(r => r.adSource === 'platform' && r.adType === 'click');
        } else if (formatFilter === 'Watch + Click') {
            res = res.filter(r => r.adSource === 'custom' && r.requiresClick);
        }

        // Sort
        if (sortBy === 'Newest First') {
            res.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        } else if (sortBy === 'Trending Now') {
            res.sort((a, b) => {
                // eslint-disable-next-line react-hooks/purity
                const aDays = Math.max(1, (Date.now() - new Date(a.createdAt).getTime()) / (1000 * 60 * 60 * 24));
                // eslint-disable-next-line react-hooks/purity
                const bDays = Math.max(1, (Date.now() - new Date(b.createdAt).getTime()) / (1000 * 60 * 60 * 24));
                return (b.unlockCount / bDays) - (a.unlockCount / aDays);
            });
        } else if (sortBy === 'Sponsored First') {
            res.sort((a, b) => {
                if (a.adSource === 'custom' && b.adSource !== 'custom') return -1;
                if (a.adSource !== 'custom' && b.adSource === 'custom') return 1;
                return b.unlockCount - a.unlockCount;
            });
        } else if (sortBy === 'A–Z') {
            res.sort((a, b) => a.title.localeCompare(b.title));
        } else {
            // Most Unlocked (default)
            res.sort((a, b) => b.unlockCount - a.unlockCount);
        }

        return res;
    }, [debouncedSearchQuery, selectedCategory, sponsoredFilter, treesFilter, formatFilter, sortBy]);

    const visibleList = filteredResources.slice(0, visibleCount);
    const featuredResources = mockExploreResources.filter(r => r.isFeatured);

    const handleLoadMore = () => {
        setIsLoadingMore(true);
        setTimeout(() => {
            setVisibleCount(prev => prev + 12);
            setIsLoadingMore(false);
        }, 800);
    };

    const hasActiveFilters = selectedCategory !== 'All' || sponsoredFilter || treesFilter || formatFilter !== 'All Formats' || sortBy !== 'Most Unlocked';

    const clearAllFilters = () => {
        setSelectedCategory('All');
        setSponsoredFilter(false);
        setTreesFilter(false);
        setFormatFilter('All Formats');
        setSortBy('Most Unlocked');
        setSearchQuery('');
        setDebouncedSearchQuery('');
    };

    const openBadgeInfo = (e: React.MouseEvent, resource: any) => {
        e.preventDefault();
        e.stopPropagation();

        let sheetData: any = { isCustom: false, title: '', text: '', brandName: '' };
        if (resource.adSource === 'platform') {
            if (resource.adType === 'video') {
                sheetData = { isCustom: false, title: 'Video Ad', text: `You'll watch a short video ad to unlock this resource. Skip available after 5 seconds. No sign-up needed.` };
            } else {
                sheetData = { isCustom: false, title: 'Click Ad', text: `You'll click ${resource.adCount} sponsor link${resource.adCount > 1 ? 's' : ''} to unlock. Each click opens the sponsor in a new tab. No sign-up needed.` };
            }
        } else {
            if (resource.requiresClick) {
                sheetData = { isCustom: true, title: 'Watch + Click', text: `This creator has their own sponsor. You'll watch their sponsor's video, then visit the sponsor's website. Both steps take about 30 seconds. Content unlocks after both.`, brandName: resource.brandName };
            } else {
                sheetData = { isCustom: true, title: 'Sponsor Video', text: `This creator has their own sponsor. You'll watch a short sponsor video. No click required — content unlocks right after.`, brandName: resource.brandName };
            }
        }
        setInfoSheetFormat(sheetData);
    };

    // Distribution stats
    const distVideo = filteredResources.filter((r: any) => r.adSource === 'platform' && r.adType === 'video').length;
    const distClick = filteredResources.filter((r: any) => r.adSource === 'platform' && r.adType === 'click').length;
    const distSponsor = filteredResources.filter((r: any) => r.adSource === 'custom').length;

    const renderGridCard = (r: any, isSkeleton = false) => {
        if (isSkeleton) {
            return (
                <div key={r} className="bg-[#FFFFFF] border border-[#E6E2D9] rounded-lg p-4 flex flex-col relative" style={{ minHeight: '220px' }}>
                    <div className="h-[60px] w-full bg-[#F3F1EC] animate-pulse rounded-md mb-4"></div>
                    <div className="flex flex-col flex-1 gap-2">
                        <div className="h-4 bg-[#F3F1EC] rounded animate-pulse w-3/4 mb-1"></div>
                        <div className="h-4 bg-[#F3F1EC] rounded animate-pulse w-1/2 mb-3"></div>
                        <div className="h-7 bg-[#F3F1EC] rounded-sm animate-pulse w-full mb-3"></div>
                        <div className="h-3 bg-[#F3F1EC] rounded animate-pulse w-1/3 mt-auto mb-3"></div>
                        <div className="h-10 bg-[#F3F1EC] rounded-md animate-pulse w-full"></div>
                    </div>
                </div>
            );
        }

        const badge = getAdFormatBadge(r);
        return (
            <div key={r.id} className="bg-[#FFFFFF] border border-[#E6E2D9] rounded-lg p-4 flex flex-col relative group" style={{ minHeight: '220px' }}>
                <Link to={`/r/${r.slug}`} className="flex-1 flex flex-col group-hover:opacity-90 transition-opacity">
                    <div className="h-[60px] w-full rounded-md mb-4 relative flex items-center justify-center" style={{ backgroundColor: r.adSource === 'custom' ? '#FAF0EB' : categoryBackgrounds[r.category] || '#F3F1EC' }}>
                        {r.adSource === 'custom' && (
                            <div className="absolute top-2 left-2 bg-white px-1.5 py-0.5 rounded text-[#D97757] font-semibold text-[10px] flex items-center gap-1 border border-[#E6E2D9]">
                                <Star size={10} /> Sponsor
                            </div>
                        )}
                        {r.donateEnabled && (
                            <div className="absolute top-2 right-2 w-[24px] h-[24px] bg-white rounded-full flex items-center justify-center text-[12px] border border-[#E6E2D9]">
                                🌱
                            </div>
                        )}
                        <div className="text-[28px]">{r.fileEmoji}</div>
                    </div>

                    <div className="flex flex-col flex-1">
                        <h3 className="font-semibold text-[14px] leading-tight mb-2 text-[#21201C] line-clamp-2">
                            {r.title}
                        </h3>
                        <div className="flex items-center gap-1.5 mb-3">
                            <span className="text-[12px] text-[#6B6860]">@{r.creatorUsername}</span>
                            {r.isNew && (
                                <span className="px-1 bg-[#EBF5EE] text-[#417A55] text-[10px] rounded">New</span>
                            )}
                        </div>

                        <button
                            onClick={(e) => openBadgeInfo(e, r)}
                            className="w-full rounded flex items-center justify-start px-2 py-1 mb-3 shrink-0"
                            style={{ backgroundColor: badge.backgroundColor, minHeight: '32px' }}
                        >
                            <span style={{ color: badge.textColor }} className="mr-1.5">{badge.icon}</span>
                            <div className="flex flex-col items-start px-1 leading-tight w-full">
                                <span className="font-semibold text-[11px]" style={{ color: badge.textColor }}>{badge.label}</span>
                                {badge.sublabel && (
                                    <span className="text-[10px] truncate max-w-full text-left" style={{ color: badge.textColor, opacity: 0.8 }}>{badge.sublabel}</span>
                                )}
                            </div>
                        </button>

                        <div className="mt-auto flex items-center justify-between mb-4">
                            <span className="text-[12px] text-[#6B6860]">{formatCount(r.unlockCount)} unlocks</span>
                            {r.isTrending && (
                                <span className="px-1.5 py-0.5 bg-[#FDF4EC] text-[#A0622A] text-[10px] rounded">Trending</span>
                            )}
                        </div>
                    </div>
                </Link>

                <Link to={`/r/${r.slug}`} className="w-full h-10 px-4 rounded-md border border-[#E6E2D9] bg-[#FFFFFF] flex items-center justify-center text-[14px] text-[#21201C] hover:bg-[#F3F1EC] transition-colors min-h-[44px]">
                    Unlock
                </Link>
            </div>
        );
    };

    const renderListRow = (r: any, isSkeleton = false) => {
        if (isSkeleton) {
            return (
                <div key={r} className="w-full bg-[#FFFFFF] h-[48px] flex items-center gap-3 border-b border-[#E6E2D9] px-2">
                    <div className="w-[32px] h-[32px] shrink-0 rounded bg-[#F3F1EC] animate-pulse"></div>
                    <div className="flex-1 min-w-0 flex items-center justify-between">
                        <div className="h-4 bg-[#F3F1EC] animate-pulse rounded w-1/3"></div>
                        <div className="h-4 bg-[#F3F1EC] animate-pulse rounded w-1/4"></div>
                    </div>
                </div>
            );
        }

        const badge = getAdFormatBadge(r);
        return (
            <Link to={`/r/${r.slug}`} key={r.id} className="w-full bg-[#FFFFFF] h-[48px] px-2 flex items-center gap-3 hover:bg-[#F3F1EC] transition-colors border-b border-[#E6E2D9] group cursor-pointer min-h-[48px]">
                <div className="w-[32px] h-[32px] shrink-0 rounded flex items-center justify-center text-[18px]" style={{ backgroundColor: r.adSource === 'custom' ? '#FAF0EB' : categoryBackgrounds[r.category] || '#F3F1EC' }}>
                    {r.fileEmoji}
                </div>
                <div className="flex-1 min-w-0 flex items-center justify-between">
                    <div className="font-semibold text-[14px] text-[#21201C] truncate">{r.title}</div>
                    <div className="hidden sm:flex items-center text-[12px] text-[#6B6860] shrink-0 ml-4 gap-4">
                        <span className="w-24 truncate">@{r.creatorUsername}</span>
                        <span className="w-16">{formatCount(r.unlockCount)}</span>
                    </div>
                </div>
                <div className="flex items-center shrink-0 gap-2">
                    <button onClick={(e) => openBadgeInfo(e, r)} className="hidden md:flex items-center gap-1.5 h-[24px] px-2 rounded font-semibold text-[11px]" style={{ backgroundColor: badge.backgroundColor, color: badge.textColor }}>
                        {badge.icon} {badge.label}
                    </button>
                    {r.donateEnabled && <span className="text-[12px] opacity-70">🌱</span>}
                    <ChevronRight size={16} className="text-[#AAA49C] shrink-0" />
                </div>
            </Link>
        );
    };

    return (
        <div className="w-full min-h-screen bg-[#FAF9F7] flex flex-col items-center pb-0 text-[#21201C] font-sans">

            {/* Section 1 - Hero */}
            <div className="w-full bg-[#FAF9F7] pt-12 pb-8 flex flex-col items-center">
                <div className="w-full max-w-[800px] px-[24px] md:px-[32px] flex flex-col items-center text-center">
                    <h1 className="text-3xl md:text-4xl font-semibold text-[#21201C] leading-snug mb-3 tracking-tight">Explore Free Resources</h1>
                    <p className="text-[16px] text-[#6B6860] max-w-[480px] mb-8 leading-relaxed">Browse files, prompts, and guides — accessible via platform ad or custom sponsor.</p>

                    <div className="w-full max-w-[600px] mb-4 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#AAA49C]" size={18} />
                        <input
                            type="text"
                            placeholder="Search by title, creator, or sponsor..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="w-full min-h-[44px] h-[48px] bg-[#FFFFFF] border border-[#E6E2D9] rounded-md pl-[44px] pr-10 text-[15px] text-[#21201C] outline-none placeholder-[#AAA49C] focus:border-[#D97757] transition-colors"
                        />
                        {searchQuery && (
                            <button onClick={() => setSearchQuery('')} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-[#AAA49C] hover:text-[#21201C]">
                                <X size={16} />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Section 2 - Featured Strip */}
            <div className="w-full bg-[#FFFFFF] py-8 border-y border-[#E6E2D9]">
                <div className="w-full max-w-[800px] mx-auto overflow-hidden">
                    <div className="px-[24px] md:px-[32px] mb-4 flex items-center justify-between">
                        <h2 className="text-[14px] font-semibold text-[#6B6860] uppercase tracking-wider">Featured Creators</h2>
                    </div>
                    <div className="flex gap-4 overflow-x-auto scrollbar-hide px-[24px] md:px-[32px] pb-4 snap-x">
                        {featuredResources.map(r => (
                            <Link to={`/r/${r.slug}`} key={r.id} className="w-[280px] shrink-0 bg-[#FFFFFF] border border-[#E6E2D9] rounded-lg p-4 snap-start hover:border-[#AAA49C] transition-colors flex flex-col min-h-[140px]">
                                <div className="flex gap-3 mb-3">
                                    <div className="w-[48px] h-[48px] rounded bg-[#FAF0EB] flex flex-col items-center justify-center text-[20px] text-[#D97757]">{r.fileEmoji}</div>
                                    <div className="flex-1 min-w-0">
                                        <div className="font-semibold text-[14px] text-[#21201C] line-clamp-2 leading-tight mb-1">{r.title}</div>
                                        <div className="text-[12px] text-[#6B6860]">@{r.creatorUsername}</div>
                                    </div>
                                </div>
                                <div className="mt-auto w-full min-h-[44px] rounded-md border border-[#E6E2D9] flex items-center justify-center text-[14px] text-[#21201C]">
                                    View Resource
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Section 3 - Filters and Sort */}
            <div className="w-full bg-[#FAF9F7] sticky top-[48px] z-30 border-b border-[#E6E2D9] pt-6 pb-4">
                <div className="w-full max-w-[800px] mx-auto px-[24px] md:px-[32px] flex flex-col gap-4">
                    <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`min-h-[44px] px-4 rounded-md text-[14px] whitespace-nowrap shrink-0 transition-colors border ${selectedCategory === cat ? 'bg-[#21201C] text-[#FFFFFF] border-[#21201C]' : 'bg-[#FFFFFF] text-[#21201C] border-[#E6E2D9] hover:bg-[#F3F1EC]'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
                            <button
                                onClick={() => setFormatFilter('All Formats')}
                                className={`min-h-[44px] px-3 rounded-md text-[13px] whitespace-nowrap shrink-0 border ${formatFilter === 'All Formats' ? 'bg-[#F3F1EC] border-[#E6E2D9] text-[#21201C]' : 'bg-transparent border-transparent text-[#6B6860] hover:bg-[#F3F1EC]'}`}
                            >
                                All Types
                            </button>
                            <button
                                onClick={() => setFormatFilter('Platform Ads')}
                                className={`min-h-[44px] px-3 rounded-md text-[13px] whitespace-nowrap shrink-0 border ${formatFilter === 'Platform Ads' ? 'bg-[#F3F1EC] border-[#E6E2D9] text-[#21201C]' : 'bg-transparent border-transparent text-[#6B6860] hover:bg-[#F3F1EC]'}`}
                            >
                                Platform
                            </button>
                            <button
                                onClick={() => setFormatFilter('Watch + Click')}
                                className={`min-h-[44px] px-3 rounded-md text-[13px] whitespace-nowrap shrink-0 border flex items-center gap-1.5 ${formatFilter === 'Watch + Click' ? 'bg-[#FAF0EB] border-[#FAF0EB] text-[#D97757]' : 'bg-transparent border-transparent text-[#D97757]/80 hover:bg-[#FAF0EB]'}`}
                            >
                                <Star size={12} /> Sponsor
                            </button>
                        </div>

                        <div className="flex items-center gap-4 ml-auto">
                            <select
                                value={sortBy}
                                onChange={e => setSortBy(e.target.value)}
                                className="min-h-[44px] bg-transparent text-[13px] text-[#21201C] outline-none cursor-pointer hidden sm:block"
                            >
                                {SORTS.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                            <div className="w-px h-6 bg-[#E6E2D9] hidden sm:block"></div>
                            <div className="flex bg-[#FFFFFF] rounded-md border border-[#E6E2D9]">
                                <button onClick={() => setViewMode('grid')} className={`min-h-[44px] w-10 flex items-center justify-center rounded-l-md transition-colors ${viewMode === 'grid' ? 'bg-[#F3F1EC] text-[#21201C]' : 'text-[#AAA49C] hover:text-[#21201C]'}`}>
                                    <Grid size={18} />
                                </button>
                                <div className="w-px bg-[#E6E2D9]"></div>
                                <button onClick={() => setViewMode('list')} className={`min-h-[44px] w-10 flex items-center justify-center rounded-r-md transition-colors ${viewMode === 'list' ? 'bg-[#F3F1EC] text-[#21201C]' : 'text-[#AAA49C] hover:text-[#21201C]'}`}>
                                    <ListIcon size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 4 - Content */}
            <div className="w-full max-w-[800px] px-[24px] md:px-[32px] py-8 flex flex-col min-h-[400px]">
                {filteredResources.length === 0 ? (
                    <div className="w-full py-20 flex flex-col items-center justify-center text-center">
                        <Search className="text-[#AAA49C] mb-4" size={32} />
                        <h3 className="text-[18px] font-semibold text-[#21201C] mb-2">{debouncedSearchQuery ? `No results for "${debouncedSearchQuery}"` : 'No resources found'}</h3>
                        <p className="text-[14px] text-[#6B6860] mb-6">
                            Try adjusting your filters or browsing all categories.
                        </p>
                        <div className="flex gap-4">
                            {hasActiveFilters && <button onClick={clearAllFilters} className="min-h-[44px] h-10 px-4 rounded-md border border-[#E6E2D9] text-[#21201C] bg-[#FFFFFF] hover:bg-[#F3F1EC]">Clear Filters</button>}
                            <button onClick={clearAllFilters} className="min-h-[44px] h-10 px-4 rounded-md bg-[#D97757] text-[#FFFFFF] hover:bg-[#C4663F]">Browse All</button>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className={viewMode === 'grid' ? "w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8" : "w-full flex flex-col mb-8"}>
                            {visibleList.map(r => viewMode === 'grid' ? renderGridCard(r) : renderListRow(r))}
                            {isLoadingMore && [1, 2, 3].map(i => viewMode === 'grid' ? renderGridCard(i, true) : renderListRow(i, true))}
                        </div>

                        {visibleCount < filteredResources.length && !isLoadingMore && (
                            <div className="w-full flex flex-col items-center mt-4">
                                <button onClick={handleLoadMore} className="min-h-[44px] px-6 border border-[#E6E2D9] bg-[#FFFFFF] text-[#21201C] rounded-md hover:bg-[#F3F1EC] transition-colors">
                                    Load More
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Section 5 - Stats Detail Row */}
            <div className="w-full border-t border-[#E6E2D9] bg-[#FFFFFF] py-12">
                <div className="w-full max-w-[800px] mx-auto px-[24px] md:px-[32px] flex flex-col sm:flex-row gap-8">
                    <div className="flex-1 flex flex-col">
                        <h2 className="text-[14px] font-semibold text-[#6B6860] uppercase tracking-wider mb-6">Distribution</h2>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <span className="text-[14px] text-[#21201C] flex items-center gap-2"><Play size={14} className="text-[#6B6860]" /> Platform Video</span>
                                <span className="text-[14px] text-[#6B6860]">{distVideo}</span>
                            </div>
                            <div className="w-full h-px bg-[#E6E2D9]"></div>
                            <div className="flex items-center justify-between">
                                <span className="text-[14px] text-[#21201C] flex items-center gap-2"><MousePointerClick size={14} className="text-[#6B6860]" /> Platform Click</span>
                                <span className="text-[14px] text-[#6B6860]">{distClick}</span>
                            </div>
                            <div className="w-full h-px bg-[#E6E2D9]"></div>
                            <div className="flex items-center justify-between">
                                <span className="text-[14px] text-[#D97757] flex items-center gap-2"><Star size={14} /> Sponsor Action</span>
                                <span className="text-[14px] text-[#D97757]">{distSponsor}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col">
                        <h2 className="text-[14px] font-semibold text-[#6B6860] uppercase tracking-wider mb-6">Trending Topics</h2>
                        <div className="flex flex-wrap gap-2">
                            {['Figma', 'Python', 'Notion', 'ChatGPT', 'Fitness', 'Lightroom', 'Music', 'React'].map(tag => (
                                <button key={tag} onClick={() => { setSearchQuery(tag); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="min-h-[44px] px-3 rounded-md bg-[#FFFFFF] border border-[#E6E2D9] text-[#21201C] text-[13px] hover:bg-[#F3F1EC]">
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Sheet for Badge Info */}
            {infoSheetFormat && (
                <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-0" onClick={() => setInfoSheetFormat(null)}>
                    <div className="bg-[#FFFFFF] w-full max-w-[400px] border border-[#E6E2D9] sm:rounded-lg overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
                        <div className="p-6 border-b border-[#E6E2D9]">
                            <h3 className="text-[18px] font-semibold text-[#21201C]">{infoSheetFormat.title}</h3>
                        </div>
                        <div className="p-6 flex flex-col gap-6">
                            <p className="text-[15px] text-[#6B6860] leading-relaxed">{infoSheetFormat.text}</p>
                            {infoSheetFormat.brandName && (
                                <div className="p-4 bg-[#FAF0EB] rounded-md text-center text-[#D97757] text-[14px]">
                                    Sponsored by <strong>{infoSheetFormat.brandName}</strong>
                                </div>
                            )}
                            <button onClick={() => setInfoSheetFormat(null)} className="min-h-[44px] w-full rounded-md border border-[#E6E2D9] bg-[#FFFFFF] text-[#21201C] hover:bg-[#F3F1EC] transition-colors mt-2">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Standard Footer */}
            <footer className="w-full bg-[#FFFFFF] py-12 px-6 flex flex-col items-center border-t border-[#E6E2D9] shrink-0 mt-auto">
                <div className="w-full max-w-[800px] flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-[#21201C] text-[#FFFFFF] flex items-center justify-center font-bold text-[10px] leading-none shrink-0">AG</div>
                        <span className="font-semibold text-[16px] tracking-tight text-[#21201C] leading-none">AdGate</span>
                    </div>
                    <div className="flex items-center gap-[24px] text-[13px] font-semibold text-[#6B6860]">
                        <Link to="/explore" className="hover:text-[#21201C] transition-colors">Explore</Link>
                        <a href="#" className="hover:text-[#21201C] transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-[#21201C] transition-colors">Privacy Policy</a>
                    </div>
                    <div className="text-[12px] text-[#AAA49C]">© {new Date().getFullYear()} AdGate Inc.</div>
                </div>
            </footer>
        </div>
    );
};
