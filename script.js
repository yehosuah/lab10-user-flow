const flows = {
  order: {
    title: "Pedido completo",
    summary: "Desde abrir la app hasta confirmar una entrega programada.",
    goal: "Enviar una orden de supermercado sin friccion.",
    success: "Orden confirmada con tienda, productos, pago y horario.",
    risk: "Abandono si costos o disponibilidad aparecen tarde.",
    nodes: [
      node("o1", "Inicio", "Abrir app", "Usuario", "start", 1, 1, "El usuario entra con intencion clara: comprar comida para entrega.", "Mostrar direccion guardada y acceso rapido a tiendas cercanas."),
      node("o2", "Pantalla", "Confirmar direccion", "App", "screen", 2, 2, "La app pregunta o confirma donde sera la entrega.", "Si no hay direccion, pedirla antes de mostrar tiendas."),
      node("o3", "Sistema", "Buscar tiendas cercanas", "Sistema", "system", 3, 3, "La app filtra tiendas por cobertura, horario y disponibilidad.", "No mostrar tiendas que no puedan entregar a esa direccion."),
      node("o4", "Decision", "Elegir tienda", "Usuario", "decision", 1, 4, "El usuario compara tienda por distancia, costo y tiempo estimado.", "Mostrar tarifa y ETA desde esta decision, no al final."),
      node("o5", "Pantalla", "Explorar productos", "App", "screen", 2, 5, "Categorias, busqueda y productos populares ayudan a empezar rapido.", "Usar filtros por frescura, ofertas y productos frecuentes."),
      node("o6", "Decision", "Agregar al carrito", "Usuario", "decision", 1, 6, "El usuario agrega cantidades y posibles reemplazos.", "Cada item debe permitir reemplazo aceptado, no reemplazar o llamar."),
      node("o7", "Sistema", "Validar inventario", "Sistema", "system", 3, 7, "El sistema revisa productos agotados o cantidades no disponibles.", "Si algo falla, regresar al carrito con alternativas concretas."),
      node("o8", "Pantalla", "Revisar carrito", "App", "screen", 2, 8, "Resumen de productos, cargos, reemplazos y subtotal.", "Boton de checkout solo cuando el carrito cumple minimo de compra."),
      node("o9", "Decision", "Proceder a checkout", "Usuario", "decision", 1, 9, "El usuario acepta el resumen y avanza.", "Mantener opcion de editar sin perder carrito."),
      node("o10", "Pantalla", "Elegir horario", "App", "screen", 2, 10, "La app muestra ventanas disponibles para hoy o programadas.", "Ordenar por pronto, barato y programado."),
      node("o11", "Pantalla", "Seleccionar pago", "App", "screen", 2, 11, "El usuario elige metodo guardado o agrega uno nuevo.", "Enlaza con flujo extra de agregar pago."),
      node("o12", "Decision", "Confirmar pedido", "Usuario", "decision", 1, 12, "El usuario revisa total final, horario y tienda.", "Ultima pantalla debe explicar autorizacion de tarjeta y cambios por reemplazos."),
      node("o13", "Sistema", "Crear orden", "Sistema", "system", 3, 13, "El sistema reserva pedido, cobra o preautoriza y avisa a la tienda.", "Mostrar estado si pago falla o inventario cambia."),
      node("o14", "Fin", "Orden confirmada", "App", "end", 2, 14, "Confirmacion con tracking y opcion de modificar antes del picking.", "Dar numero de orden, ETA y contacto de soporte."),
    ],
  },
  payment: {
    title: "Agregar pago",
    summary: "Flujo extra para registrar una tarjeta durante checkout.",
    goal: "Agregar metodo de pago sin romper el pedido activo.",
    success: "Metodo guardado y seleccionado para la orden.",
    risk: "Errores de validacion pueden hacer perder confianza cerca del pago.",
    nodes: [
      node("p1", "Inicio", "Checkout sin pago valido", "App", "start", 2, 1, "El usuario llega a checkout y no tiene metodo disponible.", "No bloquear: explicar que necesita un metodo para confirmar."),
      node("p2", "Decision", "Agregar nuevo metodo", "Usuario", "decision", 1, 2, "El usuario decide registrar una tarjeta.", "Mantener visible el total para que sepa por que agrega pago."),
      node("p3", "Pantalla", "Formulario seguro", "App", "screen", 2, 3, "Campos de tarjeta, nombre, vencimiento, CVV y direccion de facturacion.", "Autocompletar direccion si coincide con entrega."),
      node("p4", "Sistema", "Validar tarjeta", "Sistema", "system", 3, 4, "Validacion de formato, banco y tokenizacion.", "Nunca guardar datos sensibles sin tokenizacion."),
      node("p5", "Decision", "Validacion correcta", "Sistema", "decision", 3, 5, "Si falla, se informa el campo exacto; si pasa, se guarda token.", "Error debe ser recuperable sin borrar campos."),
      node("p6", "Pantalla", "Metodo seleccionado", "App", "screen", 2, 6, "La tarjeta aparece como metodo activo del checkout.", "Mostrar ultimos 4 digitos y marca."),
      node("p7", "Fin", "Volver a confirmar pedido", "Usuario", "end", 1, 7, "El usuario regresa al resumen final para confirmar.", "No reiniciar horario ni carrito."),
    ],
  },
  reorder: {
    title: "Reordenar",
    summary: "Flujo extra para repetir una compra anterior.",
    goal: "Convertir una orden pasada en carrito editable.",
    success: "Carrito creado desde historial y listo para checkout.",
    risk: "Productos agotados o precios nuevos pueden sorprender al usuario.",
    nodes: [
      node("r1", "Inicio", "Abrir historial", "Usuario", "start", 1, 1, "El usuario entra a pedidos anteriores.", "Mostrar fecha, tienda, total y estado de cada pedido."),
      node("r2", "Decision", "Elegir orden pasada", "Usuario", "decision", 1, 2, "Selecciona una orden que quiere repetir.", "Ordenar por recientes y permitir buscar tienda/producto."),
      node("r3", "Sistema", "Revisar disponibilidad", "Sistema", "system", 3, 3, "La app compara productos anteriores con inventario actual.", "Detectar agotados, cambios de precio y tienda cerrada."),
      node("r4", "Pantalla", "Carrito reconstruido", "App", "screen", 2, 4, "Los productos disponibles aparecen en un carrito editable.", "Separar productos no disponibles en una seccion clara."),
      node("r5", "Decision", "Aceptar reemplazos", "Usuario", "decision", 1, 5, "El usuario decide reemplazos o elimina productos.", "Sugerir equivalentes por marca, precio y tamano."),
      node("r6", "Pantalla", "Revisar total actualizado", "App", "screen", 2, 6, "Se muestra el nuevo total y diferencias contra la orden original.", "Marcar cambios con lenguaje directo."),
      node("r7", "Fin", "Ir a checkout", "Usuario", "end", 1, 7, "El flujo entra al checkout normal.", "Reutiliza horario, pago y confirmacion del pedido completo."),
    ],
  },
};

function node(id, type, title, owner, kind, col, row, description, note) {
  return { id, type, title, owner, kind, col, row, description, note };
}

const board = document.querySelector("#flow-board");
const tabs = document.querySelectorAll(".tab");
const flowTitle = document.querySelector("#flow-title");
const flowSummary = document.querySelector("#flow-summary");
const flowGoal = document.querySelector("#flow-goal");
const flowSuccess = document.querySelector("#flow-success");
const flowRisk = document.querySelector("#flow-risk");
const nodeTitle = document.querySelector("#node-title");
const nodeDescription = document.querySelector("#node-description");
const nodeType = document.querySelector("#node-type");
const nodeOwner = document.querySelector("#node-owner");
const nodeNote = document.querySelector("#node-note");

let activeFlow = "order";
let activeNodeId = flows.order.nodes[0].id;

function renderFlow(flowKey) {
  activeFlow = flowKey;
  const flow = flows[flowKey];
  activeNodeId = flow.nodes[0].id;

  flowTitle.textContent = flow.title;
  flowSummary.textContent = flow.summary;
  flowGoal.textContent = flow.goal;
  flowSuccess.textContent = flow.success;
  flowRisk.textContent = flow.risk;

  tabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.flow === flowKey);
  });

  board.innerHTML = "";
  const rows = Math.max(...flow.nodes.map((item) => item.row));
  board.style.gridTemplateRows = `repeat(${rows}, 94px)`;

  flow.nodes.forEach((item, index) => {
    const button = document.createElement("button");
    button.className = `node ${item.kind}`;
    button.dataset.nodeId = item.id;
    button.style.gridColumn = item.col;
    button.style.gridRow = item.row;
    button.innerHTML = `<small>${item.type}</small><strong>${item.title}</strong>`;
    button.addEventListener("click", () => selectNode(item.id));
    board.appendChild(button);
  });

  selectNode(activeNodeId);
  requestAnimationFrame(() => renderConnectors(flow.nodes));
}

function renderConnectors(items) {
  const existing = board.querySelector(".flow-lines");
  if (existing) {
    existing.remove();
  }

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.classList.add("flow-lines");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("width", board.scrollWidth);
  svg.setAttribute("height", board.scrollHeight);
  svg.setAttribute("viewBox", `0 0 ${board.scrollWidth} ${board.scrollHeight}`);
  svg.innerHTML = `
    <defs>
      <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
        <path d="M0,0 L8,4 L0,8 Z" fill="rgba(23, 32, 27, 0.42)"></path>
      </marker>
    </defs>
  `;

  for (let index = 1; index < items.length; index += 1) {
    const fromButton = board.querySelector(`[data-node-id="${items[index - 1].id}"]`);
    const toButton = board.querySelector(`[data-node-id="${items[index].id}"]`);
    const from = centerOf(fromButton);
    const to = centerOf(toButton);
    const line = document.createElementNS("http://www.w3.org/2000/svg", "path");
    const midY = (from.y + to.y) / 2;
    line.classList.add("connector");
    line.setAttribute("d", `M ${from.x} ${from.y} C ${from.x} ${midY}, ${to.x} ${midY}, ${to.x} ${to.y}`);
    svg.appendChild(line);
  }

  board.prepend(svg);
}

function centerOf(element) {
  return {
    x: element.offsetLeft + element.offsetWidth / 2,
    y: element.offsetTop + element.offsetHeight / 2,
  };
}

function selectNode(nodeId) {
  activeNodeId = nodeId;
  const item = flows[activeFlow].nodes.find((candidate) => candidate.id === nodeId);

  document.querySelectorAll(".node").forEach((button) => {
    button.classList.toggle("active", button.dataset.nodeId === nodeId);
  });

  nodeTitle.textContent = item.title;
  nodeDescription.textContent = item.description;
  nodeType.textContent = item.type;
  nodeOwner.textContent = item.owner;
  nodeNote.textContent = item.note;
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => renderFlow(tab.dataset.flow));
});

window.addEventListener("resize", () => renderConnectors(flows[activeFlow].nodes));

renderFlow(activeFlow);
