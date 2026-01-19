import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BuilderProvider } from './context/BuilderContext';
import Header from './components/Header';
import UnicornBackground from './components/UnicornBackground';
import CursorGlow from './components/CursorGlow';

// Pages
import HomePage from './pages/HomePage';
import TemplatesPage from './pages/TemplatesPage';
import ComponentsPage from './pages/ComponentsPage';

// Builder Steps (after homepage prompt)
import Step1Layout from './pages/builder/Step1Layout';
import Step2Colors from './pages/builder/Step2Colors';
import Step3Animations from './pages/builder/Step3Animations';
import Step4Preview from './pages/builder/Step4Preview';

import './index.css';
import './styles/builder.css';

function App() {
    return (
        <BuilderProvider>
            <Router>
                {/* Animated Background */}
                <UnicornBackground />

                {/* Cursor Glow Effect */}
                <CursorGlow />

                {/* Routes */}
                <Routes>
                    {/* Homepage with Header - user enters prompt here */}
                    <Route path="/" element={<><Header /><HomePage /></>} />

                    {/* Builder Flow - 4 Steps after prompt */}
                    <Route path="/layout" element={<Step1Layout />} />
                    <Route path="/colors" element={<Step2Colors />} />
                    <Route path="/animations" element={<Step3Animations />} />
                    <Route path="/preview" element={<Step4Preview />} />

                    {/* Other Pages */}
                    <Route path="/templates" element={<><Header /><TemplatesPage /></>} />
                    <Route path="/components" element={<><Header /><ComponentsPage /></>} />
                </Routes>
            </Router>
        </BuilderProvider>
    );
}

export default App;
