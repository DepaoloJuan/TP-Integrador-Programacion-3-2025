let getProduct_form = document.getElementById("getProduct-form");
let listaProductos = document.getElementById("lista-productos");
let contenedor_update = document.getElementById("contenedor-update");
let url = "http://localhost:3000/api/products";

// 1) Consultar producto por id
getProduct_form.addEventListener("submit", async (event) => {
  event.preventDefault();

  let formData = new FormData(event.target);
  let data = Object.fromEntries(formData.entries());
  let idProd = data.idProd;

  try {
    let respuesta = await fetch(`${url}/${idProd}`);
    let datos = await respuesta.json();

    let producto = datos.payload[0];
    mostrarProducto(producto);
  } catch (error) {
    console.error("Error al consultar el producto:", error);
  }
});

// 2) Mostrar producto + botón "Actualizar producto"
function mostrarProducto(producto) {
  let htmlProducto = `
                <li class="li-listados">
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                    <p>Id: ${producto.id} / Nombre: ${producto.nombre}</p>
                </li>
                <li class="li-botonera">
                    <input type="button" id="updateProduct_button" value="Actualizar producto">
                </li>
            `;

  listaProductos.innerHTML = htmlProducto;

  let updateProduct_button = document.getElementById("updateProduct_button");
  updateProduct_button.addEventListener("click", (event) => {
    formularioPutProducto(event, producto);
  });
}

// 3) Renderizar formulario de actualización (PUT)
function formularioPutProducto(event, producto) {
  event.stopPropagation();

  let updateForm_html = `
                <form id="updateProducts-form">

                    <input type="hidden" name="id" id="idProdHidden" value="${
                      producto.id
                    }">

                    <label for="nameProd">Nombre</label>
                    <input type="text" name="name" id="nameProd" value="${
                      producto.nombre
                    }" required>

                    <label for="imageProd">Url imagen</label>
                    <input type="text" name="image" id="imageProd" value="${
                      producto.imagen
                    }" required>

                    <label for="typeProd">Tipo</label>
                    <select name="type" id="typeProd" required>
                        <option value="Rock Nacional 70s" ${
                          producto.tipo === "Rock Nacional 70s"
                            ? "selected"
                            : ""
                        }>Rock Nacional 70s</option>
                        <option value="Rock Nacional" ${
                          producto.tipo === "Rock Nacional" ? "selected" : ""
                        }>Rock Nacional</option>
                        <option value="Pop" ${
                          producto.tipo === "Pop" ? "selected" : ""
                        }>Pop</option>
                        <option value="Metal" ${
                          producto.tipo === "Metal" ? "selected" : ""
                        }>Metal</option>
                        <option value="Punk" ${
                          producto.tipo === "Punk" ? "selected" : ""
                        }>Punk</option>

                    </select>

                    <label for="priceProd">Precio</label>
                    <input type="number" name="price" id="priceProd" value="${
                      producto.precio
                    }" required>

                    <label for="activeProd">Disponibilidad</label>
                    <select name="active" id="activeProd" required>
                        <option value="0" ${
                          producto.activo == 0 ? "selected" : ""
                        }>Inactivo</option>
                        <option value="1" ${
                          producto.activo == 1 ? "selected" : ""
                        }>Activo</option>
                    </select>

                    <br>
                    <input type="submit" value="Actualizar producto">
                </form>
             `;

  contenedor_update.innerHTML = updateForm_html;

  let updateProducts_form = document.getElementById("updateProducts-form");

  // 4) Enviar PUT al backend
  updateProducts_form.addEventListener("submit", async (event) => {
    event.preventDefault();

    let formData = new FormData(event.target);
    let data = Object.fromEntries(formData.entries());

    console.log("Datos a enviar en PUT:", data);

    try {
      let response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      let result = await response.json();
      console.log(result);

      if (response.ok) {
        alert(result.message);
        listaProductos.innerHTML = "";
        contenedor_update.innerHTML = "";
      } else {
        console.error("Error: ", result.message);
        alert(result.message);
      }
    } catch (error) {
      console.error("Error al enviar los datos: ", error);
      alert("Error al procesar la solicitud");
    }
  });
}
