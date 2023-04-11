import React, { useEffect, useState } from "react";
import HeaderComponent from "./components/header/Header";
import FooterComponent from "./components/footer/Footer";
import PendulumContext from "./context/pendulum.context";
import ControlsComponent from "./components/pendulum/Controls";
import PendulumComponent from "./components/pendulum/Pendulum";
import ResultComponent from "./components/pendulum/Results";

function App() {
  const [pendulumValue, setPendulumValue] = useState({
    initialAngle: 0,
    angle: 0,
    ropeSize: 200,
    frequency: 0,
    period: 0,
    amplitude: 0,
    angularVelocity: 0,
    gravity: 9.81,
    mass: 10,
    tension: 0,
    instantVelocity: 0,
    pendulumIsRunning: false,
  });

  const updatePendulumValue = (pendulumValue) => {
    console.log("pendulumValue", pendulumValue);
    setPendulumValue(pendulumValue);
  };

  useEffect(() => {
    document.title = "Physic Project";
    document.documentElement.setAttribute("data-theme", "emerald");
  }, []);

  return (
    <React.Fragment>
      <HeaderComponent className="header" />
      <PendulumContext.Provider value={{ pendulumValue, updatePendulumValue }}>
        <main className="mx-3">
          <div className="flex w-full">
            <ControlsComponent />
            <PendulumComponent />
            <ResultComponent />
          </div>
        </main>
      </PendulumContext.Provider>
      <FooterComponent className="header" />
    </React.Fragment>
  );
}

export default App;
