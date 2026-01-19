import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBuilder } from '../../context/BuilderContext';

const Step2Questions = () => {
    const navigate = useNavigate();
    const { prompt, nextStep, prevStep } = useBuilder();
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [answers, setAnswers] = useState({
        question1: '',
        question2: ''
    });

    // Static questions
    const questions = [
        {
            id: 1,
            question: "What best describes your business or project?",
            options: [
                "Local business (restaurant, salon, clinic, gym)",
                "Online store / e-commerce",
                "Startup / SaaS",
                "Freelancer / agency",
                "Personal brand / portfolio",
                "Organization / community"
            ]
        },
        {
            id: 2,
            question: "What do you want this website to help you achieve?",
            options: [
                "Get more leads / inquiries",
                "Sell products online",
                "Showcase services",
                "Book appointments",
                "Build a personal or brand presence",
                "Share information or content"
            ]
        }
    ];

    const currentQ = questions[currentQuestion - 1];

    const handleOptionClick = (option) => {
        setAnswers(prev => ({
            ...prev,
            [`question${currentQuestion}`]: option
        }));
    };

    const handleNext = () => {
        if (currentQuestion === 1) {
            setCurrentQuestion(2);
        }
    };

    const handleSkip = () => {
        if (currentQuestion === 1) {
            setCurrentQuestion(2);
        } else {
            handleContinue();
        }
    };

    const handlePrevious = () => {
        if (currentQuestion === 2) {
            setCurrentQuestion(1);
        }
    };

    const handleContinue = () => {
        nextStep();
        navigate('/layout');
    };

    const handleBack = () => {
        prevStep();
        navigate('/');
    };

    return (
        <div className="builder-step-v2 step-questions">
            {/* Background */}
            <div className="step-bg-gradient"></div>
            <div className="step-bg-grid"></div>

            <div className="questions-container">
                {/* Back Button */}
                <button className="back-btn-questions" onClick={handleBack}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                </button>

                {/* Step Indicator */}
                <div className="step-indicator-center">
                    <span className="step-number">02</span>
                    <span className="step-label">Quick Questions</span>
                </div>

                {/* Question Card */}
                <div className="question-card">
                    <div className="question-progress">
                        <span className="q-current">Question {currentQuestion}</span>
                        <span className="q-total">of 2</span>
                    </div>

                    <h2 className="question-text">{currentQ.question}</h2>

                    <div className="question-options">
                        {currentQ.options.map((option, i) => (
                            <button
                                key={i}
                                className={`question-option ${answers[`question${currentQuestion}`] === option ? 'selected' : ''}`}
                                onClick={() => handleOptionClick(option)}
                            >
                                <span className="option-radio">
                                    {answers[`question${currentQuestion}`] === option && (
                                        <span className="radio-dot"></span>
                                    )}
                                </span>
                                {option}
                            </button>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="question-actions">
                        {currentQuestion === 1 ? (
                            <>
                                <button className="btn-secondary-q" onClick={handleSkip}>
                                    Skip
                                </button>
                                <button
                                    className="btn-primary-q"
                                    onClick={handleNext}
                                    disabled={!answers.question1}
                                >
                                    Next
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </>
                        ) : (
                            <>
                                <button className="btn-secondary-q" onClick={handlePrevious}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M19 12H5M12 19l-7-7 7-7" />
                                    </svg>
                                    Previous
                                </button>
                                <button className="btn-primary-q" onClick={handleContinue}>
                                    Continue
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* Prompt Preview */}
                <div className="prompt-preview-box">
                    <span className="preview-label">Your idea:</span>
                    <span className="preview-text">{prompt || 'No prompt entered'}</span>
                </div>

                {/* Progress Dots */}
                <div className="progress-dots-center">
                    {[1, 2, 3, 4, 5, 6].map((dot) => (
                        <div
                            key={dot}
                            className={`progress-dot ${dot === 2 ? 'active' : dot < 2 ? 'completed' : ''}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Step2Questions;
