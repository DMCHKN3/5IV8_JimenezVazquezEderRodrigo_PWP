function verificar(e){
    var teclado = (document.all) ? e.keyCode : e.which;
    if (teclado == 8) return true;
    var patron = /[A-Za-z0-9\d .]/;
    var codigo = String.fromCharCode(teclado);
    return patron.test(codigo);
}

function validarFormulario(){
    var fecha = document.getElementById("fecha").value;
    var hora = document.getElementById("hora").value;
    var sector = document.getElementById("sector").value;
    var checklist = document.getElementById("checklist").value;
    var estado = document.getElementById("estado").value;
    var observaciones = document.getElementById("observaciones").value;
    var seguimientoreq = document.getElementById("seguimientoreq").value;
    var inspector = document.getElementById("inspector").value;
    var hoy = new Date();

    if (fecha === "" || hora === "" || sector === "" || checklist === "" || estado === "" || observaciones === "" || seguimientoreq === "" || inspector === "") {
        alert("Por favor, complete todos los campos del formulario.");
        return false;
    }

    if (observaciones.length > 300) {
        alert("El campo de observaciones no puede exceder los 300 caracteres.");
        return false;
    }

    if (inspector.length > 100) {
        alert("El nombre del inspector no puede exceder los 100 caracteres.");
        return false;
    }

    if (sector.length > 50) {
        alert("El nombre del sector no puede exceder los 50 caracteres.");
        return false;
    }

    if (fecha <= "2015-01-01" || fecha >= hoy.toISOString().split("T")[0]) {
        alert("Por favor, ingrese una fecha válida entre el 2015-01-01 y el día de hoy." + "(" + hoy.toISOString().split("T")[0] + ")");
        return false;
    }

    return true;
}