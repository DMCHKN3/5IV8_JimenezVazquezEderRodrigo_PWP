function validara(e){
    var teclado = (document.all) ? e.keyCode : e.which;
    if (teclado == 8) return true;
    var patron = /[0-9\ d]/;
    var codigo = String.fromCharCode(teclado);
    return patron.test(codigo);
}

function calcular(){
    var añoactal = new Date().getFullYear();
    var añonac = document.getElementById("nacimiento").value;
    if(añoac < 1900 || añonac > añoactal){
        alert("Año no valido");
        return;
    }
    var edad = añoactal - añonac;
}