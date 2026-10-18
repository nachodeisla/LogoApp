const menu = document.getElementById("menu");

window.GAMES.forEach((g) => {
  const el = document.createElement(g.available ? "a" : "div");
  el.className = "card";
  el.innerHTML = `<span class="icon" aria-hidden="true">${g.icon}</span><span class="name">${g.name}</span>`;
  if (g.available) {
    el.href = `games/${g.id}/index.html`;
    el.style.background = g.color;
  } else {
    el.classList.add("disabled");
    el.setAttribute("aria-disabled", "true");
    el.innerHTML += `<span class="badge">Próximamente</span>`;
  }
  menu.appendChild(el);
});
