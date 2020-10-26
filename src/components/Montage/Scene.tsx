import React, { useEffect } from 'react';

import * as THREE from 'three';
import { useSpring, useSprings, a } from 'react-spring/three';

const degToRad = (degrees: any) => {
  return degrees * (Math.PI / 180);
};

// mesh prop
const meshProp = (i: number) => {
  const r = Math.random();
  return {
    position: [100 - Math.random() * 200, 100 - Math.random() * 200, i * 1.5],
    scale: [1 + r * 14, 1 + r * 14, 1],
    rotation: [0, 0, degToRad(Math.round(Math.random()) * 45)],
    color: colors[Math.round(Math.random() * colors.length)],
  };
};

// data
const number = 35;
const colors = ['#A2CCB6', '#FCEEB5', '#EE786E', '#e0feff', 'lightpink', 'lightblue'];
const data = new Array(number).fill(0).map(() => {
  const random = 0.1 + Math.random() * 9;
  return {
    color: colors[Math.round(Math.random() * colors.length)],
    args: new THREE.Vector3(random, random, 10),
    rotation: new THREE.Euler(0, 0),
  };
});

const Scene = () => {
  const [springs, set, stop]: any = useSprings(number, (index) => ({
    from: meshProp(index),
    ...meshProp(index),
    config: { mash: 20, tension: 150, friction: 50 },
  }));

  useEffect(
    () =>
      void setInterval(
        () => set((i: number) => ({ ...meshProp(i), delay: i * 40 })),
        3000,
      ),
    [],
  );

  console.log(springs);

  const _data = data.map((d, index) => {
    return (
      <a.mesh key={index} {...springs[index]} castShadow receiveShadow>
        <boxBufferGeometry attach="geometry" args={[d.args.x, d.args.y, d.args.z]} />
        <a.meshStandardMaterial
          attach="material"
          color={springs[index].color}
          roughness={0.75}
          metalness={0.5}
        />
      </a.mesh>
    );
  });
  return <group>{_data}</group>;
};

export default Scene;
