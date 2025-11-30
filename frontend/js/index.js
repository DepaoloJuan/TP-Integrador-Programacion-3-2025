let contenedorProductos = document.getElementById("lista-productos");
const carritoItems = document.getElementById("contenedor-carrito");
const carritoTotal = document.getElementById("total-carrito");
const botonVaciar = document.getElementById("vaciar-carrito");
const botonCarrito = document.getElementById("btn-carrito");
const panelCarrito = document.getElementById("panel-carrito");
const botonOrdenarNombre = document.getElementById("boton-ordenar-nombre");

let productosCopia = []; 

async function obtenerProductos() {
  let url = "http://localhost:3000/api/products";

  try {
    let respuesta = await fetch(url); // Fetch hace una peticion a la url.
    let productos = await respuesta.json(); // Convertimos los datos de la url a .json.
    contenedorProductos.innerHTML = "";
    console.log(productos.payload);

    productosCopia = productos.payload;
    mostrarProductos(productos.payload);
  } catch (error) {
    console.error("Error al obtener productos:", error); // Mostramos el error por consola.
  }
}

function mostrarProductos(productos) {
  let htmlProductos = "";
  productos.forEach((producto) => {
    htmlProductos += `
        <div class="card-producto">
            <img src="${producto.imagen}" alt="${producto.nombre}" />
            <h3>${producto.nombre}</h3>
            <p class="tipo">${producto.tipo}</p>
            <p class="precio">$${producto.precio} 
                <button class="btn-agregar" data-id="${producto.id}">Agregar</button>
            </p>
            </div>
        `;
  });
  contenedorProductos.innerHTML = htmlProductos;
}

/* ==========================================================
   CARRITO DESPLEGABLE (versión con nombres simples)
   - Permite abrir/cerrar el carrito desde el botón.
   - Se cierra al hacer click afuera o al presionar Esc.
========================================================== */

/* ----------------------------------------------------------
   2) accionCarrito(forzarCierre)
   - Si forzarCierre es true, siempre lo cierra.
   - Si es false o no se pasa, alterna (abre ↔ cierra).
----------------------------------------------------------- */
function accionCarrito(forzarCierre = false) {
  if (!panelCarrito || !botonCarrito) return; // evita errores si no existen

  const estaAbierto = !panelCarrito.classList.contains("oculto");

  if (forzarCierre || estaAbierto) {
    // Cierra el panel
    panelCarrito.classList.add("oculto");
    botonCarrito.setAttribute("aria-expanded", "false");
  } else {
    // Abre el panel
    panelCarrito.classList.remove("oculto");
    botonCarrito.setAttribute("aria-expanded", "true");
  }
}


/* ----------------------------------------------------------
   3) Escuchadores de eventos
----------------------------------------------------------- */
if (botonCarrito && panelCarrito) {
  // CLICK en el botón → abrir o cerrar
  botonCarrito.addEventListener("click", (evento) => {
    evento.stopPropagation(); // evita que el click se propague
    accionCarrito(); // alternar
  });


  // CLICK fuera del panel → cerrar
  document.addEventListener("click", (evento) => {
    const clickDentro = panelCarrito.contains(evento.target);
    const clickEnBoton = evento.target === botonCarrito;

    if (!clickDentro && !clickEnBoton) {
      accionCarrito(true); // forzar cierre
    }
  });


  // TECLA ESC → cerrar
  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape") {
      accionCarrito(true);
    }
  });
}

// funcion Principal
function init() {
  obtenerProductos();
}

init(); // Inicia el js por init



botonOrdenarNombre.addEventListener("click", () => {
  try{

    let ordenados = [...productosCopia];
    
    ordenados.sort((a, b) => a.nombre.localeCompare(b.nombre)); // Ordenamos de la A - Z
    mostrarProductos(ordenados); // Los mostramos

  }catch (error) {
    console.error("Error al ordenar los productos:", error); // Mostramos el error por consola.
  }
});
