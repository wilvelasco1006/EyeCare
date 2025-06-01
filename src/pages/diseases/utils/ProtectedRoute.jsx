// src/components/ProtectedRoute.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../../stores/use-auth-store.js';
import Sign from '../../sign-in/Sign.jsx';
import "../../sign-in/Sign.css";

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const userLooged = useAuthStore((state) => state.userLooged);
    
    const messages = [
        "Por favor inicia sesión para acceder a este contenido"
    ];
    
    const totalViews = messages.length;
    const [viewIndex, setViewIndex] = useState(0);
    
    const handlePrev = () => setViewIndex((prev) => (prev === 0 ? totalViews - 1 : prev - 1));
    const handleNext = () => setViewIndex((prev) => (prev + 1) % totalViews);
    const handleSelect = (idx) => setViewIndex(idx);
    
    // Función modificada para cerrar modal y navegar
    const closeModal = () => {
        setShowModal(false);
        // Redirigir a la página de enfermedades
        // navigate('/diseases/content-diseases');
    };
   
    useEffect(() => {
        // Si el usuario no está autenticado, mostrar el modal automáticamente
        if (!userLooged) {
            setShowModal(true);
        } else {
            setShowModal(false);
        }
    }, [userLooged]);
   
    // Si el usuario está autenticado, mostrar el contenido protegido
    if (userLooged) {
        return children;
    }
   
    // Si no está autenticado, mostrar el componente Sign como modal
    return (
        <>
            {showModal && <Sign closeModal={closeModal} />}
            <div className="floating-message-error">{messages[viewIndex]}</div>
            
            {/* Contenedor vacío o placeholder donde estaría el contenido protegido */}
            <div className="placeholder-content">
                {/* Puedes dejar esto vacío o agregar algún contenido de placeholder */}
            </div>
        </>
    );
};

export default ProtectedRoute;