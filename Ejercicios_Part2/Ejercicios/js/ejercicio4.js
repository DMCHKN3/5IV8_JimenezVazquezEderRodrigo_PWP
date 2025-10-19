function verificar(e){
    var teclado = (document.all) ? e.keyCode : e.which;
    if (teclado == 8) return true;
    var patron = /[0-9\d .]/;
    var codigo = String.fromCharCode(teclado);
    return patron.test(codigo);
}

function verificara(e){
    var teclado = (document.all) ? e.keyCode : e.which;
    if (teclado == 8) return true;
    var patron = /[0-9]/;
    var codigo = String.fromCharCode(teclado);
    return patron.test(codigo);
}

function calcularUtil(){
    var salario = parseInt(document.getElementById("salario").value);
    var antig = parseInt(document.getElementById("antiguedad").value);
    var utilidad = 0;

    if(ant === 0){
        utilidad = salario * 0.05;
    }else if(ant >= 1 && ant <= 2){
        utilidad = salario * 0.07;
    }else if(ant >= 2 && ant <= 5){
        utilidad = salario * 0.10;
    }else if(ant >= 5 && ant <= 10){
        utilidad = salario * 0.15;
    }else if(ant > 10){
        utilidad = salario * 0.20;
    }

    document.getElementById("resultado").value = "La utilidad que le corresponde es de: $" + utilidad;
}

function limpiar(){
    document.getElementById("salarioMensual").value = "";
    document.getElementById("antiguedad").value = "";
    document.getElementById("resultado").value = "";
}