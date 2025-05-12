/* eslint-disable react/no-unknown-property */
import SectionOneG from "./sections/sectionOneG/SectionOneG";
import SectionTwoG from "./sections/sectionTwoG/SectionTwoG";
import "./Glaucoma.css";
// eslint-disable-next-line no-unused-vars
import React, { useRef, useEffect, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Glaucoma = () => {
    const containerRef = useRef(null);
    const sectionsRefs = [useRef(null), useRef(null), useRef(null)
    ];
    const [activeSection, setActiveSection] = useState(0);

    const scrollToSection = (index) => {
        sectionsRefs[index]?.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;

            const currentScrollPos = containerRef.current.scrollTop;
            const containerHeight = containerRef.current.clientHeight;

            sectionsRefs.forEach((ref, index) => {
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
            container.addEventListener('scroll', handleScroll);
            // Llamar inicialmente para establecer la sección activa
            handleScroll();
        }

        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
        }
    }
        , []);

    return (
        <div  ref={containerRef}className="scroll-container">
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


            <section ref={sectionsRefs[0]} className="section1">
                <SectionOneG />
                <button
                    className="scroll-button1"
                    onClick={() => scrollToSection(1)}
                    aria-label="Desplazar a la siguiente sección"
                >
                    <ChevronDown size={40} />
                </button>
            </section>

            <section ref={sectionsRefs[1]} className="section2">
                <div className="model-section-full">
                    <SectionTwoG />
                </div>

            </section>

            <section ref={sectionsRefs[2]} className="section3">
                <button
                    className="scroll-button-up1"
                    onClick={() => scrollToSection(1)}
                    aria-label="Volver a la sección anterior"
                >
                    <ChevronUp size={40} />
                </button>

                <h2>Cuándo consultar al médico</h2>
                <div className="content-container">
                    {/* Aquí va el contenido de tu tercera sección */}
                    <p>Información importante sobre cuándo buscar atención médica para problemas de glaucoma.</p>
                </div>
            </section>
        </div>
    );
};

export default Glaucoma;


