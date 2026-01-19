import { useEffect, useRef } from 'react';

const UnicornBackground = () => {
    const bgRef = useRef(null);

    useEffect(() => {
        // Initialize Unicorn Studio
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js';
        script.onload = () => {
            if (window.UnicornStudio && !window.UnicornStudio.isInitialized) {
                window.UnicornStudio.init();
                window.UnicornStudio.isInitialized = true;
            }
        };
        document.body.appendChild(script);

        // Parallax effect on scroll
        const handleScroll = () => {
            if (!bgRef.current) return;

            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const scrollProgress = Math.min(scrollY / windowHeight, 1);

            const scale = 1 + (scrollProgress * 0.3);
            const translateY = scrollProgress * 100;
            const blur = scrollProgress * 5;
            const opacity = 1 - (scrollProgress * 0.3);

            bgRef.current.style.transform = `scale(${scale}) translateY(${translateY}px)`;
            bgRef.current.style.filter = `blur(${blur}px)`;
            bgRef.current.style.opacity = opacity;
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div
            ref={bgRef}
            data-us-project="p7Ff6pfTrb5Gs59C7nLC"
            className="unicorn-bg"
        />
    );
};

export default UnicornBackground;
