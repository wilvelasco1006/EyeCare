import React, { useState, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import './ScrollIndicator.css';

const ScrollIndicator = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            // Ocultar el indicador cuando el usuario haya hecho scroll
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            setIsVisible(scrollTop < 100); // Se oculta después de 100px de scroll
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToNextSection = () => {
        const nextSection = document.querySelector('.sectionTwoCT, .section-2, [class*="section2"]');
        if (nextSection) {
            nextSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        } else {
            // Si no encuentra una sección específica, hace scroll hacia abajo
            window.scrollBy({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        }
    };

    if (!isVisible) return null;

    return (
        <div className="scroll-indicator" onClick={scrollToNextSection}>
            <div className="scroll-indicator-content">
                <span className="scroll-text">Scroll para más contenido</span>
                <div className="scroll-arrow">
                    <FaChevronDown />
                </div>
            </div>
        </div>
    );
};

export default ScrollIndicator;