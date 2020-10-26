import React from 'react';
import { Canvas } from 'react-three-fiber';
import '../../App.scss';
import crate from '../../crate.png';

import * as THREE from 'three';
import { OrbitControls } from 'drei';

const Lights = () => {
  return <ambientLight intensity={0.3} />;
};

const Material = () => {
  const texture = new THREE.TextureLoader().load(crate);
  return (
    <mesh>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" map={texture} />
    </mesh>
  );
};

const TextureLoaderTest = () => {
  return (
    <div className="App">
      <Canvas>
        <Lights />
        <Material />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default TextureLoaderTest;
