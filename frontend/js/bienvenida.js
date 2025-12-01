
/* ========= Elementos del DOM ========= */
const formNombre = document.getElementById("form-nombre");
const inputNombre = document.getElementById("input-nombre");

// escuchar el boton ingresar
formNombre.addEventListener("submit", function (event) {
  event.preventDefault(); //hace que el formulario no recargue la pagina sin esto no funciona!!!
  const nombreUsuario = inputNombre.value.trim(); // agarramos el nombre y le quitamos los espacios
  if (nombreUsuario === "") {
    alert("Por favor, ingresa un nombre válido.");
  }
  localStorage.setItem("nombreUsuario", nombreUsuario); // Guardamos el nombre en localstorage

  window.location.href = "../vistas/index.html"; // Nos lleva a la pagina principal
});


