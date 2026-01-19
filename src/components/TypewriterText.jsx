import { useState, useEffect, useRef } from 'react';

const TypewriterText = ({ text = "NO CODE", className = "" }) => {
    const [displayText, setDisplayText] = useState('');
    const [isTyped, setIsTyped] = useState(false);
    const audioContextRef = useRef(null);

    const playTypeSound = () => {
        try {
            if (!audioContextRef.current) {
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                audioContextRef.current = new AudioContext();
            }

            const ctx = audioContextRef.current;
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);

            oscillator.frequency.value = 800 + Math.random() * 200;
            oscillator.type = 'sine';

            gainNode.gain.setValueAtTime(0.03, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

            oscillator.start(ctx.currentTime);
            oscillator.stop(ctx.currentTime + 0.05);
        } catch (e) {
            // Audio not supported
        }
    };

    useEffect(() => {
        let index = 0;
        let timeout;

        const typeCharacter = () => {
            if (index < text.length) {
                setDisplayText(text.substring(0, index + 1));
                playTypeSound();
                index++;
                const delay = 80 + Math.random() * 70;
                timeout = setTimeout(typeCharacter, delay);
            } else {
                setTimeout(() => setIsTyped(true), 1500);
            }
        };

        timeout = setTimeout(typeCharacter, 800);

        return () => clearTimeout(timeout);
    }, [text]);

    return (
        <span className={`logo-text ${isTyped ? 'typed' : ''} ${className}`}>
            {displayText}
        </span>
    );
};

export default TypewriterText;
