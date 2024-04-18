
let nombrePro = document.querySelector(".nombre-producto");
let presentacionPro = document.querySelector(".presentacion-producto");
let precioPro = document.querySelector(".precio-producto");
let imagenPro = document.querySelector(".imagen-producto");
let btnGuardar = document.querySelector(".btn-guardar");
let tabla = document.querySelector(".table tbody")

//agregar evento al boton
btnGuardar.addEventListener("click", function() {
   // alert(nombrePro.value);
   let datos = obtenerProductos();
   guardarDatos( datos )
   borrarTabla();
   mostrarDatos();
});

//funcion para obtener los productos del formulario
function obtenerProductos() {
    if( nombrePro.value == "" || presentacionPro.value == "" || 
        precioPro.value == "" || imagenPro.value == ""
    ){
        alert("Todos los campos son obligatorios");
    }

    let producto = {
        nombre : nombrePro.value,
        presentacion : presentacionPro.value,
        precio : precioPro.value,
        imagen : imagenPro.value
    }
    nombrePro.value = "";
    presentacionPro.value = "";
    precioPro.value = "";
    imagenPro.value = "";
    return producto;
}

// Guaedar datos en localStorage
const listaProductos = "Productos";
function guardarDatos(datos) {

    let productos = [];
    //extraer datos guardados en localstorage
    let productosGuadados = JSON.parse(localStorage.getItem(listaProductos));

    //validar los datos guardados previamente en localstorage
    if (productosGuadados != null) {
        productos = productosGuadados;
    }

    //Agregar el producto nuevo al array
    productos.push(datos);

    localStorage.setItem(listaProductos, JSON.stringify(productos));
    //validar que los datos que fueron gauardados
    alert("Datos guardados con exito")
}

function mostrarDatos() {
    let productos = [];
    //extraer datos guardados en localstorage
    let productosGuadados = JSON.parse(localStorage.getItem(listaProductos));

    //validar los datos guardados previamente en localstorage
    if (productosGuadados != null) {
        productos = productosGuadados;
    }
    //mostrar los datos en la tabla
    productos.forEach((pro,i) => {
        let fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${i+1} </td>      
            <td>${pro.nombre} </td>      
            <td>${pro.presentacion} </td>      
            <td>${pro.precio} </td>      
            <td> <img src="${pro.imagen}" width="30%"></td> 
            <td>
                <span data-indice="${i}" class="btn-editar btn btn-warning">🗒️</span>
            </td>
            <td>
                <span onclick="eliminarProducto(${i})" class="btn-eliminar btn btn-danger">✖️</span>    
            </td>
        `;
        tabla.appendChild(fila);
    });
}

//quitar los datos de la tabla
function borrarTabla(){
    let filas = document.querySelectorAll(".table tbody tr")
    filas.forEach((f)=>{
        f.remove();
    })
}

function eliminarProducto( pos){
    let productos = [];
    //extraer datos guardados en localstorage
    let productosGuadados = JSON.parse(localStorage.getItem(listaProductos));

    //validar los datos guardados previamente en localstorage
    if (productosGuadados != null) {
        productos = productosGuadados;
    }
    let confimar = confirm(`¿Desea eliminar el producto: ${productos[pos].nombre}`);
    if(confimar){
        let del = productos.splice(pos,1);
        alert(`Producto fue eliminado con exito`);
        localStorage.setItem(listaProductos, JSON.stringify(productos));
        borrarTabla();
        mostrarDatos();
    }
}

//mostrar los datos de localstorage al recargar la pagina
document.addEventListener("DOMContentLoaded", ()=>{
    borrarTabla();
    mostrarDatos();
})

const inputBuscar = document.querySelector(".input-buscar");

// Agregar evento de escucha al campo de búsqueda
inputBuscar.addEventListener("input", function() {
    const textoBusqueda = inputBuscar.value.trim().toLowerCase(); // Obtener el texto de búsqueda y convertirlo a minúsculas

    // Filtrar productos según el nombre ingresado
    const productosFiltrados = obtenerProductosFiltrados(textoBusqueda);

    // Limpiar la tabla y mostrar los productos filtrados
    borrarTabla();
    mostrarProductosFiltrados(productosFiltrados);
});

// Función para obtener los productos filtrados por nombre
function obtenerProductosFiltrados(textoBusqueda) {
    const productos = JSON.parse(localStorage.getItem(listaProductos)) || []; // Obtener los productos guardados en el almacenamiento local

    return productos.filter(producto => producto.nombre.toLowerCase().includes(textoBusqueda)); // Filtrar los productos cuyo nombre incluya el texto de búsqueda
}

// Función para mostrar los productos filtrados en la tabla
function mostrarProductosFiltrados(productos) {
    productos.forEach((producto, index) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${index + 1}</td>
            <td>${producto.nombre}</td>
            <td>${producto.presentacion}</td>
            <td>${producto.precio}</td>
            <td><img src="${producto.imagen}" width="30%"></td>
            <td><span class="btn-editar btn btn-warning">🗒️</span></td>
            <td><span onclick="eliminarProducto(${index})" class="btn-eliminar btn btn-danger">✖️</span></td>
        `;
        tabla.appendChild(fila);
    });
}

document.addEventListener("DOMContentLoaded", ()=>{
    borrarTabla();
    mostrarDatos();
});


// function editarProducto(event) {
//     const index = parseInt(event.target.dataset.indice); // Obtener el índice del producto desde el atributo de datos del botón
//     const productos = JSON.parse(localStorage.getItem(listaProductos)) || []; // Obtener los productos guardados en el almacenamiento local
//     const productoEditado = productos[index]; // Obtener el producto que se va a editar

//     Llenar el formulario con los datos del producto a editar
//     nombrePro.value = productoEditado.nombre;
//     presentacionPro.value = productoEditado.presentacion;
//     precioPro.value = productoEditado.precio;
//     imagenPro.value = productoEditado.imagen;

//     Agregar un evento de escucha al botón de guardar para guardar los cambios
//     btnGuardar.removeEventListener("click", guardarDatos); // Remover el evento de guardado anterior, para evitar conflictos
//     btnGuardar.addEventListener("click", function() {
//         Actualizar los datos del producto en el array de productos
//         productoEditado.nombre = nombrePro.value;
//         productoEditado.presentacion = presentacionPro.value;
//         productoEditado.precio = precioPro.value;
//         productoEditado.imagen = imagenPro.value;

//         Guardar los datos actualizados en el almacenamiento local
//         localStorage.setItem(listaProductos, JSON.stringify(productos));

//         Limpiar la tabla y mostrar los productos actualizados
//         borrarTabla();
//         mostrarDatos();
//     });
// }

// Asignar la función de editarProducto a los botones de edición en cada fila de la tabla
// document.addEventListener("click", function(event) {
//     if (event.target.classList.contains("btn-editar")) {
//         editarProducto(event); // Pasar el evento como argumento a la función editarProducto
//     }
// });