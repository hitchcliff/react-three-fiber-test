import React from 'react';
import '../../App.scss';

// three
import { Canvas } from 'react-three-fiber';

// comp
import Scene from './Scene';
import Lights from './Lights';
import { OrbitControls } from 'drei';

const Montage = () => {
  return (
    <div className="App">
      <Canvas colorManagement shadowMap camera={{ position: [0, 0, 100], fov: 100 }}>
        <Lights />
        <Scene />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default Montage;
