function verificar (e){
    var teclado = (document.all) ? e.keyCode : e.which;
    if (teclado == 8) return true;
    var patron = /[0-9\d .]/;
    var codigo = String.fromCharCode(teclado);
    return patron.test(codigo);
}

function calcular(){
    var horas = parseFloat(document.getElementById("hrsTrabajadas").value);
    var pago = parseFloat(document.getElementById("pago").value);
    var pagototal = 0;

    var horasExtra = horas - 40;

    if(horas > 40 || horasExtra > 0 && horasExtra <= 8){
        pagototal = (40 * pago) + (horasExtra * pago * 2);
    }else if(horas > 40 || horasExtra > 0 && horasExtra > 8 ){
        pagototal = (40 * pago) + (8 * pago * 2) + ((horasExtra - 8) * pago * 3);
    }else{
        pagototal = pago * horas;
    }
    document.getElementById("resultado").value = pagototal;
}

function limpiar(){
    document.getElementById("hrsTrabajadas").value = "";
    document.getElementById("pago").value = "";
    document.getElementById("resultado").value = "";
}