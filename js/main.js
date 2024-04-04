const carrito = []; // Array para almacenar las guitarras seleccionadas

function agregarAlCarrito(marca, precio, boton) {
    // Busca si la guitarra ya está en el carrito
    const guitarraExistente = carrito.find(guitarra => guitarra.marca === marca);

    if (guitarraExistente) {
        // Si ya existe, incrementa la cantidad
        guitarraExistente.cantidad++;
    } else {
        // Si no existe, agrégala al carrito con cantidad 1
        carrito.push({ marca, precio, cantidad: 1 });
    }

    actualizarTablaCarrito();
    boton.innerText = "Agregada!"; // Cambia el texto solo para el botón clickeado

    // Guardar en el almacenamiento local
    localStorage.setItem("guitarraMarca", marca);
    localStorage.setItem("guitarraPrecio", precio);
        // Mostrar el mensaje emergente
        const mensajeEmergente = document.getElementById("mensajeEmergente");
    mensajeEmergente.style.display = "block";

    // Restablecer el texto del botón después de 3 segundos
    setTimeout(() => {
        mensajeEmergente.style.display = "none";
        boton.innerText = "Agregar"; // Restablecer el texto del botón

        // También restablecemos el texto en los demás botones
        const otrosBotones = document.querySelectorAll(".add-button");
        otrosBotones.forEach((otroBoton) => {
            if (otroBoton !== boton) {
                otroBoton.innerText = "Agregar";
            }
        });
    }, 3000); // Mostrar durante 3000 ms (3 segundos)
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1); // Elimina el elemento del carrito
    actualizarTablaCarrito();
}

function actualizarTablaCarrito() {
    const tabla = document.getElementById("carrito").getElementsByTagName("tbody")[0];
    tabla.innerHTML = ""; // Limpia la tabla antes de actualizarla

    let total = 0;
    carrito.forEach((guitarra, index) => {
        const fila = tabla.insertRow();
        const celdaMarca = fila.insertCell(0);
        const celdaCantidad = fila.insertCell(1); // Nueva celda para la cantidad
        const celdaPrecio = fila.insertCell(2);
        const celdaEliminar = fila.insertCell(3); // Nueva celda para el botón "Eliminar"

        celdaMarca.innerText = guitarra.marca;
        celdaCantidad.innerText = guitarra.cantidad; // Muestra la cantidad
        celdaPrecio.innerText = `$${guitarra.precio * guitarra.cantidad}`;
        total += guitarra.precio * guitarra.cantidad;

        // Agrega el botón "Eliminar" para esta guitarra
        const botonEliminar = document.createElement("button");
        botonEliminar.innerText = "Eliminar";
        botonEliminar.addEventListener("click", () => eliminarDelCarrito(index));
        celdaEliminar.appendChild(botonEliminar);
    });

    document.getElementById("totalPrecio").innerText = `$${total}`;
}

// Resto de tu lógica y funciones (si las tienes)...

window.addEventListener("load", () => {
    const marcaGuardada = localStorage.getItem("guitarraMarca");
    const precioGuardado = localStorage.getItem("guitarraPrecio");
    if (marcaGuardada && precioGuardado) {
        // Hacer algo con los datos recuperados (por ejemplo, mostrarlos en la página)
        console.log(`Guitarra guardada: ${marcaGuardada} - Precio: $${precioGuardado}`);
    }
});

// Ejemplo de datos (detalles de la guitarra)
const guitarraData = {
    marca: "Fender",
    modelo: "Stratocaster",
    color: "Sunburst",
    precio: 1000
};

// Convertir los datos a formato JSON
const guitarraJson = JSON.stringify(guitarraData, null, 4);

// Imprimir la representación en JSON
console.log("Representación JSON de los datos de la guitarra:");
console.log(guitarraJson);

// Analizar los datos JSON de nuevo a un objeto JavaScript
const datosGuitarraParseados = JSON.parse(guitarraJson);

// Acceder a campos individuales
console.log("\nDatos de la guitarra parseados:");
console.log(`Marca: ${datosGuitarraParseados.marca}`);
console.log(`Modelo: ${datosGuitarraParseados.modelo}`);
console.log(`Color: ${datosGuitarraParseados.color}`);
console.log(`Precio: ${datosGuitarraParseados.precio}`);

function realizarCompra() {
    // Aquí puedes agregar la lógica para procesar la compra
    // Por ejemplo, enviar los datos al servidor o mostrar un mensaje de confirmación
    console.log("¡Compra realizada! Gracias por elegir LC Guitars.");
    // También puedes limpiar el carrito si lo deseas
    carrito.length = 0;
    actualizarTablaCarrito();
}
