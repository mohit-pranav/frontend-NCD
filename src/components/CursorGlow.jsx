import { useState, useEffect } from 'react';

const CursorGlow = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
            setIsActive(true);
        };

        const handleMouseLeave = () => {
            setIsActive(false);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div
            className={`cursor-glow ${isActive ? 'active' : ''}`}
            style={{
                left: position.x,
                top: position.y
            }}
        />
    );
};

export default CursorGlow;
