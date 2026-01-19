import TypewriterText from '../components/TypewriterText';
import PromptBox from '../components/PromptBox';
import TemplatesSection from '../components/TemplatesSection';

const HomePage = () => {
    return (
        <>
            {/* Main Content */}
            <main className="main-container">
                {/* Logo with Typewriter Effect */}
                <div className="logo">
                    <TypewriterText text="NO CODE" />
                    <span className="logo-dot"></span>
                </div>

                {/* Tagline */}
                <p className="tagline">Describe it. We build it.</p>

                {/* Prompt Box */}
                <PromptBox />
            </main>

            {/* Templates Section */}
            <TemplatesSection />
        </>
    );
};

export default HomePage;
