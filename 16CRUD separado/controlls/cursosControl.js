//necesitamos crear un CRUD de cursos

//necesitamos la conexion con la bd

const bdConecction = require('../database/db.js');

//crear los endpoints (puntos de consumo)

const getCursos = (req, res) => {
    try{
        bdConecction.query('SELECT * FROM cursos', (error, results) => {
            if (error) {
                return res.status(400).json({ message: 'Error al obtener los cursos' });
                console.log(error);
            } else {
                res.status(200).json(results);    
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

const getCursosById = (req, res) => {
    try{
        bdConecction.query('SELECT * FROM cursos WHERE id = ? ', [id] (error, results) => {
            if (error) {
                return res.status(400).json({ message: 'Error al obtener los cursos' });
                console.log(error);
            } else {
                res.status(200).json(results);    
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};