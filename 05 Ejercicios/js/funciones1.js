function validarn(e) {
    var teclado = (document.all) ? e.keyCode : e.which;
    if (teclado == 8) return true;
    var patron = /[0-9\d .]/;
    var codigo = String.fromCharCode(teclado);
    return patron.test(codigo);
}

//funcion para calcular el interes
function calcular() {
    var valor = document.getElementById("cantidadi").value
    var parseo = parseFloat(valor);
    alert(parseo);
    var interes = parseo * (0.0805);//limite a 2 decimales
    alert(interes);
    var total = interes + parseo;
    alert(total);
    document.getElementById("saldoi").value = "$ " + total;//limite a 2 decimales
}

//funcion para borrar
function borrar() {
    document.getElementById("saldoi").value = " ";
    document.getElementById("cantidadi").value = " ";
}

/*
Del ejercicio 1, tenemos que agregar el campo numero de meses y sera una inversion de maximo 18 meses

2. Se deben de ingresar 3 ventas, un sueldo base y despues calcular el monto total, debe de aparecer cuanto cobra por comision y la suma total

3. Se debe ingresar un producto con su precio y aplicarle el 15% y el sistema debe mostrar el producto, el precio, el descuento y el total a pagar

4. Se debe de ingresar calificacioon 1, 2, 3, se aplica el promedio y su porcentaje, se ingresa trabajo final y se aplica % y examen final y se aplica el %, se debe de mostrar  el total de calificacion

5. Se debe de ingresar cantidad de hombres y cantidad de mujeres y mostrar sus % correspondientes

6. Calcular la edad de una persona
*/

