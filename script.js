document.addEventListener('DOMContentLoaded', function() {
    const carrito = [];

    // Escucha los clics en los botones "Añadir al carrito"
    const botonesAgregar = document.querySelectorAll('.btn.btn-primary');
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', agregarAlCarrito);
    });

    // Escucha los clics en los botones "Eliminar"
    const botonesEliminar = document.querySelectorAll('.btn.btn-danger');
    botonesEliminar.forEach(boton => {
        boton.addEventListener('click', eliminarDelCarrito);
    });

    // Función para agregar un producto al carrito
    function agregarAlCarrito(event) {
        const producto = event.target.parentElement;
        const titulo = producto.querySelector('.card-title').textContent;
        const precio = parseFloat(producto.querySelector('.card-text').textContent.replace('$', ''));

        // Verificar si el producto ya está en el carrito
        const productoEnCarrito = carrito.find(item => item.titulo === titulo);
        if (productoEnCarrito) {
            // Si el producto ya está en el carrito, aumentar la cantidad
            productoEnCarrito.cantidad++;
        } else {
            // Si el producto no está en el carrito, agregarlo
            carrito.push({ titulo, precio, cantidad: 1 });
        }

        // Actualizar la visualización del carrito
        actualizarCarrito();
    }

    // Función para eliminar un producto del carrito
    function eliminarDelCarrito(event) {
        const producto = event.target.parentElement;
        const titulo = producto.querySelector('.titulo').textContent;
        
        // Buscar el producto en el carrito y eliminarlo
        const index = carrito.findIndex(item => item.titulo === titulo);
        if (index !== -1) {
            carrito.splice(index, 1);
        }

        // Actualizar la visualización del carrito
        actualizarCarrito();
    }

    // Función para actualizar la visualización del carrito
    function actualizarCarrito() {
        const listaCarrito = document.getElementById('lista-carrito');
        listaCarrito.innerHTML = '';
        let total = 0;

        carrito.forEach(item => {
            const itemCarrito = document.createElement('li');
            itemCarrito.classList.add('list-group-item');
            itemCarrito.innerHTML = `
                <span class="titulo">${item.titulo}</span> - 
                Cantidad: 
                <button class="btn btn-secondary btn-sm" onclick="restarCantidad('${item.titulo}')">-</button>
                ${item.cantidad}
                <button class="btn btn-secondary btn-sm" onclick="sumarCantidad('${item.titulo}')">+</button>
                - Subtotal: $${(item.precio * item.cantidad).toFixed(2)}
                <button class="btn btn-danger btn-sm float-end">Eliminar</button>
            `;
            listaCarrito.appendChild(itemCarrito);

            total += item.precio * item.cantidad;
        });

        // Mostrar el total actualizado
        const totalElemento = document.getElementById('total');
        totalElemento.textContent = `Total: $${total.toFixed(2)}`;

        // Actualizar los eventos de los botones "Eliminar"
        const botonesEliminar = document.querySelectorAll('.btn.btn-danger');
        botonesEliminar.forEach(boton => {
            boton.addEventListener('click', eliminarDelCarrito);
        });
    }

    // Función para realizar la compra
    function realizarCompra() {
        if (carrito.length > 0) {
            // Mostrar mensaje de confirmación
            alert('Compra realizada correctamente. ¡Gracias por su compra!');
            
            // Resetear el carrito
            carrito.length = 0;
            
            // Actualizar la visualización del carrito
            actualizarCarrito();
        } else {
            alert('El carrito está vacío. No se puede realizar la compra.');
        }
    }

    // Agregar evento al botón de compra
    document.getElementById('boton-compra').addEventListener('click', realizarCompra);

    // Función para aumentar la cantidad de un producto en el carrito
    window.sumarCantidad = function(titulo) {
        const productoEnCarrito = carrito.find(item => item.titulo === titulo);
        if (productoEnCarrito) {
            productoEnCarrito.cantidad++;
            actualizarCarrito();
        }
    }

    // Función para disminuir la cantidad de un producto en el carrito
    window.restarCantidad = function(titulo) {
        const productoEnCarrito = carrito.find(item => item.titulo === titulo);
        if (productoEnCarrito && productoEnCarrito.cantidad > 1) {
            productoEnCarrito.cantidad--;
            actualizarCarrito();
        }
    }
});