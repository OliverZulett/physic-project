export default function drawPendulum(pendulumProps) {
  const { canvas, angle, ropeSize, sphereRadius } = pendulumProps;

  const ctx = canvas.getContext("2d");
  const H = canvas.height;
  const W = canvas.width;

  const h = W / 2;
  const k = 0;
  const r = ropeSize;

  const angleInDegrees = angle;
  const angleInRadians = (angleInDegrees * Math.PI) / 180;

  const x = h + r * Math.cos(angleInRadians);
  const y = k + r * Math.sin(angleInRadians);

  ctx.clearRect(0, 0, W, H);

  // draw Sphere
  ctx.fillStyle = "#000000";
  ctx.beginPath();
  ctx.arc(x, y, sphereRadius, 0, 2 * Math.PI);
  ctx.fill();

  // draw rope
  ctx.beginPath();
  ctx.moveTo(h, k);
  ctx.lineTo(x, y);
  ctx.stroke();
}
