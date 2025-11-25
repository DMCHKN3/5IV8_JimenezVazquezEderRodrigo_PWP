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

// Función para detectar cambios en la URL y mostrar alerta
function validarCambioURL() {
    var urlActual = window.location.href;
    var urlPatrones = [
        /\/bitacora\/edit\/\d+$/,  // Página de edición
        /\/bitacora\/delete\/\d+$/, // Página de eliminación
        /\/$/ // Página principal (creación)
    ];

    // Verificar si estamos en alguna de las páginas críticas
    var enPaginaCritica = urlPatrones.some(function(patron) {
        return patron.test(urlActual);
    });

    if (enPaginaCritica) {
        // Detectar cambios en la URL usando el evento beforeunload
        window.addEventListener('beforeunload', function(e) {
            // Solo mostrar alerta si hay un formulario en la página
            var formulario = document.querySelector('form');
            if (formulario) {
                // Verificar si el formulario tiene datos sin guardar
                var inputs = formulario.querySelectorAll('input, textarea, select');
                var hayDatos = false;
                
                inputs.forEach(function(input) {
                    if (input.value !== '' && input.defaultValue !== input.value) {
                        hayDatos = true;
                    }
                });

                if (hayDatos) {
                    var mensaje = 'Tiene cambios sin guardar. ¿Está seguro de que desea salir?';
                    e.preventDefault();
                    e.returnValue = mensaje;
                    return mensaje;
                }
            }
        });

        // Detectar cambios en el historial (botón atrás/adelante)
        window.addEventListener('popstate', function(e) {
            var confirmacion = confirm('¿Está seguro de que desea abandonar esta página? Los cambios no guardados se perderán.');
            if (!confirmacion) {
                window.history.pushState(null, null, urlActual);
            }
        });

        // Agregar estado inicial al historial
        window.history.pushState(null, null, urlActual);
    }
}

// Ejecutar la validación cuando se carga la página
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', validarCambioURL);
} else {
    validarCambioURL();
}