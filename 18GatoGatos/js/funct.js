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
    alert("¡Felicidades, jugador " + jugador + ", ganaste!");
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

function colocarFicha(tableroIndex, fila, columna) {

    const x = document.getElementById("tablero-" + tableroIndex + "-celda-" + fila + "-" + columna);
    x.innerText = (turno === 1) ? "X" : "O";
    if (tableros[tableroIndex][fila][columna] === 0) {
        tableros[tableroIndex][fila][columna] = turno;
        registrarMovimiento(tableroIndex, fila, columna);
        var ganadorPartida = checarSiGanoPartida();
        if (ganadorPartida !== 0) {
            mostrarCartelGanador(ganadorPartida);
        }
        cambiarTurno();
        return true;
    }
    return false;
}

function reiniciarJuego() {
    movimientos = [];
    turno = 1;
    tableros = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
}

function iniciarJuego() {
    mostrarInstrucciones(instrucciones);
    reiniciarJuego();
}