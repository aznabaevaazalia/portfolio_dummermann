// Анимированные линии (SVG) и точки (canvas) на фоне
document.addEventListener('DOMContentLoaded', function() {
  // --- Анимация линий ---
  const svg = document.getElementById('bg-lines');
  function drawLines() {
    svg.innerHTML = '';
    const w = window.innerWidth;
    const h = window.innerHeight;
    svg.setAttribute('width', w);
    svg.setAttribute('height', h);

    // Диагональные линии
    for (let i = 0; i < 8; i++) {
      const color = i % 2 === 0 ? '#00ffff88' : '#ff00ff88';
      const offset = i * 120 + (Date.now() / 15) % 120;
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', 0);
      line.setAttribute('y1', offset);
      line.setAttribute('x2', w);
      line.setAttribute('y2', offset + 100);
      line.setAttribute('stroke', color);
      line.setAttribute('stroke-width', '2');
      svg.appendChild(line);
    }
  }
  setInterval(drawLines, 40);
  window.addEventListener('resize', drawLines);
  drawLines();

  // --- Анимация точек ---
  const canvas = document.getElementById('bg-dots');
  const ctx = canvas.getContext('2d');
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  let dots = [];
  for (let i = 0; i < 60; i++) {
    dots.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: 2 + Math.random() * 3,
      dx: -0.5 + Math.random(),
      dy: -0.5 + Math.random(),
      color: Math.random() > 0.5 ? '#00ffff' : '#ff00ff'
    });
  }
  function animateDots() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dots.forEach(dot => {
      dot.x += dot.dx;
      dot.y += dot.dy;
      if (dot.x < 0 || dot.x > canvas.width) dot.dx *= -1;
      if (dot.y < 0 || dot.y > canvas.height) dot.dy *= -1;
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
      ctx.fillStyle = dot.color;
      ctx.shadowColor = dot.color;
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;
    });
    requestAnimationFrame(animateDots);
  }
  animateDots();

  // --- Интерактивные кнопки хобби ---
  const profilePhoto = document.getElementById('profilePhoto');
  const title = document.querySelector('.title');
  const container = document.querySelector('.container');
  document.getElementById('basketballBtn').addEventListener('click', function() {
    this.classList.add('active-basketball');
    setTimeout(() => {
      this.classList.remove('active-basketball');
    }, 500);
  });
  document.getElementById('museumBtn').addEventListener('click', function() {
    this.classList.add('active-museum');
    setTimeout(() => {
      this.classList.remove('active-museum');
    }, 500);
    profilePhoto.style.border = '6px solid gold';
    profilePhoto.style.boxShadow = '0 0 20px #9c27b0';
    setTimeout(() => {
      profilePhoto.style.border = '4px solid #00ffff';
      profilePhoto.style.boxShadow = 'none';
    }, 1000);
  });
  document.getElementById('fashionBtn').addEventListener('click', function() {
    const colors = ['#e91e63', '#9c27b0', '#00bcd4', '#ff5722', '#4caf50'];
    title.style.color = colors[Math.floor(Math.random() * colors.length)];
    title.style.textShadow = `4px 4px 0 ${colors[Math.floor(Math.random() * colors.length)]}`;
  });
  document.getElementById('seaBtn').addEventListener('click', function() {
    container.style.animation = 'none';
    void container.offsetWidth;
    container.style.animation = 'wave 0.5s ease-in-out';
  });
});
