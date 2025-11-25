let contenedor_productos = document.getElementById("contenedor_productos");
let altaProductsForm = document.getElementById("altaProducs-form");
let url = "http://localhost:3000/api/products";
altaProductsForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  let formData = new FormData(event.target);
  let data = Object.fromEntries(formData.entries());

  try {
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      let resultado = await response.json();
      console.log("Producto creado:", resultado);
    }
  } catch (error) {
    console.error("Error al crear el producto:", error);
  }
});
