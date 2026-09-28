const CONFIG = {
  CHECKOUT_URL: "",
  PRODUCT_NAME: "Stalkea",
  PRICE: "",
  ORIGINAL_PRICE: "",
  DISCOUNT: "",
  MAIN_IMAGES: ["assets/logo-vert-transparente.png"],
  VIDEOS: [],
  PRIMARY_COLOR: "#4a37b6",
  SECONDARY_COLOR: "#ab58f4",
};

const canvas = document.querySelector("#matrix-canvas");
const ctx = canvas.getContext("2d");
const chars = "01·+×✦";
let animationFrame;
let columns = [];

function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(window.innerWidth * dpr);
  canvas.height = Math.floor(window.innerHeight * dpr);
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  columns = Array.from({ length: Math.ceil(window.innerWidth / 25) }, (_, index) => ({
    x: index * 25,
    y: Math.random() * window.innerHeight,
    speed: 0.25 + Math.random() * 0.55,
    size: 10 + Math.random() * 5,
  }));
}

function drawParticles() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  ctx.fillStyle = "rgba(74, 55, 182, 0.72)";
  columns.forEach((column) => {
    const char = chars[Math.floor(Math.random() * chars.length)];
    ctx.font = `${column.size}px Inter, sans-serif`;
    ctx.fillText(char, column.x, column.y);
    column.y += column.speed;
    if (column.y > window.innerHeight + 24) column.y = -10;
  });
  animationFrame = requestAnimationFrame(drawParticles);
}

function localizedWeekday() {
  return new Intl.DateTimeFormat("es-LA", { weekday: "long" }).format(new Date());
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2600);
}

function goToCheckout() {
  if (CONFIG.CHECKOUT_URL) {
    window.location.assign(CONFIG.CHECKOUT_URL);
    return;
  }
  showToast("El enlace de acceso todavía no está configurado.");
}

document.querySelector("#weekday").textContent = localizedWeekday();
document.querySelector("#primary-cta").addEventListener("click", goToCheckout);
window.addEventListener("resize", resizeCanvas, { passive: true });
resizeCanvas();
drawParticles();
window.addEventListener("beforeunload", () => cancelAnimationFrame(animationFrame));
