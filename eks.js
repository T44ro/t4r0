alert("are you ready..")
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let colors = ["#FF0000", "#FFFF00", "#00FF00", "#00FFFF", "#0000FF", "#FF00FF", "#FFFFFF"];
let gravity = 0.1;
let fireworks = [];
let stars = [];

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function drawFirework(firework) {
  let x = firework.x;
  let y = firework.y;
  let vx = firework.vx;
  let vy = firework.vy;
  let color = firework.color;
  let radius = firework.radius;
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
  firework.x += vx;
  firework.y += vy;
  firework.vy += gravity;
  firework.radius -= 0.02;
  return firework.radius > 0;
}

function drawStar(star) {
  let x = star.x;
  let y = star.y;
  let vx = star.vx;
  let vy = star.vy;
  let color = star.color;
  let radius = star.radius;
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.moveTo(x, y - radius);
  for (let i = 0; i < 5; i++) {
    ctx.lineTo(
      Math.cos(((18 + i * 72) / 180) * Math.PI) * radius + x,
      -Math.sin(((18 + i * 72) / 180) * Math.PI) * radius + y
    );
    ctx.lineTo(
      Math.cos(((54 + i * 72) / 180) * Math.PI) * (radius / 2) + x,
      -Math.sin(((54 + i * 72) / 180) * Math.PI) * (radius / 2) + y
    );
  }
  ctx.closePath();
  ctx.fill();
  star.x += vx;
  star.y += vy;
  return star.x > 0 && star.x < canvas.width && star.y > 0 && star.y < canvas.height;
}

function drawBackground() {
  ctx.fillStyle = "gradien";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawText() {
  ctx.font = "100px Creative";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("ANJAY.. 2024", canvas.width / 2, canvas.height / 2);
}

function drawAnimation() {
  drawBackground();
  drawText();
  fireworks = fireworks.filter(drawFirework);
  stars = stars.filter(drawStar);
  if (Math.random() < 0.1) {
    let firework = {
      x: random(0, canvas.width),
      y: canvas.height,
      vx: random(-2, 2),
      vy: random(-10, -5),
      color: colors[Math.floor(random(0, colors.length))],
      radius: random(2, 4),
    };
    fireworks.push(firework);
  }
  if (Math.random() < 0.05) {
    let star = {
      x: random(0, canvas.width),
      y: 0,
      vx: random(-1, 1),
      vy: random(1, 3),
      color: colors[Math.floor(random(0, colors.length))],
      radius: random(5, 10),
    };
    stars.push(star);
  }
  setTimeout(drawAnimation, 10);
}
drawAnimation();
