const mysql = require('mysql2');
//es una clase para la conexion

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'n0m3l0',
    database: 'bd_cursos'
});

db.connect((error) => {
    if (error) {
        console.log('Error de conexion a la base de datos: ' + error.stack);
    } else {
        console.log('Conexion exitosa a la base de datos');
    }
});

module.exports = db; // crea la instancia y la exporta