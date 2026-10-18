// Registro de juegos: cada id corresponde a la carpeta games/<id>/
// Pon available: true cuando el juego esté listo para activarlo en el menú.
window.GAMES = [
  { id: "sonidos", name: "Sonidos", icon: "🔊", color: "#e4572e", desc: "Escucha y repite sonidos.", available: false },
  { id: "palabras", name: "Palabras", icon: "🖼️", color: "#2e86ab", desc: "Une cada imagen con su palabra.", available: false },
  { id: "silabas", name: "Sílabas", icon: "🧩", color: "#76b041", desc: "Une las sílabas para nombrar al animal.", available: true },
  { id: "soplo", name: "Soplo y respiración", icon: "🎈", color: "#9b5de5", desc: "Ejercicios de soplo.", available: false },
  { id: "memoria", name: "Memoria", icon: "🃏", color: "#f29e4c", desc: "Encuentra las parejas.", available: false },
  { id: "frases", name: "Frases", icon: "💬", color: "#d6336c", desc: "Ordena y construye frases.", available: false },
  { id: "cazamoscas", name: "Cazamoscas", icon: "🪰", color: "#0b7285", desc: "Caza la mosca con la letra correcta.", available: true },
];
