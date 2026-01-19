import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBuilder } from '../context/BuilderContext';

const suggestions = [
    { label: 'Portfolio', text: 'A modern portfolio for a designer' },
    { label: 'SaaS', text: 'SaaS landing page with pricing' },
    { label: 'Store', text: 'E-commerce store with dark theme' },
];

const PromptBox = () => {
    const navigate = useNavigate();
    const { setPrompt } = useBuilder();
    const [localPrompt, setLocalPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [shake, setShake] = useState(false);
    const [selectedModel, setSelectedModel] = useState('gpt-4');
    const [selectedMode, setSelectedMode] = useState('instant');
    const inputRef = useRef(null);

    const handleSend = () => {
        if (!localPrompt.trim()) {
            setShake(true);
            setTimeout(() => setShake(false), 400);
            return;
        }

        setIsLoading(true);
        setPrompt(localPrompt);

        setTimeout(() => {
            setIsLoading(false);
            // Navigate to layout selection (first step of builder)
            navigate('/layout');
        }, 1500);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSend();
    };

    const handleChipClick = (text) => {
        setLocalPrompt(text);
        inputRef.current?.focus();
    };

    const handleFileAttach = () => {
        // File attachment logic
        console.log('File attachment clicked');
    };

    const handleModeChange = (mode) => {
        setSelectedMode(mode);
    };

    return (
        <div className="prompt-wrapper">
            <div className="prompt-box-header">
                <div className="mode-options">
                    <button 
                        className={`mode-btn ${selectedMode === 'instant' ? 'active' : ''}`}
                        onClick={() => handleModeChange('instant')}
                    >
                        Instant
                    </button>
                    <button 
                        className={`mode-btn ${selectedMode === 'detailed' ? 'active' : ''}`}
                        onClick={() => handleModeChange('detailed')}
                    >
                        Detailed
                    </button>
                </div>
            </div>
            
            <div className={`prompt-box ${shake ? 'shake' : ''}`}>
                <button className="attach-btn" onClick={handleFileAttach}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
                    </svg>
                </button>
                
                <input
                    ref={inputRef}
                    type="text"
                    id="promptInput"
                    placeholder="What do you want to create?"
                    autoComplete="off"
                    spellCheck="false"
                    value={localPrompt}
                    onChange={(e) => setLocalPrompt(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                
                <select 
                    className="model-select"
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    title={selectedModel}
                >
                    <option value="gpt-4">GPT-4</option>
                    <option value="gpt-3.5">GPT-3.5</option>
                    <option value="claude-3">Claude-3</option>
                    <option value="gemini-pro">Gemini Pro</option>
                </select>
                
                <button
                    className="send-btn"
                    onClick={handleSend}
                    style={{ opacity: isLoading ? 0.6 : 1, pointerEvents: isLoading ? 'none' : 'auto' }}
                >
                    {isLoading ? (
                        <div className="loading-spinner" style={{ width: 20, height: 20, border: '2px solid rgba(255,255,255,0.2)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}></div>
                    ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 2L11 13" />
                            <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                        </svg>
                    )}
                </button>
            </div>

            {!isLoading && (
                <div className="suggestions">
                    {suggestions.map((s, i) => (
                        <button key={i} className="chip" onClick={() => handleChipClick(s.text)}>
                            {s.label}
                        </button>
                    ))}
                </div>
            )}

            {isLoading && (
                <div className="ai-indicator active">
                    <span className="ai-text">AI is thinking</span>
                    <span className="ai-dots">
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </span>
                </div>
            )}
        </div>
    );
};

export default PromptBox;