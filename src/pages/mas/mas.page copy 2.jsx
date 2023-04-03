import { useEffect, useRef, useState } from "react";
// import './pendulum.js'

const MasPage = () => {
  const [nBolas, setNBolas] = useState(12);
  const [desacc, setDesacc] = useState(2);
  const [angIni, setAngIni] = useState(2);
  const [nCiclos, setNCiclos] = useState(12);
  const [numeros, setNumeros] = useState(false);

  const handleNBolasChange = (event) => {
    setNBolas(event.target.value);
  };

  const handleDesaccChange = (event) => {
    setDesacc(event.target.value);
  };

  const handleAngIniChange = (event) => {
    setAngIni(event.target.value);
  };

  const handleNCiclosChange = (event) => {
    setNCiclos(event.target.value);
  };

  const handleNumerosChange = (event) => {
    setNumeros(event.target.checked);
  };

  const canvasRef = useRef(null);

  function drawPendulum(pendulumProps) {
    let { canvas, nBolas, desacc, angIni, nCiclos, numeros } = pendulumProps;
    // const canvas = canvasRef.current;
    let ctx = canvas.getContext("2d");
    let h = canvas.getAttribute("width") / 2;
    let l = 0.8 * canvas.getAttribute("height"); // 375 pixels = 0.357 m, aprox 1050 to 1
    let radius = 17;
    let shift = 10;
    let persp = 1.8;
    let dt = 10;
    let i = 0;
    let ang;
    let str = "";
    let cexp = 1;
    angIni = (Math.PI / 20) * angIni;
    // let nBolas = nBolas;
    let cycles = nCiclos;
    let acc = desacc;
    // let numeros = numeros;

    function draw() {
      // draw white rectangle
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, 2 * h, l / 0.8);

      // draw the balls
      for (let k = 0; k < nBolas; k++) {
        //get the angle
        //ang = angIni * Math.cos(Math.sqrt(9.8 / (l-k*shift) * 1050)*i*dt/1000);
        ang =
          cexp *
          angIni *
          Math.cos(
            (((cycles + k) / cycles) * Math.sqrt((3 / l) * 1050) * i * dt) /
              1000
          );
        cexp = Math.exp((-i / 10000) * acc);
        // get the center position
        let x = (l - k * shift * persp) * Math.sin(ang) + h;
        let y = (l - k * shift * persp) * Math.cos(ang);
        ctx.beginPath();
        ctx.arc(x, y, radius - k / 3, 0, 2 * Math.PI);
        if (k % 2 == 0) {
          str = (k / 2 + "").repeat(6);
        }
        ctx.fillStyle = "#" + str;
        ctx.fill();
        // draw the line
        ctx.beginPath();
        ctx.moveTo(h, 0);
        ctx.lineTo(x, y);
        ctx.strokeStyle = "#" + str;
        ctx.stroke();
        // draw the ball number
        if (numeros.checked) {
          ctx.font = "13px Arial";
          ctx.fillStyle = "black";
          ctx.fillText(k + 1, x - radius / 3, y + radius / 3);
        }
      }
      i++;
    }
    setInterval(() => draw(pendulumProps), dt);
  }

  function handleClick() {
    const canvas = canvasRef.current;
    drawPendulum({ canvas, nBolas, desacc, angIni, nCiclos, numeros });
    // const ctx = canvas.getContext("2d");

    // draw(ctx);
  }

  function handleClearBtnClick() {
    // Aquí puedes poner el código que quieres ejecutar cuando se haga clic en el botón
    // por ejemplo, puedes limpiar el canvas usando clearRect:
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-12 col-sm-2">
          <button onClick={handleClick}>Dibujar</button>
          <button onClick={handleClearBtnClick}>Parar</button>
          <h3>Controles</h3>
          <br />
          <p>Bolitas</p>
          {/* 1 =====> 20 */}
          <input
            id="nBolas"
            type="range"
            min="1"
            max="20"
            value={nBolas}
            style={{ width: "100px" }}
            onChange={handleNBolasChange}
          />
          <br />
          <p>Desaceleracion</p>
          {/* 0 =====> 2 */}
          <input
            id="desacc"
            type="range"
            min="0"
            max="2"
            value={desacc}
            style={{ width: "100px" }}
            onChange={handleDesaccChange}
          />
          <br />
          <p>Angulo inicial</p>
          {/* 9 =====> 90 */}
          <input
            id="angIni"
            type="range"
            min="1"
            max="10"
            value={angIni}
            style={{ width: "100px" }}
            onChange={handleAngIniChange}
          />
          <br />
          <p>Ciclos</p>
          <input
            id="nCiclos"
            type="range"
            min="6"
            max="24"
            value={nCiclos}
            style={{ width: "100px" }}
            onChange={handleNCiclosChange}
          />
          <br />
          <p>Numeros?</p>
          <input
            id="numeros"
            type="checkbox"
            checked={numeros}
            onChange={handleNumerosChange}
          />
        </div>
        <div className="col-xs-12 col-sm-10">
          <canvas
            id="myCanvas"
            ref={canvasRef}
            width="1000"
            height="600"
            style={{ border: "1px solid" }}
          ></canvas>
        </div>
      </div>
    </div>
  );
};

export default MasPage;
