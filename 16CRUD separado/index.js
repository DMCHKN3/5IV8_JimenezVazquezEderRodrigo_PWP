const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

//primero las configuraciones de las rutas

const cursosRouter = require('./routers/cursosRouter.js');

const app = express();
const db = require('./database/db.js');

//configuramos las vistas

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

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

//renderizar la ruta de consulta
app.get('/vista/cursos-ejs', (req, res) => {
    const querry = ('SELECT * FROM cursos', ( error, resultados) => {
        if (error) {
            console.log('Error al obtener los cursos: ' + error.message);
            res.status(500).send('Error al obtener los cursos');
            return res.render('cursos', { cursos: [] });
        }
        return res.render('cursos', { cursos: resultados });
    });
});

//usar las rutas
app.use('/cursos', cursosRouter);