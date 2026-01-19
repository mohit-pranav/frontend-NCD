import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBuilder } from '../../context/BuilderContext';

const Step4Preview = () => {
    const navigate = useNavigate();
    const { selectedPalette, selectedAnimation, selectedLayout, components, resetBuilder } = useBuilder();

    const [isGenerating, setIsGenerating] = useState(false);
    const [isGenerated, setIsGenerated] = useState(false);
    const [viewMode, setViewMode] = useState('desktop');

    const handleBack = () => {
        navigate('/animations');
    };

    const handleGenerate = () => {
        setIsGenerating(true);
        setTimeout(() => {
            setIsGenerating(false);
            setIsGenerated(true);
        }, 2500);
    };

    const handleStartOver = () => {
        resetBuilder();
        navigate('/');
    };

    const handleDownload = () => {
        alert('🎉 Your portfolio website files are ready! Download feature coming soon.');
    };

    const colors = selectedPalette?.colors || {
        primary: '#a855f7',
        secondary: '#6366f1',
        accent: '#00b4d8',
        background: '#0a0a0f',
        surface: '#141414',
        text: '#ffffff',
        textMuted: '#9ca3af',
        gradient: 'linear-gradient(135deg, #a855f7, #6366f1)'
    };

    return (
        <div className="builder-step-v2 step-preview-v2 fit-screen">
            {/* Top Bar */}
            <div className="preview-topbar">
                <button className="back-btn-minimal" onClick={handleBack}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Back
                </button>

                <div className="preview-title">
                    <span className="step-badge-small">Step 4 of 4</span>
                    <h2>Preview Your Portfolio</h2>
                </div>

                <div className="view-modes">
                    <button className={`view-mode-btn ${viewMode === 'desktop' ? 'active' : ''}`} onClick={() => setViewMode('desktop')}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="2" y="3" width="20" height="14" rx="2" />
                            <line x1="8" y1="21" x2="16" y2="21" />
                            <line x1="12" y1="17" x2="12" y2="21" />
                        </svg>
                    </button>
                    <button className={`view-mode-btn ${viewMode === 'mobile' ? 'active' : ''}`} onClick={() => setViewMode('mobile')}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="5" y="2" width="14" height="20" rx="2" />
                            <line x1="12" y1="18" x2="12" y2="18" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Main Preview */}
            <div className="preview-main-area">
                {/* Summary */}
                <div className="summary-cards">
                    <div className="summary-card">
                        <span className="card-label">Layout</span>
                        <span className="card-value">{selectedLayout?.name || 'Creative'}</span>
                    </div>
                    <div className="summary-card">
                        <span className="card-label">Theme</span>
                        <div className="card-value-colors">
                            {selectedPalette?.preview?.slice(0, 4).map((color, i) => (
                                <div key={i} className="mini-swatch" style={{ background: color }} />
                            ))}
                            <span>{selectedPalette?.name || 'Default'}</span>
                        </div>
                    </div>
                    <div className="summary-card">
                        <span className="card-label">Animation</span>
                        <span className="card-value">{selectedAnimation?.name || 'None'}</span>
                    </div>
                </div>

                {/* Website Preview */}
                <div className={`preview-device-frame ${viewMode}`}>
                    <div className="device-chrome">
                        <div className="device-dots"><span></span><span></span><span></span></div>
                        <div className="device-url"><span>myportfolio.com</span></div>
                    </div>

                    <div className="preview-content portfolio-preview" style={{ background: colors.background }}>
                        {/* Header */}
                        <header className="portfolio-header" style={{ background: colors.surface, borderBottom: `1px solid ${colors.primary}20` }}>
                            <span className="portfolio-logo" style={{ color: colors.text }}>Alex<span style={{ color: colors.primary }}>.</span></span>
                            <nav className="portfolio-nav">
                                <span style={{ color: colors.textMuted }}>About</span>
                                <span style={{ color: colors.textMuted }}>Work</span>
                                <span style={{ color: colors.textMuted }}>Contact</span>
                            </nav>
                            <button className="portfolio-cta" style={{ background: colors.gradient }}>Hire Me</button>
                        </header>

                        {/* Hero */}
                        <section className="portfolio-hero">
                            <div className="hero-content">
                                <span className="hero-tag" style={{ color: colors.primary }}>UI/UX Designer</span>
                                <h1 style={{ color: colors.text }}>I Design Digital Experiences</h1>
                                <p style={{ color: colors.textMuted }}>Award-winning designer with 8+ years of experience...</p>
                                <div className="hero-buttons">
                                    <button className="btn-primary" style={{ background: colors.gradient }}>View My Work</button>
                                    <button className="btn-secondary" style={{ border: `1px solid ${colors.primary}`, color: colors.text }}>Get In Touch</button>
                                </div>
                                <div className="hero-stats">
                                    <div className="stat-item">
                                        <span className="stat-number" style={{ color: colors.primary }}>150+</span>
                                        <span className="stat-label" style={{ color: colors.textMuted }}>Projects</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-number" style={{ color: colors.primary }}>8+</span>
                                        <span className="stat-label" style={{ color: colors.textMuted }}>Years</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-number" style={{ color: colors.primary }}>50+</span>
                                        <span className="stat-label" style={{ color: colors.textMuted }}>Clients</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Works */}
                        <section className="portfolio-works" style={{ background: colors.surface }}>
                            <h2 style={{ color: colors.text }}>Selected Works</h2>
                            <div className="works-grid">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="work-card" style={{ background: `${colors.primary}${10 + i * 5}`, border: `1px solid ${colors.primary}20` }}>
                                        <div className="work-overlay">
                                            <span className="work-category" style={{ color: colors.primary }}>UI/UX</span>
                                            <span className="work-title" style={{ color: colors.text }}>Project {i}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Footer */}
                        <footer className="portfolio-footer" style={{ background: colors.surface, borderTop: `1px solid ${colors.primary}10` }}>
                            <span style={{ color: colors.textMuted }}>© 2024 Alex. All rights reserved.</span>
                        </footer>
                    </div>
                </div>
            </div>

            {/* Bottom Actions */}
            <div className="preview-bottom">
                {!isGenerated ? (
                    <button
                        className={`generate-btn-new ${isGenerating ? 'generating' : ''}`}
                        onClick={handleGenerate}
                        disabled={isGenerating}
                        style={{ background: isGenerating ? colors.surface : colors.gradient }}
                    >
                        {isGenerating ? (
                            <><div className="gen-spinner"></div>Generating...</>
                        ) : (
                            <>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                                </svg>
                                Generate Portfolio
                            </>
                        )}
                    </button>
                ) : (
                    <div className="generated-actions">
                        <div className="success-badge" style={{ color: colors.primary }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                            Portfolio Ready!
                        </div>
                        <button className="download-btn" onClick={handleDownload} style={{ background: colors.gradient }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7,10 12,15 17,10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                            Download
                        </button>
                        <button className="new-btn" onClick={handleStartOver}>Create Another</button>
                    </div>
                )}

                <div className="progress-dots-v2">
                    {[1, 2, 3, 4].map((dot) => (
                        <div key={dot} className={`dot ${dot === 4 ? 'active' : 'completed'}`} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Step4Preview;
