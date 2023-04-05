import React, { useContext, useState } from "react";
import PendulumContext from "../../context/pendulum.context";

export default function ControlsComponent() {
  const { pendulumValue, updatePendulumValue } = useContext(PendulumContext);

  const [formValues, setFormValues] = useState({
    initialAngle: pendulumValue.initialAngle,
    ropeSize: pendulumValue.ropeSize,
    gravity: pendulumValue.gravity,
    mass: pendulumValue.mass,
    pendulumIsRunning: pendulumValue.pendulumIsRunning,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // const handlePendulumValueChange = () => {
  //   updatePendulumValue(formValues);
  // };

  const handleStartPendulum = () => {
    setFormValues({ ...formValues, pendulumIsRunning: true });
    updatePendulumValue({ formValues});
  };

  const handleStopPendulum = () => {
    setFormValues({ ...formValues, pendulumIsRunning: false });
    updatePendulumValue({ formValues});
  };

  return (
    <React.Fragment>
      <div className="w-3/12 bg-base-200 p-5 mr-3 rounded-lg">
        <div>
          <h1 className="text-xl">Controles</h1>
          <hr />
          <br />
        </div>
        {/* initial angle */}
        <div>
          <label className="label flex">
            <span className="label-text"># Angulo Inicial</span>
            <span className="label-text">{formValues.initialAngle} °</span>
          </label>
          <input
            type="range"
            min="5"
            max="85"
            name="initialAngle"
            value={formValues.initialAngle}
            onChange={handleChange}
            className={`range ${
              formValues.pendulumIsRunning ? "range-secondary" : "range-primary"
            }`}
            step="1"
            disabled={formValues.pendulumIsRunning}
          />
        </div>
        {/* rope size */}
        <div>
          <label className="label flex">
            <span className="label-text"># Longitud de la cuerda</span>
            <span className="label-text">{formValues.ropeSize} cm</span>
          </label>
          <input
            type="range"
            min="200"
            max="350"
            name="ropeSize"
            value={formValues.ropeSize}
            onChange={handleChange}
            className={`range ${
              formValues.pendulumIsRunning ? "range-secondary" : "range-primary"
            }`}
            step="1"
            disabled={formValues.pendulumIsRunning}
          />
        </div>
        {/* gravity */}
        <div>
          <label className="label flex">
            <span className="label-text"># Gravedad</span>
            <span className="label-text">{formValues.gravity} m/s2</span>
          </label>
          <input
            type="text"
            placeholder="Valor de la Gravedad"
            name="gravity"
            value={formValues.gravity}
            onChange={handleChange}
            className="input input-bordered input-success w-full"
            disabled={formValues.pendulumIsRunning}
          />
        </div>
        {/* mass */}
        <div>
          <label className="label flex">
            <span className="label-text"># Masa</span>
            <span className="label-text">{formValues.mass} kg</span>
          </label>
          <input
            type="text"
            placeholder="Valor de la Gravedad"
            name="mass"
            value={formValues.mass}
            onChange={handleChange}
            className="input input-bordered input-success w-full"
            disabled={formValues.pendulumIsRunning}
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
                disabled={formValues.pendulumIsRunning}
              >
                Iniciar
              </button>
            </div>
            <div className="m-2">
              <button
                className="btn btn-secondary"
                onClick={handleStopPendulum}
                disabled={!formValues.pendulumIsRunning}
              >
                Detener
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
