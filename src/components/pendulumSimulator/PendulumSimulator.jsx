import React, { useState, useRef } from 'react';
import { useSpring, animated } from 'react-spring';

const PendulumSimulator = () => {
  const [length, setLength] = useState(100);
  const [gravity, setGravity] = useState(9.81);
  const [time, setTime] = useState(0);
  const raf = useRef(null);

  const pendulumProps = useSpring({
    to: async (next) => {
      while (true) {
        await next({
          y: length * Math.cos(Math.sqrt(gravity / length) * time),
        });
        setTime(time + 0.1);
      }
    },
    from: { y: length },
    config: { mass: 1, tension: 100, friction: 20 },
  });

  const handleLengthChange = (e) => {
    setLength(parseInt(e.target.value, 10));
  };

  const handleGravityChange = (e) => {
    setGravity(parseFloat(e.target.value));
  };

  const handleStart = () => {
    raf.current = requestAnimationFrame(() => {});
  };

  const handleStop = () => {
    cancelAnimationFrame(raf.current);
  };

  return (
    <div>
      <label>
        Length:
        <input type="range" min="50" max="200" value={length} onChange={handleLengthChange} />
      </label>
      <label>
        Gravity:
        <input type="range" min="1" max="20" step="0.1" value={gravity} onChange={handleGravityChange} />
      </label>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <animated.div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          height: '4px',
          width: '4px',
          backgroundColor: 'black',
          borderRadius: '50%',
          ...pendulumProps,
        }}
      />
    </div>
  );
};

export default PendulumSimulator;
