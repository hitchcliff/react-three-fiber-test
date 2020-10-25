import React, { MutableRefObject, useCallback, useMemo, useRef, useState } from 'react';
import { useFrame } from 'react-three-fiber';

import * as THREE from 'three';
import { Vector3 } from 'three';
import { getSourceMapRange } from 'typescript';
import SingleBox from './SingleBox';

const degToRad = (degrees: any): number => {
  const pi = Math.PI;
  return degrees * (pi / 180);
};

const Scene = () => {
  const group: any = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    group.current.rotation.set(
      Math.sin(t / 4),
      Math.cos(t / 4),
      Math.cos(t / 4) - Math.sin(t / 4),
    );
  });

  return (
    <group ref={group}>
      <SingleBox />
    </group>
  );
};

export default Scene;
