import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActive = (path) => location.pathname === path;

    return (
        <>
            <header className="site-header-root">
                {/* LEFT */}
                <div className="header-left">
                    <Link to="/" className="header-logo">
                        INAI
                    </Link>
                </div>

                {/* CENTER (ONLY THIS FLOATS) - Desktop */}
                <div className={`header-center ${isScrolled ? 'scrolled' : ''} desktop-only`}>
                    <nav className="nav-menu">
                        <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>Create</Link>
                        <Link to="/templates" className={`nav-link ${isActive('/templates') ? 'active' : ''}`}>Templates</Link>
                        <Link to="/components" className={`nav-link ${isActive('/components') ? 'active' : ''}`}>Components</Link>
                        <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`}>About us</Link>
                    </nav>
                </div>

                {/* RIGHT */}
                <div className="header-right">
                    <button className="get-started-btn desktop-only">
                        Get Started <span className="arrow">→</span>
                    </button>
                    
                    {/* Mobile Menu Toggle */}
                    <button 
                        className="mobile-menu-toggle mobile-only"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </header>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''} mobile-only`}>
                <nav className="mobile-nav-menu">
                    <Link 
                        to="/" 
                        className={`mobile-nav-link ${isActive('/') ? 'active' : ''}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Create
                    </Link>
                    <Link 
                        to="/templates" 
                        className={`mobile-nav-link ${isActive('/templates') ? 'active' : ''}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Templates
                    </Link>
                    <Link 
                        to="/components" 
                        className={`mobile-nav-link ${isActive('/components') ? 'active' : ''}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Components
                    </Link>
                    <Link 
                        to="/about" 
                        className={`mobile-nav-link ${isActive('/about') ? 'active' : ''}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        About us
                    </Link>
                    <button className="mobile-get-started-btn">
                        Get Started <span className="arrow">→</span>
                    </button>
                </nav>
            </div>
        </>
    );
};

export default Header;
