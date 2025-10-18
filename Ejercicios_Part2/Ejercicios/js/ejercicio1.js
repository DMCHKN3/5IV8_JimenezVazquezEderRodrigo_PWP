function verificar(){
    var teclado = (document.all) ? e.keyCode : e.which;
    if (teclado == 8) return true;
    var patron = /[0-9\d .]/;
    var codigo = String.fromCharCode(teclado);
    return patron.test(codigo);
}

function calcular(){
    var num1 = parseFloat(document.getElementById("num1").value);
    var num2 = parseFloat(document.getElementById("num2").value);

    var resultado = 0;
    if (num1 === num2){
        resultado = num1 * num2;
    } else if (num1 > num2) {
        resultado = num1 - num2;
    } else {
        resultado = num1 + num2;
    }
    document.getElementById("resultado").value = resultado;
}

function limpiar(){
    document.getElementById("num1").value = "";
    document.getElementById("num2").value = "";
    document.getElementById("resultado").value = "";
}