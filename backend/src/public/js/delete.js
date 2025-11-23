let getProduct_form = document.getElementById('getproduct-form');
        let listaProductos = document.getElementById('lista_productos');
        let url = 'http://localhost:3000/api/products/';

        getProduct_form.addEventListener('submit', async (event) => {
            event.preventDefault();
            let formData = new FormData(event.target);
            let data = Object.fromEntries(formData.entries());
            let idProd = data.idProd;

            try {
             let respuesta = await fetch(url + idProd);
             let datos = await respuesta.json();
             console.log(datos);
             let producto = datos.payload[0];
             
             let htmlProducto = `<li>
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <p>Id: ${producto.id} / Nombre: ${producto.nombre} / Precio: $${producto.precio} / Descripción: ${producto.descripcion}</p>
                </li>
                <button id="deleteBtn">Eliminar producto</button>`;

                console.log(htmlProducto);
                listaProductos.innerHTML = htmlProducto;

                let deleteBtn = document.getElementById("deleteBtn");
                deleteBtn.addEventListener("click", event => {

                    event.stopPropagation();
                    let confirmacion = confirm("¿Estás seguro de que deseas eliminar este producto?");
                    if (!confirmacion) {
                        alert("Eliminación cancelada.");
                    }else {
                        eliminarProducto(idProd);
                    }
                });

                async function eliminarProducto(idProd) {
                    try {
                        let response = await fetch(url + idProd, {
                            method: 'DELETE'
                        });
                        let resultado = await response.json();

                        if (response.ok) {
                            console.log("Producto eliminado");
                            alert(resultado.message || "Producto eliminado exitosamente.");
                            listaProductos.innerHTML = ''; // Limpiar el display
                        } else {
                            // Manejo de errores DELETE
                            alert(`Error al eliminar: ${resultado.message}`);
                        }
                    } catch (error) {
                        console.error('Error al eliminar el producto:', error);
                        alert("Error al eliminar el producto");
                    }
                }

            } catch (error) {
                console.error('Error al consultar el producto:', error);
                
            }
        });      

           