import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBuilder } from '../../context/BuilderContext';

const Step6Preview = () => {
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
    const [viewMode, setViewMode] = useState('desktop');
    const [isEditMode, setIsEditMode] = useState(true);
    const [activeElementId, setActiveElementId] = useState(null);
    const [rightPanelMode, setRightPanelMode] = useState('properties');
    const [chatInput, setChatInput] = useState('');
    const [chatMessages, setChatMessages] = useState([
        { role: 'bot', text: 'Hi! I can help you customize your website. Select an element and click "Ask AI" or type your request.' }
    ]);
    const chatEndRef = useRef(null);

    // Dynamic editable elements registry
    // Each element has: id, type (text/button/image/container), label, properties
    const [editableElements, setEditableElements] = useState({
        'el_logo_001': {
            id: 'el_logo_001',
            type: 'text',
            label: 'Logo',
            htmlTag: 'span',
            className: 'portfolio-logo',
            properties: {
                text: 'Alex',
                fontSize: 18,
                textColor: '',
            }
        },
        'el_nav_001': {
            id: 'el_nav_001',
            type: 'nav',
            label: 'Navigation',
            htmlTag: 'nav',
            className: 'portfolio-nav',
            properties: {
                items: ['About', 'Work', 'Contact'],
                fontSize: 14,
                textColor: '',
            }
        },
        'el_cta_001': {
            id: 'el_cta_001',
            type: 'button',
            label: 'Header CTA',
            htmlTag: 'button',
            className: 'portfolio-cta',
            properties: {
                text: 'Hire Me',
                fontSize: 14,
                textColor: '#ffffff',
                bgColor: '',
                borderRadius: 8,
                paddingX: 16,
                paddingY: 10,
            }
        },
        'el_tag_001': {
            id: 'el_tag_001',
            type: 'text',
            label: 'Hero Tag',
            htmlTag: 'span',
            className: 'hero-tag',
            properties: {
                text: 'UI/UX Designer',
                fontSize: 14,
                textColor: '',
            }
        },
        'el_title_001': {
            id: 'el_title_001',
            type: 'text',
            label: 'Hero Title',
            htmlTag: 'h1',
            className: '',
            properties: {
                text: 'I Design Digital Experiences',
                fontSize: 48,
                textColor: '',
            }
        },
        'el_desc_001': {
            id: 'el_desc_001',
            type: 'text',
            label: 'Hero Description',
            htmlTag: 'p',
            className: '',
            properties: {
                text: 'Award-winning designer with 8+ years of experience creating beautiful digital products.',
                fontSize: 16,
                textColor: '',
            }
        },
        'el_btn_primary_001': {
            id: 'el_btn_primary_001',
            type: 'button',
            label: 'Primary Button',
            htmlTag: 'button',
            className: 'btn-primary',
            properties: {
                text: 'View My Work',
                fontSize: 14,
                textColor: '#ffffff',
                bgColor: '',
                borderRadius: 8,
                paddingX: 24,
                paddingY: 14,
            }
        },
        'el_btn_secondary_001': {
            id: 'el_btn_secondary_001',
            type: 'button',
            label: 'Secondary Button',
            htmlTag: 'button',
            className: 'btn-secondary',
            properties: {
                text: 'Get In Touch',
                fontSize: 14,
                textColor: '',
                bgColor: 'transparent',
                borderRadius: 8,
                paddingX: 24,
                paddingY: 14,
            }
        },
        'el_stats_001': {
            id: 'el_stats_001',
            type: 'stats',
            label: 'Stats',
            htmlTag: 'div',
            className: 'hero-stats',
            properties: {
                items: [
                    { number: '150+', label: 'Projects' },
                    { number: '8+', label: 'Years' },
                    { number: '50+', label: 'Clients' }
                ],
                numberColor: '',
                labelColor: '',
                numberSize: 24,
                labelSize: 12,
            }
        },
        'el_section_title_001': {
            id: 'el_section_title_001',
            type: 'text',
            label: 'Section Title',
            htmlTag: 'h2',
            className: '',
            properties: {
                text: 'Selected Works',
                fontSize: 32,
                textColor: '',
            }
        },
        'el_footer_001': {
            id: 'el_footer_001',
            type: 'text',
            label: 'Footer Text',
            htmlTag: 'span',
            className: '',
            properties: {
                text: '© 2024 Alex. All rights reserved.',
                fontSize: 14,
                textColor: '',
            }
        }
    });

    // Get element by ID
    const getElement = (id) => editableElements[id];

    // Update element property
    const updateElementProperty = (elementId, propertyName, value) => {
        setEditableElements(prev => ({
            ...prev,
            [elementId]: {
                ...prev[elementId],
                properties: {
                    ...prev[elementId].properties,
                    [propertyName]: value
                }
            }
        }));
    };

    // Get active element
    const activeElement = activeElementId ? getElement(activeElementId) : null;

    // Scroll to bottom of chat
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatMessages]);

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
        alert('🎉 Your portfolio website files are ready! Download feature coming soon.');
    };

    const handleOpenPreview = () => {
        window.open('/preview?mode=fullscreen', '_blank');
    };

    const openPropertiesPanel = () => setRightPanelMode('properties');
    const openChatPanel = () => setRightPanelMode('chat');

    // Send selected element to chat input with element ID and label
    const sendToChat = (e) => {
        if (e) e.stopPropagation();
        if (!activeElement) return;
        setRightPanelMode('chat');
        // Use element label for user-friendly display, ID for reference
        setChatInput(`@${activeElement.label} (${activeElement.id}) `);
    };

    // Handle element click
    const handleElementClick = (elementId) => {
        setActiveElementId(elementId);
        setIsEditMode(true);
        openPropertiesPanel();
    };

    const handlePreviewAreaClick = () => {
        setIsEditMode(true);
        openPropertiesPanel();
    };

    // Send chat message
    const handleSendMessage = () => {
        if (!chatInput.trim()) return;

        setChatMessages(prev => [...prev, { role: 'user', text: chatInput }]);
        const userMessage = chatInput;
        setChatInput('');

        // Extract element ID if mentioned (format: @Label (el_xxx_xxx))
        const elementMatch = userMessage.match(/@[\w\s]+ \((el_[\w_]+)\)/);
        const mentionedElementId = elementMatch ? elementMatch[1] : null;
        const mentionedElement = mentionedElementId ? getElement(mentionedElementId) : null;

        // Simulate AI response with element context
        setTimeout(() => {
            const response = mentionedElement
                ? `I understand you want to modify the "${mentionedElement.label}" element (ID: ${mentionedElementId}). What changes would you like to make?`
                : `I understand you want to: "${userMessage}". This feature will connect to the AI backend soon!`;

            setChatMessages(prev => [...prev, { role: 'bot', text: response }]);
        }, 1000);
    };

    // Render helpers - now use element ID and property names
    const renderPropertyInput = ({ label, propertyName, type = 'text', min, max, step = 1, unit = '', placeholder = '' }) => {
        if (!activeElement) return null;
        const value = activeElement.properties[propertyName] ?? '';

        if (type === 'number') {
            return (
                <div className="prop-control" key={propertyName}>
                    <div className="prop-row">
                        <div className="prop-label">{label}</div>
                        <div className="prop-value-input">
                            <input
                                type="number"
                                className="prop-number-input"
                                min={min}
                                max={max}
                                step={step}
                                value={value}
                                onChange={(e) => updateElementProperty(activeElementId, propertyName, Number(e.target.value))}
                            />
                            {unit && <span className="prop-unit">{unit}</span>}
                        </div>
                    </div>
                </div>
            );
        }

        if (type === 'color') {
            const colorValue = value || '#ffffff';
            return (
                <div className="prop-control" key={propertyName}>
                    <div className="prop-row">
                        <div className="prop-label">{label}</div>
                        <div className="prop-color-wrapper">
                            <input
                                type="color"
                                className="prop-color-picker"
                                value={colorValue}
                                onChange={(e) => updateElementProperty(activeElementId, propertyName, e.target.value)}
                            />
                            <input
                                type="text"
                                className="prop-color-text"
                                value={colorValue}
                                onChange={(e) => updateElementProperty(activeElementId, propertyName, e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            );
        }

        // Default text input
        return (
            <div className="prop-control" key={propertyName}>
                <div className="prop-label">{label}</div>
                <input
                    className="prop-text-input"
                    type="text"
                    value={value}
                    placeholder={placeholder || `Enter ${label.toLowerCase()}...`}
                    onChange={(e) => updateElementProperty(activeElementId, propertyName, e.target.value)}
                />
            </div>
        );
    };

    const renderSectionHeader = (title) => (
        <div className="prop-section-header" key={title}>{title}</div>
    );

    // Dynamic property controls based on element type
    const renderElementControls = () => {
        if (!activeElement) return null;
        const { type, properties } = activeElement;

        return (
            <>
                {/* Text property - all text elements */}
                {properties.text !== undefined && (
                    <>
                        {renderSectionHeader('📝 Content')}
                        {renderPropertyInput({ label: 'Text', propertyName: 'text', type: 'text' })}
                    </>
                )}

                {/* Font size - if available */}
                {properties.fontSize !== undefined && (
                    <>
                        {renderSectionHeader('🔤 Typography')}
                        {renderPropertyInput({ label: 'Font Size', propertyName: 'fontSize', type: 'number', min: 10, max: 72, unit: 'px' })}
                    </>
                )}

                {/* Colors */}
                {(properties.textColor !== undefined || properties.bgColor !== undefined) && (
                    <>
                        {renderSectionHeader('🎨 Colors')}
                        {properties.textColor !== undefined && renderPropertyInput({ label: 'Text Color', propertyName: 'textColor', type: 'color' })}
                        {properties.bgColor !== undefined && renderPropertyInput({ label: 'Background', propertyName: 'bgColor', type: 'color' })}
                    </>
                )}

                {/* Button specific - border radius, padding */}
                {type === 'button' && (
                    <>
                        {renderSectionHeader('📐 Style')}
                        {properties.borderRadius !== undefined && renderPropertyInput({ label: 'Border Radius', propertyName: 'borderRadius', type: 'number', min: 0, max: 50, unit: 'px' })}
                        {properties.paddingX !== undefined && renderPropertyInput({ label: 'Padding X', propertyName: 'paddingX', type: 'number', min: 0, max: 50, unit: 'px' })}
                        {properties.paddingY !== undefined && renderPropertyInput({ label: 'Padding Y', propertyName: 'paddingY', type: 'number', min: 0, max: 50, unit: 'px' })}
                    </>
                )}

                {/* Stats specific */}
                {type === 'stats' && (
                    <>
                        {renderSectionHeader('🎨 Colors')}
                        {properties.numberColor !== undefined && renderPropertyInput({ label: 'Number Color', propertyName: 'numberColor', type: 'color' })}
                        {properties.labelColor !== undefined && renderPropertyInput({ label: 'Label Color', propertyName: 'labelColor', type: 'color' })}
                    </>
                )}
            </>
        );
    };

    // Editable element wrapper with Ask AI button - now uses element ID
    const EditableElement = ({ elementId, children, style, className = '' }) => {
        const element = getElement(elementId);
        if (!element) return null;

        const isActive = activeElementId === elementId;
        const Tag = element.htmlTag || 'div';

        return (
            <Tag
                className={`editable-element ${isActive ? 'edit-active' : ''} ${element.className} ${className}`}
                style={style}
                onClick={(e) => {
                    e.stopPropagation();
                    handleElementClick(elementId);
                }}
                data-element-id={elementId}
            >
                {children}
                {isActive && (
                    <button
                        className="floating-chat-btn"
                        onClick={sendToChat}
                        style={{ opacity: 1, visibility: 'visible', transform: 'translateX(-50%) translateY(0)' }}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                        Ask AI
                    </button>
                )}
            </Tag>
        );
    };

    const colors = selectedPalette?.colors || {
        primary: '#a855f7',
        secondary: '#6366f1',
        background: '#0a0a0f',
        surface: '#131320',
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
                    <span className="step-badge-small">Step 6 of 6</span>
                    <h2>Preview & Edit</h2>
                </div>

                <div className="toolbar-actions">
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
                    <button className="toolbar-btn" onClick={handleOpenPreview}>Preview</button>
                </div>
            </div>

            <div className="preview-main-area preview-split">
                {/* Preview Panel */}
                <div className="preview-left">
                    <div className={`preview-device-frame ${viewMode}`} onClick={handlePreviewAreaClick}>
                        <div className="device-chrome">
                            <div className="device-dots"><span></span><span></span><span></span></div>
                            <div className="device-url"><span>myportfolio.com</span></div>
                        </div>

                        <div className="preview-content portfolio-preview" style={{ background: colors.background }}>
                            {/* Header */}
                            <header className={`portfolio-header ${isEditMode ? 'edit-enabled' : ''}`} style={{ background: colors.surface }}>
                                <EditableElement
                                    elementId="el_logo_001"
                                    style={{
                                        color: getElement('el_logo_001')?.properties.textColor || colors.text,
                                        fontSize: `${getElement('el_logo_001')?.properties.fontSize}px`,
                                        position: 'relative'
                                    }}
                                >
                                    {getElement('el_logo_001')?.properties.text}<span style={{ color: colors.primary }}>.</span>
                                </EditableElement>
                                <nav className="portfolio-nav">
                                    <EditableElement
                                        elementId="el_nav_001"
                                        style={{
                                            color: getElement('el_nav_001')?.properties.textColor || colors.textMuted,
                                            fontSize: `${getElement('el_nav_001')?.properties.fontSize}px`,
                                            position: 'relative'
                                        }}
                                    >
                                        {getElement('el_nav_001')?.properties.items?.map((item, i) => (
                                            <span key={i}>{item}</span>
                                        ))}
                                    </EditableElement>
                                </nav>
                                <EditableElement
                                    elementId="el_cta_001"
                                    style={{
                                        background: getElement('el_cta_001')?.properties.bgColor || colors.gradient,
                                        color: getElement('el_cta_001')?.properties.textColor || '#fff',
                                        fontSize: `${getElement('el_cta_001')?.properties.fontSize}px`,
                                        borderRadius: `${getElement('el_cta_001')?.properties.borderRadius}px`,
                                        padding: `${getElement('el_cta_001')?.properties.paddingY}px ${getElement('el_cta_001')?.properties.paddingX}px`,
                                        position: 'relative'
                                    }}
                                >
                                    {getElement('el_cta_001')?.properties.text}
                                </EditableElement>
                            </header>

                            {/* Hero */}
                            <section className={`portfolio-hero ${isEditMode ? 'edit-enabled' : ''}`}>
                                <div className="hero-content">
                                    <EditableElement
                                        elementId="el_tag_001"
                                        style={{
                                            color: getElement('el_tag_001')?.properties.textColor || colors.primary,
                                            fontSize: `${getElement('el_tag_001')?.properties.fontSize}px`,
                                            position: 'relative'
                                        }}
                                    >
                                        {getElement('el_tag_001')?.properties.text}
                                    </EditableElement>
                                    <EditableElement
                                        elementId="el_title_001"
                                        style={{
                                            color: getElement('el_title_001')?.properties.textColor || colors.text,
                                            fontSize: `${getElement('el_title_001')?.properties.fontSize}px`,
                                            position: 'relative'
                                        }}
                                    >
                                        {getElement('el_title_001')?.properties.text}
                                    </EditableElement>
                                    <EditableElement
                                        elementId="el_desc_001"
                                        style={{
                                            color: getElement('el_desc_001')?.properties.textColor || colors.textMuted,
                                            fontSize: `${getElement('el_desc_001')?.properties.fontSize}px`,
                                            position: 'relative'
                                        }}
                                    >
                                        {getElement('el_desc_001')?.properties.text}
                                    </EditableElement>
                                    <div className="hero-buttons">
                                        <EditableElement
                                            elementId="el_btn_primary_001"
                                            style={{
                                                background: getElement('el_btn_primary_001')?.properties.bgColor || colors.gradient,
                                                color: getElement('el_btn_primary_001')?.properties.textColor || '#fff',
                                                borderRadius: `${getElement('el_btn_primary_001')?.properties.borderRadius}px`,
                                                position: 'relative'
                                            }}
                                        >
                                            {getElement('el_btn_primary_001')?.properties.text}
                                        </EditableElement>
                                        <EditableElement
                                            elementId="el_btn_secondary_001"
                                            style={{
                                                border: `1px solid ${colors.primary}`,
                                                color: getElement('el_btn_secondary_001')?.properties.textColor || colors.text,
                                                borderRadius: `${getElement('el_btn_secondary_001')?.properties.borderRadius}px`,
                                                background: getElement('el_btn_secondary_001')?.properties.bgColor || 'transparent',
                                                position: 'relative'
                                            }}
                                        >
                                            {getElement('el_btn_secondary_001')?.properties.text}
                                        </EditableElement>
                                    </div>
                                    <EditableElement
                                        elementId="el_stats_001"
                                        style={{ position: 'relative' }}
                                    >
                                        {getElement('el_stats_001')?.properties.items?.map((stat, i) => (
                                            <div className="stat-item" key={i}>
                                                <span className="stat-number" style={{ color: getElement('el_stats_001')?.properties.numberColor || colors.primary }}>{stat.number}</span>
                                                <span className="stat-label" style={{ color: getElement('el_stats_001')?.properties.labelColor || colors.textMuted }}>{stat.label}</span>
                                            </div>
                                        ))}
                                    </EditableElement>
                                </div>
                            </section>

                            {/* Works */}
                            <section className="portfolio-works" style={{ background: colors.surface }}>
                                <EditableElement
                                    elementId="el_section_title_001"
                                    style={{
                                        color: getElement('el_section_title_001')?.properties.textColor || colors.text,
                                        fontSize: `${getElement('el_section_title_001')?.properties.fontSize}px`,
                                        position: 'relative'
                                    }}
                                >
                                    {getElement('el_section_title_001')?.properties.text}
                                </EditableElement>
                                <div className="works-grid">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="work-card" style={{ background: `${colors.primary}15`, border: `1px solid ${colors.primary}20` }}>
                                            <span style={{ color: colors.text }}>Project {i}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Footer */}
                            <footer className="portfolio-footer" style={{ background: colors.surface }}>
                                <EditableElement
                                    elementId="el_footer_001"
                                    style={{
                                        color: getElement('el_footer_001')?.properties.textColor || colors.textMuted,
                                        fontSize: `${getElement('el_footer_001')?.properties.fontSize}px`,
                                        position: 'relative'
                                    }}
                                >
                                    {getElement('el_footer_001')?.properties.text}
                                </EditableElement>
                            </footer>
                        </div>
                    </div>

                    {isEditMode && (
                        <div className="edit-hint-inline">
                            {activeElement ? `Selected: ${activeElement.label} (${activeElementId})` : 'Click an element to edit'}
                        </div>
                    )}
                </div>

                {/* Right Panel - Properties or Chat */}
                {rightPanelMode === 'properties' ? (
                    <div className="chatbot-panel properties-panel">
                        <div className="chatbot-header">
                            <div className="chatbot-title">Edit Properties</div>
                            <div className="chatbot-subtitle">Customize selected element</div>
                        </div>

                        <div className="chatbot-messages">
                            {!activeElement ? (
                                <div className="no-selection-state">
                                    <div className="no-selection-icon">👆</div>
                                    <div className="chatbot-msg bot">Click on any element to edit it</div>
                                </div>
                            ) : (
                                <div className="properties-controls">
                                    <div className="editing-badge">
                                        Editing: <strong>{activeElement.label}</strong>
                                        <span className="element-id">({activeElementId})</span>
                                    </div>

                                    {/* Dynamic controls based on element type */}
                                    {renderElementControls()}
                                </div>
                            )}
                        </div>

                        <div className="chatbot-input">
                            <input
                                placeholder="Type your message…"
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                                onFocus={openChatPanel}
                            />
                            <button className="send-btn" onClick={() => { openChatPanel(); handleSendMessage(); }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="22" y1="2" x2="11" y2="13" />
                                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                </svg>
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="chatbot-panel">
                        <div className="chatbot-header">
                            <div className="chatbot-title">AI Assistant</div>
                            <div className="chatbot-subtitle">Ask me to customize your site</div>
                            <button className="panel-switch-btn" onClick={openPropertiesPanel}>Properties</button>
                        </div>

                        <div className="chatbot-messages">
                            {chatMessages.map((msg, i) => (
                                <div key={i} className={`chatbot-msg ${msg.role}`}>
                                    {msg.text}
                                </div>
                            ))}
                            <div ref={chatEndRef} />
                        </div>

                        <div className="chatbot-input">
                            <input
                                placeholder="Ask AI to make changes..."
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                            />
                            <button className="send-btn" onClick={handleSendMessage}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="22" y1="2" x2="11" y2="13" />
                                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Step6Preview;
