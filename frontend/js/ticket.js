
/* ========= Elementos del DOM ========= */
const totalTexto = document.getElementById("total-ticket");
const fechaTexto = document.getElementById("fecha");
const btnVolver = document.getElementById("volver");
const productosCarrito = document.getElementById("productos");
const elementoNombre = document.getElementById("nombre-usuario");
const nombreGuardado = localStorage.getItem("nombreUsuario"); 

// Leer el carrito desde localStorage
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


/* ========= MOSTRAR =========*/
function mostrarCarrito() {
    if (carrito.length === 0) { 
        productosCarrito.innerHTML = "<p>El carrito está vacío 🛒</p>";
        totalTexto.textContent = 0;
        return;
    }

    let html = "";
    let total = 0;

    carrito.forEach(disco => {
        html += `
        <div class="item-carrito">
            <img 
                src="${disco.imagen}" 
                alt="Imagen de ${disco.nombre}" 
                class="img-mini" 
            /> 
            <p>${disco.nombre} - ${disco.cant} - $${disco.subtotal}</p>
        </div>
        `;
        total += disco.subtotal;
    });

    productosCarrito.innerHTML = html;
    totalTexto.textContent = total; 
}

// Fecha actual (formato dd/mm/yyyy - hh:mm)
let fecha = new Date();
let fechaFormateada = fecha.toLocaleString('es-AR');
fechaTexto.textContent = fechaFormateada;

// Boton para volver a la tienda
btnVolver.addEventListener("click", () => {
    localStorage.removeItem("carrito")
    window.location.href = "bienvenida.html"; 
});


if (nombreGuardado) {  // Si el nombre existe en localStorage
    elementoNombre.textContent = nombreGuardado;  // lo insertamos como texto dentro del elemento HTML
} else {
    elementoNombre.textContent = "Estimado/a cliente"; // Si no encuentra el nombre pone por defecto
}

mostrarCarrito();