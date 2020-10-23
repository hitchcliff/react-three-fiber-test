export interface ISwarmProp {
  count: number;
  mouse: React.MutableRefObject<number[]>;
}

export interface Particle {
  t: number;
  factor: number;
  speed: number;
  xFactor: number;
  yFactor: number;
  zFactor: number;
  mx: number;
  my: number;
}
