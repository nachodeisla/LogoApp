const DISTRACTORS = 6;

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
  const animal = order[index];
  const word = animal.syllables.join("");
  const mine = new Set(animal.syllables);
  const others = [...new Set(ANIMALS.flatMap((a) => a.syllables))].filter((s) => !mine.has(s));
  const pieces = shuffle([...animal.syllables, ...shuffle(others).slice(0, DISTRACTORS)]);
  let next = 0;

  root.innerHTML = `
    <div class="syl-progress">${index + 1} / ${order.length}</div>
    <div class="syl-image" role="img" aria-label="Animal">${animal.img}</div>
    <div class="syl-slots">${animal.syllables.map(() => `<span class="syl-slot"></span>`).join("")}</div>
    <p class="syl-msg" aria-live="polite"></p>
    <div class="syl-pieces"></div>`;

  const slots = root.querySelectorAll(".syl-slot");
  const msg = root.querySelector(".syl-msg");
  const box = root.querySelector(".syl-pieces");

  pieces.forEach((s) => {
    const b = document.createElement("button");
    b.className = "syl-piece";
    b.textContent = s;
    b.addEventListener("click", () => {
      if (b.disabled) return;
      if (s === animal.syllables[next]) {
        slots[next].textContent = s;
        slots[next].classList.add("ok");
        b.disabled = true;
        b.classList.remove("wrong");
        b.classList.add("used");
        box.querySelectorAll(".wrong").forEach((w) => w.classList.remove("wrong"));
        msg.className = "syl-msg";
        msg.textContent = "";
        next++;
        if (next === animal.syllables.length) {
          msg.textContent = `¡Muy bien! ${word}`;
          msg.className = "syl-msg good";
          showCongrats();
          speak(word);
          index++;
          setTimeout(round, 1600);
        }
      } else {
        b.classList.remove("wrong");
        void b.offsetWidth;
        b.classList.add("wrong");
        msg.className = "syl-msg bad";
        msg.textContent = "¡Ups! Esa no es. Prueba con otra.";
      }
    });
    box.appendChild(b);
  });
}

function finish() {
  root.innerHTML = `<div class="syl-image">🎉</div><p class="syl-msg good">¡Enhorabuena! Has completado los 7 animales</p>
    <button class="syl-piece" id="again">Jugar otra vez</button>`;
  document.getElementById("again").addEventListener("click", () => {
    order = shuffle([...ANIMALS]).slice(0, ROUND_SIZE);
    index = 0;
    round();
  });
}

round();
