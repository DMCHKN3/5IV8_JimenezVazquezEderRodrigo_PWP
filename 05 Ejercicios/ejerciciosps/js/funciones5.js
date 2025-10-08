function validarp(e){
    var teclado = (document.all) ? e.keyCode : e.which;
    if (teclado == 8) return true;
    var patron = /[0-9\ d]/;
    var codigo = String.fromCharCode(teclado);
    return patron.test(codigo);
}

function calcular(){
    var canth = document.getElementById("hombresc").value;
    var cantm = document.getElementById("mujeresc").value;
    if(canth < 0 || cantm < 0){
        alert("Favor de ingresar cantidades mayores o iguales a 0");
        return;
    }
    var total = parseInt(canth) + parseInt(cantm);
    var porcentajeh = (canth / total) * 100;
    var porcentajem = (cantm / total) * 100;
    porcentajeh = parseFloat(porcentajeh.toFixed(2));
    porcentajem = parseFloat(porcentajem.toFixed(2));
    document.getElementById("porcentajeht").value = porcentajeh + " %";
    document.getElementById("porcentajemt").value = porcentajem + " %";
}