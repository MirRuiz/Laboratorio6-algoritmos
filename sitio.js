const REGULAR_TYPE = 21;
const LOWER_TYPE = 4;
const EXEMPT_TYPE = 0;

const products = [
    {
        description: "Goma de borrar",
        price: 0.25,
        tax: LOWER_TYPE,
        stock: 2,
        units: 0,
    },
    {
        description: "Lápiz H2",
        price: 0.4,
        tax: LOWER_TYPE,
        stock: 5,
        units: 0,
    },
    {
        description: "Cinta rotular",
        price: 9.3,
        tax: REGULAR_TYPE,
        stock: 2,
        units: 0,
    },
    {
        description: "Papelera plástico",
        price: 2.75,
        tax: REGULAR_TYPE,
        stock: 5,
        units: 0,
    },
    {
        description: "Escuadra",
        price: 8.4,
        tax: REGULAR_TYPE,
        stock: 3,
        units: 0,
    },
    {
        description: "Pizarra blanca",
        price: 5.95,
        tax: REGULAR_TYPE,
        stock: 2,
        units: 0,
    },
    {
        description: "Afilador",
        price: 1.2,
        tax: LOWER_TYPE,
        stock: 10,
        units: 0,
    },
    {
        description: "Libro ABC",
        price: 19,
        tax: EXEMPT_TYPE,
        stock: 2,
        units: 0,
    }
];

document.getElementById("boton").disabled = true

// html dinamico
var contador = 0;
var mostrarProductos = producto => {
    var contenedor = document.getElementById("lista-productos")
    
    
    var descripcion = document.createElement("h5");
    descripcion.innerText = producto.description;
    
    var precioUnitario = document.createElement("h5");
    precioUnitario.innerText = producto.price;
    
    var unidades = document.createElement("input");
    unidades.setAttribute("type", "number");
    unidades.setAttribute("id", "units")
    unidades.setAttribute("min", 0);
    unidades.setAttribute("max", producto.stock);
    unidades.setAttribute("value", 0);
    unidades.addEventListener("change", event => {
        
        if (producto.units < parseInt(event.target.value)) {
            contador++;
        }
        else {
            contador--;
        }
        if (contador !== 0) {
            document.getElementById("boton").disabled = false
        }
        else {
            document.getElementById("boton").disabled = true
        }
        producto.units = parseInt(event.target.value);
        }
    )


    contenedor.appendChild(descripcion);
    contenedor.appendChild(unidades);
    contenedor.appendChild(precioUnitario);


}
for (var producto of products) {
    mostrarProductos(producto);

}

//calcular subtotal funcion

function calcularSubtotal() {

    var subtotal = 0;
    for (var producto of products) {
        subtotal = producto.units * producto.price + subtotal;

    }
    document.getElementById("subtotal").innerText = "Subtotal: " + subtotal + " €";
    return subtotal;
}

//calcular iva

function calcularIva() {
    var iva = 0;

    for (var producto of products) {
        if (producto.tax === REGULAR_TYPE) {
            iva = iva + producto.price * producto.units * 0.21;
        }
        if (producto.tax === LOWER_TYPE) {
            iva = iva + producto.price * producto.units * 0.04;
        }
    }
    document.getElementById("iva").innerText = "IVA: " + iva.toFixed(2) + " €";
    return iva;
}

//boton calcular
document.getElementById("boton").addEventListener("click", function () {
    var subtotal = calcularSubtotal();
    var iva = calcularIva();
    var total = subtotal + iva;
    document.getElementById("total").innerText = "TOTAL: " + total.toFixed(2) + " €";

})






