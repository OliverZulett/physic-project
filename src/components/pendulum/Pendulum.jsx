import { useContext, useEffect, useRef, useState } from "react";
import PendulumContext from "../../context/pendulum.context";
import drawPendulum from "../../functions/drawPendulum";
import AngleContext from "../../context/angle.context";

const PendulumComponent = () => {
  const { pendulumValue, updatePendulumValue } = useContext(PendulumContext);
  const { angle, updateAngle } = useContext(AngleContext);
  const [pendulumInterval, setPendulumInterval] = useState(null);

  useEffect(() => {
    // console.log(pendulumValue);
    if (pendulumValue.pendulumIsRunning) {
      console.log("start pendulum");
      runPendulum();
    } else {
      console.log("stop pendulum");
      stopPendulum();
    }

    const canvas = canvasRef.current;

    function resizeCanvas() {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Elimina el event listener cuando el componente se desmonta
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [pendulumValue]);

  const canvasRef = useRef(null);

  const runPendulum = () => {
    const canvas = canvasRef.current;
    const ropeSize = pendulumValue.ropeSize;
    const sphereRadius = 30;

    const minAngle = 90 - Number(pendulumValue.initialAngle);
    const maxAngle = 180 - minAngle;

    let angle = minAngle;
    let increaser = 1;

    let speed = Math.sqrt(pendulumValue.gravity * pendulumValue.ropeSize);

    function animatePendulum() {
      drawPendulum({ canvas, angle, ropeSize, sphereRadius });

      angle = increaser + angle;

      if (angle < minAngle || angle > maxAngle) {
        increaser *= -1;
      }

      updateAngle(angle);

      let a = pendulumValue.gravity * Math.sin(angle * (Math.PI / 180));

      // console.log("La aceleración es:", a.toFixed(3), "m/s^2");

      let amplitude = pendulumValue.initialAngle * 2; // amplitud en grados
      let max_height = Math.sin(amplitude * (Math.PI / 180)); // altura máxima en metros
      let actual_height = Math.sin(angle * (Math.PI / 180)); // altura actual en metros

      // Calcular la velocidad en función de la altura actual
      let velocidad = Math.sqrt(
        2 * pendulumValue.gravity * (max_height - actual_height)
      );

      // Imprimir el valor de la velocidad en la consola
      // console.log("La velocidad es:", velocidad.toFixed(2), "m/s");
    }

    const runningInterval = setInterval(() => {
      animatePendulum();
    }, 1000 / speed);

    setPendulumInterval(runningInterval);
  };

  const stopPendulum = () => {
    clearInterval(pendulumInterval);
  };

  const canvasStyle = {
    width: "100%",
    height: "100%",
  };
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
          style={canvasStyle}
          className="border-2 border-primary"
        ></canvas>
      </div>
    </div>
  );
};

export default PendulumComponent;
