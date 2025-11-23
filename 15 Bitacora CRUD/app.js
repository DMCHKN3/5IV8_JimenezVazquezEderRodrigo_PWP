const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const ejs = require('ejs');
require('dotenv').config({ path: './.env' });

const app = express();
const port = 3000;

//config de mysql

const bd = mysql.createConnection({
    host: process.env.BD_HOST,
    user: process.env.BD_USER,
    password: process.env.BD_PASSWORD,
    database: process.env.BD_NAME
});

bd.connect((error) => {
    if (error) {
        console.log('Error de conexion a la base de datos: ' + error);
    } else {
        console.log('Conexion exitosa a la base de datos');
    }
});

//configurar el middleware

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//configurar las vistas
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/css'));

//creacion del crud

//ruta get para mostrar el formulario y la lista de la bitacora
app.get('/', (req, res) => {
    const querry = 'SELECT * FROM bitacora';
    bd.query(querry, (error, resultados) => {
        if (error) {
            console.log('Error al obtener los registros de la bitacora: ' + error);
            res.status(500).send('Error al obtener los registros de la bitacora');
        } else {
            res.render('index', { bitacora: resultados });
        }
    });
});

//ruta para crear un registro en la bitacora

app.post('/bitacora', (req, res) => {
    const { fecha, sector, checklist, estado, observaciones, seguimientoreq, inspector } = req.body;
    const querry = `INSERT INTO bitacora (fecha, sector, checklist, estado, observaciones, seguimientoreq, inspector) 
        VALUES ('${fecha}', '${sector}', '${checklist}', '${estado}', '${observaciones}', '${seguimientoreq}', '${inspector}');`;
    bd.query(querry, (error, resultados) => {
        if (error) {
            console.log('Error al crear el registro de la bitacora: ' + error);
            res.status(500).send('Error al crear el registro de la bitacora');
        } else {
            res.redirect('/');
        }
    });
});

//ruta para eliminar un registro de la bitacora
app.post('/bitacora/eliminar/:id', (req, res) => {
    const id = req.params.id;
    const querry = `DELETE FROM bitacora WHERE id = ${id};`;
    bd.query(querry, (error, resultados) => {
        if (error) {
            console.log('Error al eliminar el registro de la bitacora: ' + error);
            res.status(500).send('Error al eliminar el registro de la bitacora');
        } else {
            res.redirect('/');
        }
    });
});

//ruta para buscar y actualizar un registro de la bitacora
app.get('/bitacora/editar/:id', (req, res) => {
    const id = req.params.id;
    const querry = `SELECT * FROM bitacora WHERE id = ${id};`;
    bd.query(querry, (error, resultados) => {
        if (error) {
            console.log('Error al obtener el registro de la bitacora: ' + error);
            res.status(500).send('Error al obtener el registro de la bitacora');
        } else {
            res.render('edit', { registro: resultados[0] });
        }
    });
});

app.post('/bitacora/update/:id', (req, res) => {
    const id = req.params.id;
    const { fecha, sector, checklist, estado, observaciones, seguimientoreq, inspector } = req.body;
    const querry = `UPDATE bitacora SET fecha='${fecha}', sector='${sector}', checklist='${checklist}', estado='${estado}', 
        observaciones='${observaciones}', seguimientoreq='${seguimientoreq}', inspector='${inspector}' WHERE id=${id};`;
    bd.query(querry, (error, resultados) => {
        if (error) {
            console.log('Error al actualizar el registro de la bitacora: ' + error);
            res.status(500).send('Error al actualizar el registro de la bitacora');
        } else {
            res.redirect('/');
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});