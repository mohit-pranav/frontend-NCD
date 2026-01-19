import { useState } from 'react';

const components = [
    // Background Components
    { id: 1, name: 'Full-Width Animated Aura Background', category: 'background', tags: ['background', 'animated', 'fullwidth'], author: 'Meng To', views: 2479, copies: 1388, gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', isPro: true },
    { id: 2, name: 'Animated Aura Background with Uni...', category: 'background', tags: ['background', 'animated', 'tailwind'], author: 'Meng To', views: 2435, copies: 823, gradient: 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)', isPro: true },
    { id: 3, name: 'UnicornStudio Embedded Background', category: 'background', tags: ['background', 'animated', 'interact'], author: 'Meng To', views: 2304, copies: 1134, gradient: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)', isPro: true },
    { id: 4, name: 'Full-Width Aura Background Integra...', category: 'background', tags: ['background', 'integrat', 'embed'], author: 'Meng To', views: 2300, copies: 351, gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', isPro: true },

    // Hero Components
    { id: 5, name: 'Gradient Hero Section', category: 'hero', tags: ['hero', 'gradient', 'modern'], author: 'DesignPro', views: 1856, copies: 654, gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', isPro: false },
    { id: 6, name: 'Animated Hero with Particles', category: 'hero', tags: ['hero', 'animated', 'particles'], author: 'CodeMaster', views: 2100, copies: 890, gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', isPro: true },

    // Button Components
    { id: 7, name: 'Glowing Gradient Button', category: 'button', tags: ['button', 'gradient', 'glow'], author: 'UIKit', views: 3200, copies: 1500, gradient: 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)', isPro: false },
    { id: 8, name: 'Ripple Effect Button', category: 'button', tags: ['button', 'ripple', 'animated'], author: 'MotionUI', views: 2800, copies: 1200, gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', isPro: false },

    // Card Components
    { id: 9, name: '3D Hover Card', category: 'card', tags: ['card', '3d', 'hover'], author: 'Meng To', views: 4500, copies: 2100, gradient: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)', isPro: true },
    { id: 10, name: 'Glassmorphism Card', category: 'card', tags: ['card', 'glass', 'blur'], author: 'GlassUI', views: 3900, copies: 1800, gradient: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)', isPro: false },

    // Section Components
    { id: 11, name: 'Feature Section Grid', category: 'section', tags: ['section', 'feature', 'grid'], author: 'LayoutPro', views: 2500, copies: 980, gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', isPro: false },
    { id: 12, name: 'Testimonial Carousel', category: 'testimonial', tags: ['testimonial', 'carousel', 'slider'], author: 'SliderKit', views: 2200, copies: 850, gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', isPro: true },

    // Header Components
    { id: 13, name: 'Sticky Navbar with Blur', category: 'header', tags: ['header', 'navbar', 'sticky'], author: 'NavPro', views: 3100, copies: 1400, gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', isPro: false },

    // Logo Components
    { id: 14, name: 'Animated Logo Reveal', category: 'logo', tags: ['logo', 'animated', 'reveal'], author: 'BrandKit', views: 1800, copies: 720, gradient: 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)', isPro: true },

    // Footer Components
    { id: 15, name: 'Modern Footer with Links', category: 'footer', tags: ['footer', 'links', 'modern'], author: 'FooterPro', views: 2100, copies: 890, gradient: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)', isPro: false },

    // Form Components
    { id: 16, name: 'Glowing Input Fields', category: 'form', tags: ['form', 'input', 'glow'], author: 'FormUI', views: 2800, copies: 1100, gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', isPro: false },
];

const categories = [
    { id: 'hero', label: 'Hero' },
    { id: 'section', label: 'Section' },
    { id: 'button', label: 'Button' },
    { id: 'card', label: 'Card' },
    { id: 'background', label: 'Background' },
    { id: 'header', label: 'Header' },
    { id: 'logo', label: 'Logo' },
    { id: 'feature', label: 'Feature' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'testimonial', label: 'Testimonial' },
    { id: 'footer', label: 'Footer' },
    { id: 'form', label: 'Form' },
    { id: 'heading', label: 'Heading' },
];

const ComponentsPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('background');
    const [sortBy, setSortBy] = useState('popular');

    const filteredComponents = components.filter(comp => {
        const matchesCategory = comp.category === activeCategory;
        const matchesSearch = comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            comp.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && (searchQuery === '' || matchesSearch);
    });

    const sortedComponents = [...filteredComponents].sort((a, b) => {
        if (sortBy === 'popular') return b.views - a.views;
        if (sortBy === 'recent') return b.id - a.id;
        return 0;
    });

    return (
        <div className="components-page">
            {/* Search Section */}
            <div className="components-search-section">
                <div className="search-box">
                    <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <path d="M21 21l-4.35-4.35" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search components..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="search-actions">
                    <button className={`sort-btn ${sortBy === 'popular' ? 'active' : ''}`} onClick={() => setSortBy('popular')}>
                        <span>≡</span> Popular
                    </button>
                    <button className="sort-btn">
                        <span>↗</span> Explore
                    </button>
                    <button className={`sort-btn ${sortBy === 'recent' ? 'active' : ''}`} onClick={() => setSortBy('recent')}>
                        <span>◷</span> Recent
                    </button>
                </div>
            </div>

            {/* Category Tabs */}
            <div className="category-tabs">
                {categories.map(cat => (
                    <button
                        key={cat.id}
                        className={`category-tab ${activeCategory === cat.id ? 'active' : ''}`}
                        onClick={() => setActiveCategory(cat.id)}
                    >
                        {cat.label}
                    </button>
                ))}

                <div className="tab-actions">
                    <span className="tab-label">Mine</span>
                    <span className="tab-label pro">
                        <span className="crown">♕</span> PRO
                    </span>
                </div>
            </div>

            {/* Components Grid */}
            <div className="components-grid">
                {sortedComponents.map(comp => (
                    <div key={comp.id} className="component-card">
                        <div className="component-preview" style={{ background: comp.gradient }}>
                            {comp.isPro && <span className="pro-badge">PRO</span>}
                            <div className="component-overlay">
                                <button className="use-btn">Use Component</button>
                            </div>
                        </div>
                        <div className="component-info">
                            <h3>{comp.name}</h3>
                            <div className="component-tags">
                                {comp.tags.slice(0, 3).map((tag, i) => (
                                    <span key={i} className="tag">{tag}</span>
                                ))}
                            </div>
                            <div className="component-meta">
                                <div className="author">
                                    <span className="avatar">👤</span>
                                    <span>{comp.author}</span>
                                </div>
                                <div className="stats">
                                    <span>👁 {comp.views}</span>
                                    <span>📋 {comp.copies}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ComponentsPage;
