
import SectionOne from "./sections/sectionOne/SectionOne";
import SectionTwoCT from "./sections/sectionTwoCT/sectionTwoCT"
import '../Cataracts/Cataracts.css';
// eslint-disable-next-line no-unused-vars
import React, { useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, Eye } from 'lucide-react';

const Cataracts = () => {
    const sectionRefs = [useRef(null), useRef(null), useRef(null)];
    
    // Función para manejar el scroll suave entre secciones
    const scrollToSection = (index) => {
        sectionRefs[index]?.current?.scrollIntoView({ behavior: 'smooth' });
    };
    
    // Para detectar la sección actual visible (opcional)
    useEffect(() => {
        const handleScroll = () => {
            // Implementación de detección de sección si lo necesitas
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="scroll-container">
            <section ref={sectionRefs[0]} className="section1">
                <SectionOne />
                <button 
                    className="scroll-button1" 
                    onClick={() => scrollToSection(1)}
                    aria-label="Desplazar a la siguiente sección"
                >
                    <ChevronDown size={40} />
                </button>
            </section>
            
            <section ref={sectionRefs[1]} className="section2">
                <button 
                    className="scroll-button-up1" 
                    onClick={() => scrollToSection(0)}
                    aria-label="Volver a la sección anterior"
                >
                    <ChevronUp size={40} />
                </button>
                <SectionTwoCT/>
                <h2>Prevención y Tratamiento</h2>
                <div className="content-container">
                    {/* Aquí va el contenido de tu segunda sección */}
                    <p>Esta sección puede contener información sobre prevención y tratamientos para la conjuntivitis.</p>
                </div>
                
                <button 
                    className="scroll-button2" 
                    onClick={() => scrollToSection(2)}
                    aria-label="Desplazar a la última sección"
                >
                    <ChevronDown size={40} />
                </button>
            </section>
            
            <section ref={sectionRefs[2]} className="section3">
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
                    <p>Información importante sobre cuándo buscar atención médica para problemas de conjuntivitis.</p>
                </div>
            </section>
        </div>
    );
};

export default Cataracts;
