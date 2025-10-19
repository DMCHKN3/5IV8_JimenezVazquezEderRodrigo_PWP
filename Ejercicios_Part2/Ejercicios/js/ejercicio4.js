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
    var salario = parseFloat(document.getElementById("salarioMensual").value);
    var antig = parseInt(document.getElementById("antiguedad").value);
    var utilidad = 0;

    if(antig === 0){
        utilidad = salario * 0.05;
    }else if(antig >= 1 && antig <= 2){
        utilidad = salario * 0.07;
    }else if(antig >= 2 && antig <= 5){
        utilidad = salario * 0.10;
    }else if(antig >= 5 && antig <= 10){
        utilidad = salario * 0.15;
    }else if(antig > 10){
        utilidad = salario * 0.20;
    }

    alert(utilidad);
    document.getElementById("resultado").textContent = "La utilidad que le corresponde es de: $" + utilidad;
}

function limpiar(){
    document.getElementById("salarioMensual").value = "";
    document.getElementById("antiguedad").value = "";
    document.getElementById("resultado").innerHTML = "Esperando datos...";
}