import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBuilder } from '../../context/BuilderContext';

const Step5Animations = () => {
    const navigate = useNavigate();
    const { animations, selectedAnimation, setSelectedAnimation, selectedPalette, loading } = useBuilder();

    const previewStars = useMemo(() => {
        return [...Array(35)].map(() => ({
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            delay: `${Math.random() * 3}s`,
            variant: Math.random() < 0.33
        }));
    }, []);

    const handleSelect = (animation) => {
        setSelectedAnimation(animation);
    };

    const handleContinue = () => {
        if (selectedAnimation) {
            navigate('/preview');
        }
    };

    const handleBack = () => {
        navigate('/colors');
    };

    const colors = selectedPalette?.colors || {
        primary: '#a855f7',
        secondary: '#6366f1',
        background: '#0a0a0f',
        surface: '#141414',
        text: '#ffffff',
        textMuted: '#9ca3af',
        gradient: 'linear-gradient(135deg, #a855f7, #6366f1)'
    };

    const previewAnimationId = selectedAnimation?.id || 'none';

    if (loading) {
        return (
            <div className="builder-step-v2 step-animations-v2 fit-screen">
                <div className="loading-state">
                    <div className="loader"></div>
                    <p>Loading animations...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="builder-step-v2 step-animations-v2 fit-screen">
            <div className="animations-main">
                <div className="animations-container">
                    <h1 className="page-title-centered">Choose Background Animation</h1>
                    <p className="step-subtitle-centered">Add subtle motion to make your portfolio stand out</p>

                    <div className="animation-grid-v2">
                        {animations.map((anim) => (
                            <div
                                key={anim.id}
                                className={`animation-card-v2 ${selectedAnimation?.id === anim.id ? 'selected' : ''}`}
                                onClick={() => handleSelect(anim)}
                            >
                                <div className="animation-visual">
                                    {anim.id === 'particles' && (
                                        <div className="visual-particles">
                                            {[...Array(25)].map((_, i) => (
                                                <div
                                                    key={i}
                                                    className="star-dot"
                                                    style={{
                                                        left: `${Math.random() * 100}%`,
                                                        top: `${Math.random() * 100}%`,
                                                        animationDelay: `${Math.random() * 3}s`,
                                                        background: i % 3 === 0 ? colors.primary : 'rgba(255,255,255,0.8)'
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    )}
                                    {anim.id === 'gradient-flow' && (
                                        <div
                                            className="visual-waves"
                                            style={{
                                                background: `linear-gradient(135deg, ${colors.primary}80, ${colors.secondary}80, ${colors.primary}80)`,
                                                backgroundSize: '400% 400%'
                                            }}
                                        />
                                    )}
                                    {anim.id === 'aurora' && (
                                        <div
                                            className="visual-aurora"
                                            style={{
                                                background: `
                                                    radial-gradient(ellipse at 30% 50%, ${colors.primary}60 0%, transparent 50%),
                                                    radial-gradient(ellipse at 70% 60%, ${colors.secondary}40 0%, transparent 50%),
                                                    linear-gradient(180deg, #0a1628 0%, #0d1f35 100%)
                                                `
                                            }}
                                        />
                                    )}
                                    {anim.id === 'none' && (
                                        <div className="visual-none">
                                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                <circle cx="12" cy="12" r="10" />
                                                <path d="M4.93 4.93l14.14 14.14" />
                                            </svg>
                                        </div>
                                    )}
                                </div>

                                <div className="animation-info">
                                    <span className="animation-name">{anim.name}</span>
                                    <span className="animation-desc">{anim.description}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bottom-bar">
                        <button className="back-btn-pill" onClick={handleBack}>Back</button>
                        <button
                            className={`continue-btn-pill ${selectedAnimation ? 'active' : ''}`}
                            onClick={handleContinue}
                            disabled={!selectedAnimation}
                        >
                            Continue
                        </button>

                        <div className="step-info">
                            <span className="step-text">Step 5 of 6</span>
                            <div className="progress-dots-v2 inline">
                                {[1, 2, 3, 4, 5, 6].map((dot) => (
                                    <div
                                        key={dot}
                                        className={`dot ${dot === 5 ? 'active' : ''} ${dot < 5 ? 'completed' : ''}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="preview-panel-v2">
                <div className="preview-label">LIVE PREVIEW</div>
                <div className="preview-frame-v2 animation-preview-frame" style={{ background: colors.background }}>
                    <div className="animation-bg-layer">
                        {previewAnimationId === 'particles' && (
                            <div className="visual-particles">
                                {previewStars.map((s, i) => (
                                    <div
                                        key={i}
                                        className="star-dot"
                                        style={{
                                            left: s.left,
                                            top: s.top,
                                            animationDelay: s.delay,
                                            background: s.variant ? colors.primary : 'rgba(255,255,255,0.75)'
                                        }}
                                    />
                                ))}
                            </div>
                        )}

                        {previewAnimationId === 'gradient-flow' && (
                            <div
                                className="visual-waves"
                                style={{
                                    background: `linear-gradient(135deg, ${colors.primary}70, ${colors.secondary}70, ${colors.primary}70)`,
                                    backgroundSize: '400% 400%'
                                }}
                            />
                        )}

                        {previewAnimationId === 'aurora' && (
                            <div
                                className="visual-aurora"
                                style={{
                                    background: `
                                        radial-gradient(ellipse at 30% 50%, ${colors.primary}55 0%, transparent 55%),
                                        radial-gradient(ellipse at 70% 60%, ${colors.secondary}35 0%, transparent 55%),
                                        linear-gradient(180deg, #0a1628 0%, #0d1f35 100%)
                                    `
                                }}
                            />
                        )}

                        {previewAnimationId === 'none' && (
                            <div className="visual-none" />
                        )}
                    </div>

                    <div className="animation-preview-content">
                        <div className="prev-navbar" style={{ background: `${colors.primary}18`, borderBottom: `1px solid ${colors.primary}30` }}>
                            <span className="prev-logo" style={{ color: colors.text }}>Portfolio</span>
                            <div className="prev-nav-links">
                                <span style={{ color: colors.textMuted }}>About</span>
                                <span style={{ color: colors.textMuted }}>Work</span>
                                <span style={{ color: colors.textMuted }}>Contact</span>
                            </div>
                        </div>

                        <div className="prev-content">
                            <div className="prev-hero-section">
                                <span className="prev-label" style={{ color: colors.primary }}>Designer</span>
                                <h2 style={{ color: colors.text }}>I Design Experiences</h2>
                                <button className="prev-btn" style={{ background: colors.gradient }}>View Work</button>
                            </div>

                            <div className="prev-grid-2x2">
                                {[1, 2, 3, 4].map((i) => (
                                    <div
                                        key={i}
                                        className="prev-grid-item"
                                        style={{ background: `${colors.primary}${10 + i * 5}`, border: `1px solid ${colors.primary}30` }}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="prev-footer">
                            <span style={{ color: colors.textMuted }}>© 2024 Portfolio</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Step5Animations;
