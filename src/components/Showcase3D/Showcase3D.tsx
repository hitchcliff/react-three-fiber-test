import React, {
  MutableRefObject,
  Suspense,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import styles from './Showcase3D.module.scss';

import { Canvas, useFrame } from 'react-three-fiber';
import * as THREE from 'three';
import niceColors from 'nice-color-palettes';

import Effects from '../../Effects';
import { OrbitControls } from 'drei';
import Scene from './Scene';
import SingleBox from './SingleBox';

const tempColor = new THREE.Color();
const colors = new Array(10)
  .fill(0, 0)
  .map(() => niceColors[17][Math.floor(Math.random() * 5)]);

const Lights = () => {
  return (
    <group>
      <ambientLight intensity={0.7} />
      <pointLight position={[150, 150, 150]} intensity={5.5} />
    </group>
  );
};

const Showcase3D = () => {
  const mouse: React.MutableRefObject<number[]> = useRef([0, 0]);

  const onMouseMove = useCallback(({ clientX: x, clientY: y }) => {
    mouse.current = [x - window.innerWidth / 2, y - window.innerHeight / 2];
  }, []);

  return (
    <div style={{ height: '100%' }} onMouseMove={onMouseMove}>
      <Canvas
        shadowMap
        onCreated={({ gl }) => {
          gl.setClearColor('white');
        }}
        camera={{ fov: 75 }}
      >
        <Lights />
        <Scene />
        <Suspense fallback={null}>
          <Effects />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default Showcase3D;
