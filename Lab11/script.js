const screens = [
  {
    step: "Inicio",
    title: "A donde quieres ir?",
    body: "Mantenga presionado el boton y diga su destino.",
    status: "Microfono listo",
    action: "Hablar destino",
    signals: ["Voz", "Alto contraste", "Destino"],
  },
  {
    step: "Ruta",
    title: "Camina 80 metros",
    body: "Sigue recto hasta la parada El Roble. La app vibrara al acercarte.",
    status: "Parada segura detectada",
    action: "Escuchar guia",
    signals: ["Audio", "Vibracion", "80 m"],
  },
  {
    step: "Parada",
    title: "Bus 210 llega en 4 min",
    body: "Espera junto al poste principal. El conductor recibio aviso de asistencia.",
    status: "Transporte confirmado",
    action: "Confirmar que estoy en parada",
    signals: ["Bus 210", "4 min", "Conductor"],
    warn: true,
  },
  {
    step: "Abordaje",
    title: "Este es tu bus",
    body: "Placa C-482B. Sube por la puerta delantera. El conductor te espera.",
    status: "Vibracion fuerte activa",
    action: "Ya subi",
    signals: ["Placa", "Puerta", "Ayuda"],
  },
  {
    step: "Viaje",
    title: "Faltan 2 paradas",
    body: "La app avisara antes de bajar. Permanece cerca de la puerta.",
    status: "Seguimiento activo",
    action: "Repetir indicacion",
    signals: ["2 paradas", "Audio", "Mapa"],
  },
  {
    step: "Destino",
    title: "Llegaste a Clinica Zona 10",
    body: "La entrada esta a 12 metros a la derecha. Puedes guardar esta ruta.",
    status: "Viaje terminado",
    action: "Guardar ruta",
    signals: ["Llegada", "12 m", "Guardar"],
  },
];

const screen = document.querySelector("#app-screen");
const nextBtn = document.querySelector("#next-btn");
const backBtn = document.querySelector("#back-btn");
const voiceBtn = document.querySelector("#voice-btn");

let index = 0;

function renderScreen() {
  const item = screens[index];
  screen.innerHTML = `
    <div class="screen-top">
      <span>${item.step}</span>
      <span>${index + 1}/${screens.length}</span>
    </div>
    <h3 class="app-title">${item.title}</h3>
    <p>${item.body}</p>
    <div class="status-box">
      <p class="eyebrow">Estado</p>
      <strong>${item.status}</strong>
    </div>
    <button class="primary-action" type="button">${item.action}</button>
    <div class="signal-row">
      ${item.signals
        .map((signal, signalIndex) => {
          const tone = signalIndex === 0 ? "good" : item.warn && signalIndex === 1 ? "warn" : "";
          return `<div class="signal ${tone}">${signal}</div>`;
        })
        .join("")}
    </div>
  `;

  backBtn.disabled = index === 0;
  nextBtn.textContent = index === screens.length - 1 ? "Reiniciar" : "Siguiente";
}

nextBtn.addEventListener("click", () => {
  index = index === screens.length - 1 ? 0 : index + 1;
  renderScreen();
});

backBtn.addEventListener("click", () => {
  index = Math.max(0, index - 1);
  renderScreen();
});

voiceBtn.addEventListener("click", () => {
  const item = screens[index];
  screen.querySelector(".status-box strong").textContent = `Audio: ${item.body}`;
});

renderScreen();
