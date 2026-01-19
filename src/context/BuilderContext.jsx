import { createContext, useContext, useState, useEffect } from 'react';
import { fetchBuilderConfig, fetchComponents } from '../services/api';

const BuilderContext = createContext();

export const useBuilder = () => {
    const context = useContext(BuilderContext);
    if (!context) {
        throw new Error('useBuilder must be used within BuilderProvider');
    }
    return context;
};

export const BuilderProvider = ({ children }) => {
    // Data from API
    const [layouts, setLayouts] = useState([]);
    const [colorPalettes, setColorPalettes] = useState([]);
    const [animations, setAnimations] = useState([]);
    const [components, setComponents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Current step in the wizard (1-4)
    const [currentStep, setCurrentStep] = useState(1);

    // User's prompt/description
    const [prompt, setPrompt] = useState('');

    // Selected options
    const [selectedLayout, setSelectedLayout] = useState(null);
    const [selectedPalette, setSelectedPalette] = useState(null);
    const [selectedAnimation, setSelectedAnimation] = useState(null);

    // Fetch data from backend on mount
    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const config = await fetchBuilderConfig();
                setLayouts(config.layouts || []);
                setColorPalettes(config.colorPalettes || []);
                setAnimations(config.animations || []);
                setError(null);
            } catch (err) {
                console.error('Failed to load builder config:', err);
                setError('Failed to connect to server');
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    // Fetch components when layout is selected
    useEffect(() => {
        const loadComponents = async () => {
            if (selectedLayout?.style) {
                try {
                    const comps = await fetchComponents(selectedLayout.style);
                    setComponents(comps);
                } catch (err) {
                    console.error('Failed to load components:', err);
                }
            }
        };
        loadComponents();
    }, [selectedLayout]);

    // Navigation functions
    const nextStep = () => {
        if (currentStep < 4) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const goToStep = (step) => {
        if (step >= 1 && step <= 4) {
            setCurrentStep(step);
        }
    };

    // Reset builder
    const resetBuilder = () => {
        setCurrentStep(1);
        setPrompt('');
        setSelectedLayout(null);
        setSelectedPalette(null);
        setSelectedAnimation(null);
        setComponents([]);
    };

    // Check if can proceed to next step
    const canProceed = () => {
        switch (currentStep) {
            case 1:
                return selectedLayout !== null;
            case 2:
                return selectedPalette !== null;
            case 3:
                return selectedAnimation !== null;
            case 4:
                return true;
            default:
                return false;
        }
    };

    const value = {
        // API Data
        layouts,
        colorPalettes,
        animations,
        components,
        loading,
        error,

        // State
        currentStep,
        prompt,
        selectedLayout,
        selectedPalette,
        selectedAnimation,

        // Setters
        setPrompt,
        setSelectedLayout,
        setSelectedPalette,
        setSelectedAnimation,

        // Navigation
        nextStep,
        prevStep,
        goToStep,
        resetBuilder,
        canProceed
    };

    return (
        <BuilderContext.Provider value={value}>
            {children}
        </BuilderContext.Provider>
    );
};

export default BuilderContext;
