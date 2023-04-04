import { useRef, useState } from "react";

const MasPage = () => {
  const [initialAngle, setInitialAngle] = useState(45);
  const [ropeLength, setRopeLength] = useState(200);
  const [gravity, setGravity] = useState(9.81);
  const [pendulumIsRunning, setPendulumExecutionState] = useState(false);
  const [pendulumInterval, setPendulumInterval] = useState(null);
  const [period, setPeriod] = useState(0);
  const [frequency, setFrequency] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [tension, setTension] = useState(0);
  const [mass, setMass] = useState(10);
  const [angularVelocity, setAngularVelocity] = useState(0);
  const [instantaneousVelocity, setInstantaneousVelocity] = useState(0);

  const canvasRef = useRef(null);

  const handleInitialAngle = (event) => {
    setInitialAngle(event.target.value);
  };

  const handleRopeLength = (event) => {
    setRopeLength(event.target.value);
  };

  const handleGravity = (event) => {
    setGravity(event.target.value);
  };

  const handleMass = (event) => {
    setMass(event.target.value);
  };

  const handlePendulumExecutionState = (pendulumState) => {
    setPendulumExecutionState(pendulumState);
  };

  function handleStartPendulum() {
    console.log("start");
    handlePendulumExecutionState(true);
    const canvas = canvasRef.current;
    drawPendulum({ canvas, ropeLength, initialAngle });
  }

  function handleStopPendulum() {
    console.log("stop");
    handlePendulumExecutionState(false);
    clearInterval(pendulumInterval);
  }

  function drawPendulum(pendulumProps) {
    const { canvas, ropeLength, initialAngle } = pendulumProps;
    const ctx = canvas.getContext("2d");
    const H = canvas.height;
    const W = canvas.width;
    const minAngle = Number(initialAngle);
    const maxAngle = 180 - minAngle;
    let angle = minAngle;
    let increaser = 1;

    function runPendulum() {
      drawRope(angle, ropeLength);
      angle = increaser + angle;
      if (angle < minAngle || angle > maxAngle) {
        increaser *= -1;
      }

      let T = 2 * Math.PI * Math.sqrt(ropeLength / gravity);
      T = Number.parseFloat(T).toFixed(2);
      setPeriod(T);

      setFrequency(Number.parseFloat(1 / T).toFixed(2));

      let v = (2 * Math.PI * ropeLength) / T;
      v = Number.parseFloat(v).toFixed(2);
      setVelocity(v);

      let omega = (2 * Math.PI) / T;
      omega = Number.parseFloat(omega).toFixed(2);
      setAngularVelocity(omega);

      let theta = angle;
      if (angle < 90) {
        theta = 90 - angle;
      } else {
        theta = (180 - angle - 90);
      }

      console.log(`theta: ${theta}`);

      omega = Math.sqrt(gravity / ropeLength);
      let instVel = ropeLength * omega * Math.sin(theta);
      instVel = Number.parseFloat(instVel).toFixed(2);

      console.log(instVel);

      setInstantaneousVelocity(instVel);

      setTension(Number.parseFloat(mass * gravity).toFixed(2));
    }

    function drawRope(angle, ropeSize) {
      ctx.clearRect(0, 0, W, H);

      const h = W / 2; // centro en x
      const k = 0; // centro en y
      const r = ropeSize; // radio

      const angleInDegrees = angle;
      const angleInRadians = (angleInDegrees * Math.PI) / 180;

      const x = h + r * Math.cos(angleInRadians);
      const y = k + r * Math.sin(angleInRadians);

      const sphereRadius = 30;

      ctx.fillStyle = "#000000";
      ctx.beginPath();
      ctx.arc(x, y, sphereRadius, 0, 2 * Math.PI);
      ctx.fill();

      ctx.beginPath(); // Start a new path
      ctx.moveTo(h, k); // Move the pen to (30, 50)
      ctx.lineTo(x, y); // Draw a line to (150, 100)
      ctx.stroke();
    }

    const runningInterval = setInterval(() => {
      runPendulum();
    }, 100);

    setPendulumInterval(runningInterval);
  }

  return (
    <div className="">
      <div className="flex w-full">
        <div className="w-3/12 bg-base-200 p-5 mr-3 rounded-lg">
          <div>
            <h1 className="text-xl">Controles</h1>
            <hr />
            <br />
          </div>
          <div>
            <label className="label flex">
              <span className="label-text"># Angulo Inicial</span>
              <span className="label-text">{initialAngle} °</span>
            </label>
            <input
              type="range"
              min="5"
              max="85"
              value={initialAngle}
              onChange={handleInitialAngle}
              className={`range ${
                pendulumIsRunning ? "range-secondary" : "range-primary"
              }`}
              step="1"
              disabled={pendulumIsRunning}
            />
          </div>
          {/* rope size */}
          <div>
            <label className="label flex">
              <span className="label-text"># Longitud de la cuerda</span>
              <span className="label-text">{ropeLength} cm</span>
            </label>
            <input
              type="range"
              min="200"
              max="350"
              value={ropeLength}
              onChange={handleRopeLength}
              className={`range ${
                pendulumIsRunning ? "range-secondary" : "range-primary"
              }`}
              step="1"
              disabled={pendulumIsRunning}
            />
          </div>
          {/* gravity */}
          <div>
            <label className="label flex">
              <span className="label-text"># Gravedad</span>
              <span className="label-text">{gravity} m/s2</span>
            </label>
            <input
              type="text"
              placeholder="Valor de la Gravedad"
              value={gravity}
              onChange={handleGravity}
              className="input input-bordered input-success w-full"
              disabled={pendulumIsRunning}
            />
          </div>
          {/* mass */}
          <div>
            <label className="label flex">
              <span className="label-text"># Masa</span>
              <span className="label-text">{mass} kg</span>
            </label>
            <input
              type="text"
              placeholder="Valor de la Gravedad"
              value={mass}
              onChange={handleMass}
              className="input input-bordered input-success w-full"
              disabled={pendulumIsRunning}
            />
          </div>
          {/* buttons */}
          <div>
            <br />
            <hr />
            <div className="flex justify-center">
              <div className="m-2">
                <button
                  className="btn btn-primary"
                  onClick={handleStartPendulum}
                  disabled={pendulumIsRunning}
                >
                  Iniciar
                </button>
              </div>
              <div className="m-2">
                <button
                  className="btn btn-secondary"
                  onClick={handleStopPendulum}
                  disabled={!pendulumIsRunning}
                >
                  Detener
                </button>
              </div>
            </div>
          </div>
        </div>
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
        {/* Results */}
        <div className="w-3/12 bg-base-200 p-5 ml-3 rounded-lg">
          <div>
            <h1 className="text-xl">Resultados</h1>
            <hr />
            <br />
          </div>
          <div className="stat">
            <div className="stat-title">Periodo</div>
            <div className="stat-value">{period} s</div>
          </div>
          <div className="stat">
            <div className="stat-title">Frecuencia</div>
            <div className="stat-value">{frequency} Hz</div>
          </div>
          <div className="stat">
            <div className="stat-title">Velocidad promedio</div>
            <div className="stat-value">{velocity} m/s</div>
          </div>
          <div className="stat">
            <div className="stat-title">Velocidad angular</div>
            <div className="stat-value">{angularVelocity} rad/s</div>
          </div>
          {/* <div className="stat">
            <div className="stat-title">Velocidad instantanea</div>
            <div className="stat-value">{instantaneousVelocity} m/s</div>
          </div> */}
          <div className="stat">
            <div className="stat-title">Tension</div>
            <div className="stat-value">{tension} N</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasPage;
