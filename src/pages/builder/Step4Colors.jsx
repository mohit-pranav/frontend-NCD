import { useNavigate } from 'react-router-dom';
import { useBuilder } from '../../context/BuilderContext';

const Step4Colors = () => {
    const navigate = useNavigate();
    const { colorPalettes, selectedPalette, setSelectedPalette, selectedLayout, loading, error } = useBuilder();

    const handleSelect = (palette) => {
        setSelectedPalette(palette);
    };

    const handleContinue = () => {
        if (selectedPalette) {
            navigate('/animations');
        }
    };

    const handleBack = () => {
        navigate('/layout');
    };

    // Get colors for preview
    const colors = selectedPalette?.colors || {
        primary: '#a855f7',
        secondary: '#6366f1',
        background: '#0a0a0f',
        surface: '#141414',
        text: '#ffffff',
        textMuted: '#9ca3af',
        gradient: 'linear-gradient(135deg, #a855f7, #6366f1)'
    };

    const layoutStyle = selectedLayout?.style || 'creative';

    if (loading) {
        return (
            <div className="builder-step-v2 step-colors-v2 fit-screen">
                <div className="loading-state">
                    <div className="loader"></div>
                    <p>Loading colors...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="builder-step-v2 step-colors-v2 fit-screen">
            <div className="colors-main">
                <div className="page-header">
                    <button className="back-arrow" onClick={handleBack}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <h1 className="page-title">Choose Your Vibe</h1>
                    <span className="step-badge">Step 4 of 6</span>
                </div>

                <div className="palette-scroll-container">
                    <div className="palette-grid-v2">
                        {colorPalettes.map((palette) => (
                            <div
                                key={palette.id}
                                className={`palette-card-v2 ${selectedPalette?.id === palette.id ? 'selected' : ''}`}
                                onClick={() => handleSelect(palette)}
                            >
                                <div className="color-swatches-row">
                                    {palette.preview.map((color, i) => (
                                        <div key={i} className="swatch" style={{ backgroundColor: color }} />
                                    ))}
                                </div>
                                <h3 className="palette-name">{palette.name}</h3>
                                <p className="palette-desc">{palette.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bottom-actions">
                    <button
                        className={`continue-btn-v2 ${selectedPalette ? 'active' : ''}`}
                        onClick={handleContinue}
                        disabled={!selectedPalette}
                    >
                        Continue
                    </button>
                    <div className="progress-dots-v2">
                        {[1, 2, 3, 4, 5, 6].map((dot) => (
                            <div
                                key={dot}
                                className={`dot ${dot === 4 ? 'active' : ''} ${dot < 4 ? 'completed' : ''}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* LIVE PREVIEW */}
            <div className="preview-panel-v2">
                <div className="preview-label">LIVE PREVIEW</div>
                <div className="preview-frame-v2" style={{ background: colors.background }}>
                    {/* Navbar */}
                    <div className="prev-navbar" style={{ background: `${colors.primary}15`, borderBottom: `1px solid ${colors.primary}30` }}>
                        <span className="prev-logo" style={{ color: colors.text }}>Portfolio</span>
                        <div className="prev-nav-links">
                            <span style={{ color: colors.textMuted }}>About</span>
                            <span style={{ color: colors.textMuted }}>Work</span>
                            <span style={{ color: colors.textMuted }}>Contact</span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="prev-content">
                        {layoutStyle === 'creative' && (
                            <>
                                <div className="prev-hero-section">
                                    <span className="prev-label" style={{ color: colors.primary }}>Designer</span>
                                    <h2 style={{ color: colors.text }}>I Design Experiences</h2>
                                    <button className="prev-btn" style={{ background: colors.gradient }}>View Work</button>
                                </div>
                                <div className="prev-grid-2x2">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="prev-grid-item" style={{ background: `${colors.primary}${10 + i * 5}`, border: `1px solid ${colors.primary}30` }} />
                                    ))}
                                </div>
                            </>
                        )}

                        {layoutStyle === 'professional' && (
                            <>
                                <div className="prev-split-row">
                                    <div className="prev-split-box prev-hero-box" style={{ background: `${colors.primary}15`, border: `1px solid ${colors.primary}30` }}>
                                        <span style={{ color: colors.primary, fontSize: '9px' }}>Professional</span>
                                        <span style={{ color: colors.text, fontSize: '11px', fontWeight: 600 }}>Alex Johnson</span>
                                        <button className="prev-btn-sm" style={{ background: colors.gradient }}>Hire Me</button>
                                    </div>
                                    <div className="prev-split-box" style={{ background: `${colors.secondary}10`, border: `1px solid ${colors.secondary}30` }}>
                                        <div style={{ color: colors.primary, fontWeight: 700, fontSize: '12px' }}>150+</div>
                                        <div style={{ color: colors.textMuted, fontSize: '7px' }}>Projects</div>
                                    </div>
                                </div>
                                <div className="prev-cards-row">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="prev-card" style={{ background: `${colors.primary}10`, border: `1px solid ${colors.primary}20` }}>
                                            <div className="prev-card-icon" style={{ background: colors.gradient }} />
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}

                        {layoutStyle === 'minimal' && (
                            <>
                                <div className="prev-hero-section" style={{ textAlign: 'center' }}>
                                    <h2 style={{ color: colors.text, fontSize: '14px' }}>Alex Johnson</h2>
                                    <span style={{ color: colors.textMuted, fontSize: '9px' }}>UI/UX Designer</span>
                                </div>
                                <div className="prev-cards-row">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="prev-card" style={{ background: `${colors.primary}${10 + i * 5}`, border: `1px solid ${colors.primary}20`, aspectRatio: '1' }} />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="prev-footer">
                        <span style={{ color: colors.textMuted }}>© 2024 Portfolio</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Step4Colors;
