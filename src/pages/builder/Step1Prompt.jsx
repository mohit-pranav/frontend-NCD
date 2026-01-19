import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBuilder } from '../../context/BuilderContext';

const suggestions = [
    { label: 'Portfolio', text: 'A modern portfolio for a creative designer' },
    { label: 'SaaS', text: 'SaaS landing page with pricing and features' },
    { label: 'Store', text: 'E-commerce store with dark premium theme' },
    { label: 'Agency', text: 'Digital agency website with case studies' },
    { label: 'Blog', text: 'Personal blog with minimal design' },
];

const Step1Prompt = () => {
    const navigate = useNavigate();
    const { prompt, setPrompt, nextStep } = useBuilder();
    const [localPrompt, setLocalPrompt] = useState(prompt);
    const [isLoading, setIsLoading] = useState(false);
    const [shake, setShake] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleSend = () => {
        if (!localPrompt.trim()) {
            setShake(true);
            setTimeout(() => setShake(false), 400);
            return;
        }

        setIsLoading(true);
        setPrompt(localPrompt);

        // Simulate AI processing
        setTimeout(() => {
            setIsLoading(false);
            nextStep();
            navigate('/questions');
        }, 1500);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSend();
    };

    const handleChipClick = (text) => {
        setLocalPrompt(text);
        inputRef.current?.focus();
    };

    return (
        <div className="builder-step step-prompt">
            {/* Background Elements */}
            <div className="step-bg-gradient"></div>
            <div className="step-bg-grid"></div>

            <div className="step-content">
                {/* Step Indicator */}
                <div className="step-indicator">
                    <span className="step-number">01</span>
                    <span className="step-label">Describe Your Vision</span>
                </div>

                {/* Main Heading */}
                <h1 className="step-heading">
                    What would you like to <span className="gradient-text">create</span>?
                </h1>

                <p className="step-subheading">
                    Describe your dream website and we'll bring it to life
                </p>

                {/* Prompt Box */}
                <div className={`builder-prompt-box ${shake ? 'shake' : ''} ${isLoading ? 'loading' : ''}`}>
                    <div className="prompt-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8" />
                            <path d="M21 21l-4.35-4.35" />
                        </svg>
                    </div>
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Describe your website idea..."
                        value={localPrompt}
                        onChange={(e) => setLocalPrompt(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={isLoading}
                    />
                    <button
                        className="prompt-send-btn"
                        onClick={handleSend}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className="loading-spinner"></div>
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* AI Indicator */}
                {isLoading && (
                    <div className="ai-processing">
                        <div className="ai-orb"></div>
                        <span>AI is analyzing your request...</span>
                    </div>
                )}

                {/* Suggestion Chips */}
                {!isLoading && (
                    <div className="suggestion-chips">
                        <span className="chips-label">Try these:</span>
                        {suggestions.map((s, i) => (
                            <button
                                key={i}
                                className="suggestion-chip"
                                onClick={() => handleChipClick(s.text)}
                                style={{ animationDelay: `${i * 0.1}s` }}
                            >
                                {s.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Progress Dots */}
            <div className="progress-dots">
                {[1, 2, 3, 4, 5, 6].map((dot) => (
                    <div
                        key={dot}
                        className={`progress-dot ${dot === 1 ? 'active' : ''}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Step1Prompt;
