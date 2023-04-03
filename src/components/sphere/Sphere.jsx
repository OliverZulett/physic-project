import React from "react";
import { useSpring, animated } from "react-spring";

const SphereComponent = () => {
  const sphereProps = useSpring({
    from: { transform: "rotate(-45deg) translate3d(-250px, 0px, 0px)" },
    to: async (next) => {
      while (true) {
        await next({
          transform: "rotate(-45deg) translate3d(250px, -50px, 0) rotate(45deg)",
        });
        await next({
          transform: "rotate(45deg) translate3d(-250px, 0px, 0) rotate(-45deg)",
        });
      }
    },
    config: { duration: 2000 },
  });

  const ropeProps = useSpring({
    from: { transform: "rotate(-90deg) translate3d(0px, 0, 0)" },
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
    <>
      <div
        style={{
          height: "500px",
          width: "500px",
          border: "1px solid black",
          overflow: "hidden",
          position: 'absolute'
        }}
      >
        <animated.div
          style={{
            position: "absolute",
            top: "20%",
            left: "50%",
            transformOrigin: "top",
            transform: ropeProps.transform,
            width: "1px",
            height: "200px",
            backgroundColor: "black",
            ...ropeProps,
          }}
        />
        <animated.div
          style={{
            position: "relative",
            top: "50%",
            left: "55%",
            width: "50px",
            height: "50px",
            transformOrigin: "top",
            transform: sphereProps.transform,
            borderRadius: "50%",
            backgroundColor: "blue",
            ...sphereProps,
          }}
        />
      </div>
    </>
  );
};

export default SphereComponent;
