import SectionOne from "./sections/sectionOne/SectionOne";
import SectionTwoCT from "./sections/sectionTwoCT/sectionTwoCT";
import "../Cataracts/Cataracts.css";
import React, { useRef, useEffect, useState } from "react";

const Cataracts = () => {
    const sectionRefs = [useRef(null), useRef(null), useRef(null)];
    const [activeSection, setActiveSection] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false); // Estado para controlar el scroll

    // Función para manejar el scroll suave entre secciones
    const scrollToSection = (index) => {
        if (isScrolling) return; // Evitar scroll mientras uno está en progreso

        setIsScrolling(true);
        sectionRefs[index]?.current?.scrollIntoView({ behavior: "smooth" });
        setActiveSection(index);

        // Desbloquear el scroll después de la animación
        setTimeout(() => {
            setIsScrolling(false);
        }, 1000); // 1 segundo, ajusta según la duración de tu animación
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

    // Manejar el evento wheel (rueda del mouse)
    useEffect(() => {
        const handleWheel = (event) => {
            if (isScrolling) return; // Si ya está scrolleando, no hacer nada

            // Determinar la dirección del scroll
            const direction = event.deltaY > 0 ? 1 : -1;

            // Calcular la siguiente sección
            const nextSection = Math.min(
                Math.max(activeSection + direction, 0),
                sectionRefs.length - 1
            );

            // Si es una sección diferente, scrollear hacia ella
            if (nextSection !== activeSection) {
                event.preventDefault(); // Prevenir el scroll normal
                scrollToSection(nextSection);
            }
        };

        // Agregar el evento con opción passive: false para poder usar preventDefault()
        window.addEventListener("wheel", handleWheel, { passive: false });
        return () => window.removeEventListener("wheel", handleWheel);
    }, [activeSection, isScrolling]);

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
                <SectionOne />
            </section>

            {/* Sección 2: Síntomas - Solo modelo 3D interactivo */}
            <section ref={sectionRefs[1]} className="section2">
                {/* Solo el modelo 3D con información integrada de síntomas */}
                <div className="model-section-full">
                    <SectionTwoCT />
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
    );
};

export default Cataracts;
