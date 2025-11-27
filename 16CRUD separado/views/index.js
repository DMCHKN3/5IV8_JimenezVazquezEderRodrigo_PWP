const express = require('express');
const dotenv = require('dotenv');
const mysql = require('mysql2');
const cors = require('cors');

//primero las configuraciones de las rutas

const cursosRouter = require('../routers/cursosRouter.js');

const app = express();
const db = require('../database/db.js');

//configuramos las vistas

app.set('view engine', 'ejs');
app.set('views', path.json(__dirname, 'views'));

//configuramos el middleware

app.use(express.json());
app.use(cors());

//vamos a genrar una vista estatica
app.use(express.static(path.join(__dirname, 'views')));

//necesito ver mi pagina de cursos
app.get('/vista/cursos-ejs' , (req, res) => {
    //redireccionar para consumir
    res.redirect('/vista/cursos-ejs');
});

//ruta de bienvenida
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'bienvenida.html'));
});