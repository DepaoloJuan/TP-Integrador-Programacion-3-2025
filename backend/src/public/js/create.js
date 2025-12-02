let contenedor_productos = document.getElementById("contenedor_productos");
let altaProductsForm = document.getElementById("altaproducs-form");
let url = "http://localhost:3000";

altaProductsForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  let confirmar = confirm("¿Deseas crear este producto?");
  if (!confirmar) return; 

  let formData = new FormData(event.target);
  let data = Object.fromEntries(formData.entries());

  try {
    let response = await fetch(`${url}/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      let resultado = await response.json();
      console.log("Producto creado:", resultado);
      event.target.reset();
    }
  } catch (error) {
    console.error("Error al crear el producto:", error);
  }
});

// creacion de usuarios
let altaUsers_form = document.getElementById("alta-usuarios-form");

// ----------------------------------------------------
//ALTA DE USUARIOS (POST a /api/users)
// ----------------------------------------------------
altaUsers_form.addEventListener("submit", async (event) => {
  event.preventDefault(); // Evitamos el envio por defecto del formulario

  let formData = new FormData(event.target);

  let data = Object.fromEntries(formData.entries());

  try {
    let response = await fetch(`${url}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log(response);

      let result = await response.json();
      console.log(result);
      alert(result.message);
    }
  } catch (error) {
    // El catch solo captura errores de red
    console.error("Error al enviar los datos: ", error);
    alert("Error al procesar la solicitud");
  }
});
