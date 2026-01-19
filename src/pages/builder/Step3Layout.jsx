import { useNavigate } from 'react-router-dom';
import { useBuilder } from '../../context/BuilderContext';

// Section Icons
const SectionIcon = ({ type }) => {
    const icons = {
        'header': (<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="6" rx="1" /></svg>),
        'hero': (<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="10" rx="1" /></svg>),
        'about': (<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></svg>),
        'works': (<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>),
        'services': (<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>),
        'skills': (<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" /></svg>),
        'testimonials': (<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>),
        'contact': (<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>),
        'footer': (<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="15" width="18" height="6" rx="1" /></svg>),
        'navbar': (<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="6" rx="1" /></svg>)
    };
    return icons[type] || icons['works'];
};

// Layout Blueprint
const LayoutBlueprint = ({ layout }) => {
    const style = layout.style;
    const sections = layout.sections || [];

    if (style === 'creative') {
        return (
            <div className="blueprint-stack">
                {sections.map((section) => (
                    <div key={section} className="bp-section bp-full">
                        <SectionIcon type={section} />
                        <span>{section}</span>
                    </div>
                ))}
            </div>
        );
    }

    if (style === 'professional') {
        return (
            <div className="blueprint-grid">
                <div className="bp-section bp-full"><SectionIcon type="navbar" /><span>navbar</span></div>
                <div className="bp-row">
                    <div className="bp-section bp-half bp-tall"><SectionIcon type="hero" /><span>hero</span></div>
                    <div className="bp-section bp-half bp-tall"><SectionIcon type="services" /><span>stats</span></div>
                </div>
                <div className="bp-grid-4">
                    <div className="bp-box"><SectionIcon type="services" /></div>
                    <div className="bp-box"><SectionIcon type="services" /></div>
                    <div className="bp-box"><SectionIcon type="services" /></div>
                    <div className="bp-box"><SectionIcon type="services" /></div>
                </div>
                <div className="bp-section bp-full"><SectionIcon type="works" /><span>portfolio</span></div>
                <div className="bp-section bp-full"><SectionIcon type="footer" /><span>footer</span></div>
            </div>
        );
    }

    if (style === 'minimal') {
        return (
            <div className="blueprint-cards">
                <div className="bp-section bp-full"><SectionIcon type="navbar" /><span>navbar</span></div>
                <div className="bp-section bp-full bp-hero"><SectionIcon type="hero" /><span>intro</span></div>
                <div className="bp-row bp-cards-row">
                    <div className="bp-card"><SectionIcon type="works" /></div>
                    <div className="bp-card"><SectionIcon type="works" /></div>
                    <div className="bp-card"><SectionIcon type="works" /></div>
                </div>
                <div className="bp-section bp-full"><SectionIcon type="about" /><span>about</span></div>
                <div className="bp-section bp-full"><SectionIcon type="footer" /><span>footer</span></div>
            </div>
        );
    }

    return null;
};

// Preview Wireframe
const PreviewWireframe = ({ layout }) => {
    if (!layout) {
        return (
            <div className="preview-placeholder">
                <span>Select a layout to preview</span>
            </div>
        );
    }

    const style = layout.style;

    return (
        <div className={`preview-wireframe preview-${style}`}>
            {style === 'creative' && (
                <>
                    <div className="wire-section-box"><div className="wire-icon-sm"></div><span>Navbar</span></div>
                    <div className="wire-section-box"><div className="wire-icon-sm"></div><span>Hero</span></div>
                    <div className="wire-section-box"><div className="wire-icon-sm"></div><span>About</span></div>
                    <div className="wire-grid-2x2">
                        <div className="wire-grid-box"></div>
                        <div className="wire-grid-box"></div>
                        <div className="wire-grid-box"></div>
                        <div className="wire-grid-box"></div>
                    </div>
                    <div className="wire-section-box"><div className="wire-icon-sm"></div><span>Skills</span></div>
                    <div className="wire-section-box"><div className="wire-icon-sm"></div><span>Contact</span></div>
                </>
            )}

            {style === 'professional' && (
                <>
                    <div className="wire-section-box"><div className="wire-icon-sm"></div><span>Navbar</span></div>
                    <div className="wire-row">
                        <div className="wire-section-box wire-tall"><div className="wire-icon-sm"></div><span>Hero</span></div>
                        <div className="wire-section-box wire-tall"><div className="wire-icon-sm"></div><span>Stats</span></div>
                    </div>
                    <div className="wire-grid-2x2">
                        <div className="wire-grid-box"></div>
                        <div className="wire-grid-box"></div>
                        <div className="wire-grid-box"></div>
                        <div className="wire-grid-box"></div>
                    </div>
                    <div className="wire-section-box"><div className="wire-icon-sm"></div><span>Portfolio</span></div>
                </>
            )}

            {style === 'minimal' && (
                <>
                    <div className="wire-section-box"><div className="wire-icon-sm"></div><span>Navbar</span></div>
                    <div className="wire-section-box"><div className="wire-icon-sm"></div><span>Introduction</span></div>
                    <div className="wire-cards-row">
                        <div className="wire-card-box"></div>
                        <div className="wire-card-box"></div>
                        <div className="wire-card-box"></div>
                    </div>
                    <div className="wire-section-box"><div className="wire-icon-sm"></div><span>About</span></div>
                    <div className="wire-section-box"><div className="wire-icon-sm"></div><span>Contact</span></div>
                </>
            )}
        </div>
    );
};

const Step3Layout = () => {
    const navigate = useNavigate();
    const { layouts, selectedLayout, setSelectedLayout, loading, error } = useBuilder();

    const handleSelect = (layout) => {
        setSelectedLayout(layout);
    };

    const handleContinue = () => {
        if (selectedLayout) {
            navigate('/colors');
        }
    };

    const handleBack = () => {
        navigate('/questions');
    };

    if (loading) {
        return (
            <div className="builder-step-v2 step-layout-v2 fit-screen">
                <div className="loading-state">
                    <div className="loader"></div>
                    <p>Loading layouts...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="builder-step-v2 step-layout-v2 fit-screen">
                <div className="error-state">
                    <p>⚠️ {error}</p>
                    <p>Make sure backend is running on port 5000</p>
                </div>
            </div>
        );
    }

    return (
        <div className="builder-step-v2 step-layout-v2 fit-screen">
            <div className="layout-main">
                <div className="layout-header">
                    <h1 className="page-title-large">Choose Your Layout</h1>
                    <p className="step-subtitle">Step 3 of 6: Layout Selection</p>
                </div>

                <div className="layout-cards-row">
                    {layouts.map((layout) => (
                        <div
                            key={layout.id}
                            className={`layout-card-v2 ${selectedLayout?.id === layout.id ? 'selected' : ''}`}
                            onClick={() => handleSelect(layout)}
                        >
                            <LayoutBlueprint layout={layout} />
                            <div className="layout-card-name">{layout.name}</div>
                        </div>
                    ))}
                </div>

                <div className="layout-indicator">
                    {selectedLayout && (
                        <span className="selected-label">{selectedLayout.name}</span>
                    )}
                    <div className="slider-dots">
                        {layouts.map((layout) => (
                            <div
                                key={layout.id}
                                className={`slider-dot ${selectedLayout?.id === layout.id ? 'active' : ''}`}
                                onClick={() => handleSelect(layout)}
                            />
                        ))}
                    </div>
                </div>

                <div className="action-buttons">
                    <button
                        className={`continue-btn-v2 ${selectedLayout ? 'active' : ''}`}
                        onClick={handleContinue}
                        disabled={!selectedLayout}
                    >
                        Continue
                    </button>
                    <button className="back-btn-v2" onClick={handleBack}>Back</button>
                </div>

                <div className="progress-dots-v2">
                    {[1, 2, 3, 4, 5, 6].map((dot) => (
                        <div key={dot} className={`dot ${dot === 3 ? 'active' : dot < 3 ? 'completed' : ''}`} />
                    ))}
                </div>
            </div>

            <div className="layout-preview-panel">
                <PreviewWireframe layout={selectedLayout} />
            </div>
        </div>
    );
};

export default Step3Layout;
