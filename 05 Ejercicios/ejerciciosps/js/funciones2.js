function validar(e) {

    var teclado = (document.all) ? e.keyCode : e.which;
    if (teclado == 8) return true;
    var patron = /[0-9\ .]/;
    var codigo = String.fromCharCode(teclado);
    return patron.test(codigo);

}

function calcular() {
    var v1 = document.getElementById("venta1").value;
    var v2 = document.getElementById("venta2").value;
    var v3 = document.getElementById("venta3").value;
    var sueldobase = document.getElementById("sueldob").value;

    if (v1 == "" || v2 == "" || v3 == "" || sueldobase == "") {
        alert("Favor de llenar todos los campos");
    }
    else if (v1 < 0 || v2 < 0 || v3 < 0 || sueldobase < 0) {
        alert("Favor de inresar valores mayores o iguales a 0");
    }

    var totalventas = (parseFloat(v1) * 0.10) + (parseFloat(v2) * 0.10) + (parseFloat(v3) * 0.10);
    totalventas = parseFloat(totalventas.toFixed(2));
    
    var sueldototal = parseFloat(sueldobase) + totalventas;
    sueldototal = parseFloat(sueldototal.toFixed(2));

    document.getElementById("sueldof").value = "$ " + sueldototal;
}

function borrar() {
    document.getElementById("venta1").value = " ";
    document.getElementById("venta2").value = " ";
    document.getElementById("venta3").value = " ";
    document.getElementById("sueldob").value = " ";
    document.getElementById("sueldof").value = " "; 
}
