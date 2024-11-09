<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Trail and Explosion</title>
<style>
  body {
    margin: 0;
    overflow: hidden;
    background-color: #f0f0f0;
  }
  canvas {
    display: block;
  }
</style>
</head>
<body>
<canvas id="myCanvas"></canvas>
<script>
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particles = [];

// Function to generate random colors
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Particle class
class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = 2; // Ajustando el tamaño de la partícula
    this.velocity = {
      x: (Math.random() - 0.5) * 5,
      y: (Math.random() - 0.5) * 5
    };
    this.alpha = 1;
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.restore();
  }

  update() {
    this.draw();
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.alpha -= 0.01;
  }
}

// Function to animate trail
function animateTrail(x, y) {
  const color = getRandomColor();
  for (let i = 0; i < 3; i++) { // Reduciendo el número de partículas a 3
    particles.push(new Particle(x, y, color));
  }
}

// Event listener for mousemove to create trail
canvas.addEventListener('mousemove', (e) => {
  animateTrail(e.clientX, e.clientY);
});

// Event listener for click to create explosion
canvas.addEventListener('click', (e) => {
  for (let i = 0; i < 100; i++) {
    particles.push(new Particle(e.clientX, e.clientY, getRandomColor()));
  }
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((particle, index) => {
    if (particle.alpha <= 0) {
      particles.splice(index, 1);
    } else {
      particle.update();
    }
  });
}

animate();
</script>
</body>
</html>
