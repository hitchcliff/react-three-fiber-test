import React from 'react';
import './App.scss';
// import Confetti from './components/Confetti/Confetti';
// import GammaCorrection from './components/InstancedColors/InstancedColors';
import Showcase3D from './components/Showcase3D/Showcase3D';
const App = () => {
  return (
    <div className="App">
      <Showcase3D />
      {/* <GammaCorrection /> */}
      {/* <Confetti /> */}
    </div>
  );
};

export default App;
