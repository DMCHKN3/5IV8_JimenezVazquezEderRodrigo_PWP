const actividades = [
    { nombre: "01Curriculum", link: "./Curriculum/index.html", descripcion: "Currículo y presentación personal" },
    { nombre: "02Primeros pasos", link: "./02Primerospasos/estructura.html", descripcion: "Primeros pasos en HTML y CSS" },
    { nombre: "03Loggin", link: "./03Loggin/inicio.html", descripcion: "Creacion del inicio de sesión"},
    { nombre: "04Formulario", link: "./04Formulario/formulario.html", descripcion: "Creacion del formulario"},
    { nombre: "05Ejercicios", link: "./05 Ejercicios/ejerciciosm.html", descripcion: "Ejercicios de JS"},
    { nombre: "06Algoritmia", link: "./06Algoritmia/algoritmia.html", descripcion: "Ejercicios de JS de Algoritmia"},
    { nombre: "07JS Intermedio", link: "./07 JSIntermedio/jsintermedio.html", descripcion: "Apunte en un archivo JS"},
    { nombre: "08Rompecabezas", link: "./08Rompecabezas/rompecabezas.html", descripcion: "Rompecabezas con JS (en clase)"},
    { nombre: "09Node", link: "./09Node/node.html", descripcion: "Practica de Node.js y servidor local"},
    { nombre: "10Postman", link: "./10Postman/imgsPostman.html", descripcion: "Capturas de pantalla de la practica de postman"},
    { nombre: "Ejercicios Parte 2", link: "./Ejercicios_Part2/MainEjercicios.html", descripcion: "Tarea de Ejercicios Parte 2"},
    { nombre: "11 API Fetch", link: "./11 API Fetch/api.html", descripcion: "se trabaja con API y Fetch para hacer una pokedex"},
    { nombre: "12 Examen2", link: "./12Examen2/examen.html", descripcion: "Es el uso de la API que escogimos para el examen de 2o parcial"},
    { nombre: "13 Prueba extra", link: "./13 Ejerciciof 2o par/imagen_prueba.html", descripcion: "Prueba extra de JS" },
    { nombre: "14 CRUD MySQL", link: "./14 CRUDMYSQL/index.ejs", descripcion: "CRUD con Node.js y MySQL" },
    { nombre: "15 Bitacora CRUD", link: "./15 Bitacora CRUD/index.html", descripcion: "Tarea sobre hacer una bitacora usando el crud de la practica 14" },
    { nombre: "16 Crud Separado", link: "./16 Crud Separado/views/bienvenida.html", descripcion: "Se hace un crud separado, uso el html de bienvenida y tmb le pongo imagenes por lo del ejs" },
    { nombre: "17 API Crud", link: "./17 API Crud/index.html", descripcion: "Lo mismo que en la 16 pero aqui ya hicimos la estructura de una api yay :3 pero creo q no se acabo x lo del paro :c" },
    { nombre: "18 Gato de gatos 🙀", link: "./18GatoGatos/imagenes.html", descripcion: "Juego del gato hecho de gatos pero puras imagenes cxq lo pidio con una bd entonces no puedo subir el archivo .ejs :c" }

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