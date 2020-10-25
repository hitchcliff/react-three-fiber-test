import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useFrame } from 'react-three-fiber';
import { Canvas } from 'react-three-fiber';
import '../../App.scss';

import * as THREE from 'three';
import niceColors from 'nice-color-palettes';

const Lights = () => {
  return (
    <group>
      <ambientLight />
      <pointLight position={[150, 150, 150]} intensity={0.55} />
    </group>
  );
};

const tempObject = new THREE.Object3D();
const tempColor = new THREE.Color();
const colors = new Array(1000)
  .fill(0, 0)
  .map(() => niceColors[15][Math.floor(Math.random() * 5)]);

function Boxes() {
  const [hovered, set] = useState<number | undefined>();
  const colorArray = useMemo(
    () =>
      Float32Array.from(
        new Array(1000).fill(0, 0).flatMap((_, i) => tempColor.set(colors[i]).toArray()),
      ),
    [],
  );

  const ref: any = useRef();
  const previous: any = useRef();
  useEffect(() => void (previous.current = hovered), [hovered]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    ref.current.rotation.x = Math.sin(time / 4);
    ref.current.rotation.y = Math.sin(time / 2);
    let i = 0;
    for (let x = 0; x < 10; x++)
      for (let y = 0; y < 10; y++)
        for (let z = 0; z < 10; z++) {
          const id = i++;
          tempObject.position.set(5 - x, 5 - y, 5 - z);
          tempObject.rotation.y =
            Math.sin(x / 4 + time) + Math.sin(y / 4 + time) + Math.sin(z / 4 + time);
          tempObject.rotation.z = tempObject.rotation.y * 2;
          if (hovered !== previous.current) {
            tempColor
              .set(id === hovered ? 'white' : colors[id])
              .toArray(colorArray, id * 3);
            ref.current.geometry.attributes.color.needsUpdate = true;
          }
          const scale = id === hovered ? 2 : 1;
          tempObject.scale.set(scale, scale, scale);
          tempObject.updateMatrix();
          ref.current.setMatrixAt(id, tempObject.matrix);
        }
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={ref}
      args={[null, null, 1000]}
      onPointerMove={(e) => set(e.instanceId)}
      onPointerOut={(e) => set(undefined)}
    >
      <boxBufferGeometry attach="geometry" args={[0.7, 0.7, 0.7]}>
        <instancedBufferAttribute
          attachObject={['attributes', 'color']}
          args={[colorArray, 3]}
        />
      </boxBufferGeometry>
      <meshPhongMaterial attach="material" vertexColors={true} />
    </instancedMesh>
  );
}

const GammaCorrection = () => {
  return (
    <div className="App">
      <Canvas
        shadowMap
        gl={{ antialias: false, alpha: false }}
        camera={{ position: [0, 0, 15], near: 5, far: 20 }}
        onCreated={({ gl }) => gl.setClearColor('lightpink')}
      >
        <Lights />
        <Boxes />
      </Canvas>
      ,
    </div>
  );
};

export default GammaCorrection;
