import React, { useMemo, useRef, useState } from 'react';
import { useFrame } from 'react-three-fiber';
import * as THREE from 'three';
import { InstancedMesh, Vector3 } from 'three';
import { convertCompilerOptionsFromJson } from 'typescript';

import niceColors from 'nice-color-palettes';
const tempColor = new THREE.Color();

interface ISingleBoxProp {
  position: Vector3[];
}

const colors = new Array(10)
  .fill(0, 0)
  .map(() => niceColors[15][Math.floor(Math.random() * 5)]);

const dummy = new THREE.Object3D();
const SingleBox = () => {
  const [count] = useState(20);
  const mesh: any = useRef();

  const colorArray = useMemo(
    () =>
      Float32Array.from(
        new Array(1000).fill(0, 0).flatMap((_, i) => tempColor.set(colors[i]).toArray()),
      ),
    [],
  );

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -20 + Math.random() * 40;
      const yFactor = -20 + Math.random() * 40;
      const zFactor = -20 + Math.random() * 20;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor });
    }
    return temp;
  }, [count]);

  useFrame(() => {
    particles.forEach((particle: any, i: number) => {
      let { t } = particle;
      const { factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed / 100;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.max(1.5, Math.cos(t) * 5);
      dummy.position.set(
        a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10,
      );

      // set the color
      tempColor.set(colors[i]).toArray();
      mesh.current.geometry.attributes.color.needsUpdate = true;

      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <boxBufferGeometry attach="geometry" args={[0.7, 0.7, 0.7]}>
        <instancedBufferAttribute
          attachObject={['attributes', 'color']}
          args={[colorArray, 3]}
        />
      </boxBufferGeometry>
      <meshPhongMaterial attach="material" vertexColors={true} />
    </instancedMesh>
  );
};

export default SingleBox;
