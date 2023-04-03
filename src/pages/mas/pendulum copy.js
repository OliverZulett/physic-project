let ctx = c.getContext("2d");
let h = c.getAttribute("width") / 2;
let l = 0.8 * c.getAttribute("height"); // 375 pixels = 0.357 m, aprox 1050 to 1
let radius = 17;
let shift = 10;
let persp = 1.8;
let dt = 10;
let i = 0;
let ang;
let str = "";
let cexp = 1;

function draw() {
  let angIni = (Math.PI / 20) * Number(document.getElementById("angIni").value);
  let nBolas = Number(document.getElementById("nBolas").value);
  let cycles = Number(document.getElementById("nCiclos").value);
  let acc = Number(document.getElementById("desacc").value);
  let numeros = document.getElementById("numeros");
  console.log(numeros.checked);

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
        (((cycles + k) / cycles) * Math.sqrt((3 / l) * 1050) * i * dt) / 1000
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
