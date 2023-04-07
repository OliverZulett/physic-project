import { useContext, useEffect, useRef, useState } from "react";
import PendulumContext from "../../context/pendulum.context";
import drawPendulum from "../../functions/drawPendulum";

const PendulumComponent = () => {
  const { pendulumValue, updatePendulumValue } = useContext(PendulumContext);
  const [pendulumInterval, setPendulumInterval] = useState(null);

  useEffect(() => {
    console.log(pendulumValue);
    if (pendulumValue.pendulumIsRunning) {
      console.log("start pendulum");
      runPendulum();
    } else {
      console.log("stop pendulum");
      stopPendulum();
    }
  }, [pendulumValue]);

  const canvasRef = useRef(null);

  const runPendulum = () => {
    const canvas = canvasRef.current;
    const ropeSize = pendulumValue.ropeSize;
    const sphereRadius = 30;

    const minAngle = Number(pendulumValue.initialAngle);
    const maxAngle = 180 - minAngle;

    let angle = minAngle;
    let increaser = 1;

    function animatePendulum() {
      drawPendulum({ canvas, angle, ropeSize, sphereRadius });
      angle = increaser + angle;
      if (angle < minAngle || angle > maxAngle) {
        increaser *= -1;
      }
    }

    const runningInterval = setInterval(() => {
      animatePendulum();
    }, 50);

    setPendulumInterval(runningInterval);
  };

  const stopPendulum = () => {
    clearInterval(pendulumInterval);
  };

  return (
    <div className="w-6/12 bg-base-200 p-5 rounded-lg">
      <div>
        <h1 className="text-xl">Pendulo</h1>
        <hr />
        <br />
      </div>
      {/* Animation */}
      <div className="flex justify-center">
        <canvas
          ref={canvasRef}
          width="800"
          height="600"
          className="border-2 border-primary"
        ></canvas>
      </div>
    </div>
  );
};

export default PendulumComponent;
