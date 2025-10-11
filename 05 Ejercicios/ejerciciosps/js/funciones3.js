function validar(e) {
    var teclado = (document.all) ? e.keyCode : e.which;
    if (teclado == 8) return true;
    var patron = /[0-9\ .]/;
    var codigo = String.fromCharCode(teclado);
    return patron.test(codigo);
}

function calculos(){
    var p1 = document.getElementById("precio1").value;
    var p2 = document.getElementById("precio2").value;
    var p3 = document.getElementById("precio3").value;
    var p4 = document.getElementById("precio4").value;
    var p5 = document.getElementById("precio5").value;

    if(p1 == " " || p2 == " " || p3 == " " || p4 == " " || p5 == " " ){
        alert("Favor de llenar los campos")
    }else if(p1 = 0 || p2 < 0 || p3 < 0 || p4 < 0 || p5 < 0 ){
        alert("Favor de ingresar valores mayores o iguales a 0")
    }

    var d1 = parseFloat(p1) * 0.15;
    var d2 = parseFloat(p2) * 0.15;
    var d3 = parseFloat(p3) * 0.15;
    var d4 = parseFloat(p4) * 0.15;
    var d5 = parseFloat(p5) * 0.15;
    
    d1 = parseFloat(d1.toFixed(2));
    d2 = parseFloat(d2.toFixed(2));
    d3 = parseFloat(d3.toFixed(2));
    d4 = parseFloat(d4.toFixed(2));
    d5 = parseFloat(d5.toFixed(2));

    var tot = d1 + d2 + d3 + d4 + d5;

    document.getElementById("desc1").value = "$ " + d1;
    document.getElementById("desc2").value = "$ " + d2;
    document.getElementById("desc3").value = "$ " + d3;
    document.getElementById("desc4").value = "$ " + d4;
    document.getElementById("desc5").value = "$ " + d5;
    document.getElementById("totalp").value = "$ " + tot;
}

function borrar(){
    document.getElementById("precio1").value = "";
    document.getElementById("precio2").value = "";
    document.getElementById("precio3").value = "";
    document.getElementById("precio4").value = "";
    document.getElementById("precio5").value = "";
    document.getElementById("desc1").value = "";
    document.getElementById("desc2").value = "";
    document.getElementById("desc3").value = "";
    document.getElementById("desc4").value = "";
    document.getElementById("desc5").value = "";
    document.getElementById("totalp").value = "";
}
