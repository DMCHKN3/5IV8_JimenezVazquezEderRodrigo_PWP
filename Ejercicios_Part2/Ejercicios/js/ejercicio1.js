function verificar(e){
    var teclado = (document.all) ? e.keyCode : e.which;
    if (teclado == 8) return true;
    var patron = /[0-9\d .]/;
    var codigo = String.fromCharCode(teclado);
    return patron.test(codigo);
}

function calcular(){
    var n1 = parseFloat(document.getElementById("num1").value);
    var n2 = parseFloat(document.getElementById("num2").value);

    var resul = 0;
    if (n1 === n2){
        resul = n1 * n2;
    } else if (n1 > n2) {
        resul = n1 - n2;
    } else {
        resul = n1 + n2;
    }
    document.getElementById("resultado").value = resul;
}

function limpiar(){
    document.getElementById("num1").value = "";
    document.getElementById("num2").value = "";
    document.getElementById("resultado").value = "";
}