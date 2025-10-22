const actividades = [
    { nombre: "01Curriculum", link: "./Curriculum/index.html", descripcion: "Currículo y presentación personal" },
    { nombre: "02Primeros pasos", link: "./02Primerospasos/estructura.html", descripcion: "Primeros pasos en HTML y CSS" },
    { nombre: "03Loggin", link: "./03Loggin/inicio.html", descripcion: "Creacion del inicio de sesión"},
    { nombre: "04Formulario", link: "./04Formulario/formulario.html", descripcion: "Creacion del formulario"},
    { nombre: "05Ejercicios", link: "./05 Ejercicios/ejerciciosm.html", descripcion: "Ejercicios de JS"},
    { nombre: "06Algoritmia", link: "./06Algoritmia/algoritmia.html", descripcion: "Ejercicios de JS de Algoritmia"},
    { nombre: "07JS Intermedio", link: "./07JSIntermedio/funcionesintermedio.js", descripcion: "Apunte en un archivo JS"},
    { nombre: "08Rompecabezas", link: "./08Rompecabezas/rompecabezas.html", descripcion: "Rompecabezas con JS (en clase)"},
    { nombre: "Ejercicios Parte 2", link: "./Ejercicios_Part2/MainEjercicios.html", descripcion: "Tarea de Ejercicios Parte 2"}

];

function mostrarActividades(actividades) {
    for(let i = 0; i < actividades.length; i++) {
        mostrarActividadEnTabla(actividades[i], "lista-actividades");
    }
}

function mostrarActividadEnTabla(actividad, idTabla) {
    const tbody = document.getElementById(idTabla);
    const tr = document.createElement("tr");
    
    // Crear celda para el link
    const tdLink = document.createElement("td");
    const a = document.createElement("a");
    a.href = actividad.link;
    a.textContent = actividad.nombre;
    tdLink.appendChild(a);
    
    // Crear celda para la descripción
    const tdDesc = document.createElement("td");
    tdDesc.textContent = actividad.descripcion;
    
    // Añadir celdas a la fila
    tr.appendChild(tdLink);
    tr.appendChild(tdDesc);
    
    // Añadir fila a la tabla
    tbody.appendChild(tr);
}

// Iniciar cuando el documento esté listo
document.addEventListener('DOMContentLoaded', function() {
    mostrarActividades(actividades);
});