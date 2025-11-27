/* ==========================================================
   CARRITO unificado (dropdown index + vista carrito)
   - Soporta dos juegos de IDs (index y carrito/ticket)
   - Agregar / sumar / restar / vaciar
   - Total y contador dinámicos
   - Persiste en localStorage
========================================================== */

/* -------------------------
   Elementos del DOM (tolerante)
------------------------- */
const cajaCarrito =
  document.getElementById("contenedor-carrito") || // index (dropdown)
  document.getElementById("lista-carrito"); // carrito/ticket

const totalSpan =
  document.getElementById("total-carrito") || // index (dropdown)
  document.getElementById("total"); // carrito/ticket

const btnVaciarCarrito2 =
  document.getElementById("vaciar-carrito") || // index (dropdown)
  document.getElementById("btn-vaciar"); // vista vieja

const botonVolver = document.getElementById("volver"); // solo en carrito.html
const contadorHeader = document.getElementById("carrito-cantidad"); // botón header
const botonConfirmar = document.getElementById('confirmar-compra');

/* -------------------------
   Estado
------------------------- */
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

/* ----------------------------------------------------------
   guardar()
   - Persistir en localStorage
----------------------------------------------------------- */
function guardar() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

/* ----------------------------------------------------------
   mostrar()
   - Renderiza items, total y contador
----------------------------------------------------------- */
function mostrar() {
  //if (!cajaCarrito || !totalSpan) return;

  if (carrito.length === 0) {
    cajaCarrito.innerHTML = "<p>El carrito está vacío 🛒</p>";
    totalSpan.textContent = "0";
    if (contadorHeader) contadorHeader.textContent = "0";
    return;
  }

  let total = 0;
  let cantTotal = 0;
  let html = "";

  carrito.forEach((item) => {
    const subtotal = Number(item.precio) * Number(item.cant);
    total += subtotal;
    cantTotal += Number(item.cant);

    html += `
      <div class="item-carrito">
        <img src="${item.imagen || item.ruta_img}" alt="${
      item.nombre
    }" class="img-mini" />
        <div class="info-item">
          <p>${item.nombre}</p>
          <p>$${item.precio}</p>
          <div class="controles">
            <button class="menos" data-id="${item.id}">-</button>
            <span>${item.cant}</span>
            <button class="mas" data-id="${item.id}">+</button>
          </div>
        </div>
      </div>
    `;
  });

  cajaCarrito.innerHTML = html;
  totalSpan.textContent = total;
  if (contadorHeader) contadorHeader.textContent = cantTotal;
}

/* ----------------------------------------------------------
   sumar(id) / restar(id) / vaciar()
----------------------------------------------------------- */
function sumar(id) {
  const x = carrito.find((i) => String(i.id) === String(id));
  if (x) {
    x.cant += 1;
    guardar();
    mostrar();
  }
}

function restar(id) {
  const idx = carrito.findIndex((i) => String(i.id) === String(id));
  if (idx !== -1) {
    if (carrito[idx].cant > 1) {
      carrito[idx].cant -= 1;
    } else {
      carrito.splice(idx, 1);
    }
    guardar();
    mostrar();
  }
}

function vaciar() {
  carrito = [];
  guardar();
  mostrar();
}

/* ----------------------------------------------------------
   agregarDesdeIndex(id)
   - Toma datos desde la card en index (btn-agregar)
----------------------------------------------------------- */
function agregarDesdeIndex(id) {
  // card del producto (toma nombre, tipo, precio, imagen)
  const btn = document.querySelector(`button.btn-agregar[data-id="${id}"]`);
  if (!btn) return;

  const card = btn.closest(".card-producto");
  const nombre = card.querySelector("h3")?.textContent?.trim() || "";
  const precio = Number(
    (card.querySelector(".precio")?.textContent || "").replace(/[^0-9]/g, "")
  );
  const img = card.querySelector("img")?.getAttribute("src") || "";

  // si ya existe, sumar; si no, push
  const existe = carrito.find((i) => String(i.id) === String(id));
  if (existe) {
    existe.cant += 1;
  } else {
    carrito.push({
      id,
      nombre,
      precio,
      imagen: img,
      cant: 1,
      subtotal: precio,
    });
  }

  guardar();
  mostrar();
}

/* ==========================================================
   EVENTOS
========================================================== */

// Clicks globales (delegación)
document.addEventListener("click", (e) => {
  const t = e.target;

  // Desde cards (index): Agregar
  if (t.classList.contains("btn-agregar")) {
    const id = t.getAttribute("data-id");
    agregarDesdeIndex(id);
  }

  // Controles dentro del carrito
  if (t.classList.contains("mas")) {
    const id = t.getAttribute("data-id");
    sumar(id);
  }

  if (t.classList.contains("menos")) {
    const id = t.getAttribute("data-id");
    restar(id);
  }
});


// VACIAR
if (btnVaciarCarrito2) { 
  btnVaciarCarrito2.addEventListener("click", vaciar);
}

// VOLVER
if (botonVolver) {
    botonVolver.addEventListener('click', () => {
        // Redirige al hacer clic a 'index.html'
        window.location.href = 'index.html';
    });
}

// CONFIRMAR COMPRA
if (botonConfirmar) {
    botonConfirmar.addEventListener('click', () => {
        // Redirige al hacer clic a 'ticket.html'
        window.location.href = 'ticket.html';
    });
}

/* ==========================================================
   INIT
========================================================== */
mostrar();





