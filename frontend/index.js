let contenedorProductos = document.getElementById("lista-productos");

async function obtenerProductos() {

  let url = "http://localhost:3000/products";

  try {
    let respuesta = await fetch(url); // Fetch hace una peticion a la url.
    let productos = await respuesta.json(); // Convertimos los datos de la url a .json.
    contenedorProductos.innerHTML = "";
    console.log(productos.payload);

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
            <img src="../assets/${producto.imagen}" alt="${producto.nombre}" />
            <h3>${producto.nombre}</h3>
            <p class="tipo">${producto.tipo}</p>
            <p class="precio">$${producto.precio}</p>
            </div>
        `;
  });
  contenedorProductos.innerHTML = htmlProductos;
}


function init() {
  obtenerProductos();
}

init(); // Inicia el js por init



