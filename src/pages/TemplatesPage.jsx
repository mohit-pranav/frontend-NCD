import { useState } from 'react';

const templates = [
    { id: 1, name: 'Studio Agency Full Website Template', category: 'web', tags: ['Visual', 'Services'], price: '$19', author: 'Sam', views: 309, gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', isPro: false, isRemix: false },
    { id: 2, name: 'Finex Gaming VPN Landing Page T...', category: 'web', tags: ['Speed', 'Gaming'], author: 'Sourasith Phonhome', views: 439, gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', isPro: true, isRemix: true },
    { id: 3, name: 'Luxury Hospitality Landing Page T...', category: 'web', tags: ['Hotel', 'Luxury'], author: 'Meng To', views: 358, gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', isPro: false, isRemix: true },
    { id: 4, name: 'Enterprise AI Infrastructure Landing...', category: 'web', tags: ['Synthetic', 'Cognition'], price: '$19', author: 'Vannarat Roeung', views: 434, gradient: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)', isPro: false, isRemix: false },
    { id: 5, name: 'Architecture Studio Landing Page...', category: 'web', tags: ['OB', 'LIQUE'], author: 'Sourany Phonhome', views: 747, gradient: 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)', isPro: true, isRemix: true },
    { id: 6, name: 'SaaS Dashboard Template', category: 'web', tags: ['Dashboard', 'Admin'], price: '$29', author: 'DashPro', views: 892, gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', isPro: false, isRemix: false },
    { id: 7, name: 'E-Commerce Store Template', category: 'web', tags: ['Store', 'Shop'], price: '$39', author: 'ShopifyKit', views: 1205, gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', isPro: true, isRemix: false },
    { id: 8, name: 'Portfolio Minimal Template', category: 'web', tags: ['Portfolio', 'Minimal'], author: 'DesignHub', views: 678, gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', isPro: false, isRemix: true },
    { id: 9, name: 'Blog Magazine Template', category: 'web', tags: ['Blog', 'Magazine'], author: 'BlogPro', views: 543, gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', isPro: false, isRemix: false },
    { id: 10, name: 'Crypto Landing Page', category: '3d', tags: ['Crypto', 'Web3'], price: '$25', author: 'Web3Kit', views: 987, gradient: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)', isPro: true, isRemix: false },
    { id: 11, name: 'Mobile App Landing', category: 'mobile', tags: ['App', 'Mobile'], author: 'AppLand', views: 654, gradient: 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)', isPro: false, isRemix: true },
    { id: 12, name: 'Restaurant Website', category: 'web', tags: ['Food', 'Restaurant'], price: '$15', author: 'FoodUI', views: 432, gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', isPro: false, isRemix: false },
];

const filterCategories = [
    { id: 'web', label: 'Web' },
    { id: 'mobile', label: 'Mobile' },
    { id: 'animation', label: 'Animation' },
    { id: 'login', label: 'Login' },
    { id: 'sidebar', label: 'Sidebar' },
    { id: 'onboarding', label: 'Onboarding' },
    { id: 'grid', label: 'Grid' },
    { id: 'payment', label: 'Payment' },
    { id: '3d', label: '3D' },
    { id: 'community', label: 'Made by Community' },
];

const TemplatesPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('web');
    const [sortBy, setSortBy] = useState('popular');
    const [typeFilter, setTypeFilter] = useState('all');

    const filteredTemplates = templates.filter(temp => {
        const matchesFilter = activeFilter === 'all' || temp.category === activeFilter;
        const matchesSearch = temp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            temp.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesType = typeFilter === 'all' ||
            (typeFilter === 'pro' && temp.isPro) ||
            (typeFilter === 'mine' && !temp.isPro);
        return matchesFilter && (searchQuery === '' || matchesSearch) && matchesType;
    });

    const sortedTemplates = [...filteredTemplates].sort((a, b) => {
        if (sortBy === 'popular') return b.views - a.views;
        if (sortBy === 'recent') return b.id - a.id;
        return 0;
    });

    return (
        <div className="templates-page">
            {/* Search Section */}
            <div className="templates-search-section">
                <div className="search-box large">
                    <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <path d="M21 21l-4.35-4.35" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search 2547 templates..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="search-actions">
                    <button className={`sort-btn ${sortBy === 'popular' ? 'active' : ''}`} onClick={() => setSortBy('popular')}>
                        <span>≡</span> Popular
                    </button>
                    <button className={`sort-btn ${sortBy === 'recent' ? 'active' : ''}`} onClick={() => setSortBy('recent')}>
                        <span>◷</span> Recent
                    </button>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="filter-row">
                <div className="category-tabs">
                    {filterCategories.map(cat => (
                        <button
                            key={cat.id}
                            className={`category-tab ${activeFilter === cat.id ? 'active' : ''}`}
                            onClick={() => setActiveFilter(cat.id)}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                <div className="type-filters">
                    <select
                        className="type-select"
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                    >
                        <option value="all">All Types</option>
                        <option value="pro">PRO</option>
                        <option value="free">Free</option>
                    </select>
                    <button className={`type-btn ${typeFilter === 'mine' ? 'active' : ''}`} onClick={() => setTypeFilter('mine')}>
                        Mine
                    </button>
                    <button className={`type-btn pro ${typeFilter === 'pro' ? 'active' : ''}`} onClick={() => setTypeFilter('pro')}>
                        <span className="crown">♕</span> PRO
                    </button>
                </div>
            </div>

            {/* Templates Grid */}
            <div className="templates-grid-page">
                {sortedTemplates.map(temp => (
                    <div key={temp.id} className="template-card-page">
                        <div className="template-preview-page" style={{ background: temp.gradient }}>
                            {temp.isPro && <span className="pro-badge">PRO</span>}
                            <div className="template-overlay-page">
                                <button className="preview-btn">Preview</button>
                                <button className="use-btn-outline">Use Template</button>
                            </div>
                        </div>
                        <div className="template-info-page">
                            <div className="template-header">
                                <h3>{temp.name}</h3>
                                {temp.price && <span className="price">{temp.price}</span>}
                            </div>
                            <div className="template-meta-page">
                                <div className="author-info">
                                    <span className="avatar">👤</span>
                                    <span className="author-name">{temp.author}</span>
                                </div>
                                <div className="template-actions">
                                    {temp.isRemix && (
                                        <span className="remix-badge">
                                            <span>↗</span> Remix
                                        </span>
                                    )}
                                    <span className="views">👁 {temp.views}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TemplatesPage;
