const carrito = []; // Array para almacenar las guitarras seleccionadas

function agregarAlCarrito(marca, precio) {
    carrito.push({ marca, precio }); // Agrega la guitarra al carrito
    actualizarTablaCarrito();
    // Cambia el texto del botón a "Agregada!"
    document.querySelector(".add-button").innerText = "Agregada!";
}

function actualizarTablaCarrito() {
    const tabla = document.getElementById("carrito").getElementsByTagName("tbody")[0];
    tabla.innerHTML = ""; // Limpia la tabla antes de actualizarla

    let total = 0;
    carrito.forEach(guitarra => {
        const fila = tabla.insertRow();
        const celdaMarca = fila.insertCell(0);
        const celdaPrecio = fila.insertCell(1);

        celdaMarca.innerText = guitarra.marca;
        celdaPrecio.innerText = `$${guitarra.precio}`;
        total += guitarra.precio;
    });

    document.getElementById("totalPrecio").innerText = `$${total}`;
}

function agregarAlCarrito(marca, precio) {
    carrito.push({ marca, precio });
    actualizarTablaCarrito();
    document.querySelector(".add-button").innerText = "Agregada!";

    // Guardar en el almacenamiento local
    localStorage.setItem("guitarraMarca", marca);
    localStorage.setItem("guitarraPrecio", precio);
}

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

