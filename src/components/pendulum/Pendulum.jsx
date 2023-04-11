import { useContext, useEffect, useRef, useState } from "react";
import PendulumContext from "../../context/pendulum.context";
import drawPendulum from "../../functions/drawPendulum";

const PendulumComponent = () => {
  const { pendulumValue, } = useContext(PendulumContext);
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

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    function resizeCanvas() {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      // Aquí puedes volver a dibujar el contenido del canvas en función del nuevo tamaño
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Elimina el event listener cuando el componente se desmonta
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [pendulumValue,]);

  const canvasRef = useRef(null);

  const runPendulum = () => {
    const canvas = canvasRef.current;
    const ropeSize = pendulumValue.ropeSize;
    const sphereRadius = 30;

    const minAngle = 90 - Number(pendulumValue.initialAngle);
    const maxAngle = 180 - minAngle;

    let angle = minAngle;
    let increaser = 1;

    let speed = Math.sqrt( pendulumValue.gravity * pendulumValue.ropeSize);

    console.log(10/speed);

    function animatePendulum() {
      drawPendulum({ canvas, angle, ropeSize, sphereRadius });
      angle = increaser + angle;
      if (angle < minAngle || angle > maxAngle) {
        increaser *= -1;
      }
    }

    const runningInterval = setInterval(() => {
      animatePendulum();
    }, 1000/speed);

    setPendulumInterval(runningInterval);
  };

  const stopPendulum = () => {
    clearInterval(pendulumInterval);
  };

  const canvasStyle = {
    width: '100%',
    height: '100%',
  }
  return (
    <div className="w-6/12 bg-base-200 p-5 rounded-lg">
      <div>
        <h1 className="text-xl">Pendulo</h1>
        <hr />
        <br />
      </div>
      {/* Animation */}
      <div className="flex justify-center h-[90%]">
        <canvas
          ref={canvasRef}
          // width="800"
          // height="600"
          style={canvasStyle}
          className="border-2 border-primary"
        ></canvas>
      </div>
    </div>
  );
};

export default PendulumComponent;
