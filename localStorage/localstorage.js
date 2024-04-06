//crear coleccion de datos

// let productos = [{
//     nombre : "Aceite",
//     precio : 50000,
//     presentacion : "Tarro"
// },
// {
//     nombre : "Luz delantera",
//     precio : 120000,
//     presentacion : "Caja"
// },
// {
//     nombre : "Guardabarro",
//     precio : 70000,
//     presentacion : "Caja"
// }
// ];

// //guardar datos en localstorage
// localStorage.setItem("productos",  JSON.stringify(productos));
// alert("producto guardado con exito");

//traer datos guardados en el navegador
// let productosGuadados = JSON.parse(localStorage.getItem("productos"));
// let props = [];
// if (productosGuadados != null) {
//     props = productosGuadados;
// }

// props.forEach((d,i)=>{
//     document.write(
//         ` id: ${i+1} <br> 
//           Nombre Producto : ${d.nombre} <br>
//           precio producto : ${d.precio} <br>
//           Presentacion : ${d.presentacion}
//           <hr>
//         `
//     );  
// });

//declaracion de variables
let nombrePro = document.querySelector(".nombre-producto");
let presentacionPro = document.querySelector(".presentacion-producto");
let precioPro = document.querySelector(".precio-producto");
let imagenPro = document.querySelector(".imagen-producto");
let btnGuardar = document.querySelector(".btn-guardar");

//agregar evento al boton
btnGuardar.addEventListener("click", function() {
   // alert(nombrePro.value);
   obtenerProductos();
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
