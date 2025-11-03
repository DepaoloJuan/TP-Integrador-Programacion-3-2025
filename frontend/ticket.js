const cantidadTexto = document.getElementById("cantidad");
const totalTexto = document.getElementById("total");
const fechaTexto = document.getElementById("fecha");
const btnVolver = document.getElementById("volver");
const productosCarrito = document.getElementById("productos");

// Leer el carrito desde localStorage
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];



function mostrarCarrito() {
    if (carrito.length === 0) {
        listaCarrito.innerHTML = "<p>El carrito está vacío 🛒</p>";
        totalTexto.textContent = 0;
        return;
    }

    let html = "";
    let total = 0;

    carrito.forEach(fruta => {
        html += `
            <div class="item-carrito">
                <p>${fruta.nombre}  -  ${fruta.cant}  -  $${fruta.subtotal}</p>
            </div>
        `;
        total += fruta.subtotal;
    });


    productosCarrito.innerHTML = html;
    totalTexto.textContent = total;
    
}


// Fecha actual (formato dd/mm/yyyy - hh:mm)
let fecha = new Date();
let fechaFormateada = fecha.toLocaleString('es-AR');
fechaTexto.textContent = fechaFormateada;

// Botón para volver a la tienda
btnVolver.addEventListener("click", () => {
    window.location.href = "carrito.html"; // cambia el nombre si tu archivo principal es otro
});


// 1. Obtener la referencia al elemento donde se mostrará el nombre
const elementoNombre = document.getElementById("nombre-usuario");

// 2. Obtener el nombre del usuario desde localStorage
const nombreGuardado = localStorage.getItem("nombreUsuario"); 


if (nombreGuardado) {  // Si el nombre existe en localStorage
   
    elementoNombre.textContent = nombreGuardado;  // lo insertamos como texto dentro del elemento HTML
} else {

    elementoNombre.textContent = "Estimado/a cliente"; // Si no encuentra el nombre pone por defecto
}

mostrarCarrito();