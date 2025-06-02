import React, { useRef, useState, useEffect } from 'react';
import { useGLTF, Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';

export function SurgicalToolSet(props) {
    const { nodes, materials } = useGLTF('/models-3d/cataracts/surgical-tool-set.glb');

    // Referencias para cada herramienta
    const scissorsT1Ref = useRef();
    const scissorsT2Ref = useRef();
    const scissorsT3Ref = useRef();
    const syringeRef = useRef();
    const forcepRef = useRef();
    const trayRef = useRef();
    const towelRef = useRef();

    // Estados para interacciones
    const [selectedTool, setSelectedTool] = useState(null);
    const [hoveredTool, setHoveredTool] = useState(null);
    const [animationMode, setAnimationMode] = useState('idle'); // idle, showcase, surgery
    const [toolInfo, setToolInfo] = useState(null);

    // Animación automática contador
    const [showcaseIndex, setShowcaseIndex] = useState(0);
    const tools = ['scissors1', 'scissors2', 'scissors3', 'syringe', 'forcep'];

    // Información de cada herramienta
    const toolsData = {
        scissors1: { name: "Tijeras Tipo 1", description: "Tijeras de iris curvas para incisiones precisas", color: "#3498db" },
        scissors2: { name: "Tijeras Tipo 2", description: "Tijeras capsulares para capsulotomía", color: "#e74c3c" },
        scissors3: { name: "Tijeras Tipo 3", description: "Tijeras de Vannas para cortes delicados", color: "#f39c12" },
        syringe: { name: "Jeringa", description: "Jeringa para irrigación y aspiración", color: "#2ecc71" },
        forcep: { name: "Fórceps", description: "Fórceps para manipulación de tejidos", color: "#9b59b6" },
        tray: { name: "Bandeja", description: "Bandeja quirúrgica estéril", color: "#95a5a6" },
        towel: { name: "Toalla", description: "Toalla quirúrgica estéril", color: "#34495e" }
    };

    // Animaciones con react-spring
    const [springs, api] = useSpring(() => ({
        scissors1Scale: [1, 1, 1],
        scissors1Position: [0, 0, 0],
        scissors1Rotation: [0, 0, 0],
        scissors2Scale: [1, 1, 1],
        scissors2Position: [0, 0, 0],
        scissors2Rotation: [0, 0, 0],
        scissors3Scale: [1, 1, 1],
        scissors3Position: [0, 0, 0],
        scissors3Rotation: [0, 0, 0],
        syringeScale: [1, 1, 1],
        syringePosition: [0, 0, 0],
        syringeRotation: [0, 0, 0],
        forcepScale: [1, 1, 1],
        forcepPosition: [0, 0, 0],
        forcepRotation: [0, 0, 0],
        config: { mass: 1, tension: 200, friction: 25 }
    }));

    // Eventos de teclado
    useEffect(() => {
        const handleKeyPress = (event) => {
            const key = event.key.toLowerCase();

            switch (key) {
                case '1':
                    selectTool('scissors1');
                    break;
                case '2':
                    selectTool('scissors2');
                    break;
                case '3':
                    selectTool('scissors3');
                    break;
                case '4':
                    selectTool('syringe');
                    break;
                case '5':
                    selectTool('forcep');
                    break;
                case 's':
                    startShowcaseMode();
                    break;
                case 'r':
                    resetAllTools();
                    break;
                case 'a':
                    startSurgeryAnimation();
                    break;
                case 'escape':
                    setSelectedTool(null);
                    setAnimationMode('idle');
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, []);

    // Función para seleccionar herramienta
    const selectTool = (toolName) => {
        setSelectedTool(toolName);
        setToolInfo(toolsData[toolName]);

        // Animación de selección
        api.start({
            [`${toolName}Scale`]: [1.3, 1.3, 1.3],
            [`${toolName}Position`]: [0, 0.5, 0],
            [`${toolName}Rotation`]: [0, Math.PI * 2, 0]
        });
    };

    // Función para resetear herramientas
    const resetAllTools = () => {
        setSelectedTool(null);
        setAnimationMode('idle');
        setToolInfo(null);

        tools.forEach(tool => {
            api.start({
                [`${tool}Scale`]: [1, 1, 1],
                [`${tool}Position`]: [0, 0, 0],
                [`${tool}Rotation`]: [0, 0, 0]
            });
        });
    };

    // Modo showcase automático
    const startShowcaseMode = () => {
        setAnimationMode('showcase');
        setShowcaseIndex(0);
    };

    // Animación de cirugía simulada
    const startSurgeryAnimation = () => {
        setAnimationMode('surgery');

        // Secuencia de movimientos quirúrgicos
        setTimeout(() => {
            api.start({
                scissors1Position: [-1, 0.3, 0],
                scissors1Rotation: [0, Math.PI / 4, 0]
            });
        }, 500);

        setTimeout(() => {
            api.start({
                forcepPosition: [1, 0.3, 0],
                forcepRotation: [0, -Math.PI / 4, 0]
            });
        }, 1000);

        setTimeout(() => {
            api.start({
                syringePosition: [0, 0.8, 0],
                syringeRotation: [Math.PI / 6, 0, 0]
            });
        }, 1500);
    };

    // Animación showcase automática
    useFrame((state) => {
        if (animationMode === 'showcase') {
            const time = state.clock.getElapsedTime();

            // Cambiar herramienta cada 2 segundos
            if (Math.floor(time) % 2 === 0 && Math.floor(time / 2) !== showcaseIndex) {
                const newIndex = Math.floor(time / 2) % tools.length;
                setShowcaseIndex(newIndex);

                // Reset anterior
                if (showcaseIndex < tools.length) {
                    const prevTool = tools[showcaseIndex];
                    api.start({
                        [`${prevTool}Scale`]: [1, 1, 1],
                        [`${prevTool}Position`]: [0, 0, 0],
                        [`${prevTool}Rotation`]: [0, 0, 0]
                    });
                }

                // Animar nuevo
                const currentTool = tools[newIndex];
                setToolInfo(toolsData[currentTool]);
                api.start({
                    [`${currentTool}Scale`]: [1.2, 1.2, 1.2],
                    [`${currentTool}Position`]: [0, 0.3, 0],
                    [`${currentTool}Rotation`]: [0, time, 0]
                });
            }
        }
    });

    // Handlers de click y hover
    const handleToolClick = (toolName) => {
        if (selectedTool === toolName) {
            resetAllTools();
        } else {
            selectTool(toolName);
        }
    };

    const handleToolHover = (toolName, isHovering) => {
        setHoveredTool(isHovering ? toolName : null);

        if (isHovering && selectedTool !== toolName) {
            api.start({
                [`${toolName}Scale`]: [1.1, 1.1, 1.1]
            });
        } else if (!isHovering && selectedTool !== toolName) {
            api.start({
                [`${toolName}Scale`]: [1, 1, 1]
            });
        }
    };

    return (
        <group {...props} dispose={null}>
            <group name="Scene">
                {/* Tijeras Tipo 1 */}
                <animated.group
                    name="ScissorsT1"
                    userData={{ name: 'ScissorsT1' }}
                    ref={scissorsT1Ref}
                    scale={springs.scissors1Scale}
                    position={springs.scissors1Position}
                    rotation={springs.scissors1Rotation}
                >
                    <group name="ScisorsType1" userData={{ name: 'ScisorsType1' }}>
                        <mesh
                            name="ScissorsType1"
                            castShadow
                            receiveShadow
                            geometry={nodes.ScissorsType1.geometry}
                            material={materials.ForcepMaterial}
                            userData={{ name: 'ScissorsType1' }}
                            onClick={() => handleToolClick('scissors1')}
                            onPointerEnter={() => handleToolHover('scissors1', true)}
                            onPointerLeave={() => handleToolHover('scissors1', false)}
                            style={{ cursor: 'pointer' }}
                        />
                    </group>
                </animated.group>

                {/* Tijeras Tipo 2 */}
                <animated.group
                    name="Scissors_T2"
                    userData={{ name: 'Scissors_T2' }}
                    ref={scissorsT2Ref}
                    scale={springs.scissors2Scale}
                    position={springs.scissors2Position}
                    rotation={springs.scissors2Rotation}
                >
                    <group name="ScissorsType2" userData={{ name: 'ScissorsType2' }}>
                        <mesh
                            name="ScissorrsType2"
                            castShadow
                            receiveShadow
                            geometry={nodes.ScissorrsType2.geometry}
                            material={materials.ForcepMaterial}
                            userData={{ name: 'ScissorrsType2' }}
                            onClick={() => handleToolClick('scissors2')}
                            onPointerEnter={() => handleToolHover('scissors2', true)}
                            onPointerLeave={() => handleToolHover('scissors2', false)}
                            style={{ cursor: 'pointer' }}
                        />
                    </group>
                </animated.group>

                {/* Tijeras Tipo 3 */}
                <animated.group
                    name="Scissors_T3"
                    userData={{ name: 'Scissors_T3' }}
                    ref={scissorsT3Ref}
                    scale={springs.scissors3Scale}
                    position={springs.scissors3Position}
                    rotation={springs.scissors3Rotation}
                >
                    <group name="ScissorsType3" userData={{ name: 'ScissorsType3' }}>
                        <mesh
                            name="ScissorrsType3"
                            castShadow
                            receiveShadow
                            geometry={nodes.ScissorrsType3.geometry}
                            material={materials.ForcepMaterial}
                            userData={{ name: 'ScissorrsType3' }}
                            onClick={() => handleToolClick('scissors3')}
                            onPointerEnter={() => handleToolHover('scissors3', true)}
                            onPointerLeave={() => handleToolHover('scissors3', false)}
                            style={{ cursor: 'pointer' }}
                        />
                    </group>
                </animated.group>

                {/* Jeringa */}
                <animated.group
                    name="Syringes"
                    userData={{ name: 'Syringes' }}
                    ref={syringeRef}
                    scale={springs.syringeScale}
                    position={springs.syringePosition}
                    rotation={springs.syringeRotation}
                >
                    <group name="Syringe" userData={{ name: 'Syringe' }}>
                        <mesh
                            name="SyringeOne"
                            castShadow
                            receiveShadow
                            geometry={nodes.SyringeOne.geometry}
                            material={materials.SyringeOneMaterial}
                            userData={{ name: 'SyringeOne' }}
                            onClick={() => handleToolClick('syringe')}
                            onPointerEnter={() => handleToolHover('syringe', true)}
                            onPointerLeave={() => handleToolHover('syringe', false)}
                            style={{ cursor: 'pointer' }}
                        />
                        <mesh
                            name="SyringeTube"
                            castShadow
                            receiveShadow
                            geometry={nodes.SyringeTube.geometry}
                            material={materials.SyringeTubeMaterial}
                            userData={{ name: 'SyringeTube' }}
                        />
                    </group>
                </animated.group>

                {/* Fórceps */}
                <animated.group
                    name="Forceps"
                    userData={{ name: 'Forceps' }}
                    ref={forcepRef}
                    scale={springs.forcepScale}
                    position={springs.forcepPosition}
                    rotation={springs.forcepRotation}
                >
                    <mesh
                        name="Forcep"
                        castShadow
                        receiveShadow
                        geometry={nodes.Forcep.geometry}
                        material={materials.ForcepMaterial}
                        userData={{ name: 'Forcep' }}
                        onClick={() => handleToolClick('forcep')}
                        onPointerEnter={() => handleToolHover('forcep', true)}
                        onPointerLeave={() => handleToolHover('forcep', false)}
                        style={{ cursor: 'pointer' }}
                    />
                </animated.group>

                {/* Elementos estáticos */}
                <group name="SyringeCaps" userData={{ name: 'SyringeCaps' }}>
                    <mesh
                        name="SyringeCap"
                        castShadow
                        receiveShadow
                        geometry={nodes.SyringeCap.geometry}
                        material={materials.SyringeCapMaterial}
                        userData={{ name: 'SyringeCap' }}
                    />
                </group>

                <group name="Towels" userData={{ name: 'Towels' }} ref={towelRef}>
                    <mesh
                        name="Towel"
                        castShadow
                        receiveShadow
                        geometry={nodes.Towel.geometry}
                        material={materials.TowelMaterial}
                        userData={{ name: 'Towel' }}
                        onClick={() => handleToolClick('towel')}
                        onPointerEnter={() => handleToolHover('towel', true)}
                        onPointerLeave={() => handleToolHover('towel', false)}
                        style={{ cursor: 'pointer' }}
                    />
                </group>

                <group name="Trays" userData={{ name: 'Trays' }} ref={trayRef}>
                    <mesh
                        name="Tray"
                        castShadow
                        receiveShadow
                        geometry={nodes.Tray.geometry}
                        material={materials.ForcepMaterial}
                        userData={{ name: 'Tray' }}
                        onClick={() => handleToolClick('tray')}
                        onPointerEnter={() => handleToolHover('tray', true)}
                        onPointerLeave={() => handleToolHover('tray', false)}
                        style={{ cursor: 'pointer' }}
                    />
                </group>
            </group>

            {/* Información de la herramienta seleccionada */}
            {toolInfo && (
                <Html position={[-0.8, 0.6, 0]} center>
                    <div style={{
                        background: toolInfo.color,
                        color: 'white',
                        padding: '15px 25px',
                        borderRadius: '15px',
                        textAlign: 'center',
                        boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        minWidth: '250px'
                    }}>
                        <h3 style={{ margin: '0 0 8px 0', fontSize: '1.2rem' }}>
                            {toolInfo.name}
                        </h3>
                        <p style={{ margin: '0', fontSize: '0.9rem', opacity: 0.9 }}>
                            {toolInfo.description}
                        </p>
                    </div>
                </Html>
            )}

            {/* Controles de teclado */}
            <Html position={[-2, 0.2, 0]} center>
                <div style={{
                    background: 'rgba(0,0,0,0.8)',
                    color: 'white',
                    padding: '2px',
                    borderRadius: '10px',
                    fontSize: '10px',
                    textAlign: 'center',
                    minWidth: '280px',
                    backdropFilter: 'blur(10px)'
                }}>
                    <strong>Controles de la bandeja:</strong><br />
                    1-5: Seleccionar herramientas | S: Modo showcase | R: Reset | ESC: Salir
                </div>
            </Html>
        </group>
    );
}

useGLTF.preload('/models-3d/cataracts/surgical-tool-set.glb');