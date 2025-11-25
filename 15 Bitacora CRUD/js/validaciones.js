function verificar(e){
    var teclado = (document.all) ? e.keyCode : e.which;
    if (teclado == 8) return true;
    var patron = /[A-Za-z0-9\d .]/;
    var codigo = String.fromCharCode(teclado);
    return patron.test(codigo);
}

function validarTextoSinEmojis(texto) {
    // Expresión regular que detecta emojis
    var patronEmojis = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1F004}\u{1F0CF}\u{1F170}-\u{1F251}]/gu;
    return !patronEmojis.test(texto);
}

function soloLetras(e) {
    var teclado = (document.all) ? e.keyCode : e.which;
    if (teclado == 8) return true;
    var patron = /[A-Za-z ]/;
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

    if (fecha === "" || hora === "" || sector === "" || checklist === "" || estado === "" || observaciones === "" || seguimientoreq === "" || inspector === "") {
        alert("Por favor, complete todos los campos del formulario.");
        return false;
    }

    // Validar que no sean solo espacios en blanco
    if (inspector.trim() === "") {
        alert("El nombre del inspector no puede estar vacío o contener solo espacios.");
        return false;
    }

    if (sector.trim() === "") {
        alert("El sector no puede estar vacío o contener solo espacios.");
        return false;
    }

    if (checklist.trim() === "") {
        alert("El checklist no puede estar vacío o contener solo espacios.");
        return false;
    }

    if (observaciones.trim() === "") {
        alert("Las observaciones no pueden estar vacías o contener solo espacios.");
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

    // Validar que no contengan emojis
    if (!validarTextoSinEmojis(inspector.trim())) {
        alert("El nombre del inspector no puede contener emojis.");
        return false;
    }

    if (!validarTextoSinEmojis(sector.trim())) {
        alert("El sector no puede contener emojis.");
        return false;
    }

    if (!validarTextoSinEmojis(checklist.trim())) {
        alert("El checklist no puede contener emojis.");
        return false;
    }

    if (!validarTextoSinEmojis(observaciones.trim())) {
        alert("Las observaciones no pueden contener emojis.");
        return false;
    }

    var añoFecha = new Date(fecha).getFullYear();
    
    if (añoFecha < 2005 || añoFecha > new Date().getFullYear()) {
        alert("Por favor, ingrese una fecha válida entre el año 2005 y " + new Date().getFullYear());
        return false;
    }

    
    return true;
}

function validarEliminacion(){
    var confirmacion = confirm("¿Está seguro de que desea eliminar este registro?");
    return confirmacion;
}