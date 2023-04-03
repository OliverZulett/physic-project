import React from 'react';
import { useSpring, animated } from 'react-spring';

const RopeComponent = () => {
  const ropeProps = useSpring({
    from: { transform: "rotate(-90deg) translate3d(0, 0, 0)" },
    to: async (next) => {
      while (true) {
        await next({
          transform: "rotate(-90deg) translate3d(0px, 0, 0)",
        });
        await next({
          transform: "rotate(90deg) translate3d(0px, 0, 0)",
        });
      }
    },
    config: { duration: 2000 },
  });

  return (
    <div style={{ position: 'relative', height: '200px', width: '200px' }}>
      <animated.div
        style={{
          position: 'absolute',
          top: '25px',
          left: '50%',
          transformOrigin: 'top',
          transform: ropeProps.transform,
          width: '1px',
          height: '100px',
          backgroundColor: 'black',
          ...ropeProps,
        }}
      />
    </div>
  );
};

export default RopeComponent;