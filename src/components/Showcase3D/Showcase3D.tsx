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
import { ISwarmProp, Particle } from '.';
import { MeshStandardMaterial } from 'three';

const tempColor = new THREE.Color();
const colors = new Array(1000)
  .fill(0, 0)
  .map(() => niceColors[17][Math.floor(Math.random() * 5)]);

const Lights = () => {
  return (
    <group>
      <ambientLight />
      <pointLight position={[150, 150, 150]} intensity={0.55} />
    </group>
  );
};

const Swarm = ({ mouse, count }: ISwarmProp) => {
  const [hovered, set] = useState<undefined | number>(undefined);
  const mesh: any = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

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
      const zFactor = -20 + Math.random() * 40;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    mesh.current.rotation.x = Math.sin(time / 4);
    mesh.current.rotation.z = Math.sin(time / 4);

    particles.forEach((particle: Particle, i: number) => {
      let { t } = particle;
      const { factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.max(1.5, Math.cos(t) * 4);
      particle.mx += (mouse.current[0] - particle.mx) * 0.02;
      particle.my += (-mouse.current[1] - particle.my) * 0.02;
      dummy.position.set(
        (particle.mx / 10) * a +
          xFactor +
          Math.cos((t / 10) * factor) +
          (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b +
          yFactor +
          Math.sin((t / 10) * factor) +
          (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b +
          zFactor +
          Math.cos((t / 10) * factor) +
          (Math.sin(t * 3) * factor) / 10,
      );

      if (hovered === i) {
        tempColor.set(i === hovered ? 'white' : colors[i]).toArray(colorArray, i * 3);
        // if (!mesh.current.geometry.attributes.color) return;
        // mesh.current.geometry.attributes.color.needsUpdate = true;
      }

      const scale = i === hovered ? 2 : 1;
      dummy.scale.set(scale, scale, scale);

      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={mesh}
      args={[new THREE.BoxGeometry(1, 1, 1), new MeshStandardMaterial(), count]}
      onPointerMove={(e) => set(e.instanceId)}
      onPointerOut={(e) => set(undefined)}
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]}>
        <instancedBufferAttribute
          attachObject={['attributes', 'color']}
          args={[colorArray, 3]}
        />
      </boxBufferGeometry>
      <meshPhongMaterial attach="material" color={hovered ? 'black' : 'white'} />
    </instancedMesh>
  );
};

const Showcase3D = () => {
  const mouse: React.MutableRefObject<number[]> = useRef([0, 0]);

  const onMouseMove = useCallback(({ clientX: x, clientY: y }) => {
    mouse.current = [x - window.innerWidth / 2, y - window.innerHeight / 2];
  }, []);

  return (
    <div className={styles.container} onMouseMove={onMouseMove}>
      <Canvas
        shadowMap
        onCreated={({ gl }) => {
          gl.setClearColor('white');
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.outputEncoding = THREE.sRGBEncoding;
        }}
        camera={{ position: [0, 0, 50], fov: 75 }}
      >
        <Lights />
        <Swarm count={150} mouse={mouse} />
        <Suspense fallback={null}>
          <Effects />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Showcase3D;
