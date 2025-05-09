/* eslint-disable no-unused-vars */
import SectionOneC from "./sections/sectionOne/SectionOneC";
import SectionTwoC from "./sections/sectionTwo/SectionTwoC";
import './Conjuntivitis.css';
import React, { useRef, useEffect, useState } from "react";



const Conjuntivitis = () => {
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
            const currentScrollPos = window.pageYOffset;

            // Determinar qué sección es visible
            sectionRefs.forEach((ref, index) => {
                if (ref.current) {
                    const sectionTop = ref.current.offsetTop - 100;
                    const sectionBottom = sectionTop + ref.current.offsetHeight;

                    if (
                        currentScrollPos >= sectionTop &&
                        currentScrollPos < sectionBottom
                    ) {
                        setActiveSection(index);
                    }
                }
            });
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="scroll-container">
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
                <h2>Cuándo consultar al médico</h2>
                <div className="content-container">
                    {/* Aquí va el contenido de tu tercera sección */}
                    <p>
                        Información importante sobre cuándo buscar atención médica para
                        problemas de conjuntivitis.
                    </p>
                </div>
            </section>
        </div>

    )
}


export default Conjuntivitis;