import SectionOne from "./sections/sectionOne/SectionOne";
import SectionTwoCT from "./sections/sectionTwoCT/sectionTwoCT";
import SectionThreeCT from "./sections/sectionThreeCT/sectionThreeCT";
import SectionFourCT from "./sections/sectionFourCT/sectionFourCT";
import "../Cataracts/Cataracts.css";
import React, { useRef, useEffect, useState, createContext, useContext } from "react";

// SOLUCIÓN 1: Context para manejar configuración de Sky globalmente
const SkyConfigContext = createContext();

export const useSkyConfig = () => {
    const context = useContext(SkyConfigContext);
    if (!context) {
        throw new Error('useSkyConfig must be used within SkyConfigProvider');
    }
    return context;
};

const Cataracts = () => {
    const containerRef = useRef(null);
    const sectionRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
    const [activeSection, setActiveSection] = useState(0);

    // Configuraciones de Sky para cada sección
    const skyConfigurations = {
        0: null, // SectionOne - sin sky
        1: null, // SectionTwoCT - sin sky  
        2: {     // SectionThreeCT - cielo claro
            key: "section3-sky",
            sunPosition: [1, 10, 0],
            turbidity: 14,
            rayleigh: 0.4,
            mieCoefficient: 0.005,
            mieDirectionalG: 0.8,
            inclination: 0.6,
            azimuth: 0.25
        },
        3: {     // SectionFourCT - cielo oscuro/atardecer
            key: "section4-sky",
            sunPosition: [-5, -10, 100],
            turbidity: 15,
            rayleigh: 0.5,
            mieCoefficient: 0.005,
            mieDirectionalG: 0.7,
            inclination: 0.49,
            azimuth: 0.25,
            distance: 450000
        }
    };

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
                    const sectionTop =
                        ref.current.offsetTop - containerRef.current.offsetTop;
                    const sectionHeight = ref.current.offsetHeight;

                    // Si la sección está en la vista (con un margen de tolerancia)
                    if (
                        currentScrollPos >= sectionTop - containerHeight * 0.3 &&
                        currentScrollPos <
                        sectionTop + sectionHeight - containerHeight * 0.3
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

    // Obtener configuración de sky actual
    const currentSkyConfig = skyConfigurations[activeSection];

    const skyContextValue = {
        currentSkyConfig,
        activeSection,
        skyConfigurations
    };

    return (
        <SkyConfigContext.Provider value={skyContextValue}>
            <div ref={containerRef} className="scroll-container-CT">
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
                    <div
                        className={`nav-dot ${activeSection === 3 ? "active" : ""}`}
                        onClick={() => scrollToSection(3)}
                        aria-label="Ir a sección 4"
                    >
                        <span className="dot-tooltip">Prevención</span>
                    </div>
                </div>

                {/* Sección 1: Introducción - Causas y efectos */}
                <section ref={sectionRefs[0]} className="section1-CT">
                    <SectionOne />
                </section>

                {/* Sección 2: Síntomas - Solo modelo 3D interactivo */}
                <section ref={sectionRefs[1]} className="section2-CT">
                    {/* Solo el modelo 3D con información integrada de síntomas */}
                    <div className="model-section-full">
                        <SectionTwoCT />
                    </div>
                </section>

                {/* Sección 3: Tratamiento - Modelo 3D e información */}
                <section ref={sectionRefs[2]} className="section3-CT">
                    <SectionThreeCT />
                </section>

                {/* Sección 4: Prevención - Información y consejos */}
                <section ref={sectionRefs[3]} className="section4-CT">
                    <SectionFourCT />
                </section>
            </div>
        </SkyConfigContext.Provider>
    );
};

export default Cataracts;