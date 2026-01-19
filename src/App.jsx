import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BuilderProvider } from './context/BuilderContext';
import Header from './components/Header';
import UnicornBackground from './components/UnicornBackground';
import CursorGlow from './components/CursorGlow';

// Pages
import HomePage from './pages/HomePage';
import TemplatesPage from './pages/TemplatesPage';
import ComponentsPage from './pages/ComponentsPage';

// Builder Steps (6 steps: Prompt → Questions → Layout → Colors → Animations → Preview)
import Step2Questions from './pages/builder/Step2Questions';
import Step3Layout from './pages/builder/Step3Layout';
import Step4Colors from './pages/builder/Step4Colors';
import Step5Animations from './pages/builder/Step5Animations';
import Step6Preview from './pages/builder/Step6Preview';

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
                    {/* Homepage with Header - Step 1: User enters prompt here */}
                    <Route path="/" element={<><Header /><HomePage /></>} />

                    {/* Builder Flow - 6 Steps */}
                    <Route path="/questions" element={<Step2Questions />} />
                    <Route path="/layout" element={<Step3Layout />} />
                    <Route path="/colors" element={<Step4Colors />} />
                    <Route path="/animations" element={<Step5Animations />} />
                    <Route path="/preview" element={<Step6Preview />} />

                    {/* Other Pages */}
                    <Route path="/templates" element={<><Header /><TemplatesPage /></>} />
                    <Route path="/components" element={<><Header /><ComponentsPage /></>} />
                </Routes>
            </Router>
        </BuilderProvider>
    );
}

export default App;


