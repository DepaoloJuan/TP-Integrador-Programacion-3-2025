const listaCarrito = document.getElementById("lista-carrito");
const totalTexto = document.getElementById("total");
const btnVolver = document.getElementById("volver");
const btnVaciar = document.getElementById("vaciar-carrito");

// Leer el carrito desde localStorage
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Mostrar los productos del carrito
function mostrarCarrito() {
    if (carrito.length === 0) {
        listaCarrito.innerHTML = "<p>El carrito está vacío 🛒</p>";
        totalTexto.textContent = 0;
        return;
    }

    let html = "<ul>";
    let total = 0;

    carrito.forEach(fruta => {
        html += `
            <li class="item-carrito">
                <p>${fruta.nombre} - $${fruta.precio}</p>
            </li>
        `;
        total += fruta.precio;
    });

    html += "</ul>";
    listaCarrito.innerHTML = html;
    totalTexto.textContent = total;
}

// Vaciar carrito
btnVaciar.addEventListener("click", () => {
    localStorage.removeItem("carrito");
    carrito = [];
    mostrarCarrito();
});

// Volver a la tienda
btnVolver.addEventListener("click", () => {
    window.location.href = "index.html"; // cambia si tu archivo principal se llama distinto
});

mostrarCarrito();
