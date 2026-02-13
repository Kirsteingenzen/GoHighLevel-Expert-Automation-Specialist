const themeToggle = document.getElementById('themeToggle');
const body = document.body;

const savedTheme = localStorage.getItem('theme') || 'dark';
body.setAttribute('data-theme', savedTheme);
themeToggle.textContent = savedTheme === 'dark' ? '☾' : '☀';

themeToggle.addEventListener('click', () => {
  const currentTheme = body.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  body.setAttribute('data-theme', newTheme);
  themeToggle.textContent = newTheme === 'dark' ? '☾' : '☀';
  localStorage.setItem('theme', newTheme);
});
/* ===== CURSOR GLOW + LASER TRAIL ===== */

// Create glow cursor
const glowCursor = document.createElement("div");
glowCursor.classList.add("cursor-glow");
document.body.appendChild(glowCursor);

let lastX = 0, lastY = 0;
let trailCooldown = 0;

document.addEventListener("mousemove", (e) => {
  const x = e.clientX;
  const y = e.clientY;

  // Move glow
  glowCursor.style.top = `${y}px`;
  glowCursor.style.left = `${x}px`;

  // Simple throttle for trail generation
  const dx = Math.abs(x - lastX);
  const dy = Math.abs(y - lastY);
  if (dx + dy > 6) {  // Only if movement is enough
    spawnTrail(x, y);
    lastX = x;
    lastY = y;
  }
});

function spawnTrail(x, y) {
  const trail = document.createElement("div");
  trail.classList.add("cursor-trail");
  trail.style.top = `${y}px`;
  trail.style.left = `${x}px`;
  document.body.appendChild(trail);
  setTimeout(() => trail.remove(), 650);
}
