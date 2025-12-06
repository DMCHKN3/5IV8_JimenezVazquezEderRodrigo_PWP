var instrucciones = [
    "El jugador uno juega con X y el jugador dos con O.",
    "El jugador uno coloca su ficha en una casilla vacía del tablero pequeño.",
    "El jugador dos juega en el tablero pequeño correspondiente a la casilla donde jugó el jugador uno.",
    "El primer jugador que consiga alinear tres fichas en un tablero pequeño gana ese tablero.",
    "El primer jugador que consiga ganar tres tableros pequeños en línea gana la partida."
];

var movimientos = [];
var turno = 1; // 1 para jugador uno (X), 2 para jugador dos (O)

var tableros = [
    [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ],
    [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ],
    [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ],
    [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ],
    [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ],
    [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ],
    [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ],
    [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ],
    [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]
];

function mostrarInstrucciones(instrucciones) {
    for (var i = 0; i < instrucciones.length; i++) {
        mostrarInstruccionesLista(instrucciones[i], "lista-instrucciones");
    }
}

function mostrarInstruccionesLista(instruccion, idLista) {
    var ul = document.getElementById(idLista);
    var li = document.createElement("li");
    li.textContent = instruccion;
    ul.appendChild(li);
}

function cambiarTurno() {
    turno = (turno === 1) ? 2 : 1;
}

function registrarMovimiento(tableroIndex, fila, columna) {
    movimientos.push({
        tablero: tableroIndex,
        fila: fila,
        columna: columna,
        jugador: turno
    });
}

function mostrarCartelGanador(jugador) {
    var fichajugador = (jugador === 1) ? "X" : "O";
    alert("¡Felicidades, jugador " + jugador + " (" + fichajugador + "), ganaste!");
    guardarPartida("gana jugador " + jugador + " (" + fichajugador + ")");
}

function mostrarCartelEmpate() {
    alert("¡La partida terminó en empate!");
    guardarPartida("hubo un gato");
}

function guardarPartida(resultado) {
    fetch('/score', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ganador: resultado
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Partida guardada correctamente');
        } else {
            console.error('Error al guardar la partida:', data.message);
        }
    })
    .catch(error => {
        console.error('Error al guardar la partida:', error);
    });
}

function colocarFicha(tableroIndex, fila, columna) {
    // Validar primero antes de modificar el DOM
    if (!tableroValido(tableroIndex)) {
        alert("No puedes jugar en este tablero");
        return false;
    }
    
    if (tableros[tableroIndex][fila][columna] !== 0) {
        alert("Esta casilla ya está ocupada");
        return false;
    }
    
    // Si las validaciones pasan, actualizar el estado y el DOM
    tableros[tableroIndex][fila][columna] = turno;
    registrarMovimiento(tableroIndex, fila, columna);
    
    const celda = document.getElementById("tablero-" + tableroIndex + "-celda-" + fila + "-" + columna);
    celda.innerText = (turno === 1) ? "X" : "O";
    
    // Verificar si hay un ganador de tablero pequeño
    var ganadorTablero = checarSiGanoTablero(tableros[tableroIndex]);
    if (ganadorTablero !== 0) {
        marcarTableroGanado(tableroIndex, ganadorTablero);
    }
    
    // Verificar si hay un ganador de la partida
    var ganadorPartida = checarSiGanoPartida();
    if (ganadorPartida !== 0) {
        mostrarCartelGanador(ganadorPartida);
        return true;
    }
    
    // Verificar si hay empate (todos los tableros llenos o ganados sin ganador general)
    if (verificarEmpatePartida()) {
        mostrarCartelEmpate();
        return true;
    }
    
    cambiarTurno();
    actualizarIndicadorTablero();
    return true;
}

function checarSiGanoTablero(tablero) {
    // Verificar filas y columnas
    for (var i = 0; i < 3; i++) {
        if (tablero[i][0] !== 0 && tablero[i][0] === tablero[i][1] && tablero[i][1] === tablero[i][2]) {
            return tablero[i][0];
        }
        if (tablero[0][i] !== 0 && tablero[0][i] === tablero[1][i] && tablero[1][i] === tablero[2][i]) {
            return tablero[0][i];
        }
    }

    // Verificar diagonales
    if (tablero[0][0] !== 0 && tablero[0][0] === tablero[1][1] && tablero[1][1] === tablero[2][2]) {
        return tablero[0][0];
    }
    if (tablero[0][2] !== 0 && tablero[0][2] === tablero[1][1] && tablero[1][1] === tablero[2][0]) {
        return tablero[0][2];
    }
    return 0; // No hay ganador
}

function tableroValido(tableroIndex) {
    // Un tablero no es válido si ya fue ganado
    if (checarSiGanoTablero(tableros[tableroIndex]) !== 0) {
        return false;
    }
    
    // Primer movimiento, cualquier tablero es válido
    if (movimientos.length === 0) {
        return true;
    }
    
    var ultimoMovimiento = movimientos[movimientos.length - 1];
    var tableroDestino = ultimoMovimiento.fila * 3 + ultimoMovimiento.columna;
    
    // Si el tablero destino está ganado o lleno, cualquier tablero disponible es válido
    if (checarSiGanoTablero(tableros[tableroDestino]) !== 0 || esTableroLleno(tableros[tableroDestino])) {
        return true;
    }
    
    // De lo contrario, solo el tablero destino es válido
    return tableroIndex === tableroDestino;
}

function obtenerTableroActivo() {
    // Retorna -1 si se puede jugar en cualquier tablero, o el índice del tablero obligatorio
    if (movimientos.length === 0) {
        return -1; // Primer movimiento, cualquier tablero
    }
    
    var ultimoMovimiento = movimientos[movimientos.length - 1];
    var tableroDestino = ultimoMovimiento.fila * 3 + ultimoMovimiento.columna;
    
    // Si el tablero destino está ganado o lleno, se puede jugar en cualquiera
    if (checarSiGanoTablero(tableros[tableroDestino]) !== 0 || esTableroLleno(tableros[tableroDestino])) {
        return -1;
    }
    
    return tableroDestino;
}


function esTableroLleno(tablero) {
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (tablero[i][j] === 0) {
                return false;
            }
        }
    }
    return true;
}

function checarSiGanoPartida() {
    var tablerosGanados = [
        0, 0, 0,
        0, 0, 0,
        0, 0, 0
    ];

    for (var i = 0; i < tableros.length; i++) {
        var ganador = checarSiGanoTablero(tableros[i]);
        tablerosGanados[i] = ganador;
    }
    return checarSiGanoTablero([
        [tablerosGanados[0], tablerosGanados[1], tablerosGanados[2]],
        [tablerosGanados[3], tablerosGanados[4], tablerosGanados[5]],
        [tablerosGanados[6], tablerosGanados[7], tablerosGanados[8]]
    ]);
}

function verificarEmpatePartida() {
    // Verificar si todos los tableros están ganados o llenos
    for (var i = 0; i < tableros.length; i++) {
        if (checarSiGanoTablero(tableros[i]) === 0 && !esTableroLleno(tableros[i])) {
            return false; // Aún hay tableros disponibles
        }
    }
    return true; // Todos los tableros están ganados o llenos
}

function reiniciarJuego() {
    movimientos = [];
    turno = 1;
    tableros = [];
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            tableros.push([
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ]);
        }
    }
}

function marcarTableroGanado(tableroIndex, ganador) {
    // Marcar visualmente el tablero como ganado
    var tablero = document.getElementById("casilla" + (tableroIndex + 1));
    if (tablero) {
        tablero.classList.add("tablero-ganado");
        tablero.classList.add(ganador === 1 ? "ganado-x" : "ganado-o");
    }
}

function actualizarIndicadorTablero() {
    // Actualizar indicador visual de dónde se debe jugar
    var tableroActivo = obtenerTableroActivo();
    
    // Remover clase activa de todos los tableros
    for (var i = 0; i < 9; i++) {
        var tablero = document.getElementById("casilla" + (i + 1));
        if (tablero) {
            tablero.classList.remove("tablero-activo");
        }
    }
    
    // Si hay un tablero específico, marcarlo como activo
    if (tableroActivo !== -1) {
        var tablero = document.getElementById("casilla" + (tableroActivo + 1));
        if (tablero && checarSiGanoTablero(tableros[tableroActivo]) === 0) {
            tablero.classList.add("tablero-activo");
        }
    }
    
    // Actualizar texto del turno
    var flecha = document.getElementById("flecha");
    if (flecha) {
        if (tableroActivo === -1) {
            flecha.textContent = "Jugador " + turno + " - Puedes jugar en cualquier tablero disponible";
        } else {
            flecha.textContent = "Jugador " + turno + " - Debes jugar en el tablero " + (tableroActivo + 1);
        }
    }
}

function iniciarJuego() {
    mostrarInstrucciones(instrucciones);
    reiniciarJuego();
    actualizarIndicadorTablero();
}

function reiniciarJuegoCompleto() {
    // Limpiar todas las celdas
    for (var i = 0; i < 9; i++) {
        for (var fila = 0; fila < 3; fila++) {
            for (var col = 0; col < 3; col++) {
                var celda = document.getElementById("tablero-" + i + "-celda-" + fila + "-" + col);
                if (celda) {
                    celda.innerText = "";
                }
            }
        }
        // Remover clases de tableros ganados
        var tablero = document.getElementById("casilla" + (i + 1));
        if (tablero) {
            tablero.classList.remove("tablero-ganado", "ganado-x", "ganado-o", "tablero-activo");
        }
    }
    
    // Reiniciar el juego
    reiniciarJuego();
    actualizarIndicadorTablero();
}