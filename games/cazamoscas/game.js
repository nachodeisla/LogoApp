const FLIES = 8;
const ALPHABET = "abcdefghijklmnñopqrstuvwxyz".split("");

const root = document.getElementById("game-root");
let order = shuffle([...ANIMALS]).slice(0, ROUND_SIZE);
let index = 0;

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function speak(text) {
  if (!("speechSynthesis" in window)) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "es-ES";
  speechSynthesis.cancel();
  speechSynthesis.speak(u);
}

function round() {
  if (index >= order.length) return finish();
  const { img, syllables } = order[index];
  const word = syllables.join("");
  const target = word[0];
  const letters = [target, ...shuffle(ALPHABET.filter((l) => l !== target)).slice(0, FLIES - 1)];

  root.innerHTML = `
    <div class="fly-word-img" aria-hidden="true">${img}</div>
    <div class="fly-word"><span class="first">${target.toUpperCase()}</span>${word.slice(1)}</div>
    <p class="fly-hint">Caza la mosca con la letra <strong>${target.toUpperCase()}</strong></p>
    <div class="fly-arena"></div>
    <p class="fly-msg" aria-live="polite"></p>`;
  speak(word);

  const arena = root.querySelector(".fly-arena");
  const msg = root.querySelector(".fly-msg");
  const W = arena.clientWidth, H = arena.clientHeight, S = 84;
  // Posiciones fijas: una mosca por celda de una cuadrícula, con pequeño desplazamiento aleatorio
  const cols = 4, rows = Math.ceil(FLIES / cols);
  const cw = W / cols, ch = H / rows;
  shuffle(letters).forEach((l, i) => {
    const el = document.createElement("button");
    el.className = "fly";
    el.setAttribute("aria-label", `Mosca ${l}`);
    el.innerHTML = `🪰<span>${l.toUpperCase()}</span>`;
    const x = (i % cols) * cw + Math.random() * Math.max(cw - S, 0);
    const y = Math.floor(i / cols) * ch + Math.random() * Math.max(ch - S, 0);
    el.style.transform = `translate(${x}px, ${y}px)`;
    el.addEventListener("click", () => {
      if (el.classList.contains("hit")) return;
      if (l === target) {
        el.classList.add("hit");
        msg.className = "fly-msg good";
        msg.textContent = `¡Muy bien! ${word}`;
        showCongrats();
        index++;
        setTimeout(round, 1500);
      } else {
        el.classList.add("wrong");
        msg.className = "fly-msg bad";
        msg.textContent = `Esa es la ${l.toUpperCase()}. ¡Busca la ${target.toUpperCase()}!`;
      }
    });
    arena.appendChild(el);
  });
}

function finish() {
  root.innerHTML = `<div class="fly-word-img">🎉</div><p class="fly-msg good">¡Enhorabuena! Has cazado las moscas de los 7 animales</p>
    <button class="fly-again" id="again">Jugar otra vez</button>`;
  document.getElementById("again").addEventListener("click", () => {
    order = shuffle([...ANIMALS]).slice(0, ROUND_SIZE);
    index = 0;
    round();
  });
}

round();
