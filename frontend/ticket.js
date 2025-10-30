const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const nombreCliente = localStorage.getItem("nombreCliente") || "Cliente";
const fechaActual = new Date().toLocaleDateString();

document.getElementById("nombre-cliente").textContent = nombreCliente;
document.getElementById("fecha").textContent = fechaActual;


const detalle = document.getElementById("detalle-ticket");
let total = 0;

carrito.forEach(p => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
        <td>${p.nombre}</td>
        <td>${p.cantidad}</td>
        <td>$${(p.precio * p.cantidad).toFixed(2)}</td>
    `;
    detalle.appendChild(fila);
    total += p.precio * p.cantidad;
});

document.getElementById("total-compra").textContent = total.toFixed(2);

//DESCAGA EL PDF
document.getElementById("descargar-pdf").addEventListener("click", () => {
    window.print();
});


//VUELVE A LA PANTALLA CARRITO
document.getElementById("volver").addEventListener("click", () => {  
    window.location.href = "carrito.html";
});

