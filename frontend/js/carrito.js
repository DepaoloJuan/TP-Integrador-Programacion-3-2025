
/* ========= Elementos del DOM ========= */
const cajaCarrito = document.getElementById("lista-carrito"); // carrito
const botonVolver = document.getElementById("volver"); // Boton volver
const botonConfirmar = document.getElementById("confirmar-compra"); // Boton confirmar
const botonVaciar =  document.getElementById("vaciar-carrito") // Boton vaciar


/* ========= ESTADO ========= */
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


/* ========= GUARDAR LOCALSTORAGE ========= */
function guardar() {localStorage.setItem("carrito", JSON.stringify(carrito));}


/* ========= MOSTRAR =========*/
function mostrar() {

  if (carrito.length === 0) {
    cajaCarrito.innerHTML = `<<p id="carrito-vacio" >El carrito está vacío 🛒</p>`;
    totalSpan.textContent = "0";
    if (contadorHeader) contadorHeader.textContent = "0";
    return;
  }

  let cantTotal = 0;
  let total = 0;
  let html = "";

  carrito.forEach((item) => {
    console.log(item.precio);
    console.log(item.cant);
    const subtotal = Number(item.precio) * Number(item.cant);
    total += subtotal;
    console.log(total);
    
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
            <button onclick="restar(${item.id})" class="menos">-</button>
            <span>${item.cant}</span>
            <button onclick="sumar(${item.id})" class="mas">+</button>
          </div>
        </div>
      </div>
    `;
  });

  html += `<p id="total"> TOTAL : ${total}</p>`;

  cajaCarrito.innerHTML = html;
}

/* ----------------------------------------------------------
   sumar(id) / restar(id) / vaciar()
----------------------------------------------------------- */
function sumar(id) {
  const x = carrito.find((i) => String(i.id) === String(id));
  if (x) {
    x.cant = Number(x.cant) + 1;
    x.subtotal = Number(x.cant) * Number(x.precio);
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


/* =====================EVENTOS=========================*/

// VACIAR
if (botonVaciar) {
  botonVaciar.addEventListener("click", vaciar);
}

// VOLVER
if (botonVolver) {
  botonVolver.addEventListener("click", () => {
    // Redirige al hacer clic a 'index.html'
    window.location.href = "index.html";
  });
}

// CONFIRMAR COMPRA
/* ----------------------------------------------------------
   Cuando el usuario confirma la compra:
   - Calculamos el precio total y el listado de IDs de productos
   - Enviamos esos datos al backend (POST /api/tickets)
   - Si todo sale bien, redirigimos a ticket.html como siempre
----------------------------------------------------------- */
if (botonConfirmar) {
  botonConfirmar.addEventListener("click", async () => {
    try {
      // Nombre del usuario desde la pantalla bienvenida
      const nombreUsuario = localStorage.getItem("nombreUsuario") || "Cliente";

      let precioTotal = 0;
      let productosIds = [];

      // Recorremos el carrito para armar total y productos
      carrito.forEach((item) => {
        const precio = Number(item.precio) || 0;
        const cant = Number(item.cant) || 0;

        precioTotal += precio * cant;

        // Repetimos el id tantas veces como cantidad
        for (let i = 0; i < cant; i++) {
          productosIds.push(item.id);
        }
      });

      // Llamamos a la API de tickets en el backend
      const respuesta = await fetch("http://localhost:3000/api/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombreUsuario,
          precioTotal,
          productos: productosIds,
        }),
      });

      if (!respuesta.ok) {
        console.error("Error al guardar el ticket");
      } else {
        const data = await respuesta.json();
        console.log("Ticket guardado:", data);
      }

      // Redirigimos al ticket (funcionalidad original)
      window.location.href = "ticket.html";
    } catch (error) {
      console.error("Error en la confirmación de compra:", error);
      window.location.href = "ticket.html";
    }
  });
}

/* ===================INIT============================== */
mostrar();
