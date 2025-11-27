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

//configurar las validaciones
app.use(express.static(__dirname + '/js'));

//creacion del crud

//ruta get para mostrar el formulario y la lista de la bitacora
app.get('/', (req, res) => {
    const querry = 'SELECT id, inspector, DATE_FORMAT(fecha, "%Y/%m/%d") as fecha, hora, sector, checklist, observaciones, estado, seguimientoreq FROM bitacora';
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
    const { fecha, hora, sector, checklist, estado, observaciones, seguimientoreq, inspector } = req.body;
    const querry = `INSERT INTO bitacora (fecha, hora, sector, checklist, estado, observaciones, seguimientoreq, inspector) 
        VALUES ('${fecha}', '${hora}', '${sector}', '${checklist}', '${estado}', '${observaciones}', '${seguimientoreq}', '${inspector}');`;
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
app.get('/bitacora/delete/:id', (req, res) => {
    const id = req.params.id;
    
    // Validar que el ID sea un número válido
    if (isNaN(id) || id <= 0) {
        return res.send(`
            <script>
                alert('El ID proporcionado no es válido.');
                window.location.href = '/';
            </script>
        `);
    }
    
    // Primero verificar si el registro existe
    const queryVerificar = `SELECT * FROM bitacora WHERE id = ${id};`;
    bd.query(queryVerificar, (error, resultados) => {
        if (error) {
            console.log('Error al verificar el registro: ' + error);
            return res.status(500).send('Error al verificar el registro');
        }
        
        if (resultados.length === 0) {
            return res.send(`
                <script>
                    alert('El registro con ID ${id} no existe en la base de datos.');
                    window.location.href = '/';
                </script>
            `);
        }
        
        // Si existe, proceder a eliminar
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
});

//ruta para buscar y actualizar un registro de la bitacora
app.get('/bitacora/edit/:id', (req, res) => {
    const id = req.params.id;
    
    // Validar que el ID sea un número válido
    if (isNaN(id) || id <= 0) {
        return res.send(`
            <script>
                alert('El ID proporcionado no es válido.');
                window.location.href = '/';
            </script>
        `);
    }
    
    const querry = `SELECT * FROM bitacora WHERE id = ${id};`;
    bd.query(querry, (error, resultados) => {
        if (error) {
            console.log('Error al obtener el registro de la bitacora: ' + error);
            res.status(500).send('Error al obtener el registro de la bitacora');
        } else if (resultados.length === 0) {
            // Si no existe el registro, mostrar alerta y redirigir
            res.send(`
                <script>
                    alert('El registro con ID ${id} no existe en la base de datos.');
                    window.location.href = '/';
                </script>
            `);
        } else {
            res.render('edit', { registro: resultados[0] });
        }
    });
});

app.post('/bitacora/update/:id', (req, res) => {
    const id = req.params.id;
    
    // Validar que el ID sea un número válido
    if (isNaN(id) || id <= 0) {
        return res.send(`
            <script>
                alert('El ID proporcionado no es válido.');
                window.location.href = '/';
            </script>
        `);
    }
    
    const { fecha, hora, sector, checklist, estado, observaciones, seguimientoreq, inspector } = req.body;
    
    // Primero verificar si el registro existe
    const queryVerificar = `SELECT * FROM bitacora WHERE id = ${id};`;
    bd.query(queryVerificar, (error, resultados) => {
        if (error) {
            console.log('Error al verificar el registro: ' + error);
            return res.status(500).send('Error al verificar el registro');
        }
        
        if (resultados.length === 0) {
            return res.send(`
                <script>
                    alert('El registro con ID ${id} no existe en la base de datos.');
                    window.location.href = '/';
                </script>
            `);
        }
        
        // Si existe, proceder a actualizar
        const querry = `UPDATE bitacora SET fecha='${fecha}', hora='${hora}', sector='${sector}', checklist='${checklist}', estado='${estado}', 
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
});

app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});