import { OrbitControls } from 'drei';
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import './App.scss';

const Plane = () => {
  return (
    <mesh receiveShadow={true} rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <shadowMaterial attach="material" opacity={0.3} />
    </mesh>
  );
};

const Box = () => {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  const mesh: any = useRef();
  // useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
  return (
    <mesh
      ref={mesh}
      castShadow={true}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setActive(!active)}
    >
      <boxBufferGeometry attach="geometry" args={active ? [2, 2, 2] : [1, 1, 1]} />
      <meshStandardMaterial attach="material" color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
};
const App = () => {
  return (
    <div className="App">
      <Canvas shadowMap={true} colorManagement={true} camera={{ position: [-5, 3, 0] }}>
        <ambientLight />
        <pointLight position={[-1.2, 1, 10]} />
        <spotLight position={[1, 10, 10]} castShadow={true} />
        <Box />
        <Plane />
        <OrbitControls autoRotate={true} />
      </Canvas>
    </div>
  );
};

export default App;
