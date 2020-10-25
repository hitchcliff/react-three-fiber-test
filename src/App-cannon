import React, { useEffect, useState } from 'react';
import './App.scss';

// three
import * as THREE from 'three';
import { Canvas } from 'react-three-fiber';

// cannon
import * as CANNON from 'cannon';
import { Provider, useCannon } from './useCannon';
import { OrbitControls } from 'drei';

const Plane = ({ position }: any) => {
  const ref = useCannon({ mass: 0 }, (body: any) => {
    body.addShape(new CANNON.Plane());
    body.position.set(...position);
  });

  return (
    <mesh ref={ref} receiveShadow={true}>
      <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
      <meshStandardMaterial attach="material" color="#171717" />
    </mesh>
  );
};

const Box = ({ position }: any) => {
  const ref = useCannon({ mass: 100000 }, (body: any) => {
    body.addShape(new CANNON.Box(new CANNON.Vec3(1, 1, 1)));
    body.position.set(...position);
  });

  return (
    <mesh ref={ref} castShadow={true} receiveShadow={true}>
      <boxBufferGeometry attach="geometry" args={[2, 2, 2]} />
      <meshStandardMaterial attach="material" roughness={0.5} color="#575757" />
    </mesh>
  );
};

const App = () => {
  const [showPlane, set] = useState(true);
  useEffect(() => void setTimeout(() => set(false), 5000), []);
  return (
    <div className="App">
      <Canvas
        camera={{ position: [0, 0, 10] }}
        shadowMap={true}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.outputEncoding = THREE.sRGBEncoding;
        }}
      >
        <pointLight position={[-10, -10, 50]} intensity={0.25} />
        <spotLight position={[30, 30, 50]} angle={0.2} penumbra={1} castShadow={true} />
        <Provider>
          <Plane position={[0, 0, -10]} />
          {showPlane && <Plane position={[0, 0, 0]} />}
          <Box position={[1, 0, 1]} />
          <Box position={[2, 1, 5]} />
          <Box position={[0, 0, 6]} />
          <Box position={[-1, 1, 8]} />
          <Box position={[-2, 2, 13]} />
          <Box position={[2, -1, 13]} />
          {!showPlane && <Box position={[0.5, 1.0, 20]} />}
        </Provider>
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default App;
