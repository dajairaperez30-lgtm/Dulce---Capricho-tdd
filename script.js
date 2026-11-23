// PRODUCTOS DE DULCE CAPRICHO

const productos = [

  {
    nombre: "Heladito de leche",
    precio: 1,
    imagen: "heladito-leche.jpg"
  },

  {
    nombre: "Heladito de chocolate",
    precio: 2,
    imagen: "heladito-chocolate.png"
  },

  {
    nombre: "Arroz con leche",
    precio: 3,
    imagen: "arroz-leche.png"
  },

  {
    nombre: "Flan",
    precio: 3,
    imagen: "flan.jpg"
  },

  {
    nombre: "Budín",
    precio: 3,
    imagen: "budín.png"
  },

  {
    nombre: "Gelatina",
    precio: 3,
    imagen: "gelatina.png"
  }

];

let carrito = [];


// MOSTRAR PRODUCTOS

function mostrarProductos() {

  const contenedor = document.getElementById("productos");

  contenedor.innerHTML = productos.map((producto, indice) => `

    <div class="producto">

      <img
        src="${producto.imagen}"
        alt="${producto.nombre}"
      >

      <h3>${producto.nombre}</h3>

      <p class="precio">${producto.precio} Bs</p>

      <button onclick="agregarCarrito(${indice})">
        Agregar al carrito 🛒
      </button>

    </div>

  `).join("");

}


// AGREGAR AL CARRITO

function agregarCarrito(indice) {

  const producto = productos[indice];

  const encontrado = carrito.find(
    p => p.nombre === producto.nombre
  );

  if (encontrado) {

    encontrado.cantidad++;

  } else {

    carrito.push({
      ...producto,
      cantidad: 1
    });

  }

  mostrarCarrito();

}


// MOSTRAR CARRITO

function mostrarCarrito() {

  const lista = document.getElementById("lista-carrito");

  if (carrito.length === 0) {

    lista.innerHTML = "Tu carrito está vacío.";

  } else {

    lista.innerHTML = carrito.map((producto, indice) => `

      <div class="item-carrito">

        <h3>${producto.nombre}</h3>

        <p>Precio: ${producto.precio} Bs</p>

        <p>Cantidad: ${producto.cantidad}</p>

        <p>
          Subtotal:
          ${producto.precio * producto.cantidad} Bs
        </p>

        <button onclick="cambiarCantidad(${indice}, -1)">
          −
        </button>

        <button onclick="cambiarCantidad(${indice}, 1)">
          +
        </button>

        <button onclick="eliminarProducto(${indice})">
          Eliminar
        </button>

      </div>

    `).join("");

  }

  const total = carrito.reduce(
    (suma, producto) =>
      suma + producto.precio * producto.cantidad,
    0
  );

  document.getElementById("total").textContent = total;

}


// CAMBIAR CANTIDAD

function cambiarCantidad(indice, cambio) {

  carrito[indice].cantidad += cambio;

  if (carrito[indice].cantidad <= 0) {

    carrito.splice(indice, 1);

  }

  mostrarCarrito();

}


// ELIMINAR PRODUCTO

function eliminarProducto(indice) {

  carrito.splice(indice, 1);

  mostrarCarrito();

}


// VACIAR CARRITO

function vaciarCarrito() {

  carrito = [];

  mostrarCarrito();

}


// REALIZAR PEDIDO POR WHATSAPP

function realizarPedido() {

  if (carrito.length === 0) {

    alert("Primero agrega productos a tu carrito.");

    return;

  }

  let mensaje =
    "Hola, Dulce Capricho. Quiero realizar este pedido:\n\n";

  carrito.forEach(producto => {

    mensaje +=
      producto.nombre +
      " x " +
      producto.cantidad +
      " = " +
      (producto.precio * producto.cantidad) +
      " Bs\n";

  });

  const total = carrito.reduce(
    (suma, producto) =>
      suma + producto.precio * producto.cantidad,
    0
  );

  mensaje += "\nTotal: " + total + " Bs";

  // REEMPLAZAR POR TU NÚMERO DE WHATSAPP

  const telefono = "59174767335";

  window.open(
    "https://wa.me/" +
    telefono +
    "?text=" +
    encodeURIComponent(mensaje),
    "_blank"
  );

}


// INICIAR PÁGINA

mostrarProductos();

mostrarCarrito();
