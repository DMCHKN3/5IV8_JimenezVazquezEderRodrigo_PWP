function validar(e){
    var teclado = (document.all) ? e.keyCode : e.which;
    if (teclado == 8) return true;
    var patron = /[0-9\ .]/;
    var codigo = String.fromCharCode(teclado);
    return patron.test(codigo);
}

function calificar(){
    var cal1 = document.getElementById("calf1").value;
    var cal2 = document.getElementById("calf2").value;
    var cal3 = document.getElementById("calf3").value;
    var trabajo = document.getElementById("trabfin").value;
    var examen = document.getElementById("exam").value;

    if(cal1 == "" || cal2 == "" || cal3 == "" || trabajo == "" || examen == ""){
        alert("Favor de llenar todos los campos");
        return;
    }
    else if(cal1 < 0 || cal2 < 0 || cal3 < 0 || trabajo < 0 || examen < 0){
        alert("Favor de ingresar valores mayores o iguales a 0");
        return;
    }
    else if(cal1 > 10 || cal2 > 10 || cal3 > 10 || trabajo > 10 || examen > 10){
        alert("Favor de ingresar valores menores a 10 y mayores a 0");
        return;
    }

    cal1 = parseFloat(cal1);
    cal2 = parseFloat(cal2);
    cal3 = parseFloat(cal3);
    trabajo = parseFloat(trabajo);
    examen = parseFloat(examen);

    var promcal = ((cal1+cal2+cal3)*55)/30;
    var caltrabajo = (trabajo*15)/10;
    var calexamen = (examen * 30)/10;

    promcal = parseFloat(promcal.toFixed(2));
    caltrabajo = parseFloat(caltrabajo.toFixed(2));
    calexamen = parseFloat(calexamen.toFixed(2));

    var califfinal = promcal + caltrabajo + calexamen
    var califtotal = (califfinal/10);
    califtotal = califtotal.toFixed(2);

    document.getElementById("calffin").value = califtotal;
}

function borrar(){
    document.getElementById("calf1").value = " ";
    document.getElementById("calf2").value = " ";
    document.getElementById("calf3").value = " ";
    document.getElementById("trabfin").value = " ";
    document.getElementById("exam").value = " ";
    document.getElementById("calffin").value = " ";
}