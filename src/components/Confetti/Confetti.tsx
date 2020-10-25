import React, { MutableRefObject, useRef } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import '../../App.scss';

import FlatLine from './FlatLine.jsx';

const degToRad = (degrees: any): number => {
  const pi = Math.PI;
  return degrees * (pi / 180);
};

const Scene = () => {
  const group: MutableRefObject<any> = useRef();
  const lines = new Array(100).fill(0);
  let theta = 0;

  useFrame(() => {
    const posY = 5 * Math.sin(degToRad((theta += 0.02)));
    return group.current.rotation.set(0, posY, 0);
  });

  return (
    <group ref={group}>
      {lines.map((_: any, index: number) => (
        <FlatLine key={index} />
      ))}
    </group>
  );
};

const Confetti = () => {
  return (
    <div className="App">
      <Canvas style={{ background: '#324444' }} camera={{ position: [0, 50, 10] }}>
        <Scene />
      </Canvas>
    </div>
  );
};

export default Confetti;
