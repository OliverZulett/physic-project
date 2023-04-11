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
  ctx.strokeStyle = '#000000'
  ctx.moveTo(h, k);
  ctx.lineTo(x, y);
  ctx.stroke();

  ctx.strokeStyle = 'gray'

  // draw vertical line
  ctx.beginPath();
  ctx.moveTo(h, 0);
  ctx.lineTo(h, H);
  ctx.stroke();

  // draw angle
  ctx.beginPath();
  if (angleInDegrees > 90) {
    ctx.arc(h, 0, 70, Math.PI / 2, angleInRadians);
  } else {
    ctx.arc(h, 0, 70, angleInRadians, Math.PI / 2);
  }
  ctx.stroke();

  ctx.beginPath();
  ctx.font="20px Verdana";
  if (angleInDegrees > 90) {
    ctx.strokeText(`- ${angle - 90} º`,h - 35,35,30);
  } else {
    ctx.strokeText(`${90 - angle} º`,h + 10,35,30);
  }
}
