import React, { useState } from 'react';
import { useSpring, animated, Globals, SpringValue } from 'react-spring';

const ReactSpringTest = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  const HelloProps: any = useSpring({
    opacity: 1,
    from: { opacity: 0 },
  });

  const AnimatedSvgProp1 = useSpring({
    x: 100,
    from: { x: 0 },
  });

  const NumberProp = useSpring({ number: 1, from: { number: 0 } });
  const ScrollProp = useSpring({ scroll: 100, from: { scroll: 0 } });
  const [toggleProp, set, stop]: any = useSpring(() => ({ opacity: 0 }));
  set({ opacity: toggle ? 1 : 0 });

  const FadeInOut: any = useSpring({
    to: async (next, cancel) => {
      await next({ opacity: 1, color: '#ffaaee' });
      await next({ opacity: 0, color: 'rgb(14,26,19)' });
    },
    from: { opacity: 0, color: 'red' },
  });

  return (
    <div>
      <div>
        <animated.h1 style={HelloProps}>Hello</animated.h1>
      </div>
      {/* <animated.svg strokeDashoffset={AnimatedSvgProp1.x}>
        <path d="..." />
      </animated.svg> */}
      <animated.span>{NumberProp.number}</animated.span>
      <animated.div
        style={{
          height: '100px',
          background: '#f5f5f5',
          width: '100px',
          overflow: 'scroll',
        }}
        scrollTop={ScrollProp.scroll}
      >
        <ul>
          <li>Hello</li>
          <li>Hello</li>
          <li>Hello</li>
          <li>Hello</li>
          <li>Hello</li>
          <li>Hello</li>
          <li>Hello</li>
          <li>Hello</li>
          <li>Hello</li>
          <li>Hello</li>
          <li>Hello</li>
          <li>Hello</li>
        </ul>
      </animated.div>
      <div>
        <button onClick={() => setToggle(!toggle)}>Toggle</button>
        <animated.div style={toggleProp}>Show</animated.div>
      </div>
      <animated.div style={FadeInOut}>I will fade in and out</animated.div>
    </div>
  );
};

export default ReactSpringTest;
