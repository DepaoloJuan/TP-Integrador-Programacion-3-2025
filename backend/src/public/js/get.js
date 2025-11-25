let getProduct_form = document.getElementById("getproduct-form");
let listaProductos = document.getElementById("lista_productos");
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

    let htmlProducto = `<li>
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <p>Id: ${producto.id} / Nombre: ${producto.nombre} / Precio: $${producto.precio} / Descripción: ${producto.descripcion}</p>
                </li>`;

    console.log(htmlProducto);
    listaProductos.innerHTML = htmlProducto;
  } catch (error) {
    console.error("Error al consultar el producto:", error);
  }
});

function mostrarProducto(producto) {
  let htmlProducto = `<li>
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <p>Id: ${producto.id} / Nombre: ${producto.nombre} / Precio: $${producto.precio} / Descripción: ${producto.descripcion}</p>
                </li>`;
  listaProductos.innerHTML = htmlProducto;
}

//hacer funcion mostrar productos, para despues agregar
//validacion  despues de let datos, if(respuesta.ok){} else{}
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
