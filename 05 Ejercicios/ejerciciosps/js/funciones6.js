function validara(e){
    var teclado = (document.all) ? e.keyCode : e.which;
    if (teclado == 8) return true;
    var patron = /[0-9\ d]/;
    var codigo = String.fromCharCode(teclado);
    return patron.test(codigo);
}

function calcular(){
    var añoactal = new Date().getFullYear();
    var añoac = document.getElementById("anacimiento").value;
    if(añoac < 1900 || añoac > añoactal){
        alert("Año no valido");
        return;
    }
    var edad = añoactal - añoac;
    document.getElementById("edadf").value = edad + " años";
}

function borrar(){
    document.getElementById("anacimiento").value = " ";
    document.getElementById("edadf").value = " ";
}