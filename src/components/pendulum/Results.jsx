import { useContext, useEffect, useState } from "react";
import PendulumContext from "../../context/pendulum.context";
import AngleContext from "../../context/angle.context";

const ResultComponent = () => {
  const { pendulumValue, } = useContext(PendulumContext);
  const { angle } = useContext(AngleContext);

  const [results, setResults] = useState({
    period: 0,
  });

  useEffect(() => {
    //calculate amplitude
    let A = pendulumValue.initialAngle * 2;

    // calculate period
    let T =
      2 * Math.PI * Math.sqrt(pendulumValue.ropeSize / pendulumValue.gravity);

    // calculate frequency
    let f = 1 / T;

    // calculate angular frequency
    let omega = Math.sqrt(pendulumValue.gravity / pendulumValue.ropeSize);

    //calculate pendulum velocity
    // let v = Math.sqrt(pendulumValue.gravity * pendulumValue.ropeSize);

    // console.log(angle);
    let amplitude = pendulumValue.initialAngle * 2; // amplitud en grados
    let max_height = Math.sin(amplitude * (Math.PI / 180)); // altura máxima en metros
    let actual_height = Math.sin(angle * (Math.PI / 180)); // altura actual en metros
    let v = Math.sqrt(
      2 * pendulumValue.gravity * (max_height - actual_height)
    );
    v = isNaN(v) ? 0 : v

    let a = pendulumValue.gravity * Math.sin(angle * (Math.PI / 180));

    setResults({
      amplitude: A,
      period: Number.parseFloat(T).toFixed(2),
      frequency: Number.parseFloat(f).toFixed(2),
      angularFrequency: Number.parseFloat(omega).toFixed(2),
      tension: Number.parseFloat(
        pendulumValue.mass * pendulumValue.gravity
      ).toFixed(2),
      velocity: Number.parseFloat(v).toFixed(2),
      acceleration: Number.parseFloat(a).toFixed(2),
    });
  }, [pendulumValue, angle]);

  return (
    <div className="w-3/12 bg-base-200 p-5 ml-3 rounded-lg">
      <div>
        <h1 className="text-xl">Resultados</h1>
        <hr />
        <br />
      </div>
      <div className="stat">
        <div className="stat-title">Amplitude (A = 2α)</div>
        <div className="stat-value">{results.amplitude} º</div>
      </div>
      <div className="stat">
        <div className="stat-title">Periodo (T = 2π√(L/g))</div>
        <div className="stat-value">{results.period} s</div>
      </div>
      <div className="stat">
        <div className="stat-title">Frecuencia (f = 1/T)</div>
        <div className="stat-value">{results.frequency} Hz</div>
      </div>
      <div className="stat">
        <div className="stat-title">Velocidad angular (ω = √(g/L))</div>
        <div className="stat-value">{results.angularFrequency} rad/s</div>
      </div>
      <div className="stat">
        <div className="stat-title">Velocidad (v = √(2g(sin(A) - sin(α))))</div>
        <div className="stat-value">{results.velocity} m/s</div>
      </div>
      <div className="stat">
        <div className="stat-title">Aceleracion (a = gsin(α))</div>
        <div className="stat-value">{results.acceleration} m/s</div>
      </div>
      <div className="stat">
        <div className="stat-title">Tension (T = mg)</div>
        <div className="stat-value">{results.tension} N</div>
      </div>
    </div>
  );
};

export default ResultComponent;
