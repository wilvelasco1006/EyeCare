/* eslint-disable no-unused-vars */
import SectionOneM from "./sections/sectionOne/SectionOneM";
import SectionTwoM from "./sections/section-two/SectionTwoM";
import SectionThreeM from "./sections/section-three/SectionThreeM";

import './MacularDegeneration.css';
import React, { useRef, useEffect, useState } from "react";

const MacularDegeneration = () => {
    const containerRef = useRef(null);
    const sectionRefs = [useRef(null), useRef(null), useRef(null)];
    const [activeSection, setActiveSection] = useState(0);
    
    // Función para manejar el scroll suave entre secciones
    const scrollToSection = (index) => {
        sectionRefs[index]?.current?.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(index);
    };
    
    // Para detectar la sección actual visible
    useEffect(() => {
        const handleScroll = () => {
            // Implementación de detección de sección si lo necesitas
            if (!containerRef.current) return;
            
            const currentScrollPos = containerRef.current.scrollTop;
            const containerHeight = containerRef.current.clientHeight;
            
            // Determinar qué sección es visible
            sectionRefs.forEach((ref, index) => {
                if (ref.current) {
                    const sectionTop = ref.current.offsetTop - containerRef.current.offsetTop;
                    const sectionHeight = ref.current.offsetHeight;
                    
                    // Si la sección está en la vista (con un margen de tolerancia)
                    if (
                        currentScrollPos >= sectionTop - containerHeight * 0.3 &&
                        currentScrollPos < sectionTop + sectionHeight - containerHeight * 0.3
                    ) {
                        setActiveSection(index);
                    }
                }
            });
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener("scroll", handleScroll);
            // Llamar inicialmente para establecer la sección activa
            handleScroll();
        }

        return () => {
            if (container) {
                container.removeEventListener("scroll", handleScroll);
            }
        };
    }, []);

    return (
        <div ref={containerRef} className="scroll-container-m">
            {/* Navegación lateral fija */}
            <div className="side-navigation">
                <div
                    className={`nav-dot ${activeSection === 0 ? "active" : ""}`}
                    onClick={() => scrollToSection(0)}
                    aria-label="Ir a sección 1"
                >
                    <span className="dot-tooltip">Introducción</span>
                </div>
                <div
                    className={`nav-dot ${activeSection === 1 ? "active" : ""}`}
                    onClick={() => scrollToSection(1)}
                    aria-label="Ir a sección 2"
                >
                    <span className="dot-tooltip">Síntomas</span>
                </div>
                <div
                    className={`nav-dot ${activeSection === 2 ? "active" : ""}`}
                    onClick={() => scrollToSection(2)}
                    aria-label="Ir a sección 3"
                >
                    <span className="dot-tooltip">Tratamiento</span>
                </div>
            </div>

            {/* Secciones */}
            <section ref={sectionRefs[0]} className="section1M">
                <SectionOneM />
            </section>
            
            <section ref={sectionRefs[1]} className="section2M">
                <SectionTwoM />
            </section>
            
            <section ref={sectionRefs[2]} className="section3M">     
                <SectionThreeM />   
            </section>
        </div>
    );
};

export default MacularDegeneration;