import { useContext, useEffect, useState } from "react";
import PendulumContext from "../../context/pendulum.context";

const ResultComponent = () => {
  const { pendulumValue, } = useContext(PendulumContext);

  const [results, setResults] = useState({
    period: 0,
  });

  useEffect(() => {
    // calculate period
    let T =
      2 * Math.PI * Math.sqrt(pendulumValue.ropeSize / pendulumValue.gravity);

    // calculate frequency
    let f = 1 / T;

    // calculate angular frequency
    let omega = 2 * Math.PI * f;

    //calculate pendulum velocity
    let v = Math.sqrt(pendulumValue.gravity * pendulumValue.ropeSize);

    setResults({
      period: Number.parseFloat(T).toFixed(2),
      frequency: Number.parseFloat(f).toFixed(2),
      angularFrequency: Number.parseFloat(omega).toFixed(2),
      tension: Number.parseFloat(
        pendulumValue.mass * pendulumValue.gravity
      ).toFixed(2),
      velocity: Number.parseFloat(v).toFixed(2),
    });
  }, [pendulumValue]);

  return (
    <div className="w-3/12 bg-base-200 p-5 ml-3 rounded-lg">
      <div>
        <h1 className="text-xl">Resultados</h1>
        <hr />
        <br />
      </div>
      <div className="stat">
        <div className="stat-title">Periodo</div>
        <div className="stat-value">{results.period} s</div>
      </div>
      <div className="stat">
        <div className="stat-title">Frecuencia</div>
        <div className="stat-value">{results.frequency} Hz</div>
      </div>
      <div className="stat">
        <div className="stat-title">Velocidad angular</div>
        <div className="stat-value">{results.angularFrequency} rad/s</div>
      </div>
      <div className="stat">
        <div className="stat-title">Velocidad</div>
        <div className="stat-value">{results.velocity} m/s</div>
      </div>
      <div className="stat">
        <div className="stat-title">Tension</div>
        <div className="stat-value">{results.tension} N</div>
      </div>
    </div>
  );
};

export default ResultComponent;
