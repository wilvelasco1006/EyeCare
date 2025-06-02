/* eslint-disable react/no-unknown-property */
import SectionOneG from "./sections/sectionOneG/SectionOneG";
import SectionTwoG from "./sections/sectionTwoG/SectionTwoG";
import "./Glaucoma.css";
import React, { useRef, useEffect, useState } from 'react';

const Glaucoma = () => {
  const containerRef = useRef(null);
  const sectionsRefs = [useRef(null), useRef(null), useRef(null)];
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const currentScrollPos = containerRef.current.scrollTop;
      const containerHeight = containerRef.current.clientHeight;

      sectionsRefs.forEach((ref, index) => {
        if (ref.current) {
          const sectionTop = ref.current.offsetTop - containerRef.current.offsetTop;
          const sectionHeight = ref.current.offsetHeight;

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
      handleScroll();
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="scroll-container">
      {/* Navegación lateral (puedes quitarla también si no la necesitas) */}
      <div className="side-navigation">
        <div
          className={`nav-dot ${activeSection === 0 ? "active" : ""}`}
          onClick={() => sectionsRefs[0]?.current?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span className="dot-tooltip">Introducción</span>
        </div>
        <div
          className={`nav-dot ${activeSection === 1 ? "active" : ""}`}
          onClick={() => sectionsRefs[1]?.current?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span className="dot-tooltip">Síntomas</span>
        </div>
        <div
          className={`nav-dot ${activeSection === 2 ? "active" : ""}`}
          onClick={() => sectionsRefs[2]?.current?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span className="dot-tooltip">Prevención</span>
        </div>
      </div>

      <section ref={sectionsRefs[0]} className="section1">
        <SectionOneG />
      </section>

      <section ref={sectionsRefs[1]} className="section2">
        <SectionTwoG />
      </section>

      <section ref={sectionsRefs[2]} className="section3">
        <h2>Cuándo consultar al médico</h2>
        <div className="content-container">
          <p>Información importante sobre cuándo buscar atención médica para problemas de glaucoma.</p>
        </div>
      </section>
    </div>
  );
};

export default Glaucoma;
