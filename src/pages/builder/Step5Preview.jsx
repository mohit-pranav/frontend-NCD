import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBuilder } from '../../context/BuilderContext';

const Step5Preview = () => {
    const navigate = useNavigate();
    const {
        prompt,
        selectedPalette,
        selectedAnimation,
        selectedLayout,
        prevStep,
        resetBuilder
    } = useBuilder();

    const [isGenerating, setIsGenerating] = useState(false);
    const [isGenerated, setIsGenerated] = useState(false);
    const [viewMode, setViewMode] = useState('desktop'); // desktop, tablet, mobile

    const handleBack = () => {
        prevStep();
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
        alert('🎉 Your website files are ready! Download feature coming soon.');
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
                    <span className="step-badge-small">Step 5 of 5</span>
                    <h2>Preview Your Website</h2>
                </div>

                {/* View Mode Switcher */}
                <div className="view-modes">
                    <button
                        className={`view-mode-btn ${viewMode === 'desktop' ? 'active' : ''}`}
                        onClick={() => setViewMode('desktop')}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="2" y="3" width="20" height="14" rx="2" />
                            <line x1="8" y1="21" x2="16" y2="21" />
                            <line x1="12" y1="17" x2="12" y2="21" />
                        </svg>
                    </button>
                    <button
                        className={`view-mode-btn ${viewMode === 'tablet' ? 'active' : ''}`}
                        onClick={() => setViewMode('tablet')}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="4" y="2" width="16" height="20" rx="2" />
                            <line x1="12" y1="18" x2="12" y2="18" />
                        </svg>
                    </button>
                    <button
                        className={`view-mode-btn ${viewMode === 'mobile' ? 'active' : ''}`}
                        onClick={() => setViewMode('mobile')}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="5" y="2" width="14" height="20" rx="2" />
                            <line x1="12" y1="18" x2="12" y2="18" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Main Preview Area */}
            <div className="preview-main-area">
                {/* Summary Cards */}
                <div className="summary-cards">
                    <div className="summary-card">
                        <span className="card-label">Layout</span>
                        <span className="card-value">{selectedLayout?.name || 'None'}</span>
                    </div>
                    <div className="summary-card">
                        <span className="card-label">Theme</span>
                        <div className="card-value-colors">
                            {selectedPalette?.preview.slice(0, 4).map((color, i) => (
                                <div key={i} className="mini-swatch" style={{ background: color }} />
                            ))}
                            <span>{selectedPalette?.name || 'None'}</span>
                        </div>
                    </div>
                    <div className="summary-card">
                        <span className="card-label">Animation</span>
                        <span className="card-value">{selectedAnimation?.name || 'None'}</span>
                    </div>
                </div>

                {/* Live Preview Frame */}
                <div className={`preview-device-frame ${viewMode}`}>
                    <div className="device-chrome">
                        <div className="device-dots">
                            <span></span><span></span><span></span>
                        </div>
                        <div className="device-url">
                            <span>yourwebsite.com</span>
                        </div>
                    </div>

                    <div
                        className="preview-content"
                        style={{ background: selectedPalette?.colors.background || '#0a0a0f' }}
                    >
                        {/* Header */}
                        <div
                            className="prev-header"
                            style={{
                                background: `linear-gradient(135deg, ${selectedPalette?.colors.primary || '#a855f7'}20, ${selectedPalette?.colors.secondary || '#6366f1'}10)`
                            }}
                        >
                            <span className="prev-logo" style={{ color: selectedPalette?.colors.text }}>Logo</span>
                            <div className="prev-nav" style={{ color: selectedPalette?.colors.text }}>
                                <span>Home</span>
                                <span>About</span>
                                <span>Work</span>
                                <span>Contact</span>
                            </div>
                            <button
                                className="prev-cta-small"
                                style={{ background: selectedPalette?.colors.gradient }}
                            >
                                Get Started
                            </button>
                        </div>

                        {/* Hero */}
                        <div className="prev-hero">
                            <h1 style={{ color: selectedPalette?.colors.text }}>
                                {prompt ? prompt.slice(0, 35) : 'Your Amazing Website'}
                            </h1>
                            <p style={{ color: selectedPalette?.colors.text, opacity: 0.6 }}>
                                Crafted with passion and precision
                            </p>
                            <button
                                className="prev-cta-main"
                                style={{ background: selectedPalette?.colors.gradient }}
                            >
                                Explore Now
                            </button>
                        </div>

                        {/* Feature/Section Cards */}
                        <div className="prev-features">
                            {[1, 2, 3].map(i => (
                                <div
                                    key={i}
                                    className="prev-feature-card"
                                    style={{
                                        background: `${selectedPalette?.colors.primary || '#a855f7'}10`,
                                        borderColor: `${selectedPalette?.colors.primary || '#a855f7'}30`
                                    }}
                                >
                                    <div
                                        className="feature-icon"
                                        style={{ background: selectedPalette?.colors.gradient }}
                                    />
                                    <div className="feature-text">
                                        <h4 style={{ color: selectedPalette?.colors.text }}>Feature {i}</h4>
                                        <p style={{ color: selectedPalette?.colors.text, opacity: 0.5 }}>Description</p>
                                    </div>
                                </div>
                            ))}
                        </div>
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
                    >
                        {isGenerating ? (
                            <>
                                <div className="gen-spinner"></div>
                                Generating...
                            </>
                        ) : (
                            <>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                                </svg>
                                Generate Website
                            </>
                        )}
                    </button>
                ) : (
                    <div className="generated-actions">
                        <div className="success-badge">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                            Website Ready!
                        </div>
                        <button className="download-btn" onClick={handleDownload}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7,10 12,15 17,10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                            Download Files
                        </button>
                        <button className="new-btn" onClick={handleStartOver}>
                            Create Another
                        </button>
                    </div>
                )}

                {/* Progress Dots */}
                <div className="progress-dots-v2">
                    {[1, 2, 3, 4, 5].map((dot) => (
                        <div
                            key={dot}
                            className={`dot ${dot === 5 ? 'active' : 'completed'}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Step5Preview;
