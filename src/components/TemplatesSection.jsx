import { useState } from 'react';

const templates = [
    { id: 1, name: 'Portfolio Pro', category: 'portfolio', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    { id: 2, name: 'SaaS Landing', category: 'business', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
    { id: 3, name: 'E-Commerce', category: 'store', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
    { id: 4, name: 'Agency Site', category: 'business', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
    { id: 5, name: 'Blog Theme', category: 'blog', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
    { id: 6, name: 'Dashboard', category: 'business', gradient: 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)' },
];

const filters = ['all', 'portfolio', 'business', 'store', 'blog'];

const TemplatesSection = () => {
    const [activeFilter, setActiveFilter] = useState('all');

    const filteredTemplates = activeFilter === 'all'
        ? templates
        : templates.filter(t => t.category === activeFilter);

    const getCategoryLabel = (category) => {
        const labels = {
            portfolio: 'Portfolio',
            business: 'Business',
            store: 'Store',
            blog: 'Blog'
        };
        return labels[category] || category;
    };

    return (
        <section className="templates-section" id="templates">
            <div className="templates-header">
                <h2 className="section-title">Explore Templates</h2>
                <p className="section-subtitle">Start with a professionally designed template</p>

                <div className="filter-tabs">
                    {filters.map(filter => (
                        <button
                            key={filter}
                            className={`filter-tab ${activeFilter === filter ? 'active' : ''}`}
                            onClick={() => setActiveFilter(filter)}
                        >
                            {filter.charAt(0).toUpperCase() + filter.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            <div className="templates-grid">
                {filteredTemplates.map((template, index) => (
                    <div
                        key={template.id}
                        className="template-card"
                        data-category={template.category}
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        <div className="template-preview">
                            <div
                                className="template-image"
                                style={{ background: template.gradient }}
                            ></div>
                            <div className="card-overlay">
                                <button className="preview-btn">Preview</button>
                            </div>
                        </div>
                        <div className="template-info">
                            <h3>{template.name}</h3>
                            <span className="template-category">{getCategoryLabel(template.category)}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TemplatesSection;
