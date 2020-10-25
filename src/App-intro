import React, { useRef, useState } from 'react';
import './App.scss';

import { Canvas, useFrame } from 'react-three-fiber';
import { MeshWobbleMaterial, OrbitControls, softShadows } from 'drei';

import { useSpring, a } from 'react-spring/three';

interface ISpinningMeshProp {
  position: any;
  color: string;
  args?: any;
}

// softens the shadow
softShadows({});

const Plane = () => {
  return (
    <group>
      <mesh receiveShadow={true} rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
        <planeBufferGeometry attach="geometry" args={[100, 100]} />
        <shadowMaterial attach="material" opacity={0.3} />
      </mesh>
    </group>
  );
};

const SpinningMesh = ({ position, color, args }: ISpinningMeshProp) => {
  const mesh: any = useRef(null);
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
  const [expand, setExpand] = useState(false);

  const props: any = useSpring({
    scale: expand ? [1.4, 1.4, 1.4] : [1, 1, 1],
  });

  return (
    <a.mesh
      scale={props.scale}
      onClick={() => setExpand(!expand)}
      castShadow={true}
      position={position}
      ref={mesh}
    >
      <boxBufferGeometry attach="geometry" args={args} />
      <MeshWobbleMaterial attach="material" color={color} speed={1} factor={0.5} />
    </a.mesh>
  );
};

function App() {
  return (
    <div className="App">
      <Canvas
        shadowMap={true}
        colorManagement={true}
        camera={{ position: [-5, 2, 10], fov: 60 }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[0, 10, 0]}
          castShadow={true}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        {/* <pointLight position={[-10, 0, -20]} intensity={0.5} /> */}
        <pointLight position={[0, -10, 0]} intensity={0.5} />

        <Plane />
        <SpinningMesh position={[0, 1, 0]} color="blue" args={[3, 2, 1]} />
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default App;
