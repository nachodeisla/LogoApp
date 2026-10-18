// Cabecera común de las páginas de juego; la carpeta games/<id>/ identifica el juego.
const parts = location.pathname.split("/").filter(Boolean);
const gameId = decodeURIComponent(parts[parts.length - 2] || "");
window.CURRENT_GAME = window.GAMES.find((g) => g.id === gameId);

// Cartel verde por encima de todo al acertar.
window.showCongrats = function (ms = 1400) {
  const el = document.createElement("div");
  el.className = "congrats";
  el.setAttribute("role", "status");
  el.textContent = "¡Enhorabuena!";
  document.body.appendChild(el);
  setTimeout(() => el.remove(), ms);
};

if (window.CURRENT_GAME) {
  const g = window.CURRENT_GAME;
  document.title = `${g.name} · LogoApp`;
  document.getElementById("game-title").textContent = `${g.icon} ${g.name}`;
  document.getElementById("game-desc").textContent = g.desc;
}
