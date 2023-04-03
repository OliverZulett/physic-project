const angIni =
(Math.PI / 20) * Number(document.getElementById("angIni").value);
const nBolas = Number(document.getElementById("nBolas").value);
const cycles = Number(document.getElementById("nCiclos").value);
const acc = Number(document.getElementById("desacc").value);
const numeros = document.getElementById("numeros").checked;

// Dibujar el rectángulo blanco
ctx.fillStyle = "white";
ctx.fillRect(0, 0, 2 * h, l / 0.8);

// Dibujar las bolas
for (let k = 0; k < nBolas; k++) {
// Calcular el ángulo
const exp = Math.exp((-i / 10000) * acc);
const ang =
  exp *
  angIni *
  Math.cos(
    (((cycles + k) / cycles) * Math.sqrt((3 / l) * 1050) * i * dt) / 1000
  );

// Calcular la posición central
const x = (l - k * shift * persp) * Math.sin(ang) + h;
const y = (l - k * shift * persp) * Math.cos(ang);

// Dibujar la bola
ctx.beginPath();
ctx.arc(x, y, radius - k / 3, 0, 2 * Math.PI);

if (k % 2 === 0) {
  const str = (k / 2 + "").repeat(6);
  ctx.fillStyle = "#" + str;
  ctx.strokeStyle = "#" + str;
} else {
  ctx.fillStyle = "#000";
  ctx.strokeStyle = "#000";
}

ctx.fill();

// Dibujar la línea
ctx.beginPath();
ctx.moveTo(h, 0);
ctx.lineTo(x, y);
ctx.stroke();

// Dibujar el número de la bola
if (numeros) {
  ctx.font = "13px Arial";
  ctx.fillStyle = "black";
  ctx.fillText(k + 1, x - radius / 3, y + radius / 3);
}
}

i++;