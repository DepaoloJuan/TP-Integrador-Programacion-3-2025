// Elementos del DOM  obtener datos del formulario
const formNombre = document.getElementById("form-nombre");
const inputNombre = document.getElementById("input-nombre");

// escuchar el boton ingresar
formNombre.addEventListener("submit", function (event) {
  event.preventDefault(); //hace que el formulario no recargue la pagina sin esto no funciona!!!
  const nombreUsuario = inputNombre.value.trim(); // agarramos el nombre y le quitamos los espacios
  if (nombreUsuario === "") {
    alert("Por favor, ingresa un nombre válido.");
  }
  localStorage.setItem("nombreUsuario", nombreUsuario); // guardamos el nombre en localstorage

  window.location.href = "../vistas/index.html"; //nos lleva a la pagina principal
});
