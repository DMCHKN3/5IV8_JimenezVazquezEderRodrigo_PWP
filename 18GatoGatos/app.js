const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const ejs = require('ejs');
require('dotenv').config({path: './.env'});

const app = express();
const port = 3000;

//configuracion de mysql
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
        console.log('Conexión a la base de datos establecida correctamente.');
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/js'));

//ruta para el juego
app.get('/juego', (req, res) => {
    res.render('juego');
});

//ruta get para mostrar las partidas anteriores guardadas
app.get('/', (req, res)=>{
    const querry = 'SELECT * FROM score';
    bd.query(querry, (error, resultados)=>{
        if(error){
            console.log('Error al obtener los registros: ' + error);
            res.status(500).send('Error al obtener los registros');
        } else {
            res.render('index', { score: resultados });
        }
    });
});

//ruta para guardar una nueva partida
app.post('/score', (req, res) => {
    const { ganador } = req.body;
    const querry = `INSERT INTO score (ganador, fecha) VALUES (?, NOW())`;
    bd.query(querry, [ganador], (error, resultados) => {
        if (error) {
            console.log('Error al guardar el registro: ' + error);
            res.status(500).json({ success: false, message: 'Error al guardar el registro' });
        } else {
            res.json({ success: true, message: 'Partida guardada correctamente' });
        }
    });
});

//ruta para eliminar un registro de partida
app.post('/score/delete/:id', (req, res) => {
    const id = req.params.id;
    const querry = `DELETE FROM score WHERE id = ${id};`;
    bd.query(querry, (error, resultados) => {
        if (error) {
            console.log('Error al eliminar el registro: ' + error);
            res.status(500).send('Error al eliminar el registro');
        } else {
            res.redirect('/');
        }
    });
});