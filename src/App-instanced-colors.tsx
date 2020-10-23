import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './App.scss';

// components
import { Canvas, useFrame } from 'react-three-fiber';
import * as THREE from 'three';
import niceColors from 'nice-color-palettes';

const colors: any = new Array(1000) //generate colors
  .fill(0, 0)
  .map(() => niceColors[10][Math.floor(Math.random() * 5)]);

const tempColor = new THREE.Color();

const Lights = () => {
  return (
    <group>
      <ambientLight intensity={0.5} />
      <pointLight position={[150, 150, 150]} intensity={5.5} />
    </group>
  );
};

const Boxes = () => {
  const [hovered, setHovered] = useState<number>();
  const mesh: any = useRef();
  const dummy: THREE.Object3D = useMemo(() => new THREE.Object3D(), []);

  const previous: any = useRef();
  useEffect(() => {
    void (previous.current = hovered);
  }, [hovered]);

  // put colors
  const colorArray: any = useMemo(() => {
    Float32Array.from(
      new Array(1000).fill(0, 0).flatMap((_, i) => tempColor.set(colors[i]).toArray()),
    );
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    mesh.current.rotation.x = Math.sin(time / 4);
    mesh.current.rotation.y = Math.sin(time / 4);

    let i = 0;
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        for (let z = 0; z < 10; z++) {
          const id = i++;
          dummy.position.set(5 - x, 5 - y, 5 - z);
          dummy.rotation.y =
            Math.sin(x / 4 + time) + Math.sin(y / 4 + time) + Math.sin(z / 4 + time);
          dummy.rotation.z = dummy.rotation.y * 2;
          if (hovered !== previous.current) {
            tempColor
              .set(id === hovered ? 'white' : colors[id])
              .toArray(colorArray, id * 3);
            mesh.current.geometry.attributes.color.needsUpdate = true;
          }

          dummy.updateMatrix();
          mesh.current.setMatrixAt(id, dummy.matrix);
        }
      }
    }
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={mesh}
      args={[null, null, 1000]}
      onPointerMove={(e) => setHovered(e.instanceId)}
      onPointerOut={(e) => setHovered(undefined)}
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]}>
        <instancedBufferGeometry />
      </boxBufferGeometry>
      <meshPhongMaterial attach="material" vertexColors={colors} />
    </instancedMesh>
  );
};

const App = () => {
  return (
    <div className="App">
      <Canvas
        shadowMap
        onCreated={({ gl }: any) => gl.setClearColor('pink')}
        camera={{ position: [0, 0, 20], fov: 75 }}
      >
        <Lights />
        <Boxes />
      </Canvas>
    </div>
  );
};

export default App;
