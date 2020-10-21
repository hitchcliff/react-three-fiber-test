import React, { Suspense, useMemo, useRef } from 'react';
import './App.scss';

// components
import { Canvas, useLoader, useThree } from 'react-three-fiber';
import { LinearFilter, TextureLoader } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// images
import textureURL from './assets/233.jpg';
// import diamondURL from './assets/diamond.glb';

const DummyBox = () => {
  return (
    <mesh>
      <boxBufferGeometry args={[1, 1, 1]} />
    </mesh>
  );
};

// background setup
const Background = () => {
  const { viewport, aspect } = useThree();
  const texture = useLoader(TextureLoader, textureURL);

  useMemo(() => (texture.minFilter = LinearFilter), []);

  const adaptHeight =
    3800 * (aspect > 5000 / 3800 ? viewport.width / 5000 : viewport.height / 3800);
  const adaptWidth =
    5000 * (aspect > 5000 / 3800 ? viewport.width / 5000 : viewport.height / 3800);

  return (
    <mesh
      layers={[1]}
      scale={[adaptWidth, adaptHeight, 1]}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshBasicMaterial attach="material" color="red" />
    </mesh>
  );
};

const Diamonds = () => {
  const { size, viewport, gl, scene, camera, clock } = useThree();
  const model = useRef(null);
  // const gltf = useLoader(GLTFLoader, diamondURL);
  return null;
};

const App = () => {
  return (
    <div className="App">
      <Canvas camera={{ fov: 50, position: [0, 0, 30] }}>
        <Suspense fallback={null}>
          <Background />
          <Diamonds />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default App;
