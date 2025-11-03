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

    let html = "";
    let total = 0;

    carrito.forEach(fruta => {
        html += `
            <div class="item-carrito">
                <img src="${fruta.ruta_img}" alt="${fruta.nombre}">
                <p>${fruta.nombre}  -  ${fruta.cant}  -  $${fruta.subtotal}</p>
                <button onclick="restar(${fruta.id})" class="boton-restar">-</button>
                <button onclick="agregar(${fruta.id})" class="boton-sumar">+</button>
       
            </div>
        `;
        total += fruta.precio;
    });


    listaCarrito.innerHTML = html;
    totalTexto.textContent = total;
}


// Actualizar carrito
function actualizarCarrito() 
{
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Vaciar carrito
btnVaciar.addEventListener("click", () => {
    localStorage.removeItem("carrito");
    carrito = [];
    mostrarCarrito();
});

// Volver a la tienda
btnVolver.addEventListener("click", () => {
    window.location.href = "index.html"; 
});


// Funcion para eliminar una fruta del carrito
function restar(idObjeto) {

    console.log("Entro a restar")
   
    let index = carrito.findIndex(objeto => objeto.id == idObjeto); // Buscamos el indice de la fruta a borrar

    if (index !== -1) {

        let fruta = carrito[index];

        if (fruta.cant > 0){
            fruta.cant -= 1;
            fruta.subtotal = fruta.precio * fruta.cant;

            if (fruta.cant == 0){
                carrito.splice(index, 1); // Eliminamos la fruta con splice() mediante el indice
            }
        }
    }

    actualizarCarrito()
    mostrarCarrito();

}


function agregar(idObjeto){

    let fruta = carrito.find(fruta => fruta.id === idObjeto);

    fruta.cant += 1; // Sumamos la cantidad
    fruta.subtotal = fruta.cant * fruta.precio; // Actualizamos el subtotal

    console.log(`Fruta agregada: ${fruta.nombre} x${fruta.cant}`);

    actualizarCarrito();
    mostrarCarrito();
}






mostrarCarrito();
