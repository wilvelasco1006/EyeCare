import SectionOneC from "./sections/sectionOne/SectionOneC";
import SectionTwoC from "./sections/sectionTwo/SectionTwoC";
import SectionThree from "./sections/sectionThree/SectionThree";
import './Conjuntivitis.css';
import React, { useRef, useEffect, useState } from "react";

const Conjuntivitis = () => {
    const containerRef = useRef(null);
    const sectionRefs = [useRef(null), useRef(null), useRef(null)];
    const [activeSection, setActiveSection] = useState(0);
    
    // Función para manejar el scroll suave entre secciones
    const scrollToSection = (index) => {
        sectionRefs[index]?.current?.scrollIntoView({ behavior: "smooth" });
        setActiveSection(index);
    };
    
    // Para detectar la sección actual visible
    useEffect(() => {
        const handleScroll = () => {
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
        <div ref={containerRef} className="scroll-container-c">
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
                    <span className="dot-tooltip">Prevención</span>
                </div>
            </div>
            
            {/* Sección 1: Introducción - Causas y efectos */}
            <section ref={sectionRefs[0]} className="section1">
                <SectionOneC />
            </section>
            
            {/* Sección 2: Síntomas - Solo modelo 3D interactivo */}
            <section ref={sectionRefs[1]} className="section2">
                {/* Solo el modelo 3D con información integrada de síntomas */}
                <div className="model-section-full">
                    <SectionTwoC />
                </div>
            </section>
            
            {/* Sección 3: Prevención y Tratamiento */}
            <section ref={sectionRefs[2]} className="section3">
                    <SectionThree />
            </section>
        </div>
    );
};

export default Conjuntivitis;