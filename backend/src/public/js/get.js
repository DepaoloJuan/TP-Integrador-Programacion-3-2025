let getProduct_form = document.getElementById("getProduct-form");
let listaProductos = document.getElementById("contenedor-productos");
let url = "http://localhost:3000/api/products/";

getProduct_form.addEventListener("submit", async (event) => {
  event.preventDefault();
  let formData = new FormData(event.target);
  let data = Object.fromEntries(formData.entries());
  let idProd = data.idProd;

  try {
    let respuesta = await fetch(url + idProd);
    let datos = await respuesta.json();
    console.log(datos);

    let producto = datos.payload[0];

    mostrarProducto(producto);
    
  } catch (error) {
    mostrarError(error);
    console.error("Error al consultar el producto:", error);
  }
});

// Falta validacion  despues de let datos, if(respuesta.ok){} else{}

function mostrarProducto(producto) {
  let htmlProducto = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <p>
                  Id: ${producto.id} / Nombre: ${producto.nombre} / Precio: $${producto.precio} / Tipo: ${producto.tipo}
                </p>`;
  listaProductos.innerHTML = htmlProducto;
  console.log(htmlProducto);
}

function mostrarError(mensaje) {
  let htmlError = `
            <li class="mensaje-error"> 
                <p>
                    <strong>Error:</strong>
                    <span>${mensaje}</span>
                </p>
            </li>
            `;
}
